// SimpleModal.tsx
import React, { useState, useEffect } from 'react';
import {
    Dialog,
    Input,
    Button,
    Unspaced,
    XStack,
    SizableText,
    styled,
    YStack
} from 'tamagui';
import { X } from '@tamagui/lucide-icons';

interface SimpleModalProps {
    visible: boolean;
    onDone: () => void;
    onClose: () => void;
    screenWidth: number;
    initialValue?: string;
    patientNumber: number;
    patientName: string;
}

const ModalContent = styled(YStack, {
    bg: '$background',
    borderRadius: 10,
    padding: 20,
    width: '100%',
});

const DeleteModal = ({ visible, onDone, onClose, screenWidth, patientName, patientNumber }: SimpleModalProps) => {
    const [inputValue, setInputValue] = useState('');
    const [isConfirmDisabled, setIsConfirmDisabled] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsConfirmDisabled(inputValue.trim() !== patientName);
    }, [inputValue, patientName]);

    const handleDelete = async () => {
        setIsLoading(true); // Set loading state when request starts
        try {
            const response = await fetch(`https://care-manager-api-cybccdb6fkffe8hg.westeurope-01.azurewebsites.net/api/patient/${patientNumber}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Failed to delete patient. Status: ${response.status}, Response: ${errorText}`);
            }

            onDone(); // Call the onDone callback after the delete request is successful.
        } catch (error) {
            console.error("Error deleting patient:", error);
            // Optionally handle errors here like showing a message to the user.
        } finally {
            setIsLoading(false); // Set loading state to false, to prevent infinty loading
            onClose(); // Close the modal, regardless of success/failure
        }
    };


    return (
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
                    animation={['quicker', { opacity: { overshootClamping: true } }]}
                    enterStyle={{ y: -20, opacity: 0, scale: 0.9 }}
                    exitStyle={{ y: 10, opacity: 0, scale: 0.95 }}
                    gap="$4"
                    padding="$3"
                    width={screenWidth * 0.9}
                    bg='$container'
                    borderRadius='$8'
                    style={{ maxWidth: screenWidth * 0.9 }}
                >
                    <Dialog.Title fontSize='$7' mt="$5" marginHorizontal="$2" textAlign='center'>Weet u zeker dat u {patientName} wilt ontslaan?</Dialog.Title>
                    <SizableText textAlign='center' col="gray" >
                        Type de naam van het kind ter confirmatie
                    </SizableText>
                    <Input
                        placeholder=""
                        value={inputValue}
                        borderColor='lightgray'
                        marginHorizontal="$6"
                        onChangeText={setInputValue}
                        mb="$8"
                    />
                    <XStack ai="center" jc="center" marginHorizontal="auto" space="$4" >
                        <Button
                            disabled={isConfirmDisabled || isLoading}
                            onPress={handleDelete} // Delete the item when the user confirms
                            bg={isConfirmDisabled ? '#C5C5C5' : '$danger'}
                            width="$10"
                            borderRadius='$12'
                            borderColor={isConfirmDisabled ? '#838383' : '$danger_focus'}
                            col='white'
                            loading={isLoading}
                        >
                            Ja
                        </Button>
                        <Button
                            width="$10"
                            onPress={onClose}
                            bg='$accent'
                            borderRadius='$12'
                            borderColor='$accent_focus'
                            col='white'
                        >
                            Nee
                        </Button>
                    </XStack>
                    <Unspaced>
                        <Dialog.Close asChild>
                            <Button
                                bg='$secondary'
                                col='white'
                                position="absolute"
                                top="$3"
                                right="$3"
                                size="$2"
                                circular
                                icon={X}
                            />
                        </Dialog.Close>
                    </Unspaced>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog>
    );
};

export default DeleteModal;