import React, { useState } from "react";
import {
    Button,
    Input,
    SizableText,
    XStack,
    YStack,
    styled,
    Text,
} from "tamagui";
import {
    Dimensions,
    Keyboard,
    TouchableWithoutFeedback,
} from "react-native";
import TitleLayout from "../common/title_layout";
import { ArrowLeft, ChevronDown } from "@tamagui/lucide-icons";
import { useMedCheckForm } from "./useMedCheckForm";
import DropdownModal from "../common/multiselect_dropdown";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

const [userSelected, setUserSelected] = useState(false);

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
    id: string;
    patient: string;
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

export default function MedischeCheckScreen({ navigation, route }) {
    const {
        formState,
        setFieldValue,
        handleMedicalCheckSelect,
        errors,
        // validateForm,
    } = useMedCheckForm(route.params?.formData);

    const [isPatientModalVisible, setIsPatientModalVisible] = useState(false);
    const [availablePatients, setAvailablePatients] = useState<Patient[]>([]);
    const [patientDisplayText, setPatientDisplayText] = useState(
        "Zoek of selecteer een patiënt"
    );

    const handleSave = () => {
        // const isValid = validateForm(); // Controleer of het formulier geldig is
        // if (!isValid) {
        //     console.warn("Validatie mislukt:", errors);
        //     return;
        // }
        console.log("Formulier data:", formState);
    };

    const activeErrorCount = Object.keys(errors).length;
    const containerHeight = screenHeight * 0.55 + activeErrorCount * 20;

    return (
        <TitleLayout
            titleText="Medische Check"
            topContent={
                <Button
                    bg="$primary"
                    borderRadius="$10"
                    width="$3"
                    height="$3"
                    animation="bouncy"
                    hoverStyle={{
                        scale: 0.99,
                        backgroundColor: "$primary_focus",
                    }}
                    pressStyle={{
                        scale: 0.975,
                        backgroundColor: "$primary_focus",
                    }}
                    icon={<ArrowLeft size="$2" color="white" />}
                    onPress={() => navigation.navigate("HomeScreen")}
                    position="absolute"
                    left={screenWidth * 0.05}
                    top="$5"
                >
                    Terug
                </Button>
            }
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <YStack ai="center" flex={1}>
                    <YStack
                        bg="$container"
                        width={(screenWidth * 90) / 100}
                        height={containerHeight} // Gebruik berekende hoogte
                        borderRadius="$10"
                        elevation="$0.25"
                        px="$6"
                        py="$6"
                        ai="center"
                        position="relative"
                    >
                        {/* Patiënt veld */}
                        <YStack width="100%" py="$2">
                            <SizableText fontSize="$4" color="$text" mb="$1">
                                Ziektebeeld
                            </SizableText>
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
                            {errors.selectedPatients && (
                                <ErrorText>{errors.selectedPatients}</ErrorText>
                            )}
                        </YStack>

                        {/* Omschrijving veld */}
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

                        {/* Hartslag en Bloeddruk */}
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

                        {/* Opslaan knop */}
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
                onDone={handleMedicalCheckSelect}
                onClose={() => setIsPatientModalVisible(false)}
                screenWidth={screenWidth}
                title="Selecteer patient"
                hasSearch={true}
                isMultiSelect={true}
                getItemKey={(item) => item.patient}
                getTextForItem={(item) => item.patient}
            />

        </TitleLayout>
    );
}
