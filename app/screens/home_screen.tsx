import {Button, Card, CardProps, Paragraph, ScrollView, SizableText, XStack, YStack} from 'tamagui';
import React from 'react';
import {Dimensions} from 'react-native';
import {CirclePlay, Rocket} from '@tamagui/lucide-icons';
import color from "../../constants/Colors";
import colors from "../../constants/Colors";
import Svg, {Path, Rect} from 'react-native-svg';

const {width: screenWidth, height: screenHeight} = Dimensions.get('window');

export function DemoCard({title, icon, onPress, ...props}: CardProps & {
    title: string;
    icon: any;
    onPress: () => void
}) {
    return (
        <Card size="$4" bordered {...props} bg="white" onPress={onPress} borderRadius="$6" elevation='$0.25' jc="center" px='$2' height="auto">
            <YStack ai="center" jc="center" py='$4'>
                {icon}
                <Paragraph pt='$3' fontWeight='600' textAlign='center' lineHeight='$1' col={colors.light.text}>{title}</Paragraph>
            </YStack>
        </Card>
    );
}

export default function HomeScreen({navigation}) {
    const pages = [
        {title: 'Activate', navLink: 'ActivateScreen', icon: <Rocket/>},
        {title: 'Start Shift', icon: <CirclePlay/>, navLink: 'StartShiftScreen'},
        {
            title: 'Patïenten',
            navLink: 'PatientListScreen',
            icon: <Svg width='100%' data-name="Layer 1" viewBox="0 0 128 128"><Path fill="#2d4356"
                                                                                    d="M102,0H26a8.01062,8.01062,0,0,0-8,8V120a8.01066,8.01066,0,0,0,8,8H93a4.0041,4.0041,0,0,0,2.83-1.17l13-13A4.0039,4.0039,0,0,0,110,111V8A8.01062,8.01062,0,0,0,102,0ZM37,4H91V9.4H82a1.96378,1.96378,0,0,0-.59.09L64,14.91,46.59,9.49A1.96378,1.96378,0,0,0,46,9.4L37,9.39Zm69,107L93,124H26a3.99891,3.99891,0,0,1-4-4V8a3.99887,3.99887,0,0,1,4-4h7V9.53a3.93432,3.93432,0,0,0,4,3.87h8.7l17.71,5.51a1.9785,1.9785,0,0,0,1.18005,0L82.3,13.4H91a3.93432,3.93432,0,0,0,4-3.87V4h7a3.99887,3.99887,0,0,1,4,4Z"/><Path
                fill="#fc785e"
                d="M91,4V9.4H82a1.96378,1.96378,0,0,0-.59.09L64,14.91,46.59,9.49A1.96378,1.96378,0,0,0,46,9.4L37,9.39V4Z"/><Path
                fill="#e1ebf4"
                d="M102,4H95V9.53a3.93432,3.93432,0,0,1-4,3.87H82.3L64.59,18.91a1.9785,1.9785,0,0,1-1.18005,0L45.7,13.4H37a3.93432,3.93432,0,0,1-4-3.87V4H26a3.99887,3.99887,0,0,0-4,4V120a3.99891,3.99891,0,0,0,4,4H93l13-13V8A3.99887,3.99887,0,0,0,102,4ZM40,100a3.99891,3.99891,0,0,1-4,4H30a3.99891,3.99891,0,0,1-4-4V94a3.99887,3.99887,0,0,1,4-4h6a3.99887,3.99887,0,0,1,4,4Zm0-20a3.99891,3.99891,0,0,1-4,4H30a3.99891,3.99891,0,0,1-4-4V74a3.99887,3.99887,0,0,1,4-4h6a3.99887,3.99887,0,0,1,4,4Zm0-20a3.99891,3.99891,0,0,1-4,4H30a3.99891,3.99891,0,0,1-4-4V54a3.99887,3.99887,0,0,1,4-4h6a3.99887,3.99887,0,0,1,4,4Zm0-20a3.99891,3.99891,0,0,1-4,4H30a3.99891,3.99891,0,0,1-4-4V34a3.99887,3.99887,0,0,1,4-4h6a3.99887,3.99887,0,0,1,4,4Z"/><Path
                fill="#2d4356"
                d="M48 34h52a2 2 0 0 0 0-4H48a2 2 0 0 0 0 4zM48 44h52a2 2 0 0 0 0-4H48a2 2 0 0 0 0 4zM48 54h52a2 2 0 0 0 0-4H48a2 2 0 0 0 0 4zM48 64h52a2 2 0 0 0 0-4H48a2 2 0 0 0 0 4zM48 74h52a2 2 0 0 0 0-4H48a2 2 0 0 0 0 4zM48 84h52a2 2 0 0 0 0-4H48a2 2 0 0 0 0 4zM48 94h52a2 2 0 0 0 0-4H48a2 2 0 0 0 0 4zM48 104h52a2 2 0 0 0 0-4H48a2 2 0 0 0 0 4zM36 30H30a3.99887 3.99887 0 0 0-4 4v6a3.99891 3.99891 0 0 0 4 4h6a3.99891 3.99891 0 0 0 4-4V34A3.99887 3.99887 0 0 0 36 30zm0 10H30V34h6z"/><Rect
                width="6" height="6" x="30" y="34" fill="#81d9e3"/><Path fill="#2d4356"
                                                                         d="M36,50H30a3.99887,3.99887,0,0,0-4,4v6a3.99891,3.99891,0,0,0,4,4h6a3.99891,3.99891,0,0,0,4-4V54A3.99887,3.99887,0,0,0,36,50Zm0,10H30V54h6Z"/><Rect
                width="6" height="6" x="30" y="54" fill="#81d9e3"/><Path fill="#2d4356"
                                                                         d="M36,70H30a3.99887,3.99887,0,0,0-4,4v6a3.99891,3.99891,0,0,0,4,4h6a3.99891,3.99891,0,0,0,4-4V74A3.99887,3.99887,0,0,0,36,70Zm0,10H30V74h6Z"/><Rect
                width="6" height="6" x="30" y="74" fill="#81d9e3"/><Path fill="#2d4356"
                                                                         d="M36,90H30a3.99887,3.99887,0,0,0-4,4v6a3.99891,3.99891,0,0,0,4,4h6a3.99891,3.99891,0,0,0,4-4V94A3.99887,3.99887,0,0,0,36,90Zm0,10H30V94h6Z"/><Rect
                width="6" height="6" x="30" y="94" fill="#81d9e3"/><Path fill="#2d4356"
                                                                         d="M47,120H81a2,2,0,0,0,0-4H47a2,2,0,0,0,0,4Z"/><Path
                fill="#fff" d="M106,8v2a3.99887,3.99887,0,0,0-4-4H95V4h7A3.99887,3.99887,0,0,1,106,8Z"
                opacity=".5"/><Path fill="#a54b3f"
                                    d="M91,7.4v2H82a1.96339,1.96339,0,0,0-.59.09L64,14.91,46.59,9.49A1.96378,1.96378,0,0,0,46,9.4L37,9.39v-2L46,7.4a1.96378,1.96378,0,0,1,.59.09L64,12.91,81.41,7.49A1.96339,1.96339,0,0,1,82,7.4Z"
                                    opacity=".5"/><Rect width="54" height="2" x="37" y="4" fill="#f9dbd7" opacity=".3"/><Path
                fill="#fff" d="M33,4V6H26a3.99891,3.99891,0,0,0-4,4V8a3.99891,3.99891,0,0,1,4-4Z" opacity=".5"/><Path
                fill="#9fa5aa" d="M106,109v2L93,124H26a3.999,3.999,0,0,1-4-4v-2a3.999,3.999,0,0,0,4,4H93Z"
                opacity=".5"/><Rect width="6" height="2" x="30" y="38" fill="#0f423c" opacity=".25"/><Rect width="6"
                                                                                                           height="2"
                                                                                                           x="30" y="58"
                                                                                                           fill="#0f423c"
                                                                                                           opacity=".25"/><Rect
                width="6" height="2" x="30" y="78" fill="#0f423c" opacity=".25"/><Rect width="6" height="2" x="30"
                                                                                       y="98" fill="#0f423c"
                                                                                       opacity=".25"/></Svg>
        },
    ];

    const cardSpacing = 16;
    const cardWidth = (screenWidth - cardSpacing * 4) / 3;
    const cardHeight = cardWidth * 0.8;

    return (
        <YStack f={1} bg={color.light.background} pt='$8'>
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
                bottom='$6'
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
