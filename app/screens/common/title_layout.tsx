import React from 'react';
import { Paragraph, XStack, YStack } from 'tamagui';
import color from '../../../constants/Colors';
import {Dimensions} from "react-native";

const {width: screenWidth} = Dimensions.get('window');


type TitleLayoutProps = {
    titleText: string;
    children: React.ReactNode;
    background?: string;
    paddingTop?: string;
    topContent?: React.ReactNode; // New prop for content above the title
};

const TitleLayout: React.FC<TitleLayoutProps> = ({
                                                     titleText,
                                                     children,
                                                     background = color.light.background,
                                                     paddingTop = '$6',
                                                     topContent,
                                                 }) => {
    return (
        <YStack f={1} bg={background} pt={paddingTop}>
            {/* Top content section */}
            <XStack height="$6" ai="center" jc="center">
                {topContent}
            </XStack>

            {/* Title section */}
            <YStack>
                <Paragraph
                    size="$9"
                    fontWeight="700"
                    py="$6"
                    style={{ textAlign: 'left' }}
                    ml={screenWidth * 0.05}
                >
                    {titleText}
                </Paragraph>

                {/* Main children */}
            </YStack>
                {children}
        </YStack>
    );
};

export default TitleLayout;
