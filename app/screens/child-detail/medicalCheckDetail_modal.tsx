import { Button, Dialog, SizableText, Unspaced } from 'tamagui';
import React from "react";
import { X } from "@tamagui/lucide-icons";
import {format} from "date-fns";
import { nl } from 'date-fns/locale';


interface MedicalCheckDetailModalProps {
    visible: boolean;
    onClose: () => void;
    screenWidth: number;
    medicalCheck: { datetime: Date } | null; // Allow null
}

export default function MedicalCheckDetailModal({ visible, onClose, screenWidth, medicalCheck }: MedicalCheckDetailModalProps) {
    const fallbackMedicalCheck = { datetime: new Date() }; // Or any default date
    const medicalCheckToDisplay = medicalCheck || fallbackMedicalCheck;

    const formattedDateTime = format(medicalCheckToDisplay.datetime, 'EEE dd-MM-yy (HH:mm)', { locale: nl });



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
                    width={screenWidth * 0.9}
                    bg='$container'
                    borderRadius='$8'
                    style={{ maxWidth: screenWidth * 0.9 }}
                >
                    <Dialog.Title fontSize='$7' mt="$5" marginHorizontal="$2" textAlign='center'>
                        {formattedDateTime}
                    </Dialog.Title>
                    <SizableText textAlign='center' col="gray">
                        Details van de check
                    </SizableText>
                    <Unspaced>
                        <Dialog.Close asChild>
                            <Button
                                bg='$accent'
                                borderColor='$accent_focus'
                                position="absolute"
                                top="$3"
                                right="$3"
                                size="$2"
                                circular
                                pressStyle={{ bg: '$accent_focus' }}
                            >
                                <X col='$accent_content' size='$1' />
                            </Button>
                        </Dialog.Close>
                    </Unspaced>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog>
    );
}