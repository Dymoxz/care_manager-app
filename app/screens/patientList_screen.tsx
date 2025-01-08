import React, {useState} from 'react';
import {Button, Input, SizableText, XStack, YStack} from 'tamagui';
import {Dimensions} from 'react-native';
import {AlertCircle, ArrowLeft, Bed, FileHeart} from '@tamagui/lucide-icons';
import TitleLayout from "./common/title_layout";
import BackButton from "./common/back_button";

const {width: screenWidth} = Dimensions.get('window');

interface PatientCardProps {
    name: string;
    room: string;
    hasAlert: boolean;
}

function PatientCard({name, room, hasAlert}: PatientCardProps) {

    return (
        <XStack
            bg='$container_alt'
            borderRadius="$6"
            p="$4"
            py="$5"
            ai="center"
            jc="space-between"
            mb="$4"
            elevation="$0.25"
            width={(screenWidth * 90) / 100}
        >
            <XStack ai="center">
                <YStack mr="$2" ml='$2'>
                    <AlertCircle size="$2" color={hasAlert ? '$danger' : '$container_alt'}/>
                </YStack>

                <YStack ml='$4'>
                    <SizableText size="$8" fontWeight="700" col='$text'>
                        {name}
                    </SizableText>
                    <XStack ai="center" mt="$1">
                        {/* Adjust the size of the <Bed /> icon */}
                        <Bed style={{}} mr='$2'/>
                        <SizableText size="$4" col='$text'>
                            Kamer {room}
                        </SizableText>
                    </XStack>
                </YStack>
            </XStack>
            <Button
                bg='$accent'
                borderRadius="$10"
                width='$5'
                mr='$2'
                height='$5'
                animation="bouncy"
                hoverStyle={{scale: 0.990, backgroundColor: '$accent_focus'}}
                pressStyle={{scale: 0.975, backgroundColor: '$accent_focus'}}
                icon={<FileHeart size='$2' color='$accent_content'/>}
            >

            </Button>
        </XStack>
    );
}

export default function KinderOverzichtScreen({navigation}) {
    const [searchQuery, setSearchQuery] = useState('');
    const patients = [
        {name: 'Dymo Waltheer', room: '4b', hasAlert: true},
        {name: 'Menno Emmerik', room: '5b', hasAlert: false},
        {name: 'Stef Rensma', room: '6a', hasAlert: true},
    ];

    // Filter patients based on the search query
    const filteredPatients = patients.filter(
        (patient) => {
            const nameParts = patient.name.toLowerCase().split(' ');
            return nameParts.some(part => part.startsWith(searchQuery.toLowerCase())) ||
                patient.room.toLowerCase().startsWith(searchQuery.toLowerCase());
        }
    );

    return (

        <TitleLayout
            titleText='Kinder Overzicht'
            topContent={
                <BackButton navigation={navigation}/>
            }
        >
            <YStack ai="center">
                <Input
                    placeholder="Zoek een patiënt of kamer"
                    bg="white"
                    borderRadius="$6"
                    width={(screenWidth * 90) / 100}
                    px="$4"
                    py="$4"
                    h='auto'
                    fontSize="$6"
                    mb="$3"
                    value={searchQuery}
                    onChangeText={(text) => setSearchQuery(text)} // Update search query
                />

                {/* Patient List */}
                <YStack space="$1" width={(screenWidth * 90) / 100}>
                    {filteredPatients.map((patient, index) => (
                        <PatientCard
                            key={index}
                            name={patient.name}
                            room={patient.room}
                            hasAlert={patient.hasAlert}
                        />
                    ))}
                </YStack>
            </YStack>
        </TitleLayout>


    );
}
