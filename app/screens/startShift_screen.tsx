import { Button, Image, SizableText, YStack } from 'tamagui';
import React from "react";
import { Dimensions } from "react-native";

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

function user_name() {
    return 'J. Smith';
}

export default function StartShiftScreen({ navigation }) {
    return (
        <YStack
            f={1}
            ai="center"
            jc="center"
            px="$10"
            bg='$background'
        >
            <YStack
                bg="#E1F4F6"
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

                {/* Welcome Text Section */}
                <YStack ai="center" jc="center" mt="$4">
                    <SizableText
                        col='$text'
                        size="$9"
                        textAlign="center"
                        fontWeight="700" // Use bold weight
                    >
                        Welkom terug
                    </SizableText>
                    <SizableText
                        col='$text'
                        size="$9"
                        textAlign="center"
                        fontWeight="700" // Use bold weight
                    >
                        {user_name()}!
                    </SizableText>
                </YStack>

                {/* Spacer to push the button to the bottom */}
                <YStack f={1} />

                {/* Button Section */}
                <YStack ai="center" jc="flex-end" mb="$4">
                    <Button
                        bg='$accent'
                        borderRadius="$10"
                        width={(screenWidth * 50) / 100}
                        height="$6"
                        pressStyle={{
                            bg: '$accent_focus',
                        }}
                        onPress={() => {
                            navigation.navigate("HomeScreen");
                        }}
                    >
                        <SizableText col='$accent_content' size="$5" textAlign="center">
                            Start dienst
                        </SizableText>
                    </Button>
                </YStack>
            </YStack>
        </YStack>
    );
}