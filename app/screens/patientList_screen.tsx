import React, { useState, useEffect } from 'react';
import { Button, Input, SizableText, XStack, YStack } from 'tamagui';
import { Dimensions } from 'react-native';
import { AlertCircle, Bed, FileHeart } from '@tamagui/lucide-icons';
import TitleLayout from "./common/title_layout";
import BackButton from "./common/back_button";

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
            onPress={() => onPress(patient)} // Trigger the navigation on click
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
            <Button
                bg='$accent'
                borderRadius="$10"
                width='$5'
                mr='$2'
                height='$5'
                animation="bouncy"
                hoverStyle={{ scale: 0.990, backgroundColor: '$accent_focus' }}
                pressStyle={{ scale: 0.975, backgroundColor: '$accent_focus' }}
                icon={<FileHeart size='$2' color='$accent_content' />}
            >
            </Button>
        </XStack>
    );
}

export default function KinderOverzichtScreen({ navigation }: { navigation: any }) {
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
        navigation.navigate('ChildDetailScreen', { patient });
    };

    return (
        <TitleLayout
            titleText='Kinder Overzicht'
            topContent={<BackButton navigation={navigation} />}
        >
            <YStack ai="center">
                <Input
                    placeholder="Zoek een patiënt of kamer"
                    bg="white"
                    borderRadius="$6"
                    width={(screenWidth * 90) / 100}
                    px="$4"
                    py="$4"
                    h='auto'
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
                            room={`Kamer ${patient.room?.roomNumber || 'Onbekend'} (Verdieping ${patient.room?.floor || '?'})`}
                            hasAlert={patient.room?.isScaled || false}
                            patient={patient}
                            onPress={handlePatientPress}
                        />
                    ))}
                </YStack>
            </YStack>
        </TitleLayout>
    );
}
