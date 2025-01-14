import React, { useState, useRef } from 'react';
import { ScrollView, Dimensions, Modal, TouchableOpacity, Animated, Easing } from 'react-native';
import {
    SizableText,
    YStack,
    XStack,
    Button,
    Separator,
    Circle,
    Fieldset,
    Label,
    Input,
    TooltipSimple,
    Unspaced,
    Accordion,
    Square,
    Paragraph,
} from 'tamagui';
import TitleLayout from "../common/title_layout";
import BackButton from "../common/back_button";
import { ChevronDown, Edit3, Plus, Trash, X, Calendar, Pill } from "@tamagui/lucide-icons";
import Svg, { Path } from "react-native-svg";
import theme from "tailwindcss/defaultTheme";
import MedicineDetailModal from "./medicineDetail_modal";
import DeleteModal from "./delete_modal";

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

    const [isDischargeModalVisible, setDischargeModalVisible] = useState(false);

    const handleDischargePress = () => {
        setDischargeModalVisible(true);
    };

    const handleDischargeConfirm = (reason: string) => {
        console.log('Discharge reason:', reason);
        //Handle logic of reason here, like sending an api request.
        setDischargeModalVisible(false);
    };


    const handleCloseModal = () => {
        setDischargeModalVisible(false);
    };

    const [selectedMedicine, setSelectedMedicine] = useState<string | null>(null);
    const [isModalVisible, setModalVisible] = useState(false);

    const openMedicineDetailModal = (medicine: string) => {
        setSelectedMedicine(medicine);
        setModalVisible(true);
    };

    const closeMedicineDetailModal = () => {
        setSelectedMedicine(null);
        setModalVisible(false);
    };

    const timelineItems = [
        'Bloed Prikken',
        'Hartslag Meten',
        'Sonde Verwijderen',
    ];

    const [selectedTimelineItem, setSelectedTimelineItem] = useState<string | null>(null);

    const openTimelineItemModal = (item: string) => {
        setSelectedTimelineItem(item);
        setModalVisible(true);
    };

    const closeTimelineItemModal = () => {
        setSelectedTimelineItem(null);
        setModalVisible(false);
    };

    const [isFABOpen, setFABOpen] = useState(false);
    const fabMenuAnimation = useRef(new Animated.Value(0)).current;
    const iconRotationAnimation = useRef(new Animated.Value(0)).current;

    const toggleFABMenu = () => {

        const toValue = isFABOpen ? 0 : 1;

        // Animate icon rotation
        Animated.timing(iconRotationAnimation, {
            toValue,
            duration: 300,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
        }).start();

        // Animate menu slide
        Animated.timing(fabMenuAnimation, {
            toValue,
            duration: 300,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: false, // Cannot use native driver for 'opacity'
        }).start();

        // Update state after the animations
        setFABOpen(!isFABOpen);

    };

    const iconRotateStyle = {
        transform: [
            {
                rotate: iconRotationAnimation.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['0deg', '45deg'],
                }),
            },
        ],
    };

    const fabMenuStyle = {
        transform: [
            {
                translateY: fabMenuAnimation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, -180],
                }),
            },
        ],
        opacity: fabMenuAnimation.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1], // Fade in/out with the animation
        }),
    };

    return (
        <TitleLayout
            titleText={`${patient.firstName} ${patient.lastName}`}
            topContent={<BackButton navigation={navigation} />}
        >
            <ScrollView>
                <YStack
                    alignItems="center"
                    padding="$4"
                    bg="$background"
                    flexGrow={1}
                >
                    {/* Patient Header */}
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

                    {/* Medicine Section */}
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
                        {['Abacavir', 'Bezlotozumab', 'Desoximetason'].map((medicine, index) => (
                            <Button
                                key={index}
                                alignSelf="stretch"
                                backgroundColor="#B9D6D6"
                                borderRadius="$2"
                                justifyContent="space-between"
                                marginTop="$2"
                                onPress={() => openMedicineDetailModal(medicine)} // Open modal
                                animation="quick"
                            >
                                <SizableText size="$6">{medicine}</SizableText>
                                <SizableText size="$6" fontWeight="700">+</SizableText>
                            </Button>
                        ))}
                    </YStack>

                    {/* Medicine Modal */}
                    <Modal
                        visible={isModalVisible}
                        animationType="slide"
                        transparent={true}
                        onRequestClose={closeMedicineDetailModal}
                    >
                        <MedicineDetailModal
                            medicine={selectedMedicine}
                            onClose={closeMedicineDetailModal}
                            screenWidth={screenWidth}
                        />

                    </Modal>

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
                                    {({ open }: { open: boolean }) => (
                                        <>
                                            <SizableText size="$6">Bloed Prikken</SizableText>
                                            <Square animation="quick" rotate={open ? '180deg' : '0deg'}>
                                                <ChevronDown size="$1" />
                                            </Square>
                                        </>
                                    )}
                                </Accordion.Trigger>
                                <Accordion.HeightAnimator
                                    animation="medium"
                                    enterStyle={{
                                        opacity: 0,
                                        transform: [{ translateY: -20 }],
                                    }}
                                    exitStyle={{
                                        opacity: 0,
                                        transform: [{ translateY: -20 }],
                                    }}
                                    style={{
                                        opacity: 1,
                                        transform: [{ translateY: 0 }],
                                    }}
                                >
                                    <Accordion.Content>
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
                                    {({ open }: { open: boolean }) => (
                                        <>
                                            <SizableText size="$6">Hartslag Meten</SizableText>
                                            <Square animation="quick" rotate={open ? '180deg' : '0deg'}>
                                                <ChevronDown size="$1" />
                                            </Square>
                                        </>
                                    )}
                                </Accordion.Trigger>
                                <Accordion.HeightAnimator
                                    animation="medium"
                                    enterStyle={{
                                        opacity: 0,
                                        transform: [{ translateY: -20 }],
                                    }}
                                    exitStyle={{
                                        opacity: 0,
                                        transform: [{ translateY: -20 }],
                                    }}
                                    style={{
                                        opacity: 1,
                                        transform: [{ translateY: 0 }],
                                    }}
                                >
                                    <Accordion.Content>
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
                                    {({ open }: { open: boolean }) => (
                                        <>
                                            <SizableText size="$6">Sonde Verwijderen</SizableText>
                                            <Square animation="quick" rotate={open ? '180deg' : '0deg'}>
                                                <ChevronDown size="$1" />
                                            </Square>
                                        </>
                                    )}
                                </Accordion.Trigger>
                                <Accordion.HeightAnimator
                                    animation="medium"
                                    enterStyle={{
                                        opacity: 0,
                                        transform: [{ translateY: -20 }],
                                    }}
                                    exitStyle={{
                                        opacity: 0,
                                        transform: [{ translateY: -20 }],
                                    }}
                                    style={{
                                        opacity: 1,
                                        transform: [{ translateY: 0 }],
                                    }}
                                >
                                    <Accordion.Content>
                                        <Paragraph>
                                            Details for "Sonde Verwijderen" go here, such as required equipment.
                                        </Paragraph>
                                    </Accordion.Content>
                                </Accordion.HeightAnimator>
                            </Accordion.Item>
                        </Accordion>
                    </YStack>

                    {/* Timeline Section */}
                    <YStack
                        width={screenWidth * 0.9}
                        backgroundColor="white"
                        borderRadius="$4"
                        padding="$4"
                        marginTop="$4"
                        bg="$container_alt"
                    >
                        {timelineItems.map((item, index) => (
                            <YStack key={index} width="100%" alignItems="flex-start">
                                {/* Line Separator */}
                                {index !== 0 && (
                                    <YStack
                                        width={1}
                                        height={20}
                                        backgroundColor="$borderColor"
                                        alignSelf="center"
                                        marginLeft={15}
                                    />
                                )}
                                <XStack space="$4" alignItems="center">
                                    <Svg width="20" height="20" viewBox="0 0 20 20">
                                        <Path
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 101.061 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                                            fill="#DF9D4D"
                                        />
                                    </Svg>
                                    <YStack
                                        backgroundColor="$backgroundStrong"
                                        borderRadius="$4"
                                        padding="$4"
                                        flex={1}
                                    >
                                        <SizableText
                                            fontSize="$6"
                                            fontWeight="bold"
                                            onPress={() => openTimelineItemModal(item)} // Open modal on press
                                        >
                                            {item}
                                        </SizableText>
                                    </YStack>
                                </XStack>
                            </YStack>
                        ))}
                    </YStack>

                    {/* Timeline Item Modal */}
                    <Modal
                        visible={!!selectedTimelineItem}
                        animationType="slide"
                        transparent={true}
                        onRequestClose={closeTimelineItemModal}
                    >
                        <YStack
                            flex={1}
                            justifyContent="center"
                            alignItems="center"
                            backgroundColor="rgba(0, 0, 0, 0.5)"
                        >
                            <YStack
                                width={screenWidth * 0.9}
                                backgroundColor="white"
                                borderRadius="$4"
                                padding="$4"
                            >
                                <SizableText size="$7" fontWeight="700" marginBottom="$4">
                                    {selectedTimelineItem}
                                </SizableText>
                                <Paragraph size="$5" color="$textSecondary">
                                    Details for "{selectedTimelineItem}" go here. Provide relevant information about the task.
                                </Paragraph>
                                <Button
                                    marginTop="$4"
                                    onPress={closeTimelineItemModal}
                                    backgroundColor="$secondary"
                                    borderRadius="$2"
                                >
                                    Close
                                </Button>
                            </YStack>
                        </YStack>
                    </Modal>

                </YStack>

            </ScrollView>
            {/* Floating Action Button (FAB) */}
            <YStack
                position="absolute"
                bottom={20}
                right={20}
                alignItems="flex-end"
                space="$2"
            >
                <Animated.View style={fabMenuStyle}>
                    {isFABOpen && (
                        <>
                            <TouchableOpacity
                                onPress={handleDischargePress}
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    backgroundColor: 'white',
                                    paddingVertical: 10,
                                    paddingHorizontal: 15,
                                    borderRadius: 10,
                                    shadowColor: '#000',
                                    shadowOpacity: 0.1,
                                    shadowOffset: { width: 0, height: 2 },
                                    shadowRadius: 4,
                                    elevation: 3,
                                    marginBottom: 8,
                                }}
                            >
                                <Trash size={24} color="red" />
                                <SizableText size="$5" color="red" marginLeft="$2">
                                    Ontslag
                                </SizableText>
                            </TouchableOpacity>


                            <TouchableOpacity
                                onPress={() => console.log('Afspraak maken')}
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    backgroundColor: 'white',
                                    paddingVertical: 10,
                                    paddingHorizontal: 15,
                                    borderRadius: 10,
                                    shadowColor: '#000',
                                    shadowOpacity: 0.1,
                                    shadowOffset: { width: 0, height: 2 },
                                    shadowRadius: 4,
                                    elevation: 3,
                                    marginBottom: 8,
                                }}
                            >
                                <Calendar size={24} color="black" />
                                <SizableText size="$5" color="black" marginLeft="$2">
                                    Afspraak maken
                                </SizableText>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => console.log('Med check')}
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    backgroundColor: 'white',
                                    paddingVertical: 10,
                                    paddingHorizontal: 15,
                                    borderRadius: 10,
                                    shadowColor: '#000',
                                    shadowOpacity: 0.1,
                                    shadowOffset: { width: 0, height: 2 },
                                    shadowRadius: 4,
                                    elevation: 3,
                                    marginBottom: 8,
                                }}
                            >
                                <Pill size={24} color="black" />
                                <SizableText size="$5" color="black" marginLeft="$2">
                                    Med Check
                                </SizableText>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() => console.log('Edit')}
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    backgroundColor: 'white',
                                    paddingVertical: 10,
                                    paddingHorizontal: 15,
                                    borderRadius: 10,
                                    shadowColor: '#000',
                                    shadowOpacity: 0.1,
                                    shadowOffset: { width: 0, height: 2 },
                                    shadowRadius: 4,
                                    elevation: 3,
                                }}
                            >
                                <Edit3 size={24} color="#000" />
                                <SizableText size="$5" color="#000" marginLeft="$2">
                                    Edit
                                </SizableText>
                            </TouchableOpacity>
                        </>
                    )}
                </Animated.View>

                {/* Main FAB Button */}
                <TouchableOpacity onPress={toggleFABMenu} activeOpacity={1}>
                    <Animated.View
                        style={[
                            {
                                width: 56,
                                height: 56,
                                backgroundColor: '#DF9D4D',
                                borderRadius: 10,
                                alignItems: 'center',
                                justifyContent: 'center',
                                shadowColor: '#000',
                                shadowOpacity: 0.3,
                                shadowOffset: { width: 0, height: 3 },
                                shadowRadius: 6,
                                elevation: 5,
                            },
                            iconRotateStyle, // Apply rotation directly to the Animated.View
                        ]}
                    >
                        {/* No need for conditional Animated.View, just render icon based on isFABOpen */}
                        {isFABOpen ? (
                            <X size={28} color="white" />
                        ) : (
                            <Plus size={28} color="white" />
                        )}
                    </Animated.View>
                </TouchableOpacity>

            </YStack>
            <DeleteModal
                visible={isDischargeModalVisible}
                onDone={handleDischargeConfirm}
                onClose={handleCloseModal}
                screenWidth={screenWidth}
                patientName={patient.firstName + ' ' + patient.lastName}
                patientNumber={patient.patientNumber}
        />
        </TitleLayout>
    );
}