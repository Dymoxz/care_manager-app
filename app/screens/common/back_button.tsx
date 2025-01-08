import {ArrowLeft} from "@tamagui/lucide-icons";
import {Button} from "tamagui";
import React from "react";
import {Dimensions} from "react-native";

export default function BackButton( { navigation } ) {

    const {width: screenWidth} = Dimensions.get('window');


    return (
        <Button
            bg='$primary'
            borderRadius="$10"
            width='$3'
            height='$3'
            animation="bouncy"
            hoverStyle={{scale: 0.990, backgroundColor: '$primary_focus'}}
            pressStyle={{scale: 0.975, backgroundColor: '$primary_focus'}}
            icon={<ArrowLeft size='$2' color={'white'}/>}
            onPress={() => navigation.goBack()}
            position='absolute'
            left={screenWidth * 0.05}
            top='$5'
            // style={{ position: 'absolute', left: '20', top: 10 }}
        />
    );
}