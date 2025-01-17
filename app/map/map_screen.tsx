import React, { useCallback, useEffect, useState } from "react";
import { Dimensions, StyleSheet } from "react-native";
import { GestureHandlerRootView, PanGestureHandler } from "react-native-gesture-handler";
import { Home } from "@tamagui/lucide-icons";
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from "react-native-reanimated";
import { Button, Separator, Spinner, YStack } from "tamagui";
import MapSvg from "./map_svg";
import { Demo } from "./map_legend";
import { CircleHelp } from "@tamagui/lucide-icons";
import { RoomDetailModal } from "./map_modal";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
const MAP_SCALE_FACTOR = 3;
const MAX_SCALE = 5;
const MIN_SCALE = 1.6;

interface Room {
    _id?: string;
    roomNumber: number;
    floor: number;
    isScaled?: boolean;
    maxCapacity: number;
    isQuarantined?: boolean;
    patientNumbers?: number[];
}

interface Patient {
    _id?: string;
    patientNumber: number;
    firstName: string;
    lastName: string;
    isQuarantined: boolean;
    dateOfBirth?: string;
    createdAt?: string;
    updatedAt?: string;
    __v?: number;
    room: Room;
}

interface MapData {
    rooms: Room[];
    patients: Patient[];
}

interface selectedRoomType {
    roomNumber: number,
    patients: Patient[],
    floor: number
}

async function fetchData<T>(
    url: string,
    showErrorToast: (message: string) => void,
    showSuccessToast: (message: string) => void
): Promise<T[]> {
    try {
        console.log(`Fetching data from ${url}...`);
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(
                error.message || `Failed to fetch data from ${url} `
            );
        }

        const data: T[] = await response.json();
        console.log(`Data fetched successfully from ${url}:`);
        showSuccessToast(`Data loaded successfully from ${url}`);
        return data;
    } catch (error: any) {
        console.error(`Error fetching data from ${url}:`, error);
        showErrorToast(
            error.message || `An error occurred while fetching data from ${url}`
        );
        return [];
    }
}

export default function MapScreen({ navigation }) {
    const [isRoomDetailModalVisible, setIsRoomDetailModalVisible] =
        useState(false);
    const [selectedRoom, setSelectedRoom] = useState<selectedRoomType | null>(null);
    const [refreshMap, setRefreshMap] = useState(false);


    const handleOpenRoomModal = () => {
        setIsRoomDetailModalVisible(true);
    };

    const handleCloseRoomModal = () => {
        setIsRoomDetailModalVisible(false);
        setSelectedRoom(null);
    };


    const handleMapRefresh = () => {
        console.log("Map refreshed");
        setRefreshMap(!refreshMap)
    };


    const [floor, setFloor] = useState(1);
    const [mapData, setMapData] = useState<MapData>({ rooms: [], patients: [] });
    const [isLoading, setIsLoading] = useState(true);
    const [currentFloorRooms, setCurrentFloorRooms] = useState<Room[]>([]);
    const [processedRooms, setProcessedRooms] = useState<Room[]>([]);


    const showErrorToast = useCallback((message: string) => {
        console.error("Error toast:", message);
    }, []);

    const showSuccessToast = useCallback((message: string) => {
        console.log("Success toast:", message);
    }, []);

    useEffect(() => {
        const fetchAllData = async () => {
            setIsLoading(true);

            const [roomsResult, patientsResult] = await Promise.all([
                fetchData<Room>(
                    `https://care-manager-api-cybccdb6fkffe8hg.westeurope-01.azurewebsites.net/api/room`,
                    showErrorToast,
                    showSuccessToast
                ),
                fetchData<Patient>(
                    `https://care-manager-api-cybccdb6fkffe8hg.westeurope-01.azurewebsites.net/api/patient`,
                    showErrorToast,
                    showSuccessToast
                ),
            ]);

            const roomsWithPatients = roomsResult.map((room) => {
                const patientsInRoom = patientsResult.filter(
                    (patient) => patient.room?._id === room._id
                );
                const patientNumbers = patientsInRoom.map(
                    (patient) => patient.patientNumber
                );
                const hasQuarantinedPatient = patientsInRoom.some(
                    (patient) => patient.isQuarantined
                );
                return {
                    ...room,
                    patientNumbers,
                    isQuarantined: hasQuarantinedPatient,
                    isScaled: room.isScaled === undefined ? false : room.isScaled
                };
            });

            const updatedMapData: MapData = {
                rooms: roomsWithPatients,
                patients: patientsResult,
            };

            setMapData(updatedMapData);
            setProcessedRooms(roomsWithPatients);
            setCurrentFloorRooms(
                roomsWithPatients.filter((room) => room.floor === floor)
            );
            setIsLoading(false);
        };

        fetchAllData();
    }, [floor, showErrorToast, showSuccessToast, refreshMap]);


    useEffect(() => {
        if (mapData.rooms.length > 0) {
            setCurrentFloorRooms(
                mapData.rooms.filter((room) => room.floor === floor)
            );
        }
    }, [floor, mapData, refreshMap]);

    const scale = useSharedValue(MIN_SCALE); // Set initial value to MIN_SCALE
    const translateX = useSharedValue(0);
    const translateY = useSharedValue(0);
    const panOffsetX = useSharedValue(0);
    const panOffsetY = useSharedValue(0);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [
            { scale: scale.value / MAP_SCALE_FACTOR },
            { translateX: translateX.value },
            { translateY: translateY.value },
        ],
    }));

    const handleZoom = (zoomIn: boolean) => {
        const newScale = zoomIn ? scale.value + 0.8 : scale.value - 0.8;
        scale.value = withTiming(
            Math.min(Math.max(newScale, MIN_SCALE), MAX_SCALE),
            {
                duration: 200,
            }
        );
    };

    const handleRoomPress = (room: Room) => {
        const patientsInRoom = mapData.patients.filter(
            (patient) => patient.room?._id === room._id
        );
        setSelectedRoom({
            roomNumber: room.roomNumber,
            patients: patientsInRoom,
            floor: room.floor,
        });
        handleOpenRoomModal();
    };


    return (
        <YStack f={1} ai="center" jc="center" px="$10" bg="$background">
            <YStack
                bg="#E1F4F6"
                width={(screenWidth * 80) / 100}
                height={(screenHeight * 70) / 100}
                borderRadius="$10"
                elevation="$0.25"
                p="$6"
                ai="center"
                overflow="hidden"
                position="relative"
            >
                {isLoading ? (
                    <Spinner size="large" color="$primary_focus" />
                ) : (
                    <GestureHandlerRootView style={styles.container}>
                        <PanGestureHandler
                            onGestureEvent={(event) => {
                                translateX.value =
                                    panOffsetX.value + event.nativeEvent.translationX;
                                translateY.value =
                                    panOffsetY.value + event.nativeEvent.translationY;
                            }}
                            onEnded={(event) => {
                                panOffsetX.value += event.nativeEvent.translationX;
                                panOffsetY.value += event.nativeEvent.translationY;
                            }}
                            shouldCancelWhenOutside={false}
                        >
                            <Animated.View style={[styles.mapContainer, animatedStyle]}>
                                <MapSvg
                                    screenWidth={screenWidth}
                                    MAP_SCALE_FACTOR={MAP_SCALE_FACTOR}
                                    rooms={currentFloorRooms}
                                    patients={mapData.patients}
                                    onRoomPress={handleRoomPress}
                                />
                            </Animated.View>
                        </PanGestureHandler>
                    </GestureHandlerRootView>
                )}

                {/* Top-left question mark */}
                {/*<Button*/}
                {/*    bg="$secondary"*/}
                {/*    borderColor="$secondary_focus"*/}
                {/*    position="absolute"*/}
                {/*    top="$4"*/}
                {/*    left="$4"*/}
                {/*    size="$4"*/}
                {/*    circular*/}
                {/*    pressStyle={{ bg: "$secondary_focus" }}*/}
                {/*    color="white"*/}
                {/*    onPress={handleOpenRoomModal}*/}

                {/*>*/}
                {/*    ?*/}

                {/*</Button>*/}
                <Demo
                    circular
                    shouldAdapt={false}
                    placement="right"
                    Icon={<CircleHelp/>}
                    Name="left-popover"
                    col="$secondary"
                />

                {/* Top-right floor selector */}
                <YStack
                    position="absolute"
                    top="$4"
                    right="$4"
                    w="$5"
                    backgroundColor="$secondary"
                    borderRadius={100}
                    padding={1}
                    elevation={5}
                    borderColor="$secondary_focus"
                    borderWidth={1}
                >
                    <Button
                        size="$4"
                        onPress={() => setFloor(2)}
                        pressStyle={{
                            backgroundColor: "$secondary_focus",
                            borderColor: "$secondary_focus",
                        }}
                        backgroundColor={floor === 2 ? "$secondary_focus" : "$secondary"}
                        focusStyle={{ borderColor: "$secondary_focus" }}
                        borderWidth={1}
                        borderStyle="solid"
                        borderTopLeftRadius={100}
                        borderTopRightRadius={100}
                        padding={0}
                        color="white"
                    >
                        2
                    </Button>
                    <Separator borderColor="$secondary_focus" />
                    <Button
                        size="$4"
                        onPress={() => setFloor(1)}
                        pressStyle={{
                            backgroundColor: "$secondary_focus",
                            borderColor: "$secondary_focus",
                        }}
                        backgroundColor={floor === 1 ? "$secondary_focus" : "$secondary"}
                        focusStyle={{ borderColor: "$secondary_focus" }}
                        borderWidth={1}
                        borderStyle="solid"
                        borderBottomLeftRadius={100}
                        borderBottomRightRadius={100}
                        padding={0}
                        color="white"
                    >
                        1
                    </Button>
                </YStack>

                {/* Bottom-right zoom controls */}
                <YStack
                    position="absolute"
                    bottom="$4"
                    right="$4"
                    w="$5"
                    backgroundColor="$accent"
                    borderRadius={100}
                    padding={1}
                    elevation={5}
                    borderColor="$accent_focus"
                    borderWidth={1}
                >
                    <Button
                        size="$4"
                        onPress={() => handleZoom(true)}
                        backgroundColor="$accent"
                        pressStyle={{
                            backgroundColor: "$accent_focus",
                            borderColor: "$accent_focus",
                        }}
                        focusStyle={{ borderColor: "$accent_focus" }}
                        borderWidth={1}
                        borderStyle="solid"
                        borderTopLeftRadius={100}
                        borderTopRightRadius={100}
                        padding={0}
                        color="white"
                    >
                        +
                    </Button>
                    <Separator borderColor="$accent_focus" />
                    <Button
                        size="$4"
                        onPress={() => handleZoom(false)}
                        pressStyle={{
                            backgroundColor: "$accent_focus",
                            borderColor: "$accent_focus",
                        }}
                        backgroundColor="$accent"
                        focusStyle={{ borderColor: "$accent_focus" }}
                        borderWidth={1}
                        borderStyle="solid"
                        borderBottomLeftRadius={100}
                        borderBottomRightRadius={100}
                        padding={0}
                        color="white"
                    >
                        -
                    </Button>
                </YStack>
            </YStack>

            <YStack
                ai="center"
                jc="center"
                position="absolute"
                bottom={0}
                width="100%"
                height={(screenHeight - (screenHeight * 70) / 100) /2} // adjust for spacing if needed
            >
                <Button
                    borderRadius="$10"
                    bg="$secondary"
                    size="$6"
                    px="$8"
                    onPress={() => navigation.navigate('HomeScreen')}
                    pressStyle={{bg: '$secondary_focus'}}
                >
                    <Home color="white" size="$2"/>
                </Button>
            </YStack>


            <RoomDetailModal
                visible={isRoomDetailModalVisible}
                onClose={handleCloseRoomModal}
                screenWidth={screenWidth}
                roomNumber={selectedRoom?.roomNumber || 0}
                floor={selectedRoom?.floor || 0}
                patients={selectedRoom?.patients || []}
                onRoomScaled={handleMapRefresh}
            />
        </YStack>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: (screenWidth * 80) / 100,
        height: (screenHeight * 70) / 100,
    },
    mapContainer: {
        flex: 1,
    },
});