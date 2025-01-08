import { Button, Image, SizableText, YStack } from 'tamagui';
import color from "../../../constants/Colors";
import { Toast } from "@tamagui/toast";
import React from "react";
import { Dimensions } from "react-native";

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

function user_name() {
    return 'J. Smith';
}

export default function IntakeTwoScreen({ navigation }) {
    return (
        <YStack
            f={1}
            ai="center"
            jc="center"
            px="$10"
            bg={color.light.background}
        >
            <YStack
                bg={color.light.container}
                width={(screenWidth * 80) / 100}
                height={(screenHeight * 70) / 100}
                borderRadius="$10"
                elevation="$0.25"
                p="$6"
                ai="center"
            >
                {/* Image Section */}
                <YStack ai="center" jc="center" mt="$4">
                    <Image
                        src={require('../../../assets/images/skilled-Hospice-Nurse-768x612.png')}
                        style={{
                            width: '60%',
                            aspectRatio: 4 / 3,
                            maxHeight: (screenHeight * 27) / 100,
                        }}
                        resizeMode="contain"
                        mx="auto"
                    />
                </YStack>


                {/* Spacer to push the button to the bottom */}
                <YStack f={1} />


            </YStack>

            {/* Toast for error message */}
            <Toast />
        </YStack>
    );
}
