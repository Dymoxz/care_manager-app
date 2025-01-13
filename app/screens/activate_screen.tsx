import React, { useState, useEffect } from 'react';
import { Button, SizableText, YStack, Image, Input, XStack } from 'tamagui';
import { Dimensions } from 'react-native';
import { useToastController } from '@tamagui/toast';
import * as SQLite from 'expo-sqlite';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

// Activate Device Function
async function ActivateDevice(bigNumber: string, showErrorToast: (message: string) => void, showSuccessToast: (message: string) => void, navigation: any) {
    if (!bigNumber.trim()) {
        showErrorToast('Please enter a BIG number');
        return;
    }

    try {
        const db = await SQLite.openDatabaseAsync('localdb');

        // Create the table if it doesn't exist
        await db.withTransactionAsync(async () => {
            await db.execAsync(
                'CREATE TABLE IF NOT EXISTS Caretakers (id INTEGER PRIMARY KEY AUTOINCREMENT, BirthSurname TEXT, Initial TEXT, Big_Number TEXT);'
            );
        });

        // Check if database already has a caretaker
        const existingCaretaker = await db.getFirstAsync(
            'SELECT * FROM Caretakers LIMIT 1;'
        );

        if (existingCaretaker) {
            navigation.navigate('StartShiftScreen');
            return;
        }

        // If no existing caretaker, proceed with API call
        const response = await fetch(
            `https://care-manager-api-cybccdb6fkffe8hg.westeurope-01.azurewebsites.net/api/auth/${bigNumber}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );

        if (!response.ok) {
            throw new Error(`Failed to activate device: ${response.statusText}`);
        }

        const responseText = await response.text();

        // Handle empty response
        if (!responseText || responseText === '{}') {
            showErrorToast('No records found for the provided BIG number.');
            return;
        }

        const data = JSON.parse(responseText);

        // Validate required fields
        if (!data.BirthSurname || !data.Initial || !data.Big_Number) {
            throw new Error('Invalid caretaker data received from server');
        }

        // Save the caretaker to the database within a transaction
        await db.withTransactionAsync(async () => {
            await db.runAsync(
                'INSERT INTO Caretakers (BirthSurname, Initial, Big_Number) VALUES (?, ?, ?);',
                [data.BirthSurname, data.Initial, data.Big_Number]
            );
        });

        const successMessage = `Device activated successfully!\nName: ${data.Initial} ${data.BirthSurname}\nBIG Number: ${data.Big_Number}`;
        showSuccessToast(successMessage);

        // Brief delay to allow toast to be visible
        await new Promise(resolve => setTimeout(resolve, 1500));

        navigation.navigate('StartShiftScreen');

    } catch (error: any) {
        showErrorToast(error.message || 'An error occurred while activating the device');
    }
}

// Activate Screen Component
export default function ActivateScreen({ navigation }: { navigation: any }) {
    const [bigNumber, setBigNumber] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const toast = useToastController();

    useEffect(() => {
        const checkDatabase = async () => {
            try {
                const db = await SQLite.openDatabaseAsync('localdb'); // Match the database name with ActivateDevice function

                await db.withTransactionAsync(async () => {
                    await db.execAsync(
                        'CREATE TABLE IF NOT EXISTS Caretakers (id INTEGER PRIMARY KEY AUTOINCREMENT, BirthSurname TEXT, Initial TEXT, Big_Number TEXT);'
                    );
                });

                const caretaker = await db.getFirstAsync(
                    'SELECT * FROM Caretakers LIMIT 1;'
                );

                if (caretaker) {
                    navigation.navigate('StartShiftScreen');
                }
            } catch (error: any) {
                console.error('Database initialization error:', error);
                toast.show('Error', {
                    message: 'Failed to initialize database',
                    native: false,
                });
            }
        };

        checkDatabase();
    }, [navigation, toast]);

    const handleActivation = async () => {
        setIsLoading(true);
        try {
            await ActivateDevice(
                bigNumber,
                (msg) => toast.show('Error', { message: msg, native: false }),
                (msg) => toast.show('Success', { message: msg, native: false }),
                navigation
            );
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <YStack
            f={1}
            ai="center"
            jc="center"
            px="$10"
            bg="$background"
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
                            placeholder="Enter BIG Number"
                            fontSize={16}
                            f={1}
                            bg="transparent"
                            borderWidth={0}
                            value={bigNumber}
                            onChangeText={setBigNumber}
                            editable={!isLoading}
                        />
                    </XStack>
                </YStack>

                <YStack ai="center" jc="center" mt="$6" mb="$4">
                    <Button
                        bg="$accent"
                        borderRadius="$10"
                        width={(screenWidth * 50) / 100}
                        height="$6"
                        pressStyle={{
                            bg: '$accent_focus',
                        }}
                        onPress={handleActivation}
                        disabled={isLoading}
                    >
                        <SizableText col="$accent_content" size="$5" textAlign="center">
                            {isLoading ? 'Activating...' : 'Activate Device'}
                        </SizableText>
                    </Button>
                </YStack>
            </YStack>
        </YStack>
    );
}