import React, {useState} from "react";
import { Button, Label, Input, Adapt, getFontSize, Sheet, Select, SizableText, XStack, YStack } from "tamagui"; // Ensure all components are correctly imported
import { Toast } from "@tamagui/toast"; // Correct import for Toast
import {Dimensions, PanResponder} from "react-native";
import TitleLayout from "../common/title_layout";
import {ArrowLeft, Check, ChevronUp, ChevronDown} from "@tamagui/lucide-icons";
import { LinearGradient } from 'tamagui/linear-gradient'
import type { FontSizeTokens, SelectProps } from 'tamagui'

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

function SelectGenderItem(props: { id: string, native: boolean }) {
    return null;
}

export function SelectDemoItem(props) {
    const [val, setVal] = React.useState("");

    const items = [
        {name: 'jongen'},
        {name: 'meisje'},
    ]

    return (
        <Select value={val} onValueChange={setVal} disablePreventBodyScroll {...props}>
            <Select.Trigger width={240} iconAfter={ChevronDown}>
                <Select.Value placeholder="Geslacht" />
            </Select.Trigger>

            <Adapt when="sm" platform="touch">
                <Sheet
                    native={!!props.native}
                    modal
                    dismissOnSnapToBottom
                    animationConfig={{
                        type: 'spring',
                        damping: 20,
                        mass: 1.2,
                        stiffness: 250,
                    }}
                >
                    <Sheet.Frame
                        width="100%" // Ensure full width
                        height="10%" // Set the height to a small percentage (10% of the viewport height)
                        justifyContent="center"
                        alignItems="center"
                        borderRadius="$4" // Optional: Rounding the corners
                    >
                        <Sheet.ScrollView>
                            <Adapt.Contents />
                        </Sheet.ScrollView>
                    </Sheet.Frame>
                    <Sheet.Overlay
                        animation="lazy"
                        enterStyle={{ opacity: 0 }}
                        exitStyle={{ opacity: 0 }}
                    />
                </Sheet>
            </Adapt>



            <Select.Content zIndex={200000}>
                <Select.ScrollUpButton
                    alignItems="center"
                    justifyContent="center"
                    position="relative"
                    width="100%"
                    height="$1"
                >
                    <YStack zIndex={10}>
                        <ChevronUp size={20} />
                    </YStack>
                    <LinearGradient
                        start={[0, 0]}
                        end={[0, 1]}
                        fullscreen
                        colors={['$background', 'transparent']}
                        borderRadius="$4"
                    />
                </Select.ScrollUpButton>

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
                                                <Check size={16} />
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

                <Select.ScrollDownButton
                    alignItems="center"
                    justifyContent="center"
                    position="relative"
                    width="100%"
                    height="$1"
                >
                    <YStack zIndex={10}>
                        <ChevronDown size={20} />
                    </YStack>
                    <LinearGradient
                        start={[0, 0]}
                        end={[0, 1]}
                        fullscreen
                        colors={['transparent', '$background']}
                        borderRadius="$4"
                    />
                </Select.ScrollDownButton>
            </Select.Content>
        </Select>
    );
}

export default function IntakeTwoScreen({ navigation }) {


    // PanResponder to handle dragging
    const createDragHandler = (value, setValue) =>
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onMoveShouldSetPanResponder: () => true,
            onPanResponderMove: (_, gestureState) => {
                // Dragging up increases value, down decreases it
                const newValue = value + Math.round(gestureState.dy * -0.1);
                if (newValue >= 0) {
                    setValue(newValue);
                }
            },
        });

    return (
        <TitleLayout
            titleText='Intake Patient'
            topContent={
                <Button
                    bg={'$primary'}
                    borderRadius="$10"
                    width='$3'
                    height='$3'
                    animation="bouncy"
                    hoverStyle={{scale: 0.990, backgroundColor: '$primary_focus'}}
                    pressStyle={{scale: 0.975, backgroundColor: '$primary_focus'}}
                    icon={<ArrowLeft size='$2' color={'white'}/>}
                    onPress={() => navigation.goBack()}
                    position='absolute'
                    left={screenWidth * 0.05}
                    top='$5'
                    // style={{ position: 'absolute', left: '20', top: 10 }}
                />
            }
        >
            <YStack
                bg={'$container'}
                width={(screenWidth * 80) / 100}
                height={(screenHeight * 70) / 100}
                borderRadius="$10"
                elevation="$0.25"
                p="$6"
                ai="center"
            >
                {/* Header Section */}
                <YStack ai="center" jc="center" mt="$4">
                    <SizableText fontSize="$4" color={'$text'} textAlign="left">
                        Persoonlijke gegevens
                    </SizableText>
                    <YStack width="100%" height="1px" backgroundColor="#d3d3d3" mt="$2" />
                </YStack>

                {/* Form Fields Section */}
                <YStack width="100%" mt="$6" space="$4">
                    {/* Geslacht and Geboortedatum */}
                    <XStack space="$4" ai="center">
                        {/* Geslacht Dropdown */}
                        <YStack f={0.4}>
                            <SizableText fontSize="$4" color={'$text'}>
                                Geslacht
                            </SizableText>
                            <SelectDemoItem id="select-demo-2" />
                        </YStack>
                    </XStack>


                    {/* BSN */}
                    <YStack>
                        <SizableText fontSize="$4" color={'$text'}>
                            BSN Nummer
                        </SizableText>
                        <Input
                            placeholder="BSN"
                            bg="#fff"
                            borderWidth={1}
                            borderColor="#d3d3d3"
                            borderRadius="$4"
                        />
                    </YStack>
                </YStack>

                {/* Spacer to push the button to the bottom */}
                <YStack f={1} />

                {/* Next Step Button */}
                <Button
                    onPress={() => navigation.navigate("IntakeTwoScreen")}
                    bg={'$primary'}
                    borderRadius="$4"
                    py="$3"
                    px="$6"
                >
                    <SizableText fontSize="$4" color="#fff">
                        Submit
                    </SizableText>
                </Button>
            </YStack>

            {/* Toast for error message */}
            <Toast />
        </TitleLayout>
    );
}
