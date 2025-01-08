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
import { TamaguiProvider, YStack, Button } from "tamagui";

const { width, height } = Dimensions.get("window");

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

    const handleZoom = (zoomIn: boolean) => {
        // Adjust the zoom level
        const newScale = zoomIn ? scale.value + 0.2 : scale.value - 0.2;
        scale.value = withTiming(Math.min(Math.max(newScale, 0.5), 3), {
            duration: 200,
        });
    };

    const handleRoomClick = (room: string) => {
        alert(`Clicked on ${room}`);
    };

    const getRoomColor = (status: string) => {
        return status === "occupied" ? "red" : "green";
    };

    return (
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
                    <Svg height={height} width={width}>
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

            {/* Zoom Controls */}
            <YStack
                position="absolute"
                bottom={20}
                right={20}
                backgroundColor="white"
                borderRadius={50}
                padding={4}
                elevation={5}
                space={4}
            >
                <Button
                    size="$4"
                    onPress={() => handleZoom(true)}
                    style={{ backgroundColor: "#4CAF50" }}
                >
                    +
                </Button>
                <Button
                    size="$4"
                    onPress={() => handleZoom(false)}
                    style={{ backgroundColor: "#f44336" }}
                >
                    -
                </Button>
            </YStack>
        </GestureHandlerRootView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f5f5f5",
    },
    mapContainer: {
        flex: 1,
    },
});
