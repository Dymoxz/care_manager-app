import React, { useState } from "react";
import {
    Button,
    Label,
    Input,
    Adapt,
    getFontSize,
    Sheet,
    Select,
    SizableText,
    XStack,
    YStack,
} from "tamagui";
import { Toast } from "@tamagui/toast";
import { Dimensions, PanResponder } from "react-native";
import TitleLayout from "../common/title_layout";
import { ArrowLeft, Check, ChevronUp, ChevronDown } from "@tamagui/lucide-icons";
import { LinearGradient } from "tamagui/linear-gradient";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

function SelectDemoItem({ onValueChange }) {
    const [val, setVal] = useState("");

    const items = [
        { name: "jongen" },
        { name: "meisje" },
    ];

    const handleValueChange = (newVal) => {
        setVal(newVal);
        onValueChange(newVal); // Pass the selected value to the parent component
    };

        return (
            <Select value={val} onValueChange={handleValueChange}>
                <Select.Trigger width={240} iconAfter={<ChevronDown />}>
                    <Select.Value placeholder="Geslacht" />
                </Select.Trigger>
                <Select.Content>
                    <Select.Viewport>
                        <Select.Group>
                            <Select.Label>Geslacht</Select.Label>
                            {items.map((item) => (
                                <Select.Item key={item.value} value={item.value}>
                                    <Select.ItemText>{item.name}</Select.ItemText>
                                    <Select.ItemIndicator>
                                        <Check size={16} />
                                    </Select.ItemIndicator>
                                </Select.Item>
                            ))}
                        </Select.Group>
                    </Select.Viewport>
                </Select.Content>
            </Select>
        );
    }


    export default function IntakeOneScreen({ navigation }) {
    const [voornaam, setVoornaam] = useState("");
    const [achternaam, setAchternaam] = useState("");
    const [lengte, setLengte] = useState(0);
    const [gewicht, setGewicht] = useState(0);
    const [geslacht, setGeslacht] = useState("");
    const [geboortedatum, setGeboortedatum] = useState("");
    const [bsn, setBsn] = useState("");

    const handleNext = () => {
        const intakeData = {
            voornaam,
            achternaam,
            lengte,
            gewicht,
            geslacht,
            geboortedatum,
            bsn,
        };

        // Navigate to the next screen and pass the data
        navigation.navigate("IntakeTwoScreen", { intakeData });
    };

    return (
        <TitleLayout
            titleText="Intake Patient"
            topContent={
                <Button
                    bg="$primary"
                    borderRadius="$10"
                    width="$3"
                    height="$3"
                    animation="bouncy"
                    hoverStyle={{ scale: 0.990, backgroundColor: "$primary_focus" }}
                    pressStyle={{ scale: 0.975, backgroundColor: "$primary_focus" }}
                    icon={<ArrowLeft size="$2" color="white" />}
                    onPress={() => navigation.goBack()}
                    position="absolute"
                    left={screenWidth * 0.05}
                    top="$5"
                />
            }
        >
            <YStack
                bg="$container"
                width={(screenWidth * 80) / 100}
                height={(screenHeight * 70) / 100}
                borderRadius="$10"
                elevation="$0.25"
                p="$6"
                ai="center"
            >
                {/* Header Section */}
                <YStack ai="center" jc="center" mt="$4">
                    <SizableText fontSize="$4" color="$text" textAlign="left">
                        Persoonlijke gegevens
                    </SizableText>
                    <YStack width="100%" height="1px" backgroundColor="#d3d3d3" mt="$2" />
                </YStack>

                {/* Form Fields Section */}
                <YStack width="100%" mt="$6" space="$4">
                    {/* Voornaam and Achternaam */}
                    <XStack space="$4">
                        <YStack f={1}>
                            <SizableText fontSize="$4" color="$text">
                                Voornaam
                            </SizableText>
                            <Input
                                bg="#fff"
                                borderWidth={1}
                                borderColor="#d3d3d3"
                                borderRadius="$4"
                                value={voornaam}
                                onChangeText={setVoornaam}
                            />
                        </YStack>
                        <YStack f={1}>
                            <SizableText fontSize="$4" color="$text">
                                Achternaam
                            </SizableText>
                            <Input
                                bg="#fff"
                                borderWidth={1}
                                borderColor="#d3d3d3"
                                borderRadius="$4"
                                value={achternaam}
                                onChangeText={setAchternaam}
                            />
                        </YStack>
                    </XStack>

                    {/* Lengte and Gewicht */}
                    <XStack space="$4" mt="$6">
                        <YStack f={1}>
                            <SizableText fontSize="$4" color="$text">
                                Lengte
                            </SizableText>
                            <Input
                                value={String(lengte)}
                                onChangeText={(value) => setLengte(Number(value) || 0)}
                                keyboardType="numeric"
                                bg="#fff"
                                borderWidth={1}
                                borderColor="#d3d3d3"
                                borderRadius="$4"
                                px="$4"
                                py="$2"
                            />
                        </YStack>

                        <YStack f={1}>
                            <SizableText fontSize="$4" color="$text">
                                Gewicht
                            </SizableText>
                            <Input
                                value={String(gewicht)}
                                onChangeText={(value) => setGewicht(Number(value) || 0)}
                                keyboardType="numeric"
                                bg="#fff"
                                borderWidth={1}
                                borderColor="#d3d3d3"
                                borderRadius="$4"
                                px="$4"
                                py="$2"
                            />
                        </YStack>
                    </XStack>

                    {/* Geslacht and Geboortedatum */}
                    <XStack space="$4" ai="center">
                        <YStack f={0.4}>
                            <SizableText fontSize="$4" color="$text">
                                Geslacht
                            </SizableText>
                            <SelectDemoItem onValueChange={setGeslacht} />
                        </YStack>
                        <YStack f={0.6}>
                            <SizableText fontSize="$4" color="$text">
                                Geboortedatum
                            </SizableText>
                            <Input
                                placeholder="Geboortedatum"
                                bg="#fff"
                                borderWidth={1}
                                borderColor="#d3d3d3"
                                borderRadius="$4"
                                value={geboortedatum}
                                onChangeText={setGeboortedatum}
                            />
                        </YStack>
                    </XStack>

                    {/* BSN */}
                    <YStack>
                        <SizableText fontSize="$4" color="$text">
                            BSN Nummer
                        </SizableText>
                        <Input
                            placeholder="BSN"
                            bg="#fff"
                            borderWidth={1}
                            borderColor="#d3d3d3"
                            borderRadius="$4"
                            value={bsn}
                            onChangeText={setBsn}
                        />
                    </YStack>
                </YStack>

                {/* Next Step Button */}
                <Button onPress={handleNext} bg="$primary" borderRadius="$4" py="$3" px="$6">
                    <SizableText fontSize="$4" color="#fff">
                        Volgende stap
                    </SizableText>
                </Button>
            </YStack>

            <Toast />
        </TitleLayout>
    );
}
