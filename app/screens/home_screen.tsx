import {Button, Card, CardProps, Paragraph, ScrollView, SizableText, XStack, YStack} from 'tamagui';
import React from 'react';
import {Dimensions} from 'react-native';
import {CirclePlay, ClipboardList, Rocket} from '@tamagui/lucide-icons';
import color from "../../constants/Colors";

const {width: screenWidth, height: screenHeight} = Dimensions.get('window');

export function DemoCard({title, icon, onPress, ...props}: CardProps & {
    title: string;
    icon: any;
    onPress: () => void
}) {
    return (
        <Card size="$4" bordered {...props} bg="white" onPress={onPress}>
            <YStack ai="center" jc="center" h="100%" space>
                {icon}
                <SizableText>{title}</SizableText>
            </YStack>
        </Card>
    );
}

export default function HomeScreen({navigation}) {
    const pages = [
        {title: 'Activate', icon: <Rocket/>, navLink: 'ActivateScreen'},
        {title: 'Start Shift', icon: <CirclePlay/>, navLink: 'StartShiftScreen'},
        {title: 'Patient List', icon: <ClipboardList/>, navLink: 'PatientListScreen'},
    ];

    const cardSpacing = 16;
    const cardWidth = (screenWidth - cardSpacing * 4) / 3;
    const cardHeight = cardWidth * 0.8;

    return (
        <YStack f={1} bg={color.light.background}>
            <ScrollView
                contentContainerStyle={{
                    padding: cardSpacing,
                    paddingBottom: screenHeight * 0.1, // Extra padding for button space
                }}
                style={{backgroundColor: 'transparent'}}
            >
                <Paragraph size="$9" fontWeight="700" py="$6" style={{textAlign: 'center'}}>
                    Selecteer een taak
                </Paragraph>

                <YStack space={cardSpacing}>
                    {pages.map((page, index) => {
                        const isFirstInRow = index % 3 === 0;

                        return (
                            isFirstInRow && (
                                <XStack key={index} space={cardSpacing}>
                                    {pages.slice(index, index + 3).map((page, subIndex) => (
                                        <DemoCard
                                            key={subIndex + index}
                                            title={page.title}
                                            icon={page.icon}
                                            onPress={() => navigation.navigate(page.navLink)}
                                            width={cardWidth}
                                            height={cardHeight}
                                            animation="bouncy"
                                            hoverStyle={{scale: 0.925}}
                                            pressStyle={{scale: 0.875}}
                                        />
                                    ))}
                                </XStack>
                            )
                        );
                    })}
                </YStack>
            </ScrollView>

            {/* Fixed Button */}
            <YStack
                position="absolute"
                bottom={16}
                left={0}
                right={0}
                ai="center"
                style={{
                    backgroundColor: 'transparent',
                }}
            >
                <Button
                    bg={color.light.danger}
                    borderRadius="$10"
                    width={(screenWidth * 50) / 100}
                    height="$6"
                    pressStyle={{
                        bg: color.light.danger_focus,
                    }}
                    borderColor={color.light.danger_focus}
                    onPress={() => {
                        navigation.navigate('StartShiftScreen');
                    }
                }
                >
                    <SizableText col='white' size="$4" textAlign="center">
                        Dienst Beëindigen
                    </SizableText>
                </Button>
            </YStack>
        </YStack>
    );
}
