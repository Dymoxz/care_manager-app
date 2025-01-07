import {Button, Image, Input, SizableText, XStack, YStack} from 'tamagui';
import color from "../../constants/Colors";
import {Toast} from "@tamagui/toast";
import React from "react";
import {Dimensions} from "react-native";


const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export default function StartShiftScreen( {navigation}) {

    return (
        <YStack
            f={1}
            ai="center"
            jc="center"
            px="$10"
            bg={color.light.background}
        >
            <YStack
                bg="#E1F4F6"
                width={(screenWidth * 80) / 100}
                height={(screenHeight * 70) / 100}
                borderRadius="$10"
                elevation="$0.25"
                p="$6"
                ai="center"
                jc="space-between"
            >
                {/* Image Section */}
                <YStack ai="center" jc="center" mt="$4">
                    <Image
                        src={require('../../assets/images/skilled-Hospice-Nurse-768x612.png')}
                        style={{
                            width: '60%',
                            aspectRatio: 4 / 3,
                            maxHeight: (screenHeight * 27) / 100,
                        }}
                        resizeMode="contain"
                        mx="auto"
                    />
                </YStack>

                {/* Button Section */}
                <YStack ai="center" jc="center" mt="$6" mb="$4">
                    <Button
                        bg={color.light.accent}
                        borderRadius="$10"
                        width={(screenWidth * 50) / 100}
                        height="$6"
                        pressStyle={{
                            bg: color.light.accent_focus,
                        }}
                        onPress={() => {
                            navigation.navigate("HomeScreen");
                        }}
                    >
                        <SizableText col={color.light.accent_content} size="$5" textAlign="center">
                            Start dienst
                        </SizableText>
                    </Button>
                </YStack>
            </YStack>
        </YStack>
    );
}