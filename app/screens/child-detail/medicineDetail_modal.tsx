import {
    Anchor,
    Paragraph,
    View,
    XStack,
    SizableText,
    YStack,
    Button,
    Dialog,
    Unspaced,
} from 'tamagui';
import React from "react";
import { X } from "@tamagui/lucide-icons";

interface MedicineDetailModalProps {
    medicine?: string | null;
    onClose: () => void; // Callback to close the dialog
    screenWidth: number;
}

const medicineInfo = {
    Abacavir: {
        description: 'Abacavir is an antiretroviral medication used to prevent HIV from multiplying.',
        sideEffects: 'Common side effects include headache, nausea, and fatigue.',
        dosage: 'Typical dosage is 300 mg twice a day.',
        precautions: 'Patients with a history of heart disease or high blood pressure should use with caution.',
    },
    Bezlotozumab: {
        description: 'Bezlotozumab is a monoclonal antibody used for the treatment of certain cancers.',
        sideEffects: 'May cause dizziness, nausea, and a drop in blood pressure.',
        dosage: 'Administered intravenously every 3 weeks.',
        precautions: 'Patients with a history of severe allergic reactions should avoid using Bezlotozumab.',
    },
    Desoximetason: {
        description: 'Desoximetason is a corticosteroid used to treat inflammatory skin conditions.',
        sideEffects: 'May cause skin thinning and irritation when used long term.',
        dosage: 'Applied as a thin layer on the affected area 2-3 times a day.',
        precautions: 'Avoid use on broken or infected skin.',
    },
};

export default function MedicineDetailModal({ medicine, onClose, screenWidth }: MedicineDetailModalProps) {
    const selectedMedicine = medicineInfo[medicine || ''];

    return (
        <Dialog open={!!medicine} onOpenChange={(isOpen) => !isOpen && onClose()}>
            {/* Overlay for dark background */}
            <Dialog.Overlay

                backgroundColor="rgba(0, 0, 0, 0.5)"
                pointerEvents="box-none"

            />
            <Dialog.Content
                elevate
                animation={['quicker', { opacity: { overshootClamping: true } }]}
                enterStyle={{ y: -20, opacity: 0, scale: 0.9 }}
                exitStyle={{ y: 10, opacity: 0, scale: 0.95 }}
                gap="$4"
                padding="$4"
                width={screenWidth * 0.9}
                style={{
                    maxWidth: screenWidth * 0.9,
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: [{ translateX: -(screenWidth * 0.45) }, { translateY: -200 }],
                }}
            >

            {/* Header */}
                <SizableText size="$7" fontWeight="700" color="$text" marginBottom="$4">
                    {medicine || 'Medicine Details'}
                </SizableText>

                {/* Medicine Information */}
                {selectedMedicine ? (
                    <YStack gap="$4">
                        <Paragraph size="$5" textAlign="left" color="$textSecondary">
                            <SizableText fontWeight="700">Description:</SizableText> {selectedMedicine.description}
                        </Paragraph>
                        <Paragraph size="$5" textAlign="left" color="$textSecondary">
                            <SizableText fontWeight="700">Side Effects:</SizableText> {selectedMedicine.sideEffects}
                        </Paragraph>
                        <Paragraph size="$5" textAlign="left" color="$textSecondary">
                            <SizableText fontWeight="700">Dosage:</SizableText> {selectedMedicine.dosage}
                        </Paragraph>
                        <Paragraph size="$5" textAlign="left" color="$textSecondary">
                            <SizableText fontWeight="700">Precautions:</SizableText> {selectedMedicine.precautions}
                        </Paragraph>
                    </YStack>
                ) : (
                    <Paragraph size="$6" textAlign="center" color="$textSecondary">
                        No specific medicine selected. Please choose one from the list.
                    </Paragraph>
                )}

                {/* Close Button */}
                <Unspaced>
                    <Dialog.Close asChild>
                        <Button bg="$secondary" col="white" position="absolute" top="$3" right="$3" size="$2" circular icon={X} />
                    </Dialog.Close>
                </Unspaced>
            </Dialog.Content>
        </Dialog>
    );
}
