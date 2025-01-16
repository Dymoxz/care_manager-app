import React, {useEffect, useState} from "react";
import {Dimensions, StyleSheet} from "react-native";
import {GestureHandlerRootView, PanGestureHandler,} from "react-native-gesture-handler";
import Animated, {useAnimatedStyle, useSharedValue, withTiming,} from "react-native-reanimated";
import {ClipPath, G, Path, Rect, Svg, Text, TSpan, Circle} from "react-native-svg";
import {Button, Separator, YStack} from "tamagui";
import MapSvg from "./map_svg";

const {width: screenWidth, height: screenHeight} = Dimensions.get('window');
const MAP_SCALE_FACTOR = 3; // Render at twice the resolution
const MAX_SCALE = 5;   // Increased maximum zoom
const MIN_SCALE = 2; // Decreased minimum zoom (less zoom out)

export default function MapScreen() {
    const [floor, setFloor] = useState(1);

    const firstFloorRooms = [
        {
            'roomNumber': 1,
            'maxOccupants': 2
        }
    ];

    const secondFloorRooms = [
        {
            'roomNumber': 1,
            'maxOccupants': 3
        }
    ];

    const [rooms, setRooms] = useState(firstFloorRooms);

    useEffect(() => {
        if (floor === 1) {

            setRooms(firstFloorRooms);
        } else {
            setRooms(secondFloorRooms);
        }
    }, [floor]); // Dependency array: only re-run when 'floor' changes


    const scale = useSharedValue(MIN_SCALE); // Start at the minimum zoom level
    const translateX = useSharedValue(0);
    const translateY = useSharedValue(0);

    const panOffsetX = useSharedValue(0);
    const panOffsetY = useSharedValue(0);



    const animatedStyle = useAnimatedStyle(() => ({
        transform: [
            { scale: scale.value / MAP_SCALE_FACTOR }, // Initial scale down
            { translateX: translateX.value },
            { translateY: translateY.value },
        ],
    }));

    const handleZoom = (zoomIn) => {
        const newScale = zoomIn
            ? scale.value + 0.8
            : scale.value - 0.8;

        // Use the updated MAX_SCALE and MIN_SCALE
        scale.value = withTiming(Math.min(Math.max(newScale, MIN_SCALE), MAX_SCALE), {
            duration: 200,
        });
    };

    const handleRoomClick = (room) => {
        alert(`Clicked on ${room}`);
    };

    const getRoomColor = (status) => {
        return status === "occupied" ? "red" : "#0891B2";
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
                position="relative" // Important for absolute positioning of children
            >
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
                                rooms={rooms}
                            />

                        </Animated.View>
                    </PanGestureHandler>
                </GestureHandlerRootView>

                {/*top left question mark*/}
                <Button
                    bg='$secondary'
                    borderColor='$secondary_focus'
                    position="absolute"
                    top="$4"
                    left="$4"
                    size="$4"
                    circular
                    pressStyle={{bg: '$secondary_focus'}}
                    col='white'
                >
                    ?
                </Button>

                {/* top right floor selector*/}
                <YStack
                    position="absolute"
                    top="$4"
                    right="$4"
                    w='$5'
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
                        pressStyle={{backgroundColor: "$secondary_focus", borderColor: "$secondary_focus"}}
                        backgroundColor={floor === 2 ? "$secondary_focus" : "$secondary"}
                        focusStyle={{borderColor: "$secondary_focus"}}
                        borderWidth={1}
                        borderStyle="solid"
                        borderTopLeftRadius={100}
                        borderTopRightRadius={100}
                        padding={0}
                        col='white'
                    >
                        2
                    </Button>
                    <Separator borderColor="$secondary_focus"/>
                    <Button
                        size="$4"
                        onPress={() => setFloor(1)}
                        pressStyle={{backgroundColor: "$secondary_focus", borderColor: "$secondary_focus"}}
                        backgroundColor={floor === 2 ? "$secondary" : "$secondary_focus"}
                        focusStyle={{borderColor: "$secondary_focus"}}
                        borderWidth={1}
                        borderStyle="solid"
                        borderBottomLeftRadius={100}
                        borderBottomRightRadius={100}
                        padding={0}
                        col='white'
                    >
                        1
                    </Button>
                </YStack>

                {/* bottom right zoom controls */}
                <YStack
                    position="absolute"
                    bottom="$4"
                    right="$4"
                    w='$5'
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
                        pressStyle={{backgroundColor: "$accent_focus", borderColor: "$accent_focus"}}
                        focusStyle={{borderColor: "$accent_focus"}}
                        borderWidth={1}
                        borderStyle="solid"
                        borderTopLeftRadius={100}
                        borderTopRightRadius={100}
                        padding={0}
                        col='white'
                    >
                        +
                    </Button>
                    <Separator borderColor="$accent_focus"/>
                    <Button
                        size="$4"
                        onPress={() => handleZoom(false)}
                        pressStyle={{backgroundColor: "$accent_focus", borderColor: "$accent_focus"}}
                        backgroundColor="$accent"
                        focusStyle={{borderColor: "$accent_focus"}}
                        borderWidth={1}
                        borderStyle="solid"
                        borderBottomLeftRadius={100}
                        borderBottomRightRadius={100}
                        padding={0}
                        col='white'
                    >
                        -
                    </Button>
                </YStack>

            </YStack>
        </YStack>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // Adjust width and height to match the parent container
        width: (screenWidth * 80) / 100,
        height: (screenHeight * 70) / 100,
    },
    mapContainer: {
        flex: 1,
    },
});