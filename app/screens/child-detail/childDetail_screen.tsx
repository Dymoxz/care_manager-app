import React from 'react';
import { ScrollView, Dimensions } from 'react-native';
import {SizableText, YStack, XStack, Button, Separator, Circle, Accordion, Paragraph, Square,} from 'tamagui';
import TitleLayout from "../common/title_layout";
import BackButton from "../common/back_button";
import {ChevronDown} from "@tamagui/lucide-icons";

const { width: screenWidth } = Dimensions.get('window');

interface Room {
    roomNumber: number;
    floor: number;
    maxCapacity: number;
    isScaled: boolean;
}

interface Patient {
    _id: string;
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    patientNumber: number;
    room: Room;
    createdAt: string;
    updatedAt: string;
}

interface PatientDetailsScreenProps {
    route: {
        params: {
            patient: Patient;
        };
    };
    navigation: any;
}

export function AccordionDemo() {
    return (
        <Accordion overflow="hidden" width="$20" type="multiple">
            <Accordion.Item value="a1">
                <Accordion.Trigger flexDirection="row" justifyContent="space-between">
                    {({
                          open,
                      }: {
                        open: boolean
                    }) => (
                        <>
                            <Paragraph>1. Take a cold shower</Paragraph>
                            <Square animation="quick" rotate={open ? '180deg' : '0deg'}>
                                <ChevronDown size="$1" />
                            </Square>
                        </>
                    )}
                </Accordion.Trigger>
                <Accordion.HeightAnimator animation="medium">
                    <Accordion.Content animation="medium" exitStyle={{ opacity: 0 }}>
                        <Paragraph>
                            Cold showers can help reduce inflammation, relieve pain, improve
                            circulation, lower stress levels, and reduce muscle soreness and fatigue.
                        </Paragraph>
                    </Accordion.Content>
                </Accordion.HeightAnimator>
            </Accordion.Item>

            <Accordion.Item value="a2">
                <Accordion.Trigger flexDirection="row" justifyContent="space-between">
                    {({
                          open,
                      }: {
                        open: boolean
                    }) => (
                        <>
                            <Paragraph>2. Eat 4 eggs</Paragraph>
                            <Square animation="quick" rotate={open ? '180deg' : '0deg'}>
                                <ChevronDown size="$1" />
                            </Square>
                        </>
                    )}
                </Accordion.Trigger>
                <Accordion.HeightAnimator animation="medium">
                    <Accordion.Content animation="medium" exitStyle={{ opacity: 0 }}>
                        <Paragraph>
                            Eggs have been a dietary staple since time immemorial and there’s good
                            reason for their continued presence in our menus and meals.
                        </Paragraph>
                    </Accordion.Content>
                </Accordion.HeightAnimator>
            </Accordion.Item>
        </Accordion>
    )
}

export default function ChildDetailScreen({ route, navigation }: PatientDetailsScreenProps) {
    const { patient } = route.params;

    return (
        <TitleLayout
            titleText={`${patient.firstName} ${patient.lastName}`}
            topContent={<BackButton navigation={navigation} />}
        >
            <ScrollView>
                {/* Header Section */}
                <YStack
                    alignItems="center"
                    padding="$4"
                    bg="$background"
                    flexGrow={1}
                >
                    <YStack
                        width={screenWidth * 0.9}
                        backgroundColor="white"
                        borderRadius="$4"
                        padding="$4"
                        alignItems="center"
                        bg="$container_alt"
                    >
                        <Circle size="$10" bg="$accent">
                            <SizableText size="$6" fontWeight="700" color="$accent_content">
                                {patient.firstName[0]}{patient.lastName[0]}
                            </SizableText>
                        </Circle>
                        <SizableText size="$7" fontWeight="700" color="$text">
                            {patient.firstName} {patient.lastName}
                        </SizableText>
                        <SizableText size="$5" color="$danger">
                            Quarantaine: Corona
                        </SizableText>
                        <SizableText size="$5" color="$text">
                            Kamer {patient.room.roomNumber}
                        </SizableText>
                    </YStack>

                    {/* Information Section */}
                    <YStack
                        width={screenWidth * 0.9}
                        backgroundColor="white"
                        borderRadius="$4"
                        padding="$4"
                        marginTop="$4"
                        bg="$container_alt"
                    >
                        <SizableText size="$6" fontWeight="700">
                            BSN:
                        </SizableText>
                        <SizableText size="$6" paddingBottom="$4">
                            {patient.patientNumber}
                        </SizableText>
                        <SizableText size="$6" fontWeight="700">
                            Leeftijd:
                        </SizableText>
                        <SizableText size="$6" paddingBottom="$4">
                            {new Date().getFullYear() - new Date(patient.dateOfBirth).getFullYear()} jaar
                        </SizableText>
                        <SizableText size="$6" fontWeight="700">
                            Geboortedatum:
                        </SizableText>
                        <SizableText size="$6" paddingBottom="$4">
                            {new Date(patient.dateOfBirth).toLocaleDateString()}
                        </SizableText>
                        <SizableText size="$6" fontWeight="700">
                            Kamer:
                        </SizableText>
                        <SizableText size="$6" paddingBottom="$4">
                            {patient.room.roomNumber} (Floor {patient.room.floor})
                        </SizableText>
                        <SizableText size="$6" fontWeight="700">
                            Max. Capaciteit:
                        </SizableText>
                        <SizableText size="$6" paddingBottom="$4">
                            {patient.room.maxCapacity}
                        </SizableText>
                    </YStack>

                    {/* Medicijnen Section */}
                    <YStack
                        width={screenWidth * 0.9}
                        backgroundColor="white"
                        borderRadius="$4"
                        padding="$4"
                        marginTop="$4"
                        bg="$container_alt"
                    >
                        <SizableText size="$6" fontWeight="700">
                            Medicijnen
                        </SizableText>
                        <Button
                            alignSelf="stretch"
                            backgroundColor="#B9D6D6"
                            borderRadius="$2"
                            justifyContent="space-between"
                            marginTop="$2"
                        >
                            <SizableText size="$6">Abacavir</SizableText>
                            <SizableText size="$6" fontWeight="700">
                                +
                            </SizableText>
                        </Button>
                        <Button
                            alignSelf="stretch"
                            backgroundColor="#B9D6D6"
                            borderRadius="$2"
                            justifyContent="space-between"
                            marginTop="$2"
                        >
                            <SizableText size="$6">Bezlotozumab</SizableText>
                            <SizableText size="$6" fontWeight="700">
                                +
                            </SizableText>
                        </Button>
                        <Button
                            alignSelf="stretch"
                            backgroundColor="#B9D6D6"
                            borderRadius="$2"
                            justifyContent="space-between"
                            marginTop="$2"
                        >
                            <SizableText size="$6">Desoximetason</SizableText>
                            <SizableText size="$6" fontWeight="700">
                                +
                            </SizableText>
                        </Button>
                    </YStack>


                    {/* Afspraken Section */}
                    <YStack
                        width={screenWidth * 0.9}
                        backgroundColor="white"
                        borderRadius="$4"
                        padding="$4"
                        marginTop="$4"
                        bg="$container_alt"
                    >
                        <SizableText size="$6" fontWeight="700">
                            Afspraken
                        </SizableText>

                        <Accordion overflow="hidden" type="multiple">
                            <Accordion.Item value="bloedPrikken">
                                <Accordion.Trigger
                                    flexDirection="row"
                                    justifyContent="space-between"
                                    backgroundColor="#B9D6D6"
                                    borderRadius="$2"
                                    padding="$4"
                                    marginTop="$2"
                                >
                                    {({
                                          open,
                                      }: {
                                        open: boolean;
                                    }) => (
                                        <>
                                            <SizableText size="$6">Bloed Prikken</SizableText>
                                            <Square animation="quick" rotate={open ? '180deg' : '0deg'}>
                                                <ChevronDown size="$1" />
                                            </Square>
                                        </>
                                    )}
                                </Accordion.Trigger>
                                <Accordion.HeightAnimator animation="medium">
                                    <Accordion.Content animation="medium" exitStyle={{ opacity: 0 }}>
                                        <Paragraph>
                                            Details for "Bloed Prikken" go here, such as time and location.
                                        </Paragraph>
                                    </Accordion.Content>
                                </Accordion.HeightAnimator>
                            </Accordion.Item>

                            <Accordion.Item value="hartslagMeten">
                                <Accordion.Trigger
                                    flexDirection="row"
                                    justifyContent="space-between"
                                    backgroundColor="#B9D6D6"
                                    borderRadius="$2"
                                    padding="$4"
                                    marginTop="$2"
                                    height={screenWidth * 0.15}
                                >
                                    {({
                                          open,
                                      }: {
                                        open: boolean;
                                    }) => (
                                        <>
                                            <SizableText size="$6">Hartslag Meten</SizableText>
                                            <Square animation="quick" rotate={open ? '180deg' : '0deg'}>
                                                <ChevronDown size="$1" />
                                            </Square>
                                        </>
                                    )}
                                </Accordion.Trigger>
                                <Accordion.HeightAnimator animation="medium">
                                    <Accordion.Content animation="medium" exitStyle={{ opacity: 0 }}>
                                        <Paragraph>
                                            Details for "Hartslag Meten" go here, such as time and preparation instructions.
                                        </Paragraph>
                                    </Accordion.Content>
                                </Accordion.HeightAnimator>
                            </Accordion.Item>

                            <Accordion.Item value="sondeVerwijderen">
                                <Accordion.Trigger
                                    flexDirection="row"
                                    justifyContent="space-between"
                                    backgroundColor="#B9D6D6"
                                    borderRadius="$2"
                                    padding="$4"
                                    marginTop="$2"
                                >
                                    {({
                                          open,
                                      }: {
                                        open: boolean;
                                    }) => (
                                        <>
                                            <SizableText size="$6">Sonde Verwijderen</SizableText>
                                            <Square animation="quick" rotate={open ? '180deg' : '0deg'}>
                                                <ChevronDown size="$1" />
                                            </Square>
                                        </>
                                    )}
                                </Accordion.Trigger>
                                <Accordion.HeightAnimator animation="medium">
                                    <Accordion.Content animation="medium" exitStyle={{ opacity: 0 }}>
                                        <Paragraph>
                                            Details for "Sonde Verwijderen" go here, such as required equipment.
                                        </Paragraph>
                                    </Accordion.Content>
                                </Accordion.HeightAnimator>
                            </Accordion.Item>
                        </Accordion>
                    </YStack>



                    {/* Checks Section */}
                    <YStack
                        width={screenWidth * 0.9}
                        backgroundColor="white"
                        borderRadius="$4"
                        padding="$4"
                        marginTop="$4"
                        bg="$container_alt"
                    >
                        <SizableText size="$6" fontWeight="700">
                            Checks
                        </SizableText>
                        <SizableText size="$5" marginTop="$2">
                            Ma. 01-12-24 (09:30)
                        </SizableText>
                        <SizableText size="$5" marginTop="$2">
                            Ma. 01-12-24 (15:00)
                        </SizableText>
                        <SizableText size="$5" marginTop="$2">
                            Wo. 03-12-24 (10:00)
                        </SizableText>
                    </YStack>

                    {/* Add Button */}
                   {/* <TouchableOpacity
                        padding="$4"
                        borderRadius="$4"
                        backgroundColor="#FF6B6B"
                        alignItems="center"
                        justifyContent="center"
                        marginTop="$4"
                        width="$10"
                        height="$10"
                    >
                        <SizableText size="$6" color="white" fontWeight="700">
                            +
                        </SizableText>
                    </TouchableOpacity>*/}
                </YStack>
            </ScrollView>
        </TitleLayout>
    );
}
