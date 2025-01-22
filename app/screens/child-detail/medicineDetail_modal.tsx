import {Accordion, Button, Dialog, ScrollView, SizableText, Square, Unspaced, View, YStack} from 'tamagui';
import {useState} from "react";
import {ChevronDown, X} from "@tamagui/lucide-icons";
import Markdown from 'react-native-markdown-display';

interface DosageGoal {
    dosageGoal: string;
    ingestType: {
        ingestType: string;
        issuingType: string[];
        ageAndWeight: { ageAndWeight: string; description: string; }[];
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
    const [openAccordionItems, setOpenAccordionItems] = useState<string[]>([]);

    const handleAccordionChange = (value: string[]) => {
        setOpenAccordionItems(value)
    }
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
                    animation={['quick', {opacity: {overshootClamping: true}}]}
                    enterStyle={{y: -20, opacity: 0, scale: 0.9}}
                    exitStyle={{y: 10, opacity: 0, scale: 0.95}}
                    gap="$4"
                    marginVertical={screenWidth * 0.1}
                    padding="$3"
                    width={screenWidth * 0.9}
                    bg="$container"
                    borderRadius="$8"
                    style={{maxWidth: screenWidth * 0.9}}
                >
                    <ScrollView>
                        <Dialog.Title fontSize='$9' mt="$5" marginHorizontal="$2" textAlign='center'>
                            {medicineToDisplay.name}
                        </Dialog.Title>
                        <SizableText textAlign='center' col="gray" mb="$5">
                            Medicijn informatie
                        </SizableText>
                        <YStack width="100%" px="$2">
                            <SizableText size="$6" color="$text" mb="$2">
                                <SizableText size="$6" fontWeight="bold">Merknaam:</SizableText> {medicineToDisplay.brandName}
                            </SizableText>
                            <SizableText size="$6" color="$text" mb="$5">
                                <SizableText size="$6" fontWeight="bold">ATC Code:</SizableText> {medicineToDisplay.atcCode}
                            </SizableText>
                            <Accordion
                                overflow="hidden"
                                value={openAccordionItems}
                                type="multiple"
                                onValueChange={handleAccordionChange}

                            >
                                {medicineToDisplay.dosageGoals.map((dosageGoal, index) => (
                                    <Accordion.Item key={index} value={`item-dosageGoal-${index}`} mb="$3">
                                        <Accordion.Trigger
                                            flexDirection="row"
                                            justifyContent="space-between"
                                            borderWidth={0}
                                            backgroundColor={"#B9D6D6"}
                                            borderRadius={'$3'}
                                            pressStyle={{backgroundColor: '#B9D6D6'}}
                                        >
                                            {({open}: { open: boolean }) => (
                                                <>
                                                    <YStack>
                                                        <SizableText size="$5" fontWeight="bold" color="$text">
                                                            Dosering advies:
                                                        </SizableText>
                                                        <SizableText size="$5" color="$text">
                                                            {dosageGoal.dosageGoal}
                                                        </SizableText>
                                                    </YStack>
                                                    <Square animation="bouncy" rotate={open ? "180deg" : "0deg"}>
                                                        <ChevronDown size="$1" color="$text"/>
                                                    </Square>
                                                </>
                                            )}
                                        </Accordion.Trigger>
                                        <Accordion.HeightAnimator animation={"bouncy"}>
                                            <Accordion.Content
                                                paddingTop={0}
                                                animation={"bouncy"}
                                                backgroundColor="#B9D6D6"
                                                borderBottomLeftRadius={"$3"}
                                                borderBottomRightRadius={"$3"}
                                                borderTopLeftRadius={0}
                                                borderTopRightRadius={0}

                                            >
                                                {dosageGoal.ingestType.map((ingestType, typeIndex) => (
                                                    <YStack key={typeIndex}>
                                                        <SizableText size="$7" color="$text" mb="$3">
                                                            <SizableText size="$7" fontWeight="bold">Inname type:</SizableText> {ingestType.ingestType}
                                                        </SizableText>

                                                        {ingestType.ageAndWeight && ingestType.ageAndWeight.map((ageWeight, ageIndex) => (

                                                            <YStack
                                                                bg={"$container_alt"}
                                                                mb="$3"
                                                                p="$3"
                                                                borderRadius="$6"
                                                                ml="$2"
                                                            >
                                                                <YStack key={ageIndex} ml="$2">
                                                                    <SizableText size="$5" fontWeight="bold"
                                                                                 color="$text" mt="$1">
                                                                        Leeftijd en Gewicht:
                                                                    </SizableText>
                                                                    <SizableText size="$5" color="$text">
                                                                        {ageWeight.ageAndWeight}
                                                                    </SizableText>
                                                                    <View ml="$2">
                                                                        <Markdown
                                                                            style={{fontSize: 16, fontWeight: 'normal'}}

                                                                        >
                                                                            {ageWeight.description}
                                                                        </Markdown>
                                                                    </View>
                                                                </YStack>
                                                            </YStack>


                                                        ))}
                                                        <YStack
                                                            my="$5"
                                                            width="100%"
                                                            borderBottomWidth={1}
                                                            borderBottomColor="$gray"
                                                        >
                                                            {/* This is the separation line */}
                                                        </YStack>
                                                    </YStack>
                                                ))}
                                            </Accordion.Content>
                                        </Accordion.HeightAnimator>
                                    </Accordion.Item>
                                ))}
                            </Accordion>
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
                                <X col='$accent_content' size='$1'/>
                            </Button>
                        </Dialog.Close>
                    </Unspaced>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog>
    );
}