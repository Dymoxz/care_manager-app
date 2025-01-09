import React, { useState } from 'react';
import { Button, SizableText, YStack, Image, Input, XStack } from 'tamagui';
import { Dimensions } from 'react-native';
import { useToastController } from '@tamagui/toast';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

async function ActivateDevice(bigNumber, showErrorToast, showSuccessToast, navigation) {
    try {
        const response = await fetch(
            `http://192.168.232.224:3000/api/soap/hcp?registrationNumber=${bigNumber}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ bigNumber }),
            }
        );

        if (!response.ok) {
            throw new Error('Failed to activate device');
        }

        const responseText = await response.text();

        if (!response.ok) {
            throw new Error('Failed to activate device');
        }

        // Check if the response is a plain string or JSON
        if (responseText === 'Niets gevonden') {
            // Show error toast if the BIG number is not found
            showErrorToast('No records found for the provided BIG number.');
        } else {
            // Try parsing the response as JSON
            const data = JSON.parse(responseText);

            // Show success toast with the response data
            const successMessage = `Device activated successfully!
            Name: ${data.Initial} ${data.BirthSurname}
            BIG Number: ${data.Big_Number}`;
            showSuccessToast(successMessage);

            await new Promise(resolve => setTimeout(resolve, 1000));

            navigation.navigate('StartShiftScreen');

        }
    } catch (error) {
        // Show error toast
        showErrorToast(error.message || 'An error occurred while activating the device');
    }
}

export default function ActivateScreen({navigation}) {
    const [bigNumber, setBigNumber] = useState(''); // State to manage input value
    const toast = useToastController(); // Toast controller for error messages

    // Function to show a custom error toast
    const showErrorToast = (message) => {
        toast.show('Error', {
            message,
            native: false, // Using custom toast style
        });
    };

    // Function to show a success toast
    const showSuccessToast = (message) => {
        toast.show('Success', {
            message,
            native: false, // Using custom toast style
        });
    };

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
                        bg='$accent'
                        borderRadius="$10"
                        width={(screenWidth * 50) / 100}
                        height="$6"
                        pressStyle={{
                            bg: '$accent_focus',
                        }}
                        onPress={() => ActivateDevice(bigNumber, showErrorToast, showSuccessToast, navigation)} // Call function with input value
                    >
                        <SizableText col='$accent_content' size="$5" textAlign="center">
                            Activeer Apparaat
                        </SizableText>
                    </Button>
                </YStack>
            </YStack>
        </YStack>
    );
}
