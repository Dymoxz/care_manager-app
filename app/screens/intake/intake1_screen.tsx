import React, {useState, useEffect} from "react";
import {
    Button,
    Input,
    SizableText,
    XStack,
    YStack,
    styled,
    Text,
} from "tamagui";
import {Dimensions, Keyboard, TouchableWithoutFeedback} from "react-native";
import TitleLayout from "../common/title_layout";
import {ArrowLeft, ChevronDown} from "@tamagui/lucide-icons";
import DropdownModal from "../common/multiselect_dropdown";
import {useIntakeForm} from "./useIntakeForm";

const {width: screenWidth, height: screenHeight} = Dimensions.get("window");

interface Gender {
    id: string;
    name: string;
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

const ErrorText = styled(Text, {
    color: 'red',
    fontSize: 12,
    width: '100%',
    paddingLeft: 5,
    minHeight: 20
});

interface IntakeOneScreenProps {
    navigation: any;
    route: any;
}

export default function IntakeOneScreen({navigation, route}: IntakeOneScreenProps) {
    const {formState, setFieldValue, handleGenderSelect, errors, validateField, validateForm} = useIntakeForm(route.params?.formData);
    const [isGenderModalVisible, setIsGenderModalVisible] = useState(false);
    const [availableGenders, setAvailableGenders] = useState<Gender[]>([{id: 'male', name: 'Jongen'}, {
        id: 'female',
        name: 'Meisje'
    }]);
    const [genderDisplayText, setGenderDisplayText] = useState('Selecteer geslacht');

    // State to track the number of active errors
    const [activeErrorCount, setActiveErrorCount] = useState(0);

    // Update activeErrorCount whenever the errors object changes
    useEffect(() => {
        setActiveErrorCount(Object.values(errors).filter(error => error !== undefined).length);
    }, [errors]);

    useEffect(() => {
        if (formState.selectedGender) {
            setGenderDisplayText(formState.selectedGender.name);
        } else {
            setGenderDisplayText('Selecteer geslacht');
        }
    }, [formState.selectedGender]);

    const handleGenderDone = (item: Gender[]) => {
        if (item.length > 0) {
            handleGenderSelect(item[0]);
            validateField('selectedGender', item[0]);
        } else {
            handleGenderSelect(null);
            validateField('selectedGender', null);
        }
        setIsGenderModalVisible(false);
    };

    const handleNext = () => {
        const isValid = validateForm('page1');
        if (isValid) {
            navigation.navigate("IntakeTwoScreen", {formData: formState});
        }
    };

    const formatDate = (rawDate: string) => {
        const cleanedDate = rawDate.replace(/\D/g, '').slice(0, 8);
        const day = cleanedDate.slice(0, 2);
        const month = cleanedDate.slice(2, 4);
        const year = cleanedDate.slice(4, 8);

        let formattedDate = "";
        if (day) formattedDate += day;
        if (month) formattedDate += `-${month}`;
        if (year) formattedDate += `-${year}`;

        return formattedDate;
    };

    // Calculate container height based on the number of active errors
    const containerHeight = (screenHeight * 0.55) + (activeErrorCount * 20);

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
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <YStack ai="center" flex={1}>
                    <YStack
                        bg="$container"
                        width={(screenWidth * 90) / 100}
                        height={containerHeight} // Use calculated height
                        borderRadius="$10"
                        elevation="$0.25"
                        px="$6"
                        ai="center"
                        position="relative"
                    >
                        <YStack width="100%" mt="$6" space="$4">
                            <XStack space="$4">
                                <YStack f={1}>
                                    <SizableText fontSize="$4" color="$text" mb="$1">
                                        Voornaam
                                    </SizableText>
                                    <Input
                                        bg="#fff"
                                        borderWidth={1}
                                        borderColor="#d3d3d3"
                                        borderRadius="$4"
                                        value={formState.voornaam}
                                        onChangeText={(text) => {
                                            setFieldValue('voornaam', text);
                                            validateField('voornaam', text);
                                        }}
                                        onSubmitEditing={Keyboard.dismiss}
                                    />
                                    {errors.voornaam && <ErrorText>{errors.voornaam}</ErrorText>}
                                </YStack>
                                <YStack f={1}>
                                    <SizableText fontSize="$4" color="$text" mb="$1">
                                        Achternaam
                                    </SizableText>
                                    <Input
                                        bg="#fff"
                                        borderWidth={1}
                                        borderColor="#d3d3d3"
                                        borderRadius="$4"
                                        value={formState.achternaam}
                                        onChangeText={(text) => {
                                            setFieldValue('achternaam', text);
                                            validateField('achternaam', text);
                                        }}
                                        onSubmitEditing={Keyboard.dismiss}
                                    />
                                    {errors.achternaam && <ErrorText>{errors.achternaam}</ErrorText>}
                                </YStack>
                            </XStack>

                            <XStack space="$4" >
                                <YStack f={1}  minHeight={68}>
                                    <SizableText fontSize="$4" color="$text" mb="$1">
                                        Lengte
                                    </SizableText>
                                    <XStack
                                        f={1}
                                        ai="center"
                                        justifyContent="center"
                                        bg="#fff"
                                        borderWidth={1}
                                        borderColor="#d3d3d3"
                                        borderRadius="$4"
                                        minHeight={38}
                                    >
                                        <Input
                                            value={formState.lengte}
                                            onChangeText={(text) => {
                                                setFieldValue('lengte', text);
                                                validateField('lengte', text);
                                            }}
                                            keyboardType="numeric"
                                            bg="#ffffff00"
                                            borderWidth={0}
                                            flex={3}
                                            px="$4"
                                            py="$2"
                                            onSubmitEditing={Keyboard.dismiss}
                                        />
                                        <YStack
                                            f={1}
                                            ai="center"
                                            justifyContent="center"
                                            bg="#f0f0f0"
                                            borderRadius="$3"
                                            px="$2"
                                            py="$2"
                                            mr="$2"
                                        >
                                            <SizableText color="$text" fontSize="$3">
                                                cm
                                            </SizableText>
                                        </YStack>
                                    </XStack>
                                    {errors.lengte && <ErrorText>{errors.lengte}</ErrorText>}
                                </YStack>

                                <YStack f={1}  minHeight={68}>
                                    <SizableText fontSize="$4" color="$text" mb="$1">
                                        Gewicht
                                    </SizableText>
                                    <XStack
                                        f={1}
                                        ai="center"
                                        justifyContent="center"
                                        bg="#fff"
                                        borderWidth={1}
                                        borderColor="#d3d3d3"
                                        borderRadius="$4"
                                        minHeight={38}
                                    >
                                        <Input
                                            value={formState.gewicht}
                                            onChangeText={(text) => {
                                                setFieldValue('gewicht', text);
                                                validateField('gewicht', text);
                                            }}
                                            keyboardType="decimal-pad"
                                            bg="#ffffff00"
                                            borderWidth={0}
                                            flex={3}
                                            px="$4"
                                            py="$2"
                                            onSubmitEditing={Keyboard.dismiss}
                                        />
                                        <YStack
                                            f={1}
                                            ai="center"
                                            justifyContent="center"
                                            bg="#f0f0f0"
                                            borderRadius="$3"
                                            px="$2"
                                            py="$2"
                                            mr="$2"
                                        >
                                            <SizableText color="$text" fontSize="$3">
                                                kg
                                            </SizableText>
                                        </YStack>
                                    </XStack>
                                    {errors.gewicht && <ErrorText>{errors.gewicht}</ErrorText>}
                                </YStack>
                            </XStack>

                            <XStack space="$4" ai="center" >
                                <YStack f={0.6} justifyContent="flex-start">
                                    <SizableText fontSize="$4" color="$text" mb="$1">
                                        Geslacht
                                    </SizableText>
                                    <InputContainer onPress={() => setIsGenderModalVisible(true)} h='$4'>
                                        <SelectedItemsText numberOfLines={1} ellipsizeMode='tail' hasValue={!!formState.selectedGender}>
                                            {genderDisplayText}
                                        </SelectedItemsText>
                                        <DropdownIndicator>
                                            <ChevronDown size='$1'/>
                                        </DropdownIndicator>
                                    </InputContainer>
                                    {errors.selectedGender && <ErrorText>{errors.selectedGender}</ErrorText>}
                                </YStack>
                                <YStack f={0.4}>
                                    <SizableText fontSize="$4" color="$text" mb='$1'>
                                        Geboortedatum
                                    </SizableText>
                                    <Input
                                        keyboardType="decimal-pad"
                                        placeholder="dd-mm-jjjj"
                                        bg="#fff"
                                        borderWidth={1}
                                        borderColor="#d3d3d3"
                                        borderRadius="$4"
                                        value={formatDate(formState.geboortedatumRaw)}
                                        onChangeText={(text) => {
                                            setFieldValue('geboortedatumRaw', text);
                                            validateField('geboortedatumRaw', text);
                                        }}
                                        onSubmitEditing={Keyboard.dismiss}
                                    />
                                    {errors.geboortedatumRaw && <ErrorText>{errors.geboortedatumRaw}</ErrorText>}
                                </YStack>
                            </XStack>

                            <YStack>
                                <SizableText fontSize="$4" color="$text" mb='$1'>
                                    BSN Nummer
                                </SizableText>
                                <Input
                                    keyboardType="numeric"
                                    bg="white"
                                    borderWidth={1}
                                    borderColor="#d3d3d3"
                                    borderRadius="$4"
                                    value={formState.bsn.slice(0, 9)}
                                    onChangeText={(text) => setFieldValue('bsn', text.replace(/\D/g, '').slice(0, 9))}
                                    onSubmitEditing={Keyboard.dismiss}
                                />
                                {errors.bsn && <ErrorText>{errors.bsn}</ErrorText>}
                            </YStack>
                        </YStack>

                        <Button
                            onPress={handleNext}
                            pressStyle={{scale: 0.975, backgroundColor: "$accent_focus"}}
                            bg="$accent"
                            borderRadius="$10"
                            position="absolute"
                            borderColor="$accent_focus"
                            bottom="$5"
                            right="$5"
                        >
                            <SizableText fontSize="$4" color="$accent_content">
                                Volgende stap
                            </SizableText>
                        </Button>
                    </YStack>
                </YStack>
            </TouchableWithoutFeedback>
            <DropdownModal<Gender>
                visible={isGenderModalVisible}
                items={availableGenders}
                onDone={handleGenderDone}
                onClose={() => setIsGenderModalVisible(false)}
                screenWidth={screenWidth}
                title="Selecteer geslacht"
                hasSearch={false}
                isMultiSelect={false}
                getItemKey={(item) => item.id}
                getTextForItem={(item) => item.name}
            />
        </TitleLayout>
    );
}