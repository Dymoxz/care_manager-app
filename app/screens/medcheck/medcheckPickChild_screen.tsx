import React, {useEffect, useState} from "react";
import {Button, Input, SizableText, styled, Text, XStack, YStack,} from "tamagui";
import {Dimensions, Keyboard, TouchableWithoutFeedback,} from "react-native";
import TitleLayout from "../common/title_layout";
import {ChevronDown, SquarePen} from "@tamagui/lucide-icons";
import {useMedCheckForm} from "./useMedCheckForm";
import DropdownModal from "../common/multiselect_dropdown";
import BackButton from "../common/back_button";
import {useToastController} from '@tamagui/toast';


const {width: screenWidth, height: screenHeight} = Dimensions.get("window");

const InputContainer = styled(XStack, {
    borderWidth: 1,
    borderColor: "$borderColor",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 10,
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "white",
});

interface Patient {
    _id: string;
    patientNumber: number;
    firstName: string;
    lastName: string;
    isQuarantined: boolean;
    dateOfBirth?: string;
    createdAt?: string;
    updatedAt?: string;
    __v?: number;
    room: Room;
    clinicalProfiles: Array<{
        _id: string;
        clinicalProfile: string;
    }>;
}

interface Room {
    _id: string;
    roomNumber: number;
    floor: number;
    maxCapacity: number;
    isScaled: boolean;
}


const ErrorText = styled(Text, {
    color: "red",
    fontSize: 12,
    width: "100%",
    paddingLeft: 5,
    minHeight: 20,
});

const DropdownIndicator = styled(Text, {
    marginLeft: "$2",
});

const SelectedItemsText = styled(Text, {
    flex: 1,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    variants: {
        hasValue: {
            true: {
                color: "$text",
            },
            false: {
                color: "gray",
            },
        },
    },
    defaultVariants: {
        hasValue: false,
    },
});

export default function MedischeCheckScreen({navigation, route}) {
    const [userSelected, setUserSelected] = useState(false); // Moved hook inside
    const {
        formState,
        setFieldValue,
        handleMedicalCheckSelect,
        errors,
    } = useMedCheckForm(route.params?.formData);

    const [isPatientModalVisible, setIsPatientModalVisible] = useState(false);
    const [availablePatients, setAvailablePatients] = useState<Patient[]>([]);
    const [patientDisplayText, setPatientDisplayText] = useState(
        "Zoek of selecteer een patiënt"
    );
    const [isLoading, setIsLoading] = useState(false);
    const toast = useToastController();

    useEffect(() => {
        const fetchPatients = async () => {
            try {
                const response = await fetch(
                    "https://care-manager-api-cybccdb6fkffe8hg.westeurope-01.azurewebsites.net/api/patient/list"
                );
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                setAvailablePatients(data);
            } catch (error) {
                console.error("Failed to fetch patients:", error);
            }
        };

        fetchPatients();
    }, []);


    const handleSave = () => {
        if (selectedPatient) {
            console.log("Selected patient details:");
            console.log(`Name: ${selectedPatient.firstName} ${selectedPatient.lastName}`);
            console.log(`Patient Number: ${selectedPatient.patientNumber}`);
            console.log(`Room: ${selectedPatient.room.roomNumber}, Floor: ${selectedPatient.room.floor}`);
            console.log(`Quarantined: ${selectedPatient.isQuarantined ? "Yes" : "No"}`);
        } else {
            console.warn("No patient selected!");
        }

        // Log the form data as well
        console.log("Formulier data:", formState);
    };


    const activeErrorCount = Object.keys(errors).length;
    const containerHeight = screenHeight * 0.65 + activeErrorCount * 20;

    const [selectedPatient, setSelectedPatient] = useState<Patient | null>(
        null
    );

    const handlePatientSelect = (selectedItems: Patient[]) => {
        if (selectedItems.length > 0) {
            setUserSelected(true); // Mark a user as selected
            setSelectedPatient(selectedItems[0]); // Use the first selected patient
            setPatientDisplayText(selectedItems[0].firstName); // Update the displayed text
        } else {
            setUserSelected(false);
            setSelectedPatient(null);
            setPatientDisplayText(patientDisplayText); // Reset display text
        }

        setIsPatientModalVisible(false); // Hiding dropdown when a patient is selected
    };

    const showErrorToast = (message) => {
        toast.show('Error', {
            message,
            native: false, // Using custom toast style
        });
    };

    const showSuccessToast = (message) => {
        toast.show('Success', {
            message,
            native: false, // Using custom toast style
        });
    };

    setIsLoading(true);
    const medicalCheckData = {
        createMedicalCheckDto: {
            firstName: formState.firstName,
            lastName: formState.lastName,
            description: formState.omschrijving,
            heartRate: formState.hartslag,
            bloodPressure: formState.bloeddruk,
        },
    };
    console.log("Patient data to be created:", medicalCheckData);

    const handleCreateMedicalCheck = async () => {
        if (!selectedPatient) {
            showErrorToast("Please select a patient.");
            return;
        }

        setIsLoading(true);
        try {
            const medicalCheckData = {
                createMedicalCheckDto: {
                    firstName: formState.firstName || "", // Provide default empty string
                    lastName: formState.lastName || "",
                    description: formState.omschrijving || "",
                    heartRate: formState.hartslag || "",
                    bloodPressure: formState.bloeddruk || "",
                },
            };

            const response = await fetch(`https://care-manager-api-cybccdb6fkffe8hg.westeurope-01.azurewebsites.net/api/patient/medcheck/${selectedPatient.patientNumber}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(medicalCheckData),
            });

            if (!response.ok) {
                const errorText = await response.text(); // Get error text from response
                throw new Error(`HTTP error ${response.status}: ${errorText}`);
            }

            showSuccessToast('Medical check created successfully!');
            navigation.navigate('HomeScreen');
        } catch (error) {
            console.error('Error creating medical check:', error);
            showErrorToast(`Error: ${error.message}`); // Display the error message
        } finally {
            setIsLoading(false);
        }
    };


    return (
        <TitleLayout
            titleText="Medische Check"
            topContent={<BackButton navigation={navigation} />}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <YStack ai="center" flex={1}>
                    <YStack
                        bg="$container"
                        width={(screenWidth * 90) / 100}
                        height={containerHeight} // Adjusted height to accommodate button
                        borderRadius="$10"
                        elevation="$0.25"
                        px="$6"
                        py="$6"
                        ai="center"
                        position="relative"
                    >
                        {/* Patient Info Section */}
                        {userSelected && selectedPatient && (
                            <YStack ai="center" mb="$6" width="100%">
                                {/* Horizontal layout for patient info and button */}
                                    {/* Circle and Name */}
                                    <YStack ai="center" alignItems="center" mb="$4">
                                        <YStack
                                            width={80}
                                            height={80}
                                            borderRadius={40}
                                            bg="$accent_focus"
                                            ai="center"
                                            jc="center"
                                            mb="$2"
                                        >
                                            <Text fontSize="$8" fontWeight="bold" color="$text">
                                                {selectedPatient.firstName[0]}
                                                {selectedPatient.lastName[0].charAt(0).toUpperCase()}
                                            </Text>
                                        </YStack>
                                        <XStack ai='center' >
                                        <SizableText
                                            fontSize="$9"
                                            pt="$4"
                                            fontWeight="bold"
                                            color="$text"
                                            textAlign="center"
                                            px="$2"
                                        >
                                            {selectedPatient.firstName} {selectedPatient.lastName}
                                        </SizableText>

                                    {/* Update Button */}
                                    <Button
                                        px="$2"
                                        onPress={() => setIsPatientModalVisible(true)}
                                        pt="$4"
                                        bg="$container"
                                        pb="$2.5"
                                    >
                                        <SquarePen size="$2" color="$accent_content" />
                                    </Button>
                                        </XStack>
                                </YStack>
                            </YStack>
                        )}

                        {/* Patient Selection Section */}
                        <YStack width="100%" py="$2">
                            {!userSelected && (
                                <SizableText fontSize="$4" color="$text" mb="$1">
                                    Patiënt
                                </SizableText>
                            )}
                            {!userSelected && (
                                <InputContainer
                                    onPress={() => setIsPatientModalVisible(true)}
                                    h="$4"
                                    width="100%"
                                >
                                    <SelectedItemsText
                                        numberOfLines={1}
                                        ellipsizeMode="tail"
                                    >
                                        {patientDisplayText}
                                    </SelectedItemsText>
                                    <DropdownIndicator>
                                        <ChevronDown size="$1" />
                                    </DropdownIndicator>
                                </InputContainer>
                            )}
                            {errors.selectedPatients && (
                                <ErrorText>{errors.selectedPatients}</ErrorText>
                            )}
                        </YStack>

                        <YStack mt="$4" mb='$5' width="100%" borderBottomWidth={1} borderBottomColor="$gray">
                            {/* This is the separation line */}
                        </YStack>

                        {/* Omschrijving field */}
                        <YStack width="100%" py="$2">
                            <SizableText fontSize="$4" color="$text" mb="$2">
                                Omschrijving
                            </SizableText>
                            <Input
                                value={formState.omschrijving}
                                onChangeText={(value) => setFieldValue("omschrijving", value)}
                                placeholder="Vul hier in wat is waargenomen, gecontroleerd is en/of is afgesproken"
                                multiline
                                numberOfLines={4}
                                textAlignVertical="top"
                                bg="white"
                                borderWidth={1}
                                borderColor="#d3d3d3"
                                borderRadius="$4"
                                px="$4"
                                py="$3"
                                width="100%"
                            />
                            {errors.omschrijving && (
                                <ErrorText>{errors.omschrijving}</ErrorText>
                            )}
                        </YStack>

                        {/* Vital Signs Section */}
                        <XStack space="$4" width="100%" py="$2">
                            <YStack f={1}>
                                <SizableText fontSize="$4" color="$text" mb="$2">
                                    Hartslag
                                </SizableText>
                                <Input
                                    value={formState.hartslag}
                                    onChangeText={(value) => setFieldValue("hartslag", value)}
                                    keyboardType="numeric"
                                    placeholder="bpm"
                                    bg="white"
                                    borderWidth={1}
                                    borderColor="#d3d3d3"
                                    borderRadius="$4"
                                    px="$3"
                                    width="100%"
                                />
                                {errors.hartslag && (
                                    <ErrorText>{errors.hartslag}</ErrorText>
                                )}
                            </YStack>
                            <YStack f={1}>
                                <SizableText fontSize="$4" color="$text" mb="$2">
                                    Bloeddruk
                                </SizableText>
                                <Input
                                    value={formState.bloeddruk}
                                    onChangeText={(value) => setFieldValue("bloeddruk", value)}
                                    placeholder="Bijv. 120/80"
                                    bg="white"
                                    borderWidth={1}
                                    borderColor="#d3d3d3"
                                    borderRadius="$4"
                                    px="$3"
                                    width="100%"
                                />
                                {errors.bloeddruk && (
                                    <ErrorText>{errors.bloeddruk}</ErrorText>
                                )}
                            </YStack>
                        </XStack>

                        {/* Save Button */}
                        <Button
                            onPress={handleSave}
                            bg="#ffb74d"
                            borderRadius="$8"
                            mt="$6"
                            alignSelf="flex-end"
                            px="$4"
                            py="$2"
                        >
                            <SizableText fontSize="$5" color="white">
                                Opslaan
                            </SizableText>
                        </Button>
                    </YStack>
                </YStack>
            </TouchableWithoutFeedback>

            <DropdownModal<Patient>
                visible={isPatientModalVisible}
                items={availablePatients}
                onDone={handlePatientSelect}
                onClose={() => setIsPatientModalVisible(false)}
                screenWidth={screenWidth}
                title="Selecteer patient"
                hasSearch={true}
                isMultiSelect={true}
                getItemKey={(item) => item.patientNumber.toString()}
                getTextForItem={(item) => `${item.firstName} ${item.lastName}`}
            />
        </TitleLayout>
    );
}
