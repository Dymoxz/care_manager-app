import React from 'react';
import { Paragraph, XStack, YStack } from 'tamagui';
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
                                                     background = 'transparent',
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
            <YStack
                elevation="$0.25"
                my='$4'
                borderRadius='$10'
                bg='$container'
                mr={screenWidth * 0.05}
                ml={screenWidth * 0.05}

            >
                <Paragraph
                    size="$9"
                    fontWeight="700"
                    py="$2"
                    px='$5'
                    style={{ textAlign: 'left' }}
                    col={'$text'}
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
