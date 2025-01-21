import React, {useState} from 'react';
import {Button, Dialog, SizableText, Unspaced, XStack, YStack,} from 'tamagui';
import {BriefcaseMedical, CircleAlert, X} from '@tamagui/lucide-icons';
import {useNavigation} from '@react-navigation/native';
import {useToastController} from '@tamagui/toast';
import {Patient} from './map_screen';

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
                    body: JSON.stringify({roomNumber: roomNumber, floor: floor}),
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

    return (
        <>
            <Dialog modal open={visible} onOpenChange={onClose}>
                <Dialog.Portal>
                    <Dialog.Overlay
                        animation="lazy"
                        enterStyle={{opacity: 0}}
                        exitStyle={{opacity: 0}}
                        backgroundColor="rgba(0, 0, 0, 0.5)"
                        pointerEvents="box-none"
                    />
                    <Dialog.Content
                        elevate
                        animation={['quick', {opacity: {overshootClamping: true}}]}
                        enterStyle={{y: -20, opacity: 0, scale: 0.9}}
                        exitStyle={{y: 10, opacity: 0, scale: 0.95}}
                        gap="$4"
                        padding="$3"
                        width={screenWidth * 0.9}
                        bg="$container_alt"
                        borderRadius="$8"
                        style={{maxWidth: screenWidth * 0.9}}
                    >
                        <Dialog.Title fontSize="$7" mt="$5" marginHorizontal="$2" textAlign="center">
                            Kamer {roomNumber}
                        </Dialog.Title>
                        <YStack mb="$8" marginHorizontal="$2">
                            {patients && patients.map((patient) => (
                                    <YStack backgroundColor="#E0E7EC" borderRadius="$5" padding="$5"
                                            key={patient.patientNumber} mb='$5'>
                                        <SizableText fontWeight="700" fontSize="$7" mb='$2'>
                                            {patient.firstName} {patient.lastName}
                                        </SizableText>
                                        <XStack>
                                            <XStack alignItems="center" mr='$4'>
                                                <BriefcaseMedical size="$1" color="$accent_focus" mr="$2"/>
                                                <SizableText col="gray">
                                                    {patient.clinicalProfiles.map((profile) => profile.clinicalProfile)}
                                                </SizableText>
                                            </XStack>
                                            {patient.isQuarantined && (
                                                <XStack alignItems="center">
                                                    <CircleAlert size="$1" color="$danger_focus" mr="$2"/>
                                                    <SizableText col="gray">
                                                        Quarantined
                                                    </SizableText>
                                                </XStack>
                                            )}
                                        </XStack>
                                    </YStack>
                                )
                            )}
                        </YStack>
                        <XStack ai="center" jc="center" marginHorizontal="auto" space="$4" mt="$4">
                            <Button
                                borderRadius="$12"
                                borderColor="$accent_focus"
                                color='white'
                                bg="$accent"
                                pressStyle={{bg: '$accent_focus'}}
                            >
                                Vergelijk
                            </Button>
                            <Button
                                bg='$danger'
                                borderRadius='$12'
                                borderColor='$danger_focus'
                                color='white'
                                pressStyle={{bg: '$danger_focus'}}
                                onPress={handleScaleRoom}
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
                                    pressStyle={{bg: '$accent_focus'}}
                                >
                                    <X col="$accent_content" size="$1"/>
                                </Button>
                            </Dialog.Close>
                        </Unspaced>
                    </Dialog.Content>
                </Dialog.Portal>
            </Dialog>
        </>
    );
}