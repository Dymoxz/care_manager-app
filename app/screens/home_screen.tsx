import { CardProps, Card, YStack, XStack, SizableText, ScrollView, Paragraph } from 'tamagui';
import React from 'react';
import { Dimensions } from 'react-native';
import { CirclePlay, Rocket, ClipboardList } from '@tamagui/lucide-icons';

const { width: screenWidth } = Dimensions.get('window');

export function DemoCard({ title, icon, onPress, ...props }: CardProps & { title: string; icon: any; onPress: () => void }) {
    return (
        <Card size="$4" bordered {...props} bg="white" onPress={onPress}>
            <YStack ai="center" jc="center" h="100%" space>
                {icon}
                <SizableText>{title}</SizableText>
            </YStack>
        </Card>
    );
}

export default function HomeScreen({ navigation }) {
    const pages = [
        { title: 'Activate', icon: <Rocket />, navLink: 'ActivateScreen' },
        { title: 'Start Shift', icon: <CirclePlay />, navLink: 'StartShiftScreen' },
        { title: 'Patient List', icon: <ClipboardList/>, navLink: 'PatientListScreen' },
        // Add more pages here as needed
    ];

    // Calculate card dimensions dynamically
    const cardSpacing = 16; // Space between cards
    const cardWidth = (screenWidth - cardSpacing * 4) / 3; // 3 items per row, including spacing
    const cardHeight = cardWidth * 0.8; // Maintain a rectangular aspect ratio

    return (
        <YStack f={1} bg="#caf0f8">
            <ScrollView
                contentContainerStyle={{
                    padding: cardSpacing,
                    paddingTop: cardSpacing * 3,
                    paddingBottom: cardSpacing * 3,
                }}
                style={{ backgroundColor: 'transparent' }} // Ensures no background color
            >
                <Paragraph size="$9" fontWeight="700" py="$6" style={{ textAlign: 'center' }}>
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
                                            hoverStyle={{ scale: 0.925 }}
                                            pressStyle={{ scale: 0.875 }}
                                        />
                                    ))}
                                </XStack>
                            )
                        );
                    })}
                </YStack>
            </ScrollView>
        </YStack>
    );
}
