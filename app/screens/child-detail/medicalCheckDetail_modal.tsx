import { Button, Dialog, SizableText, Unspaced, XStack, YStack, View, ScrollView } from 'tamagui';
import React from "react";
import { Calendar, Clock, Heart, HeartPulse, Droplet } from "@tamagui/lucide-icons";
import { X } from "@tamagui/lucide-icons";
import { format, parseISO } from "date-fns";
import { nl } from 'date-fns/locale';
import {styled} from "tamagui";

interface MedCheck {
    _id: string;
    description: string;
    heartRate: number;
    bloodPressure: string;
    createdAt: string; // ISO date string
}

interface MedicalCheckDetailModalProps {
    visible: boolean;
    onClose: () => void;
    screenWidth: number;
    medicalCheck: MedCheck | null; // Allow null
}

const StyledText = styled(SizableText, {
    textAlign: 'right',
    flex: 1,
})

export default function MedicalCheckDetailModal({
                                                    visible,
                                                    onClose,
                                                    screenWidth,
                                                    medicalCheck,
                                                }: MedicalCheckDetailModalProps) {
    // Fallback for when no medicalCheck is provided
    const fallbackMedicalCheck: MedCheck = {
        _id: '',
        description: 'Geen beschrijving beschikbaar.',
        heartRate: 0,
        bloodPressure: 'Onbekend',
        createdAt: new Date().toISOString(),
    };

    const medicalCheckToDisplay = medicalCheck || fallbackMedicalCheck;

    // Safely parse the date from createdAt
    const formattedDate = format(
        parseISO(medicalCheckToDisplay.createdAt),
        'EEEE',
        { locale: nl }
    );

    const capitalizedFormattedDate = formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);


    const formattedTime = format(
        parseISO(medicalCheckToDisplay.createdAt),
        'HH:mm',
        { locale: nl }
    );

    const formattedDateOnly = format(
        parseISO(medicalCheckToDisplay.createdAt),
        'dd-MM-yy',
        { locale: nl }
    );

    return (
        <Dialog modal open={visible} onOpenChange={onClose}>
            <Dialog.Portal>
                <Dialog.Overlay
                    animation="lazy"
                    enterStyle={{ opacity: 0 }}
                    exitStyle={{ opacity: 0 }}
                    backgroundColor="rgba(0, 0, 0, 0.5)"
                    onPress={onClose}
                />
                <Dialog.Content
                    elevate
                    animation={['quick', { opacity: { overshootClamping: true } }]}
                    enterStyle={{ y: -20, opacity: 0, scale: 0.9 }}
                    exitStyle={{ y: 10, opacity: 0, scale: 0.95 }}
                    gap="$4"
                    padding="$3"
                    marginVertical={screenWidth * 0.10}
                    width={screenWidth * 0.9}
                    bg="$container"
                    borderRadius="$8"
                    style={{ maxWidth: screenWidth * 0.9 }}
                >
                    <ScrollView>
                        <Dialog.Title fontSize="$7" mt="$5" marginHorizontal="$2" textAlign="center">
                            {capitalizedFormattedDate}
                        </Dialog.Title>
                        <XStack  ai="center" jc="center" mb="$2">
                            <XStack ai="center" jc="center"  mr='$1'>
                                <Calendar size="$2" color="black" />
                                <SizableText  color="$text" size="$5" ml="$1" >
                                    {formattedDateOnly}
                                </SizableText>
                            </XStack>
                            <XStack ai="center" jc="center" ml='$2'>
                                <Clock size="$2" color="black" />
                                <SizableText  color="$text" size="$5" ml="$1">
                                    {formattedTime}
                                </SizableText>
                            </XStack>
                        </XStack>


                        <SizableText ml="$3" mt="$2">
                            {medicalCheckToDisplay.description}
                        </SizableText>
                        <XStack  mt="$3"  justifyContent="flex-start">
                            <HeartPulse size="$2" color="$danger" mr="$1" />
                            <StyledText >
                                Hartslag: {medicalCheckToDisplay.heartRate} bpm
                            </StyledText>
                        </XStack>

                        <XStack mt="$1" justifyContent="flex-start" alignItems="center">
                            <Droplet size="$2" color="$accent_focus" mr="$1" />
                            <StyledText>
                                Bloeddruk: {medicalCheckToDisplay.bloodPressure}
                            </StyledText>
                        </XStack>
                    </ScrollView>
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
                                pressStyle={{ bg: "$accent_focus" }}
                            >
                                <X color="$accent_content" size="$1" />
                            </Button>
                        </Dialog.Close>
                    </Unspaced>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog>
    );
}