import {Button, SizableText, YStack, Image, Input} from 'tamagui';
import {Dimensions} from 'react-native';
import color from '../../constants/Colors';

const {width: screenWidth, height: screenHeight} = Dimensions.get('window');

export default function ActivateScreen() {
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
                borderRadius="$10"
                elevation="$0.25"
            >

                <Image
                    src={require('../../assets/images/skilled-Hospice-Nurse-768x612.png')}
                    width="80%"
                    resizeMode="contain" // Ensure the aspect ratio is preserved
                    mx="auto"
                    top={0}
                />
                {/* Input */}
                <Input
                    placeholder="Voer BIG-nummer in"
                    width="70%" // Full width of the container
                    height="$5" // Set height
                    borderRadius="$8"
                    bg="white"
                    borderColor="#CCCCCC" // Light gray border
                    borderWidth={1}
                    px="$4" // Padding for the input
                    mx='auto'
                    fontSize={16} // Font size for placeholder/text
                />

                <Button bg={color.light.accent} borderRadius="$10" width="$16" height="$6" mb="$10" mx="auto"
                        pressStyle={{
                            bg: color.light.accent_focus, // Change background color when pressed
                        }}>
                    <SizableText col={color.light.accent_content} size="$6">
                        Activeer Apparaat
                    </SizableText>
                </Button>

            </YStack>
        </YStack>
    );
}
