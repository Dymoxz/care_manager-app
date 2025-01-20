import React, { useState, useEffect } from 'react';
import {
    Button,
    Dialog, ScrollView,
    SizableText,
    Unspaced,
    XStack,
    YStack,
} from 'tamagui';
import {Bed, BriefcaseMedical, CircleAlert, X} from '@tamagui/lucide-icons';
import { useNavigation } from '@react-navigation/native';
import { useToastController } from '@tamagui/toast';
import { Patient } from './map_screen';

interface RoomDetailModalProps {
    visible: boolean;
    onClose: () => void;
    screenWidth: number;
    roomNumber: number;
    patients: Patient[];
    floor: number;
    onRoomScaled: () => void;
}

export function RoomDetailModal({
                                    visible,
                                    onClose,
                                    screenWidth,
                                    roomNumber,
                                    patients,
                                    floor,
                                    onRoomScaled,
                                }: RoomDetailModalProps) {
    const navigation = useNavigation();
    const toast = useToastController();
    const [isLoading, setIsLoading] = useState(false);
    const [similarPatients, setSimilarPatients] = useState<Patient[]>([]);
    const [showSimilarPatients, setShowSimilarPatients] = useState(false);


    const showSuccessToast = (message) => {
        toast.show('Success', {
            message,
            native: false, // Using custom toast style
        });
    };

    const showErrorToast = (message) => {
        toast.show('Error', {
            message,
            native: false, // Using custom toast style
        });
    };

    const handleScaleRoom = async () => {
        setIsLoading(true);
        console.log('Scaling room:', roomNumber);
        console.log('Floor:', floor);
        try {
            const response = await fetch(
                `https://care-manager-api-cybccdb6fkffe8hg.westeurope-01.azurewebsites.net/api/room`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ roomNumber: roomNumber, floor: floor }),
                }
            );

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`HTTP error ${response.status}: ${errorText}`);
            }
            showSuccessToast('Room scaled successfully!');
            onRoomScaled();
            onClose();
        } catch (error) {
            console.error('Error scaling room:', error);
            showErrorToast(`Error: ${error.message}`);
        } finally {
            setIsLoading(false);
        }
    };

    const handleComparePatients = async () => {
        setIsLoading(true);
        setShowSimilarPatients(true);
        try {
            if(patients.length > 0){
                // Assuming you want to compare based on the first patient in the list for simplicity
                const firstPatient = patients[0];
                if (firstPatient && firstPatient.clinicalProfiles && firstPatient.clinicalProfiles.length > 0) {
                    const clinicalProfile = firstPatient.clinicalProfiles[0].clinicalProfile;
                    const response = await fetch(
                        `https://care-manager-api-cybccdb6fkffe8hg.westeurope-01.azurewebsites.net/api/patient/clinicalProfile/${clinicalProfile}`,
                        {
                            method: 'GET',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                        }
                    );
                    if (!response.ok) {
                        const errorText = await response.text();
                        throw new Error(`HTTP error ${response.status}: ${errorText}`);
                    }

                    const data = await response.json();
                    // Filter out patients that are in the current room
                    const filteredPatients = data.filter((patient: Patient) =>
                        !patients.some(currentPatient => currentPatient.patientNumber === patient.patientNumber )
                    );
                    setSimilarPatients(filteredPatients);
                } else{
                    showErrorToast("No clinical profile found for the selected patient")
                }
            }else{
                showErrorToast("No patients found in this room")
            }


        } catch (error) {
            console.error('Error fetching similar patients:', error);
            showErrorToast(`Error: ${error.message}`);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (!visible) {
            setSimilarPatients([]);
            setShowSimilarPatients(false);
        }
    }, [visible]);


    return (
        <>
            <Dialog modal open={visible} onOpenChange={onClose}>
                <Dialog.Portal>
                    <Dialog.Overlay
                        animation="lazy"
                        enterStyle={{ opacity: 0 }}
                        exitStyle={{ opacity: 0 }}
                        backgroundColor="rgba(0, 0, 0, 0.5)"
                        pointerEvents="box-none"
                    />
                    <Dialog.Content
                        elevate
                        animation={['quick', { opacity: { overshootClamping: true } }]}
                        enterStyle={{ y: -20, opacity: 0, scale: 0.9 }}
                        exitStyle={{ y: 10, opacity: 0, scale: 0.95 }}
                        gap="$4"
                        marginVertical={screenWidth * 0.1}
                        padding="$3"
                        width={screenWidth * 0.9}
                        bg="$container_alt"
                        borderRadius="$8"
                        style={{ maxWidth: screenWidth * 0.9 }}
                    >
                        <ScrollView>
                            <Dialog.Title fontSize="$7" mt="$5" marginHorizontal="$2" textAlign="center">
                                Kamer {roomNumber}
                            </Dialog.Title>
                            <YStack   mb="$8"  marginHorizontal="$2">
                                {patients && patients.map((patient) => (
                                        <YStack backgroundColor="#E0E7EC" borderRadius="$5" padding="$5" key={patient.patientNumber} mb='$5'>
                                            <SizableText fontWeight="700" fontSize="$7" mb='$2'>
                                                {patient.firstName} {patient.lastName}
                                            </SizableText>
                                            <XStack>
                                                <XStack alignItems="center" mr='$4'>
                                                    <BriefcaseMedical size="$1" col="$accent_focus" mr="$1" />
                                                    <SizableText col="gray">
                                                        {patient.clinicalProfiles.map((profile) => profile.clinicalProfile)}
                                                    </SizableText>
                                                </XStack>
                                                <XStack alignItems="center">
                                                    <CircleAlert  size="$1" col="$accent" mr="$1" />
                                                    <SizableText col="gray">
                                                        {patient.isQuarantined ? "Quarantained" : "Not Quarantained"}
                                                    </SizableText>
                                                </XStack>
                                            </XStack>
                                        </YStack>
                                    )
                                )}
                            </YStack>

                            {showSimilarPatients && (
                                <YStack marginHorizontal="$2" mb="$8">
                                    <SizableText fontSize="$6" fontWeight="700" mb="$2">
                                        Similar Patients:
                                    </SizableText>
                                    {similarPatients.length > 0 ? (
                                        similarPatients.map((patient) => (
                                            <YStack key={patient.patientNumber} backgroundColor="#E0E7EC" borderRadius="$5" padding="$5" mb='$5'>
                                                <XStack ai='center' jc='space-between'>
                                                <SizableText fontWeight="700" fontSize="$7" mb='$2'>
                                                    {patient.firstName} {patient.lastName}
                                                </SizableText>
                                                    <XStack>
                                                        <Bed size='$1' mr='$2' />
                                                        <SizableText  mb='$2'>
                                                            {patient.room.floor}-{patient.room.roomNumber}
                                                        </SizableText>
                                                    </XStack>
                                                </XStack>
                                                <XStack>
                                                    <XStack alignItems="center" mr='$4'>
                                                        <BriefcaseMedical size="$1" col="$accent_focus" mr="$1" />
                                                        <SizableText col="gray">
                                                            {patient.clinicalProfiles?.map((profile) => profile.clinicalProfile)}
                                                        </SizableText>
                                                    </XStack>
                                                    <XStack alignItems="center">
                                                        {patient.isQuarantined ? (
                                                            <CircleAlert size="$1" col="$accent" mr="$1" />
                                                        ) : (
                                                            <CircleAlert size="$1" col="$container" mr="$1" />
                                                        )}
                                                        <SizableText col="gray">
                                                            {patient.isQuarantined ? "Quarantaine" : "Geen quarantaine"}
                                                        </SizableText>
                                                    </XStack>
                                                </XStack>
                                            </YStack>
                                        ))
                                    ) : (
                                        <SizableText>No similar patients found.</SizableText>
                                    )}
                                </YStack>
                            )}

                            <XStack ai="center" jc="center" marginHorizontal="auto" space="$4" mt="$4">
                                <Button
                                    borderRadius="$12"
                                    borderColor="$accent_focus"
                                    color='white'
                                    bg="$accent"
                                    pressStyle={{bg: '$accent_focus'}}
                                    onPress={handleComparePatients}
                                    disabled={isLoading}
                                >
                                    {isLoading ? "Loading..." : "Vergelijk"}
                                </Button>
                                <Button
                                    bg='$danger'
                                    borderRadius='$12'
                                    borderColor='$danger_focus'
                                    color='white'
                                    pressStyle={{bg: '$danger_focus'}}
                                    onPress={handleScaleRoom}
                                    disabled={isLoading}
                                >
                                    {isLoading ? 'Scaling...' : 'Opschalen'}
                                </Button>
                            </XStack>
                            <Unspaced>
                                <Dialog.Close asChild>
                                    <Button
                                        bg="$accent"
                                        borderColor="$accent_focus"
                                        position="absolute"
                                        top="$3"
                                        right="$3"
                                        size="$2"
                                        circular
                                        pressStyle={{ bg: '$accent_focus' }}
                                    >
                                        <X col="$accent_content" size="$1" />
                                    </Button>
                                </Dialog.Close>
                            </Unspaced>
                        </ScrollView>
                    </Dialog.Content>
                </Dialog.Portal>
            </Dialog>
        </>
    );
}