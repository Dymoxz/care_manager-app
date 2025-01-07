import React from 'react';
import { Button, Input, SizableText, XStack, YStack } from 'tamagui';
import { Image, Dimensions } from 'react-native';
import color from "../../constants/Colors";
import {Bed, AlertCircle, FileHeart, ArrowLeft, Search} from '@tamagui/lucide-icons';

const { width: screenWidth } = Dimensions.get('window');

interface PatientCardProps {
    name: string;
    room: string;
    hasAlert: boolean;
}

function PatientCard({ name, room, hasAlert }: PatientCardProps) {

    return (
        <XStack
            bg="white"
            borderRadius="$6"
            p="$4"
            ai="center"
            jc="space-between"
            mb="$4"
            elevation="$0.25"
            mt="$2"
            width={(screenWidth * 90) / 100}
        >
            <XStack ai="center">
                {hasAlert && (
                    <YStack mr="$3">
                        <AlertCircle
                            style={{
                                width: '$3', // Increased size
                                height: '$3', // Increased size
                                color: 'red', // Set color to red
                            }}
                        />
                    </YStack>
                )}

                <YStack>
                    <SizableText size="$8" fontWeight="700" col={color.light.text}>
                        {name}
                    </SizableText>
                    <XStack ai="center" mt="$2">
                        {/* Adjust the size of the <Bed /> icon */}
                        <Bed style={{ width: 16, height: 16, marginRight: 6 }} />
                        <SizableText size="$4" col={color.light.muted}>
                            Kamer {room}
                        </SizableText>
                    </XStack>
                </YStack>
            </XStack>
            <Button
                bg={color.light.accent}
                borderRadius="$10"
                width={60}
                height={60}
                animation="bouncy"
                hoverStyle={{ scale: 0.925 }}
                pressStyle={{ scale: 0.875 }}
            >
                <FileHeart/>
            </Button>
        </XStack>
    );
}

export default function KinderOverzichtScreen({ navigation }) {
    const patients = [
        { name: 'Dymo Waltheer', room: '4b', hasAlert: true },
        { name: 'Menno Emmerik', room: '5b', hasAlert: false },
        { name: 'Stef Rensma', room: '6a', hasAlert: true },
    ];

    return (
        <YStack f={1} bg="#D3F4F6" px="$6" py="$4" space="$4" ai="center" >
            {/* Header Section */}
            <XStack ai="center" jc="flex-start" mb="$4" width="100%">
                <Button
                    bg="#0D8F83"
                    borderRadius="$10"
                    width={50}
                    height={50}
                    onPress={() => navigation.goBack()}
                    mr="$4"
                    mt="$8"
                    animation="bouncy"
                    hoverStyle={{ scale: 0.925 }}
                    pressStyle={{ scale: 0.875 }}
                >
                    <ArrowLeft />
                </Button>
                <SizableText size="$9" fontWeight="700" col={color.light.text} ml="$2" mt="$8">
                    Kinder overzicht
                </SizableText>
            </XStack>

            {/* Search Input */}
            <Input
                placeholder="Zoek een patiënt of kamer"
                bg="white"
                borderRadius="$6"
                width="100%"
                px="$4"
                py="$3"
                fontSize="$6"
                mb="$4"
            />

            {/* Patient List */}
            <YStack space="$3">
                {patients.map((patient, index) => (
                    <PatientCard
                        key={index}
                        name={patient.name}
                        room={patient.room}
                        hasAlert={patient.hasAlert}
                    />
                ))}
            </YStack>
        </YStack>
    );
}
