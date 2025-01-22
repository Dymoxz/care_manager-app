import {PopoverProps, SizableText, Circle} from 'tamagui';
import {Adapt, Button, Popover, XStack, YStack, useTheme} from 'tamagui';
import {Svg, ClipPath, Path, G} from "react-native-svg";

export function Demo({
                         Icon,
                         Name,
                         shouldAdapt,
                         ...props
                     }: PopoverProps & { Icon?: any; Name?: string; shouldAdapt?: boolean }) {

    const theme = useTheme();
    return (
        <Popover size="$3" allowFlip {...props}>
            <Popover.Trigger asChild>
                <Button
                    position="absolute"
                    top="$4"
                    left="$4"
                    circular
                    bg={'$secondary'}
                    size="$4"
                    color="white"
                    borderColor={'$secondary_focus'}
                    borderWidth={1}

                    pressStyle={{backgroundColor: '$secondary_focus'}}
                >?</Button>
            </Popover.Trigger>

            {shouldAdapt && (
                <Adapt when="sm" platform="touch">
                    <Popover.Sheet modal dismissOnSnapToBottom>
                        <Popover.Sheet.Frame>
                            <Adapt.Contents/>
                        </Popover.Sheet.Frame>
                        <Popover.Sheet.Overlay
                            animation="lazy"
                            enterStyle={{opacity: 0}}
                            exitStyle={{opacity: 0}}
                        />
                    </Popover.Sheet>
                </Adapt>
            )}

            <Popover.Content
                backgroundColor={'$container'}
                borderWidth={1}
                top={-20} // Aangepaste waarde
                borderColor={'$secondary'}
                enterStyle={{y: -10, opacity: 0}}
                exitStyle={{y: -10, opacity: 0}}
                elevate
                animation={[
                    'quick',
                    {
                        opacity: {
                            overshootClamping: true,
                        },
                    },
                ]}
                style={{ transform: [{ translateY: 20 }] }} // Add CSS style here
            >
                <Popover.Arrow
                    borderWidth={1}
                    borderColor={'$secondary'}
                    backgroundColor={'$container'}
                />
                <YStack gap="$3" padding="$1">
                    <SizableText fontWeight='bold' mx='auto'>Legenda</SizableText>
                    <YStack gap="$2">
                        <XStack alignItems='center' gap='$2'>
                            <Svg
                                viewBox="0 0 155 155"
                                fillRule="evenodd"
                                clipRule="evenodd"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeMiterlimit={1.5}
                                height="36"
                                width="36"
                            >
                                <Path d="M0 0H154.167V154.167H0z" fill="none" />
                                <ClipPath id="a">
                                    <Path d="M0 0H154.167V154.167H0z" />
                                </ClipPath>
                                <G clipPath="url(#a)">
                                    <Path
                                        d="M131.25 2.083a20.833 20.833 0 0120.833 20.834V131.25a20.833 20.833 0 01-20.833 20.833H22.917A20.834 20.834 0 012.083 131.25V22.917A20.834 20.834 0 0122.917 2.083H131.25z"
                                        fill="#0891b2"
                                        stroke="#374151"
                                        strokeWidth="4.17px"
                                    />
                                </G>
                            </Svg>
                            <SizableText>Kamer</SizableText>
                        </XStack>
                        <XStack alignItems='center' gap='$2'>
                            <Svg
                                viewBox="0 0 155 155"
                                fillRule="evenodd"
                                clipRule="evenodd"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeMiterlimit={1.5}
                                height="36"
                                width="36"
                            >
                                <Path d="M0 0H154.167V154.167H0z" fill="none" />
                                <ClipPath id="a">
                                    <Path d="M0 0H154.167V154.167H0z" />
                                </ClipPath>
                                <G clipPath="url(#a)">
                                    <Path
                                        d="M131.25 2.083a20.833 20.833 0 0120.833 20.834V131.25a20.833 20.833 0 01-20.833 20.833H22.917A20.834 20.834 0 012.083 131.25V22.917A20.834 20.834 0 0122.917 2.083H131.25z"
                                        fill="#0891b2"
                                    />
                                    <ClipPath id="b">
                                        <Path d="M131.25 2.083a20.833 20.833 0 0120.833 20.834V131.25a20.833 20.833 0 01-20.833 20.833H22.917A20.834 20.834 0 012.083 131.25V22.917A20.834 20.834 0 0122.917 2.083H131.25z" />
                                    </ClipPath>
                                    <G clipPath="url(#b)">
                                        <Path
                                            d="M74.628-29.102l-117.401 117.4-13.405-13.405L61.223-42.508l13.405 13.406zM110.14-10.447L-42.773 142.465l-13.405-13.405L96.735-23.853l13.405 13.406zM164.749-10.89L-42.773 196.632l-13.405-13.406L151.344-24.296l13.405 13.406zM187.667 20.359l-230.44 230.439-13.405-13.405L174.262 6.954l13.405 13.405zM234.947 27.245l-277.72 277.72-13.405-13.405 277.72-277.72 13.405 13.405zM234.947 77.245l-277.72 277.72-13.405-13.405 277.72-277.72 13.405 13.405z"
                                            fillOpacity={0.27}
                                        />
                                    </G>
                                    <Path
                                        d="M131.25 2.083a20.833 20.833 0 0120.833 20.834V131.25a20.833 20.833 0 01-20.833 20.833H22.917A20.834 20.834 0 012.083 131.25V22.917A20.834 20.834 0 0122.917 2.083H131.25z"
                                        fill="none"
                                        stroke="#374151"
                                        strokeWidth="4.17px"
                                    />
                                </G>
                            </Svg>
                            <SizableText>Vol</SizableText>
                        </XStack>
                        <XStack alignItems='center' gap='$2'>
                            <Svg
                                viewBox="0 0 155 155"
                                fillRule="evenodd"
                                clipRule="evenodd"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeMiterlimit={1.5}
                                height="36"
                                width="36"
                            >
                                <Path d="M0 0H154.167V154.167H0z" fill="none" />
                                <ClipPath id="a">
                                    <Path d="M0 0H154.167V154.167H0z" />
                                </ClipPath>
                                <G clipPath="url(#a)">
                                    <Path
                                        d="M131.25 2.083a20.833 20.833 0 0120.833 20.834V131.25a20.833 20.833 0 01-20.833 20.833H22.917A20.834 20.834 0 012.083 131.25V22.917A20.834 20.834 0 0122.917 2.083H131.25z"
                                        fill="#0891b2"
                                        stroke="#374151"
                                        strokeWidth="4.17px"
                                    />
                                    <Path
                                        d="M103.262 42.624a34.158 34.158 0 0134.159 34.159v.016a34.158 34.158 0 01-34.159 34.159H49.634a34.158 34.158 0 01-34.158-34.159v-.016a34.158 34.158 0 0134.158-34.159h53.628z"
                                        fill="#ef4444"
                                        stroke="#fff"
                                        strokeWidth="4.17px"
                                    />
                                    <Circle
                                        cx={76.608}
                                        cy={76.901}
                                        r={21.099}
                                        fill="none"
                                        stroke="#fff"
                                        strokeWidth="6.35px"
                                        strokeMiterlimit={4}
                                    />
                                    <Path
                                        d="M76.608 68.461v8.44M76.608 85.34h.021"
                                        fill="none"
                                        fillRule="nonzero"
                                        stroke="#fff"
                                        strokeWidth="5px"
                                        strokeMiterlimit={4}
                                    />
                                </G>
                            </Svg>
                            <SizableText>Quarantaine</SizableText>
                        </XStack>
                        <XStack alignItems='center' gap='$2'>
                            <Svg
                                viewBox="0 0 155 155"
                                fillRule="evenodd"
                                clipRule="evenodd"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeMiterlimit={1.5}
                                height="36"
                                width="36"
                            >
                                <Path d="M0 0H154.167V154.167H0z" fill="none" />
                                <ClipPath id="a">
                                    <Path d="M0 0H154.167V154.167H0z" />
                                </ClipPath>
                                <G clipPath="url(#a)">
                                    <Path
                                        d="M131.25 2.083a20.833 20.833 0 0120.833 20.834V131.25a20.833 20.833 0 01-20.833 20.833H22.917A20.834 20.834 0 012.083 131.25V22.917A20.834 20.834 0 0122.917 2.083H131.25z"
                                        fill="#cb3e3e"
                                        stroke="#374151"
                                        strokeWidth="4.17px"
                                    />
                                </G>
                            </Svg>
                            <SizableText>Noodkamer</SizableText>
                        </XStack>
                    </YStack>
                </YStack>
            </Popover.Content>
        </Popover>
    )
}