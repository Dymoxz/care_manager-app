import { Button, Dialog, SizableText, Unspaced, YStack, View, ScrollView } from 'tamagui';
import React from "react";
import { X } from "@tamagui/lucide-icons";
import Markdown from 'react-native-markdown-display';

interface DosageGoal {
    dosageGoal: string;
    ingestType: {
        ingestType: string;
        issuingType: string[];
        ageAndWeight: {ageAndWeight: string; description: string;}[];
    }[]
}

interface Medicine {
    _id: string;
    name: string;
    brandName: string;
    atcCode: string;
    dosageGoals: DosageGoal[];
}

interface MedicineDetailModalProps {
    visible: boolean;
    onClose: () => void;
    screenWidth: number;
    medicine: Medicine | null; // Allow null
}

export default function MedicineDetailModal({visible, onClose, screenWidth, medicine}: MedicineDetailModalProps) {
    const fallbackMedicine: Medicine = {
        _id: '',
        name: 'Medicijn',
        brandName: 'N/A',
        atcCode: 'N/A',
        dosageGoals: [],
    };
    const medicineToDisplay = medicine || fallbackMedicine;

    return (
        <Dialog modal open={visible} onOpenChange={onClose}>
            <Dialog.Portal>
                <Dialog.Overlay
                    animation="lazy"
                    enterStyle={{opacity: 0}}
                    exitStyle={{opacity: 0}}
                    backgroundColor="rgba(0, 0, 0, 0.5)"
                    onPress={onClose}
                />
                <Dialog.Content
                    elevate
                    animation={['quick', {opacity: { overshootClamping: true } }]}
                    enterStyle={{ y: -20, opacity: 0, scale: 0.9 }}
                    exitStyle={{ y: 10, opacity: 0, scale: 0.95 }}
                    gap="$4"
                    marginVertical={screenWidth * 0.1}
                    padding="$3"
                    width={screenWidth * 0.9}
                    bg="$container"
                    borderRadius="$8"
                    style={{ maxWidth: screenWidth * 0.9 }}
                >
                    <ScrollView>
                        <Dialog.Title fontSize='$7' mt="$5" marginHorizontal="$2" textAlign='center'>
                            {medicineToDisplay.name}
                        </Dialog.Title>
                        <SizableText textAlign='center' col="gray" mb="$2">
                            Medijn informatie
                        </SizableText>
                        <YStack width="100%" paddingHorizontal="$2">
                            <SizableText size="$5" fontWeight="bold" color="$text" mt="$2">
                                Merknaam:
                            </SizableText>
                            <SizableText size="$5"  color="$text" >
                                {medicineToDisplay.brandName}
                            </SizableText>
                            <SizableText size="$5" fontWeight="bold" color="$text" mt="$2">
                                ATC Code:
                            </SizableText>
                            <SizableText size="$5"  color="$text" >
                                {medicineToDisplay.atcCode}
                            </SizableText>

                            {medicineToDisplay.dosageGoals.map((dosageGoal, index) => (
                                <YStack key={index} mt="$2" mb="$3" width="100%">
                                    <SizableText size="$5" fontWeight="bold" color="$text">
                                        Dosering advies:
                                    </SizableText>
                                    <SizableText size="$5" color="$text">
                                        {dosageGoal.dosageGoal}
                                    </SizableText>
                                    {dosageGoal.ingestType.map((ingestType, typeIndex) => (
                                        <YStack  key={typeIndex} ml="$2">
                                            <SizableText  size="$5" fontWeight="bold" color="$text" mt="$1">
                                                Inname type:
                                            </SizableText>
                                            <SizableText  size="$5"  color="$text">
                                                {ingestType.ingestType}
                                            </SizableText>
                                            {ingestType.ageAndWeight && ingestType.ageAndWeight.map((ageWeight, ageIndex) => (
                                                <YStack key={ageIndex}  ml="$2">
                                                    <SizableText  size="$5" fontWeight="bold" color="$text"  mt="$1">
                                                        Leeftijd en Gewicht:
                                                    </SizableText>
                                                    <SizableText  size="$5" color="$text" >
                                                        {ageWeight.ageAndWeight}
                                                    </SizableText>
                                                    <View  ml="$2">
                                                        <Markdown
                                                            style={{fontSize: 16, fontWeight: 'normal'}}

                                                        >
                                                            {ageWeight.description}
                                                        </Markdown>
                                                    </View>
                                                </YStack>

                                            ))}
                                        </YStack>
                                    ))}
                                </YStack>
                            ))}
                        </YStack>
                    </ScrollView>
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
                                <X col='$accent_content' size='$1' />
                            </Button>
                        </Dialog.Close>
                    </Unspaced>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog>
    );
}