import React, {useState, useEffect, useRef} from "react";
import {
    Button,
    Input,
    SizableText,
    XStack,
    YStack,
    styled,
    Text,
} from "tamagui";
import {Dimensions, Keyboard, TouchableWithoutFeedback, findNodeHandle} from "react-native";
import TitleLayout from "../common/title_layout";
import {ArrowLeft, ChevronDown} from "@tamagui/lucide-icons";
import DropdownModal from "../common/multiselect_dropdown"; // Assuming DropdownModal is in this path

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

export default function IntakeOneScreen({navigation}) {
    const [voornaam, setVoornaam] = useState("");
    const [achternaam, setAchternaam] = useState("");
    const [lengte, setLengte] = useState("");
    const [gewicht, setGewicht] = useState("");
    const [isGenderModalVisible, setIsGenderModalVisible] = useState(false);
    const [selectedGender, setSelectedGender] = useState<Gender | null>(null);
    const [availableGenders, setAvailableGenders] = useState<Gender[]>([{id: 'male', name: 'Jongen'}, {
        id: 'female',
        name: 'Meisje'
    }]);
    const [genderDisplayText, setGenderDisplayText] = useState('Selecteer geslacht');
    const [geboortedatumRaw, setGeboortedatumRaw] = useState("");
    const [bsn, setBsn] = useState("");

    const handleGenderDone = (item: Gender[]) => {
        if (item.length > 0) {
            setSelectedGender(item[0]);
        } else {
            setSelectedGender(null); // Reset if no item is selected
        }
    };

    useEffect(() => {
        if (selectedGender) {
            setGenderDisplayText(selectedGender.name);
        } else {
            setGenderDisplayText('Selecteer geslacht');
        }
    }, [selectedGender]);

    const handleNext = () => {
        const intakeData = {
            voornaam,
            achternaam,
            lengte: parseInt(lengte, 10) || 0,
            gewicht: parseFloat(gewicht) || 0,
            geslacht: selectedGender?.name || '', // Pass the selected gender name
            geboortedatumRaw,
            bsn,
        };

        navigation.navigate("IntakeTwoScreen", {intakeData});
    };

    const formatDate = (rawDate) => {
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
                        height={(screenHeight * 55) / 100}
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
                                        value={voornaam}
                                        onChangeText={setVoornaam}
                                        onSubmitEditing={Keyboard.dismiss}
                                    />
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
                                        value={achternaam}
                                        onChangeText={setAchternaam}
                                        onSubmitEditing={Keyboard.dismiss}
                                    />
                                </YStack>
                            </XStack>

                            <XStack space="$4">
                                <YStack f={1} minHeight="$7">
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
                                    >
                                        <Input
                                            value={lengte}
                                            onChangeText={setLengte}
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
                                </YStack>

                                <YStack f={1} minHeight="$7">
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
                                    >
                                        <Input
                                            value={gewicht}
                                            onChangeText={setGewicht}
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
                                </YStack>
                            </XStack>

                            <XStack space="$4" ai="center">
                                <YStack f={0.6}>
                                    <SizableText fontSize="$4" color="$text" mb="$1">
                                        Geslacht
                                    </SizableText>
                                    <InputContainer onPress={() => setIsGenderModalVisible(true)} h='$4' >
                                        <SelectedItemsText numberOfLines={1} ellipsizeMode='tail' hasValue={!!selectedGender}>
                                            {genderDisplayText}
                                        </SelectedItemsText>
                                        <DropdownIndicator>
                                            <ChevronDown size='$1'/>
                                        </DropdownIndicator>
                                    </InputContainer>
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
                                        value={formatDate(geboortedatumRaw)}
                                        onChangeText={(text) => setGeboortedatumRaw(text)}
                                        onSubmitEditing={Keyboard.dismiss}
                                    />
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
                                    value={bsn.slice(0, 9)}
                                    onChangeText={(text) => setBsn(text.replace(/\D/g, '').slice(0, 9))}
                                    onSubmitEditing={Keyboard.dismiss}
                                />
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