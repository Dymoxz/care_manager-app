import React, {useEffect, useState} from 'react';
import {Button, Dialog, Input, SizableText, styled, Unspaced, XStack, YStack} from 'tamagui';
import {X} from '@tamagui/lucide-icons';
import {useNavigation} from '@react-navigation/native';
import {View} from 'react-native';
import {useToastController} from "@tamagui/toast";

interface RoomDetailModalProps {
    visible: boolean;
    onClose: () => void;
    screenWidth: number;
    roomNumber: number;
    userName: string;
    clinicalprofile: string;
}



export function RoomDetailModal ({visible, onClose, screenWidth, roomNumber, userName, clinicalprofile}: RoomDetailModalProps) {
    const navigation = useNavigation();
    const toast = useToastController(); // Toast controller

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
                        bg='$container_alt'
                        borderRadius='$8'
                        style={{maxWidth: screenWidth * 0.9}}
                    >
                        <Dialog.Title fontSize='$7' mt="$5" marginHorizontal="$2" textAlign='center'>Kamer {roomNumber}</Dialog.Title>
                        <YStack backgroundColor='#E0E7EC' borderRadius='$5' mb='$8' padding='$3' marginHorizontal="$2" alignItems='center'>
                            <SizableText  fontWeight='700'  textAlign='center'>{userName}</SizableText>
                            <SizableText textAlign='center'  col="gray">{clinicalprofile}</SizableText>
                        </YStack>
                        <XStack ai="center" jc="center" marginHorizontal="auto" space="$4" mt='$4'>
                            <Button
                                borderRadius='$12'
                                borderColor='$accent_focus'
                                col='white'
                                bg="$accent"
                                pressStyle={{background: '$accent_focus'}}
                            >
                                Vergelijk
                            </Button>
                            <Button
                                bg='$primary'
                                borderRadius='$12'
                                borderColor='$primary_focus'
                                col='white'
                                pressStyle={{background: '$primary_focus'}}
                            >
                                Opschalen
                            </Button>
                        </XStack>
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
                                    pressStyle={{bg: '$accent_focus'}}
                                >
                                    <X col='$accent_content' size='$1'/>
                                </Button>
                            </Dialog.Close>
                        </Unspaced>
                    </Dialog.Content>
                </Dialog.Portal>
            </Dialog>
        </>
    );
};

