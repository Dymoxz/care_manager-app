import React, {useEffect, useState} from 'react';
import {Button, SizableText, styled, Text, TextArea, XStack, YStack} from 'tamagui';
import DropdownModal from '../common/multiselect_dropdown';
import TitleLayout from "../common/title_layout";
import {ArrowLeft, ChevronDown} from "@tamagui/lucide-icons";
import {Dimensions} from "react-native";
import {useIntakeForm} from "./useIntakeForm"; // Import the hook

const {width: screenWidth, height: screenHeight} = Dimensions.get("window");

interface Medicine {
    atcCode: string;
    name: string;
}

interface ClinicalProfile {
    id: string;
    clinicalProfile: string;
}

interface Room {
    id: string;
    roomNumber: string;
    floor: string;
}

const InputContainer = styled(XStack, {
    borderWidth: 1,
    borderColor: '$borderColor',
    borderRadius: '$4',
    paddingVertical: '$2',
    paddingHorizontal: '$3',
    alignItems: 'center',
    justifyContent: 'space-between',
    cursor: 'pointer',
    overflow: 'hidden',
    backgroundColor: 'white'
});

const SelectedItemsText = styled(Text, {
    flex: 1,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    variants: {
        hasValue: {
            true: {
                color: '$text',
            },
            false: {
                color: 'gray',
            },
        },
    },
    defaultVariants: {
        hasValue: false,
    },
});

const DropdownIndicator = styled(Text, {
    marginLeft: '$2',
});

interface IntakeTwoScreenProps {
    navigation: any;
    route: any;
}

export default function IntakeTwoScreen({navigation, route}: IntakeTwoScreenProps) {
    const {formState, setFieldValue, handleClinicalProfileSelect, handleMedicineSelect, handleRoomSelect} = useIntakeForm(route.params?.formData);

    const [isClinicalProfileModalVisible, setIsClinicalProfileModalVisible] = useState(false);
    const [availableClinicalProfiles, setAvailableClinicalProfiles] = useState<ClinicalProfile[]>([]);
    const [clinicalProfileDisplayText, setClinicalProfileDisplayText] = useState('Zoek of selecteer een ziektebeeld');

    const [isMedicinesModalVisible, setIsMedicinesModalVisible] = useState(false);
    const [availableMedicines, setAvailableMedicines] = useState<Medicine[]>([]);
    const [medicinesDisplayText, setMedicinesDisplayText] = useState('Zoek of selecteer medicijnen');

    const [isRoomsModalVisible, setIsRoomsModalVisible] = useState(false);
    const [availableRooms, setAvailableRooms] = useState<Room[]>([]);
    const [roomsDisplayText, setRoomsDisplayText] = useState('Zoek of selecteer een kamer');

    useEffect(() => {
        setClinicalProfileDisplayText(
            formState.selectedClinicalProfiles.length > 0
                ? formState.selectedClinicalProfiles.map(cp => cp.clinicalProfile).join(', ')
                : 'Zoek of selecteer een ziektebeeld'
        );
    }, [formState.selectedClinicalProfiles]);

    useEffect(() => {
        setMedicinesDisplayText(
            formState.selectedMedicines.length > 0
                ? formState.selectedMedicines.map(med => med.name).join(', ')
                : 'Zoek of selecteer medicijnen'
        );
    }, [formState.selectedMedicines]);

    useEffect(() => {
        setRoomsDisplayText(
            formState.selectedRooms.length > 0
                ? formState.selectedRooms.map(room => `${room.roomNumber} - ${room.floor}`).join(', ')
                : 'Zoek of selecteer een kamer'
        );
    }, [formState.selectedRooms]);

    const handleClinicalProfileDone = (items: ClinicalProfile[]) => {
        handleClinicalProfileSelect(items);
        setIsClinicalProfileModalVisible(false);
    };

    const handleMedicinesDone = (items: Medicine[]) => {
        handleMedicineSelect(items);
        setIsMedicinesModalVisible(false);
    };

    const handleRoomsDone = (items: Room[]) => {
        handleRoomSelect(items);
        setIsRoomsModalVisible(false);
    };

    const fetchClinicalProfiles = async () => {
        try {
            const backendUrl = process.env.EXPO_PUBLIC_BACKEND_URL;
            if (!backendUrl) {
                console.error("EXPO_PUBLIC_BACKEND_URL is not defined in process.env");
                return;
            }
            const response = await fetch(`${backendUrl}/clinicalProfile`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data: ClinicalProfile[] = await response.json();
            setAvailableClinicalProfiles(data);
        } catch (error) {
            console.error("Failed to fetch clinical profiles:", error);
            setAvailableClinicalProfiles([]);
        }
    };

    const fetchMedicines = async () => {
        try {
            const backendUrl = process.env.EXPO_PUBLIC_BACKEND_URL;
            if (!backendUrl) {
                console.error("EXPO_PUBLIC_BACKEND_URL is not defined in process.env");
                return;
            }
            const response = await fetch(`${backendUrl}/medicine`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data: Medicine[] = await response.json();
            setAvailableMedicines(data);
        } catch (error) {
            console.error("Failed to fetch medicines:", error);
            setAvailableMedicines([]);
        }
    };

    const fetchRooms = async () => {
        try {
            const backendUrl = process.env.EXPO_PUBLIC_BACKEND_URL;
            if (!backendUrl) {
                console.error("EXPO_PUBLIC_BACKEND_URL is not defined in process.env");
                return;
            }
            const response = await fetch(`${backendUrl}/room`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data: Omit<Room, 'floor'>[] = await response.json(); // Temporarily omit floor from the fetched data
            const roomsWithFloor: Room[] = data.map(room => ({...room, floor: '1st Floor'}));
            setAvailableRooms(roomsWithFloor);
        } catch (error) {
            console.error("Failed to fetch rooms:", error);
            setAvailableRooms([]);
        }
    };

    useEffect(() => {
        Promise.all([fetchClinicalProfiles(), fetchMedicines(), fetchRooms()]);
    }, []);

    const handleSubmit = () => {
        const patientData = {
            patientNumber: Math.floor(Math.random() * 90000) + 10000,
            bsn: formState.bsn,
            firstName: formState.voornaam,
            lastName: formState.achternaam,
            dateOfBirth: new Date(formState.geboortedatumRaw.split('-').reverse().join('-')).toISOString(),
            length: parseInt(formState.lengte, 10) || 0,
            weight: parseFloat(formState.gewicht) || 0,
            geslacht: formState.selectedGender?.name || '',
            clinicalProfile: formState.selectedClinicalProfiles.map(cp => cp.clinicalProfile).join(', '),
            diet: formState.foodAllergies,
            medication: formState.selectedMedicines.map(med => med.atcCode),
            rooms: formState.selectedRooms,
        };
        console.log(JSON.stringify(patientData, null, 2));

        /*TODO Api request to create Patient*/

        // Optionally navigate to a success screen or previous screen
        // navigation.navigate('SuccessScreen');
    };

    const goBack = () => {
        navigation.navigate('IntakeOneScreen', {formData: formState});
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
                    onPress={goBack}
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
                    position="relative"
                >
                    <YStack width="100%" mt="$6" space="$4">
                        <YStack>
                            <SizableText fontSize="$4" color="$text" mb='$1'>
                                Ziektebeeld
                            </SizableText>
                            <InputContainer onPress={() => setIsClinicalProfileModalVisible(true)} h='$4'>
                                <SelectedItemsText
                                    numberOfLines={1}
                                    ellipsizeMode='tail'
                                    hasValue={formState.selectedClinicalProfiles.length > 0}
                                >
                                    {clinicalProfileDisplayText}
                                </SelectedItemsText>
                                <DropdownIndicator>
                                    <ChevronDown size='$1'/>
                                </DropdownIndicator>
                            </InputContainer>
                        </YStack>

                        <YStack>
                            <SizableText fontSize="$4" color="$text" mb='$1'>
                                Medicijnen
                            </SizableText>
                            <InputContainer onPress={() => setIsMedicinesModalVisible(true)} h='$4'>
                                <SelectedItemsText
                                    numberOfLines={1}
                                    ellipsizeMode='tail'
                                    hasValue={formState.selectedMedicines.length > 0}
                                >
                                    {medicinesDisplayText}
                                </SelectedItemsText>
                                <DropdownIndicator>
                                    <ChevronDown size='$1'/>
                                </DropdownIndicator>
                            </InputContainer>
                        </YStack>

                        <YStack>
                            <SizableText fontSize="$4" color="$text" mb='$1'>
                                Kamer
                            </SizableText>
                            <InputContainer onPress={() => setIsRoomsModalVisible(true)} h='$4'>
                                <SelectedItemsText
                                    numberOfLines={1}
                                    ellipsizeMode='tail'
                                    hasValue={formState.selectedRooms.length > 0}
                                >
                                    {roomsDisplayText}
                                </SelectedItemsText>
                                <DropdownIndicator>
                                    <ChevronDown size='$1'/>
                                </DropdownIndicator>
                            </InputContainer>
                        </YStack>

                        <YStack>
                            <SizableText fontSize="$4" color="$text" mb='$1'>
                                Voeding / Allergiëen
                            </SizableText>
                            <TextArea
                                bg='white'
                                height='$8'
                                borderWidth={1}
                                borderRadius="$4"
                                padding="$2"
                                style={{textAlignVertical: 'top'}}
                                value={formState.foodAllergies}
                                onChangeText={(text) => setFieldValue('foodAllergies', text)}
                            />
                        </YStack>
                    </YStack>

                    <Button
                        onPress={handleSubmit}
                        pressStyle={{scale: 0.975, backgroundColor: "$accent_focus"}}
                        bg="$accent"
                        borderRadius="$10"
                        position="absolute"
                        borderColor="$accent_focus"
                        bottom="$5"
                        right="$5"
                    >
                        <SizableText fontSize="$4" color="$accent_content">
                            Intake Voltooie
                        </SizableText>
                    </Button>
                </YStack>
            </YStack>

            <DropdownModal<ClinicalProfile>
                visible={isClinicalProfileModalVisible}
                items={availableClinicalProfiles}
                onDone={handleClinicalProfileDone}
                onClose={() => setIsClinicalProfileModalVisible(false)}
                screenWidth={screenWidth}
                title="Selecteer ziektebeeld"
                hasSearch={true}
                isMultiSelect={true}
                getItemKey={(item) => item.clinicalProfile}
                getTextForItem={(item) => item.clinicalProfile}
            />

            <DropdownModal<Medicine>
                visible={isMedicinesModalVisible}
                items={availableMedicines}
                onDone={handleMedicinesDone}
                onClose={() => setIsMedicinesModalVisible(false)}
                screenWidth={screenWidth}
                title="Selecteer medicijnen"
                hasSearch={true}
                isMultiSelect={true}
                getItemKey={(item) => item.atcCode}
                getTextForItem={(item) => item.name}
            />

            <DropdownModal<Room>
                visible={isRoomsModalVisible}
                items={availableRooms}
                onDone={handleRoomsDone}
                onClose={() => setIsRoomsModalVisible(false)}
                screenWidth={screenWidth}
                title="Selecteer kamer"
                hasSearch={true}
                isMultiSelect={false}
                getItemKey={(item) => `${item.roomNumber}-${item.floor}`}
                getTextForItem={(item) => `${item.roomNumber} - ${item.floor}`}
            />
        </TitleLayout>
    );
}