import { Button, SizableText, YStack, Image, Input } from 'tamagui';
import { Dimensions } from 'react-native';
import color from '../../constants/Colors';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export default function ActivateScreen( {navigation}  ) {
    return (
        <YStack
            f={1}
            ai="center"
            jc="center"
            px="$10"
            bg={color.light.background}
        >
            <YStack
                bg="#E1F4F6"
                width={(screenWidth * 85) / 100}
                height={(screenHeight * 80) / 100}
                borderRadius="$10"
                elevation="$0.25"
                padding="$4"
            >
                {/* Image */}
                <Image
                    src={require('../../assets/images/skilled-Hospice-Nurse-768x612.png')}
                    width="80%"
                    resizeMode="contain"
                    mx="auto"
                    mt="$4" // Add margin-top to position the image
                />

                {/* Input */}
                <YStack f={1} ai="center" jc="flex-end" mt="$6">
                    <Input
                        placeholder="Voer BIG-nummer in"
                        width="70%"
                        height="$5"
                        borderRadius="$8"
                        bg="white"
                        borderColor="#CCCCCC"
                        borderWidth={1}
                        px="$4"
                        fontSize={16}
                    />
                </YStack>

                {/* Button */}
                <YStack ai="center" jc="flex-end" mt="$6">
                    <Button
                        bg={color.light.accent}
                        borderRadius="$10"
                        width="$16"
                        height="$6"
                        mb="$10"
                        mx="auto"
                        pressStyle={{
                            bg: color.light.accent_focus,
                        }}
                        onPress={() => navigation.navigate('StartShiftScreen')}
                    >
                        <SizableText col={color.light.accent_content} size="$6">
                            Activeer Apparaat
                        </SizableText>
                    </Button>
                </YStack>
            </YStack>
        </YStack>
    );
}
