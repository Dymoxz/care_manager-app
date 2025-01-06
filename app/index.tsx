import { YStack } from 'tamagui';
import { Dimensions } from 'react-native';
import color from '../constants/Colors';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export default function TabOneScreen() {
    return (
        <YStack
            f={1}
            ai="center"
            jc="center"  // Add justifyContent to center vertically
            px="$10"
            bg={color.light.background}
        >
            <YStack
                bg="#E1F4F6"
                width={(screenWidth * 85) / 100}
                height={(screenHeight * 80) / 100}
                justifyContent="center"
                alignItems="center"
                borderRadius="$10"
            >
            </YStack>
        </YStack>
    );
}
