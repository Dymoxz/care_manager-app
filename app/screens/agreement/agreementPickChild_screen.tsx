import { useEffect, useState } from "react";
import {
    Button,
    Input,
    ScrollView,
    SizableText,
    styled,
    Text,
    XStack,
    YStack,
} from "tamagui";
import {
    Dimensions,
    Keyboard,
    TouchableWithoutFeedback,
} from "react-native";
import TitleLayout from "../common/title_layout";
import { BedSingle, ChevronDown, SquarePen } from "@tamagui/lucide-icons";
import { useAgreementForm } from "./useAgreementForm";
import DropdownModal from "../common/multiselect_dropdown";
import BackButton from "../common/back_button";
import { useToastController } from "@tamagui/toast";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

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
    roomNumber?: number;
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

interface AgreementPickChildScreenProps {
    navigation: any;
    route: any;
}

export default function AgreementPickChildScreen({
                                                     navigation,
                                                     route,
                                                 }: AgreementPickChildScreenProps) {
    const [userSelected, setUserSelected] = useState(false);
    const { formState, setFieldValue, errors, validateField, validateForm } =
        useAgreementForm(route.params?.formData);
    const [isPatientModalVisible, setIsPatientModalVisible] = useState(false);
    const [availablePatients, setAvailablePatients] = useState<Patient[]>([]);
    const [patientDisplayText, setPatientDisplayText] = useState(
        "Zoek of selecteer een patiënt"
    );
    const [isLoading, setIsLoading] = useState(false);
    const toast = useToastController();
    const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);

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
        // Check if a patient is passed in route.params
        if (route.params?.selectedPatient) {
            const patient: Patient = route.params.selectedPatient;
            setUserSelected(true);
            setSelectedPatient(patient);
            setPatientDisplayText(patient.firstName);
            setFieldValue('selectedPatient', patient.patientNumber.toString());
            validateField('selectedPatient', patient.patientNumber.toString())
        }

    }, [route.params]);

    const handleSave = async () => {
        if (!validateForm('page1')) {
            showErrorToast("Alle velden zijn verplicht in te vullen!");
            return;
        }
        if (!selectedPatient){
            showErrorToast("Kies alstublieft een patient.");
            return;
        }
        setIsLoading(true);
        try {
            const data = {
                title: formState.actie,
                description: formState.omschrijving,
            };
            console.log("Patient data to be created:", data);
            const response = await fetch(
                `https://care-manager-api-cybccdb6fkffe8hg.westeurope-01.azurewebsites.net/api/patient/agreement/${selectedPatient.patientNumber}`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(data),
                }
            );

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`HTTP error ${response.status}: ${errorText}`);
            }

            showSuccessToast("Succesvol een afspraak gemaakt!");
            navigation.navigate("HomeScreen");
        } catch (error) {
            console.error("Error bij het maken van een afspraak:", error);
            showErrorToast(`Error: ${error.message}`);
        } finally {
            setIsLoading(false);
        }
    };

    const activeErrorCount = Object.keys(errors).length;
    const containerHeight = screenHeight * 0.65 + activeErrorCount * 20;

    const handlePatientSelect = (selectedItems: Patient[]) => {
        if (selectedItems.length > 0) {
            setUserSelected(true);
            setFieldValue('selectedPatient', selectedItems[0].patientNumber.toString());
            setSelectedPatient(selectedItems[0]);
            setPatientDisplayText(selectedItems[0].firstName);
            validateField('selectedPatient', selectedItems[0].patientNumber.toString())
        } else {
            setFieldValue('selectedPatient', null);
            validateField('selectedPatient', null)
            setUserSelected(false);
            setSelectedPatient(null);
            setPatientDisplayText(patientDisplayText);
        }

        setIsPatientModalVisible(false);
    };

    const showErrorToast = (message) => {
        toast.show("Error", {
            message,
            native: false,
        });
    };

    const showSuccessToast = (message) => {
        toast.show("Success", {
            message,
            native: false,
        });
    };

    return (
        <TitleLayout
            titleText="Afspraak maken"
            topContent={<BackButton navigation={navigation} />}
        >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <ScrollView
                        contentContainerStyle={{ flexGrow: 1 }}
                        keyboardShouldPersistTaps="handled">
                        <YStack ai="center" flex={1}>
                            <YStack
                                bg="$container"
                                width={(screenWidth * 90) / 100}
                                minHeight={containerHeight}
                                borderRadius="$10"
                                elevation="$0.25"
                                px="$6"
                                py="$6"
                                ai="center"
                                position="relative"
                            >
                                {/* Patient Info Section */}
                                {userSelected && selectedPatient && (
                                    <YStack ai="center" mb="$2" width="100%">
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
                                            <XStack ai="center">
                                                <YStack ai="center" ml='$7'>
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
                                                    <XStack alignItems="center" mt='$1'>
                                                        <BedSingle size="$1" color="$accent_focus" mr='$2'/>
                                                        <SizableText size="$5" color="$accent_focus" fontWeight='700'>
                                                            {selectedPatient.room ? `Kamer ${selectedPatient.room.roomNumber}, verdieping ${selectedPatient.room.floor}` : 'Geen kamer'}
                                                        </SizableText>
                                                    </XStack>
                                                </YStack>

                                            {/* Update Button */}
                                            <Button
                                                px="$2"
                                                onPress={() => setIsPatientModalVisible(true)}
                                                pt="$4"
                                                bg="$container"
                                                pb="$6"
                                            >
                                                <SquarePen size="$1.5" color="$accent_content" />
                                            </Button>
                                        </XStack>
                                    </YStack>
                                </YStack>
                            )}

                            {/* Patient Selection Section */}
                            <YStack width="100%">
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
                                        mb="$6"
                                    >
                                        <SelectedItemsText numberOfLines={1} ellipsizeMode="tail">
                                            {patientDisplayText}
                                        </SelectedItemsText>
                                        <DropdownIndicator>
                                            <ChevronDown size="$1" />
                                        </DropdownIndicator>
                                    </InputContainer>
                                )}
                                {errors.selectedPatient && (
                                    <ErrorText>{errors.selectedPatient}</ErrorText>
                                )}
                            </YStack>

                                <YStack
                                    mb="$5"
                                    width="100%"
                                    borderBottomWidth={1}
                                    borderBottomColor="$gray"
                                >
                                    {/* This is the separation line */}
                                </YStack>
                                <YStack width="100%" py="$2">
                                    <YStack mb='$5' >
                                        <SizableText fontSize="$4" color="$text" mb="$2">
                                            Actie
                                        </SizableText>
                                        <Input
                                            value={formState.actie}
                                            onChangeText={(value) => setFieldValue("actie", value)}
                                            multiline
                                            bg="white"
                                            borderColor="#d3d3d3"
                                            borderRadius="$4"
                                            width="100%"
                                        />
                                        {errors.actie && (
                                            <ErrorText>{errors.actie}</ErrorText>
                                        )}
                                    </YStack>
                                    {/* Omschrijving field */}
                                    <YStack >
                                        <SizableText fontSize="$4" color="$text" mb="$2">
                                            Omschrijving
                                        </SizableText>
                                        <Input
                                            value={formState.omschrijving}
                                            onChangeText={(value) => setFieldValue("omschrijving", value)}
                                            multiline
                                            numberOfLines={4}
                                            textAlignVertical="top"
                                            bg="white"
                                            borderWidth={1}
                                            borderColor="#d3d3d3"
                                            borderRadius="$4"
                                            width="100%"
                                        />
                                        {errors.omschrijving && (
                                            <ErrorText>{errors.omschrijving}</ErrorText>
                                        )}
                                    </YStack>
                                </YStack>
                                {/* Save Button */}
                                <Button
                                    onPress={handleSave}
                                    bg="$accent"
                                    borderRadius="$10"
                                    borderColor="$accent_focus"
                                    mt="$6"
                                    alignSelf="flex-end"
                                    px="$4"
                                    py="$2"
                                    pressStyle={{ backgroundColor: "$accent_focus" }}
                                >
                                    <SizableText fontSize="$5" color="$accent_content">
                                        Opslaan
                                    </SizableText>
                                </Button>
                            </YStack>
                        </YStack>
                    </ScrollView>
                </TouchableWithoutFeedback>

            <DropdownModal<Patient>
                visible={isPatientModalVisible}
                items={availablePatients}
                onDone={handlePatientSelect}
                onClose={() => setIsPatientModalVisible(false)}
                screenWidth={screenWidth}
                title="Selecteer patient"
                hasSearch={true}
                isMultiSelect={false}
                getItemKey={(item) => item.patientNumber.toString()}
                getTextForItem={(item) => (
                    <XStack justifyContent="space-between" width="100%" pr="$2">
                        <Text col='$text'>{`${item.firstName} ${item.lastName}`}</Text>
                        <Text col='$text' textAlign="right">{item.room ? `${item.room.roomNumber}-${item.room.floor}` : 'Geen kamer'}</Text>
                    </XStack>
                )}
            />
        </TitleLayout>
    );
}