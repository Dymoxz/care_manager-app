import React from 'react';
import {PopoverProps, SizableText, Circle, Square} from 'tamagui';
import {Adapt, Button, Input, Label, Popover, XStack, YStack, Theme, useTheme} from 'tamagui';
import { CircleHelp } from "@tamagui/lucide-icons";

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
                            <Square borderRadius='$3' size="$3" bg="$primary"/>
                            <SizableText>Kamer</SizableText>
                        </XStack>
                        <XStack alignItems='center' gap='$2'>
                            <Square borderRadius='$3' size="$3" bg="$green10"/>
                            <SizableText>Bezet</SizableText>
                        </XStack>
                        <XStack alignItems='center' gap='$2'>
                            <Square borderRadius='$3' size="$3" bg="$red10"/>
                            <SizableText>Quarantaine</SizableText>
                        </XStack>
                        <XStack alignItems='center' gap='$2'>
                            <Square borderRadius='$3' size="$3" bg="$red10"/>
                            <SizableText>Noodkamer</SizableText>
                        </XStack>
                    </YStack>
                </YStack>
            </Popover.Content>
        </Popover>
    )
}