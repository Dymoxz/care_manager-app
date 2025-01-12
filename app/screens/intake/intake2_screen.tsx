import React, {useEffect, useState} from 'react';
import {Button, SizableText, styled, Text, TextArea, XStack, YStack} from 'tamagui';
import DropdownModal from '../common/multiselect_dropdown';
import TitleLayout from "../common/title_layout";
import {ArrowLeft, ChevronDown} from "@tamagui/lucide-icons";
import {Dimensions} from "react-native";

const {width: screenWidth, height: screenHeight} = Dimensions.get("window");

const InputContainer = styled(XStack, {
    borderWidth: 1,
    borderColor: '$borderColor',
    borderRadius: '$4',
    paddingVertical: '$2',
    paddingHorizontal: '$3',
    alignItems: 'center',
    justifyContent: 'space-between',
    cursor: 'pointer', // For web-like feel
    overflow: 'hidden', // To handle text overflow
    backgroundColor: 'white'
});

const SelectedItemsText = styled(Text, {
    flex: 1,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
});

const DropdownIndicator = styled(Text, {
    marginLeft: '$2',
});

export default function IntakeTwoScreen({navigation, route}) {
    const {intakeData} = route.params;

    const [isZiektebeeldModalVisible, setIsZiektebeeldModalVisible] = useState(false);
    const [selectedZiektebeelden, setSelectedZiektebeelden] = useState<string[]>([]);

    const availableZiektebeelden = ['Diabetes', 'Astma', 'COPD', 'Hartfalen', 'Reuma', 'Kanker', 'Depressie', 'Hypertensie', 'Migraine', 'Epilepsie', 'Parkinson', 'Alzheimer', 'Osteoporose'];
    const [ziektebeeldDisplayText, setZiektebeeldDisplayText] = useState('Kies of zoek een ziektebeeld');

    const [voedingAllergieen, setVoedingAllergieen] = useState("");

    const [isMedicijnenModalVisible, setIsMedicijnenModalVisible] = useState(false);
    const [selectedMedicijnen, setSelectedMedicijnen] = useState<string[]>([]);
    const availableMedicijnen = ['Paracetamol', 'Ibuprofen', 'Amoxicillin', 'Lisinopril', 'Atorvastatin'];
    const [medicijnenDisplayText, setMedicijnenDisplayText] = useState('Kies of zoek medicijnen');

    const [isKamersModalVisible, setIsKamersModalVisible] = useState(false);
    const [selectedKamers, setSelectedKamers] = useState<string[]>([]);
    const availableKamers = ['Kamer 101', 'Kamer 102', 'Kamer 201', 'Kamer 202', 'Kamer 301'];
    const [kamersDisplayText, setKamersDisplayText] = useState('Kies een kamer');

    const handleZiektebeeldDone = (items: string[]) => {
        setSelectedZiektebeelden(items);
    };

    const handleMedicijnenDone = (items: string[]) => {
        setSelectedMedicijnen(items);
    };

    const handleKamersDone = (items: string[]) => {
        setSelectedKamers(items);
    };

    useEffect(() => {
        if (selectedZiektebeelden.length > 0) {
            setZiektebeeldDisplayText(selectedZiektebeelden.join(', '));
        } else {
            setZiektebeeldDisplayText('Kies of zoek een ziektebeeld');
        }
    }, [selectedZiektebeelden]);

    useEffect(() => {
        if (selectedMedicijnen.length > 0) {
            setMedicijnenDisplayText(selectedMedicijnen.join(', '));
        } else {
            setMedicijnenDisplayText('Kies of zoek medicijnen');
        }
    }, [selectedMedicijnen]);

    useEffect(() => {
        if (selectedKamers.length > 0) {
            setKamersDisplayText(selectedKamers.join(', '));
        } else {
            setKamersDisplayText('Kies een kamer');
        }
    }, [selectedKamers]);

    const handleSubmit = () => {
        const patientData = {
            patientNumber: Math.floor(Math.random() * 90000) + 10000, // Generate a random number
            bsn: intakeData.bsn,
            firstName: intakeData.voornaam,
            lastName: intakeData.achternaam,
            dateOfBirth: new Date(intakeData.geboortedatumRaw.split('-').reverse().join('-')).toISOString(),
            length: intakeData.lengte,
            weight: intakeData.gewicht,
            clinicalProfile: selectedZiektebeelden.length > 0 ? selectedZiektebeelden.join(', ') : null,
            diet: voedingAllergieen,
        };
        console.log(JSON.stringify(patientData, null, 2));

        /*TODO Api request to create Patient*/

        // Optionally navigate to a success screen or previous screen
        // navigation.navigate('SuccessScreen');
    };

    return (
        <TitleLayout
            titleText="Intake patient"
            topContent={
                <Button
                    bg="$primary"
                    borderRadius="$10"
                    width="$3"
                    height="$3"
                    animation="bouncy"
                    hoverStyle={{scale: 0.990, backgroundColor: "$primary_focus"}}
                    pressStyle={{scale: 0.975, backgroundColor: "$primary_focus"}}
                    icon={<ArrowLeft size="$2" color="white"/>}
                    onPress={() => navigation.goBack()}
                    position="absolute"
                    left={screenWidth * 0.05}
                    top="$5"
                />
            }
        >

            <YStack ai="center">
                <YStack
                    bg="$container"
                    width={(screenWidth * 90) / 100}
                    height={(screenHeight * 55) / 100}
                    borderRadius="$10"
                    elevation="$0.25"
                    px="$6"
                    ai="center"
                    position="relative" // Add relative position to the container
                >
                    {/* Form Fields Section */}
                    <YStack width="100%" mt="$6" space="$4">

                        <YStack>
                            <SizableText fontSize="$4" color="$text" mb='$1'>
                                Ziektebeeld
                            </SizableText>

                            <InputContainer
                                borderColor="#d3d3d3"
                                h='$4'
                                onPress={() => setIsZiektebeeldModalVisible(true)}>
                                <SelectedItemsText col='gray' numberOfLines={1}
                                                   ellipsizeMode='tail'>{ziektebeeldDisplayText}</SelectedItemsText>
                                <DropdownIndicator>
                                    <ChevronDown size='$1'/>
                                </DropdownIndicator>
                            </InputContainer>
                        </YStack>

                        <YStack>
                            <SizableText fontSize="$4" color="$text" mb='$1'>
                                Medicijnen
                            </SizableText>
                            <InputContainer
                                borderColor="#d3d3d3"
                                h='$4'
                                onPress={() => setIsMedicijnenModalVisible(true)}>
                                <SelectedItemsText col='gray' numberOfLines={1}
                                                   ellipsizeMode='tail'>{medicijnenDisplayText}</SelectedItemsText>
                                <DropdownIndicator>
                                    <ChevronDown size='$1'/>
                                </DropdownIndicator>
                            </InputContainer>
                        </YStack>

                        <YStack>
                            <SizableText fontSize="$4" color="$text" mb='$1'>
                                Kamer
                            </SizableText>
                            <InputContainer
                                borderColor="#d3d3d3"
                                h='$4'
                                onPress={() => setIsKamersModalVisible(true)}>
                                <SelectedItemsText col='gray' numberOfLines={1}
                                                   ellipsizeMode='tail'>{kamersDisplayText}</SelectedItemsText>
                                <DropdownIndicator>
                                    <ChevronDown size='$1'/>
                                </DropdownIndicator>
                            </InputContainer>
                        </YStack>

                        {/* Voeding / Allergieën */}
                        <YStack>
                            <SizableText fontSize="$4" color="$text" mb='$1'>
                                Voeding / Allergieën
                            </SizableText>
                            <TextArea
                                bg='white'
                                height='$8' // Adjust as needed
                                borderWidth={1}
                                borderRadius="$4"
                                padding="$2"
                                style={{
                                    textAlignVertical: 'top', // For React Native platforms
                                }}
                                value={voedingAllergieen}
                                onChangeText={setVoedingAllergieen}
                            />
                        </YStack>
                    </YStack>
                    {/* Intake voltooien Button */}
                    <Button
                        onPress={handleSubmit}
                        pressStyle={{scale: 0.975, backgroundColor: "$accent_focus"}}
                        bg="$accent"
                        borderRadius="$10"
                        position="absolute"
                        borderColor="$accent_focus"
                        bottom="$5"  // Align the button to the bottom
                        right="$5"   // Align the button to the right
                    >
                        <SizableText fontSize="$4" color="$accent_content">
                            Intake voltooien
                        </SizableText>
                    </Button>
                </YStack>
            </YStack>

            <DropdownModal
                visible={isZiektebeeldModalVisible}
                items={availableZiektebeelden}
                onDone={handleZiektebeeldDone}
                onClose={() => setIsZiektebeeldModalVisible(false)}
                screenWidth={screenWidth} // Pass screenWidth to the modal
                title="Selecteer ziektebeeld"
            />

            <DropdownModal
                visible={isMedicijnenModalVisible}
                items={availableMedicijnen}
                onDone={handleMedicijnenDone}
                onClose={() => setIsMedicijnenModalVisible(false)}
                screenWidth={screenWidth} // Pass screenWidth to the modal
                title="Selecteer medicijnen"
            />

            <DropdownModal
                visible={isKamersModalVisible}
                items={availableKamers}
                onDone={handleKamersDone}
                onClose={() => setIsKamersModalVisible(false)}
                screenWidth={screenWidth} // Pass screenWidth to the modal
                title="Selecteer kamer"
            />
        </TitleLayout>

    );
};