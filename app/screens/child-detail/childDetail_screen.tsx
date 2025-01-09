import React from 'react';
import { View, Text, ScrollView, Dimensions } from 'react-native';
import { SizableText, YStack } from 'tamagui';
import TitleLayout from "../common/title_layout";
import BackButton from "../common/back_button";

const { width: screenWidth } = Dimensions.get('window');

interface Room {
    roomNumber: number;
    floor: number;
    maxCapacity: number;
    isScaled: boolean;
}

interface Patient {
    _id: string;
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    patientNumber: number;
    room: Room;
    createdAt: string;
    updatedAt: string;
}

interface PatientDetailsScreenProps {
    route: {
        params: {
            patient: Patient;
        };
    };
    navigation: any;
}

export default function ChildDetailScreen({ route, navigation }: PatientDetailsScreenProps) {
    const { patient } = route.params;

    return (
        <TitleLayout
            titleText={`${patient.firstName} ${patient.lastName} Details`}
            topContent={<BackButton navigation={navigation} />}
        >
            <ScrollView contentContainerStyle={{ alignItems: 'center', padding: 20 }}>
                <YStack width={(screenWidth * 90) / 100}>
                    <SizableText size="$8" fontWeight="700" col="$text">
                        {patient.firstName} {patient.lastName}
                    </SizableText>

                    <SizableText size="$6" col="$text">
                        Patient Number: {patient.patientNumber}
                    </SizableText>

                    <SizableText size="$6" col="$text">
                        Date of Birth: {new Date(patient.dateOfBirth).toLocaleDateString()}
                    </SizableText>

                    <SizableText size="$6" col="$text">
                        Room: Kamer {patient.room.roomNumber} (Floor {patient.room.floor})
                    </SizableText>

                    <SizableText size="$6" col="$text">
                        Max Capacity: {patient.room.maxCapacity}
                    </SizableText>

                    <SizableText size="$6" col="$text">
                        Created At: {new Date(patient.createdAt).toLocaleString()}
                    </SizableText>

                    <SizableText size="$6" col="$text">
                        Updated At: {new Date(patient.updatedAt).toLocaleString()}
                    </SizableText>
                </YStack>
            </ScrollView>
        </TitleLayout>
    );
}
