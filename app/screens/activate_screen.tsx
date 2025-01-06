import React, { useState } from 'react';
import { Button, SizableText, YStack, Image, Input, XStack } from 'tamagui';
import { Dimensions } from 'react-native';
import color from '../../constants/Colors';
import { Toast, useToastController } from '@tamagui/toast'; // Import for toast

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

function ActivateDevice(bigNumber, navigation, showErrorToast) {
    // TODO: Replace this with API request to validate the BIG number
    if (bigNumber === '1234') {
        navigation.navigate('StartShiftScreen');
    } else {
        // Show error toast when BIG number is invalid
        showErrorToast();
    }
}

export default function ActivateScreen({ navigation }) {
    const [bigNumber, setBigNumber] = useState(''); // State to manage input value
    const toast = useToastController(); // Toast controller for error messages

    // Function to show a custom error toast
    const showErrorToast = () => {
        toast.show('Invalid BIG number', {
            message: "The BIG number you entered is not valid.",
            native: false, // Using custom toast style
        });
    };

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
                height={(screenHeight * 75) / 100}
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

                {/* Input Section */}
                <YStack f={0} ai="center" jc="center" width="100%" mt="$4">
                    <XStack
                        position="relative"
                        width="100%"
                        height="$6"
                        bg="white"
                        borderRadius="$8"
                        borderColor="#CCCCCC"
                        borderWidth={1}
                        px="$4"
                        ai="center"
                        jc="space-between"
                    >
                        <Input
                            placeholder="Voer BIG-nummer in"
                            fontSize={16}
                            f={1}
                            bg="transparent"
                            borderWidth={0}
                            value={bigNumber} // Bind input value to state
                            onChangeText={(text) => setBigNumber(text)} // Update state on change
                        />
                    </XStack>
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
                        onPress={() => ActivateDevice(bigNumber, navigation, showErrorToast)} // Pass input value and showErrorToast to function
                    >
                        <SizableText col={color.light.accent_content} size="$5" textAlign="center">
                            Activeer Apparaat
                        </SizableText>
                    </Button>
                </YStack>
            </YStack>

            {/* Toast for error message */}
            <Toast />
        </YStack>
    );
}
