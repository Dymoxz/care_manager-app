import TitleLayout from "../common/title_layout";
import BackButton from "../common/back_button";
import React, {useEffect, useState} from "react";
import {Button, Input, SizableText, XStack, YStack} from "tamagui";
import {AlertCircle, Bed, Check, FileHeart} from "@tamagui/lucide-icons";
import {Dimensions} from "react-native";
import { Checkbox, Label, } from 'tamagui'
import * as SQLite from "expo-sqlite";
import {Caretaker} from "../../caretaker.interface";
const { width: screenWidth } = Dimensions.get('window');



interface Room {
    _id: string;
    roomNumber: number;
    floor: number;
    maxCapacity: number;
    isScaled: boolean;
}

interface Patient {
    _id: string;
    patientNumber: number;
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
    room: Room;
}

interface PatientCardProps {
    name: string;
    room: string;
    hasAlert: boolean;
    patient: Patient; // Pass the whole patient object to the card
    onPress: (patient: Patient) => void; // Callback to handle patient click
}
async function getBigNumber(): Promise<string> {
    try {
        const db = await SQLite.openDatabaseAsync('localdb');
        const result = await db.getFirstAsync<Caretaker>(
            'SELECT * FROM Caretakers LIMIT 1;'
        );

        if (result && result.Big_Number) {
            return `${result.Big_Number}`;
        }

        throw new Error('No valid user data found');

    } catch (error) {
        console.error('Error fetching user big number:', error);
        return 'User';
    }
}


async function ActivateDevice(
    showErrorToast: (message: string) => void,
    showSuccessToast: (message: string) => void,
    setPatients: React.Dispatch<React.SetStateAction<Patient[]>>
) {
    try {
        const response = await fetch(`https://care-manager-api-cybccdb6fkffe8hg.westeurope-01.azurewebsites.net/api/patient`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch patient data');
        }

        const data: Patient[] = await response.json();

        setPatients(data);
        showSuccessToast('Patients loaded successfully');
    } catch (error: any) {
        showErrorToast(error.message || 'An error occurred while fetching patients');
    }
}

function PatientCard({ name, room, hasAlert, patient, onPress }: PatientCardProps) {
    const [bigNumber, setBigNumber] = useState<string>();

    useEffect(() => {
        const fetchBigNumber = async () => {
            try {
                const big = await getBigNumber();
                setBigNumber(big);
            } catch (error) {
                console.error('Error in fetchUserName:', error);
                }
        };

        fetchBigNumber();
    }, []);

   const [checked, setChecked] = useState(false);
    return (
        <XStack
            bg='$container_alt'
            borderRadius="$6"
            p="$4"
            py="$5"
            ai="center"
            jc="space-between"
            mb="$4"
            elevation="$0.25"
            width={(screenWidth * 90) / 100}
            onPress={() => setChecked((prevState) => !prevState)}
        >
            <XStack ai="center">
                <YStack mr="$2" ml='$2'>
                    <AlertCircle size="$2" color={hasAlert ? '$danger' : '$container_alt'} />
                </YStack>

                <YStack ml='$4'>
                    <SizableText size="$8" fontWeight="700" col='$text'>
                        {name}
                    </SizableText>
                    <XStack ai="center" mt="$1">
                        <Bed style={{}} mr='$2' />
                        <SizableText size="$4" col='$text'>
                            Kamer {room}
                        </SizableText>
                    </XStack>
                </YStack>
            </XStack>
            <Checkbox
                size="$7"
                backgroundColor={checked ? '$accent' : '$white'}
                borderColor='$accent_focus'
                checked={checked}
                onPress={() => setChecked((prevState) => !prevState)}
            >
                <Checkbox.Indicator>
                    <Check color="black" />
                </Checkbox.Indicator>
            </Checkbox>
        </XStack>
    );
}
export default function ShiftScreen( {navigation} ) {
    const [patients, setPatients] = useState<Patient[]>([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        ActivateDevice(
            (error) => console.error(error),
            (success) => console.log(success),
            setPatients
        );
    }, []);

    const filteredPatients = patients.filter((patient) => {
        const name = `${patient.firstName} ${patient.lastName}`.toLowerCase();
        const roomNumber = patient.room?.roomNumber.toString();
        return (
            name.includes(searchQuery.toLowerCase()) ||
            (roomNumber && roomNumber.startsWith(searchQuery.toLowerCase()))
        );
    });

    const handlePatientPress = (patient: Patient) => {
        // Navigate to PatientDetailsScreen and pass patient data
        navigation.navigate('', { patient });
    };

    return (
        <TitleLayout
            titleText="Selecteer kinderen voor je dienst"
            topContent={<BackButton navigation={navigation} />}
        >
            <YStack ai="center" flex={1}>
                <Input
                    placeholder="Zoek een patiënt of kamer"
                    bg="white"
                    borderRadius="$6"
                    width={(screenWidth * 90) / 100}
                    px="$4"
                    py="$4"
                    h="auto"
                    fontSize="$6"
                    mb="$3"
                    value={searchQuery}
                    onChangeText={(text) => setSearchQuery(text)} // Update search query
                />

                <YStack space="$1" width={(screenWidth * 90) / 100}>
                    {filteredPatients.map((patient) => (
                        <PatientCard
                            key={patient._id}
                            name={`${patient.firstName} ${patient.lastName}`}
                            room={`${patient.room?.roomNumber || 'Onbekend'} (${patient.room?.floor || '?'})`}
                            hasAlert={patient.room?.isScaled || false}
                            patient={patient}
                            onPress={handlePatientPress}
                        />
                    ))}
                </YStack>

                {/* Buttons at the bottom */}
                <XStack
                    ai="center"
                    jc="space-between"
                    pb={20} // Add padding to push buttons up from the bottom
                    width="100%" // Ensure the stack takes up full width
                    position="absolute"
                    bottom={0} // Position it at the bottom
                    px="$4" // Add horizontal padding for space
                    space="$2" // Space between buttons
                >

                    <Button
                        onPress={() => {
                            navigation.navigate("HomeScreen");
                        }}
                        bg="$danger" // Red background color for the cancel button
                        borderRadius="$6"
                        px="$4"
                        py="$2"
                        borderColor="$danger_focus"
                        elevation="$0.25"
                        pressStyle={{
                            bg: "$danger",
                        }}
                    >
                        <Button.Text color="white" fontSize="$5">
                            Cancel
                        </Button.Text>
                    </Button>
                    <Button
                        onPress={() => {
                            navigation.navigate("HomeScreen");
                        }}
                        bg="$primary" // Blue background color
                        borderRadius="$6"
                        px="$4"
                        py="$2"
                        borderColor="$primary_focus"
                        elevation="$0.25"
                        pressStyle={{
                            bg: "$primary_focus",
                        }}
                    >
                        <Button.Text color="white" fontSize="$5">
                            Opslaan
                        </Button.Text>
                    </Button>
                </XStack>
            </YStack>
        </TitleLayout>
    );

}
