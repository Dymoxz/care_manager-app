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
import { useNavigation } from '@react-navigation/native';
import { View, Text } from 'react-native';
import {useToastController} from "@tamagui/toast";

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

const Toast = styled(View, {
    position: 'absolute',
    bottom: 30,
    left: 20,
    right: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    zIndex: 1000, // Make sure the toast appears above other elements
});

const DeleteModal = ({ visible, onDone, onClose, screenWidth, patientName, patientNumber }: SimpleModalProps) => {
    const [inputValue, setInputValue] = useState('');
    const [isConfirmDisabled, setIsConfirmDisabled] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const navigation = useNavigation();
    const toast = useToastController(); // Toast controller


    useEffect(() => {
        setIsConfirmDisabled(inputValue.trim() !== patientName);
    }, [inputValue, patientName]);

    const showSuccessToast = (message: string) => {
        toast.show('Success', {
            message,
            native: false, // Using custom toast style
        });
    };

    const handleDelete = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(`https://care-manager-api-cybccdb6fkffe8hg.westeurope-01.azurewebsites.net/api/patient/${patientNumber}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Failed to delete patient. Status: ${response.status}, Response: ${errorText}`);
            }
            showSuccessToast("Patient deleted successfully");
            setTimeout(() => {
                navigation.navigate('HomeScreen'); //Replace with your actual home screen name
            }, 1000); // delay of 1 second
            onDone();

        } catch (error) {
            console.error("Error deleting patient:", error);
            // Optionally handle errors here
        } finally {
            setIsLoading(false);
            onClose();
        }
    };


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
                                bg={isConfirmDisabled ? '$gray' : '$danger'}
                                width="$10"
                                borderRadius='$12'
                                borderColor={isConfirmDisabled ? '$gray_focus' : '$danger_focus'}
                                col='white'
                                loading={isLoading}
                            >
                                Ja
                            </Button>
                            <Button
                                width="$10"
                                onPress={onClose} // Close the modal
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
        </>
    );
};

export default DeleteModal;