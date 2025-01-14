import React, { useState } from "react";
import { StyleSheet, Dimensions } from "react-native";
import Svg, { Rect, Text } from "react-native-svg";
import {
    PanGestureHandler,
    GestureHandlerRootView,
} from "react-native-gesture-handler";
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
} from "react-native-reanimated";
import {TamaguiProvider, YStack, Button, XStack, Separator} from "tamagui";
import {X} from "@tamagui/lucide-icons";

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export default function MapScreen() {
    const [roomStatus, setRoomStatus] = useState({
        room1: "occupied",
        room2: "unoccupied",
        room3: "occupied",
        room4: "unoccupied",
        room5: "occupied",
    });

    const scale = useSharedValue(1);
    const translateX = useSharedValue(0);
    const translateY = useSharedValue(0);

    const panOffsetX = useSharedValue(0);
    const panOffsetY = useSharedValue(0);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [
            { scale: scale.value },
            { translateX: translateX.value },
            { translateY: translateY.value },
        ],
    }));

    const handleZoom = (zoomIn) => {
        // Adjust the zoom level
        const newScale = zoomIn ? scale.value + 0.2 : scale.value - 0.2;
        scale.value = withTiming(Math.min(Math.max(newScale, 0.5), 3), {
            duration: 200,
        });
    };

    const handleRoomClick = (room) => {
        alert(`Clicked on ${room}`);
    };

    const getRoomColor = (status) => {
        return status === "occupied" ? "red" : "green";
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
                            <Svg height={screenHeight} width={screenWidth}>
                                {/* Room 1 */}
                                <Rect
                                    x="50"
                                    y="50"
                                    width="100"
                                    height="100"
                                    fill={getRoomColor(roomStatus.room1)}
                                    onPress={() => handleRoomClick("Room 1")}
                                />
                                <Text x="100" y="120" fontSize="14" fill="white" textAnchor="middle">
                                    Room 1
                                </Text>

                                {/* Room 2 */}
                                <Rect
                                    x="150"
                                    y="50"
                                    width="100"
                                    height="100"
                                    fill={getRoomColor(roomStatus.room2)}
                                    onPress={() => handleRoomClick("Room 2")}
                                />
                                <Text x="200" y="120" fontSize="14" fill="white" textAnchor="middle">
                                    Room 2
                                </Text>

                                {/* Add more rooms dynamically */}
                            </Svg>
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
                        onPress={() => console.log("Floor 1 selected")}
                        backgroundColor="$secondary"
                        pressStyle={{backgroundColor: "$secondary_focus", borderColor: "$secondary_focus"}}
                        focusStyle={{ borderColor: "$secondary_focus" }}
                        borderWidth={1}
                        borderStyle="solid"
                        borderTopLeftRadius={100}
                        borderTopRightRadius={100}
                        padding={0}
                        col='white'
                    >
                        1
                    </Button>
                    <Separator borderColor="$secondary_focus"/>
                    <Button
                        size="$4"
                        onPress={() => console.log("Floor 0 selected")}
                        pressStyle={{backgroundColor: "$secondary_focus", borderColor: "$secondary_focus"}}
                        backgroundColor="$secondary_focus"
                        focusStyle={{ borderColor: "$secondary_focus" }}
                        borderWidth={1}
                        borderStyle="solid"
                        borderBottomLeftRadius={100}
                        borderBottomRightRadius={100}
                        padding={0}
                        col='white'
                    >
                        0
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
                        focusStyle={{ borderColor: "$accent_focus" }}
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
                        focusStyle={{ borderColor: "$accent_focus" }}
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