import React, {useState} from "react";
import {
    Adapt,
    Button,
    type FontSizeTokens,
    getFontSize,
    Input,
    Select,
    Sheet,
    SizableText,
    XStack,
    YStack,
} from "tamagui";
import {Dimensions} from "react-native";
import TitleLayout from "../common/title_layout";
import {ArrowLeft, Check, ChevronDown} from "@tamagui/lucide-icons";

const {width: screenWidth, height: screenHeight} = Dimensions.get("window");

export function SelectDemoItem(props) {
    const [val, setVal] = React.useState("");

    const items = [
        {name: 'jongen'},
        {name: 'meisje'},
    ]

    return (
        <Select value={val} onValueChange={setVal} disablePreventBodyScroll {...props}>
            <Select.Trigger width={240} iconAfter={ChevronDown}>
                <Select.Value placeholder="Geslacht" col='$text'/>
            </Select.Trigger>
            -
            <Adapt when="sm" platform="touch">
                <Sheet
                    modal
                    native={!!props.native}

                    animationConfig={{
                        type: 'spring',
                        damping: 30,
                        mass: 1.2,
                        stiffness: 250,
                    }}>
                    <Sheet.Frame
                        width="100%" // Ensure full width
                        justifyContent="center"
                        alignItems="center"
                        borderRadius="$4" // Optional: Rounding the corners
                    >
                        <Sheet.ScrollView>
                            <Adapt.Contents/>
                        </Sheet.ScrollView>
                    </Sheet.Frame>
                    <Sheet.Overlay
                        animation="lazy"
                        enterStyle={{opacity: 0}}
                        exitStyle={{opacity: 0}}
                    />
                </Sheet>
            </Adapt>

            <Select.Content zIndex={200000}>
                <Select.Viewport
                    // to do animations:
                    // animation="quick"
                    // animateOnly={['transform', 'opacity']}
                    // enterStyle={{ o: 0, y: -10 }}
                    // exitStyle={{ o: 0, y: 10 }}
                    minWidth={200}
                >
                    <Select.Group>
                        <Select.Label>Geslacht</Select.Label>
                        {/* for longer lists memoizing these is useful */}
                        {React.useMemo(
                            () =>
                                items.map((item, i) => {
                                    return (
                                        <Select.Item
                                            index={i}
                                            key={item.name}
                                            value={item.name.toLowerCase()}
                                        >
                                            <Select.ItemText>{item.name}</Select.ItemText>
                                            <Select.ItemIndicator marginLeft="auto">
                                                <Check size={16}/>
                                            </Select.ItemIndicator>
                                        </Select.Item>
                                    )
                                }),
                            [items]
                        )}
                    </Select.Group>
                    {/* Native gets an extra icon */}
                    {props.native && (
                        <YStack
                            position="absolute"
                            right={0}
                            top={0}
                            bottom={0}
                            alignItems="center"
                            justifyContent="center"
                            width={'$4'}
                            pointerEvents="none"
                        >
                            <ChevronDown
                                size={getFontSize((props.size as FontSizeTokens) ?? '$true')}
                            />
                        </YStack>
                    )}
                </Select.Viewport>

            </Select.Content>
        </Select>
    );
}

export default function IntakeOneScreen({navigation}) {
    const [voornaam, setVoornaam] = useState("");
    const [achternaam, setAchternaam] = useState("");
    const [lengte, setLengte] = useState(""); // Keep as string to avoid initial 0
    const [gewicht, setGewicht] = useState(""); // Keep as string to avoid initial 0
    const [geslacht, setGeslacht] = useState("");
    const [geboortedatumRaw, setGeboortedatumRaw] = useState("");
    const [bsn, setBsn] = useState("");

    const handleNext = () => {
        const intakeData = {
            voornaam,
            achternaam,
            lengte: parseInt(lengte, 10) || 0,
            gewicht: parseFloat(gewicht) || 0,
            geslacht,
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
                    {/* Header Section */}

                    {/* Form Fields Section */}
                    <YStack width="100%" mt="$6" space="$4">
                        {/* Voornaam and Achternaam */}
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
                                />
                            </YStack>
                        </XStack>

                        {/* Lengte and Gewicht */}
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

                        {/* Geslacht and Geboortedatum */}
                        <XStack space="$4" ai="center">
                            <YStack f={0.4}>
                                <SizableText fontSize="$4" color="$text" mb="$1">
                                    Geslacht
                                </SizableText>
                                <SelectDemoItem onValueChange={setGeslacht}/>
                            </YStack>
                            <YStack f={0.6}>
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
                                />
                            </YStack>
                        </XStack>

                        {/* BSN */}
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
                            />
                        </YStack>
                    </YStack>

                    {/* Next Step Button */}
                    <Button
                        onPress={handleNext}
                        pressStyle={{scale: 0.975, backgroundColor: "$accent_focus"}}
                        bg="$accent"
                        borderRadius="$10"
                        position="absolute"
                        borderColor="$accent_focus"
                        bottom="$5"  // Align the button to the bottom
                        right="$5"   // Align the button to the right
                    >
                        <SizableText fontSize="$4" color="$accent_content">
                            Volgende stap
                        </SizableText>
                    </Button>
                </YStack>
            </YStack>
        </TitleLayout>
    );
}