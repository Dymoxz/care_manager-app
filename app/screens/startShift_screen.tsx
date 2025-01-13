import React, { useEffect, useState } from 'react';
import { Button, Image, SizableText, YStack } from 'tamagui';
import { BackHandler, Dimensions } from 'react-native';
import * as SQLite from 'expo-sqlite';
import { useToastController } from '@tamagui/toast';
import {Caretaker} from "../caretaker.interface";

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');



// Function to get user data
async function getUserName(): Promise<string> {
    try {
        const db = await SQLite.openDatabaseAsync('localdb');
        const result = await db.getFirstAsync<Caretaker>(
            'SELECT * FROM Caretakers LIMIT 1;'
        );

        if (result && result.Initial && result.BirthSurname) {
            return `${result.Initial} ${result.BirthSurname}`;
        }

        throw new Error('No valid user data found');

    } catch (error) {
        console.error('Error fetching user name:', error);
        return '79059994401';
    }
}



export default function StartShiftScreen({ navigation }: { navigation: any }) {
    const [userName, setUserName] = useState<string>("79059994401");
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const toast = useToastController();

    useEffect(() => {
        const fetchUserName = async () => {
            try {
                const name = await getUserName();
                setUserName(name);
            } catch (error) {
                console.error('Error in fetchUserName:', error);
                // Redirect to activation if we can't get user data
                navigation.replace('ActivateScreen');
            } finally {
                setIsLoading(false);
            }
        };

        fetchUserName();
    }, [navigation]);

    useEffect(() => {
        const backAction = () => true; // Prevent going back
        const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
        return () => backHandler.remove();
    }, []);


    if (isLoading) {
        return (
            <YStack f={1} ai="center" jc="center" bg="$background">
                <SizableText size="$6">Loading...</SizableText>
            </YStack>
        );
    }

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

                <YStack ai="center" jc="center" mt="$4">
                    <SizableText
                        col="$text"
                        size="$9"
                        textAlign="center"
                        fontWeight="700"
                    >
                        Welkom terug
                    </SizableText>
                    <SizableText
                        col="$text"
                        size="$9"
                        textAlign="center"
                        fontWeight="700"
                    >
                        {userName}!
                    </SizableText>
                </YStack>

                <YStack f={1} />

                <YStack ai="center" jc="flex-end" mb="$4" space="$4">
                    <Button
                        bg="$accent"
                        borderRadius="$10"
                        width={(screenWidth * 50) / 100}
                        height="$6"
                        pressStyle={{ bg: '$accent_focus' }}
                        onPress={() => navigation.navigate("ShiftScreen")}
                    >
                        <SizableText col="$accent_content" size="$5" textAlign="center">
                            Start dienst
                        </SizableText>
                    </Button>
                </YStack>
            </YStack>
        </YStack>
    );
}