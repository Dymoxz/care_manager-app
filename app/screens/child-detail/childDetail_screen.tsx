import React, {useState, useRef} from 'react';
import {Dimensions, ScrollView, Animated, Easing, TouchableOpacity} from 'react-native';
import {Accordion, Button, Circle, Paragraph, SizableText, Square, View, XStack, YStack,} from 'tamagui';
import TitleLayout from "../common/title_layout";
import BackButton from "../common/back_button";
import { AlertCircle, BedSingle, ChevronDown, Edit3, Plus, Trash, X, Calendar, Pill } from "@tamagui/lucide-icons";
import Svg, {Path} from "react-native-svg";
import MedicineDetailModal from "./medicineDetail_modal";
import MedicalCheckDetailModal from "./medicalCheckDetail_modal";
import {format} from "date-fns";
import {nl} from 'date-fns/locale';
import DeleteModal from "./delete_modal";
import { FloatingAction } from "react-native-floating-action";


const {width: screenWidth} = Dimensions.get('window');

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

// Function to get appointments (placeholder for now)
function getAppointments() {
    return [
        {title: "Physical Therapy", description: "Routine physical therapy session"},
        {title: "Consultation with Dr. Smith", description: "Follow-up on recent blood test results"},
        {title: "Vaccination", description: "Administer flu vaccine"},
        {title: "Eye Exam", description: "Standard vision check-up"},
        {title: "Dental Checkup", description: "Teeth cleaning and cavity check"},
    ];
}

// Function to get medicines for a user (placeholder for now)
function getMedicinesForUser() {
    return [
        {name: "Abacavir"},
        {name: "Bezlotozumab"},
        {name: "Desoximetason"},
    ];
}

// Function to get medical checks for a user
function getMedicalChecksForUser() {
    return [
        {datetime: new Date('2024-12-01T09:30:00')},
        {datetime: new Date('2024-12-01T18:30:00')},
        {datetime: new Date('2024-12-02T07:45:00')},
        {datetime: new Date('2024-12-01T18:30:00')},
        {datetime: new Date('2024-12-02T07:45:00')},
        {datetime: new Date('2024-12-01T18:30:00')},
        {datetime: new Date('2024-12-02T07:45:00')},
        {datetime: new Date('2024-12-01T18:30:00')},
        {datetime: new Date('2024-12-02T07:45:00')},
    ].sort((a, b) => b.datetime.getTime() - a.datetime.getTime());
}

// Fallback medicine
const fallbackMedicine = {name: "No Medicine Selected"};


export default function ChildDetailScreen({route, navigation}: PatientDetailsScreenProps) {
    const {patient} = route.params;

    const [openAccordionItems, setOpenAccordionItems] = useState<string[]>([]);
    const [selectedMedicine, setSelectedMedicine] = useState<{ name: string } | null>(null);
    const [isMedicineDetailModalVisible, setMedicineDetailModalVisible] = useState(false);
    const [selectedMedicalCheck, setSelectedMedicalCheck] = useState<{ datetime: Date } | null>(null);
    const [isMedicalCheckDetailModalVisible, setMedicalCheckDetailModalVisible] = useState(false);
    const handleCloseMedicineModal = () => {
        setMedicineDetailModalVisible(false);
        setSelectedMedicine(null)
    };

    const handleMedicinePress = (medicine: { name: string }) => {
        setSelectedMedicine(medicine);
        console.log(medicine)
        setMedicineDetailModalVisible(true);
    };
    const [isModalVisible, setModalVisible] = useState(false);

    const [isDischargeModalVisible, setDischargeModalVisible] = useState(false);

    const handleDischargePress = () => {
        setDischargeModalVisible(true);
    };

    const handleDischargeConfirm = (reason: string) => {
        setDischargeModalVisible(false);
    };


    const handleCloseModal = () => {
        setDischargeModalVisible(false);
    };

    const handleCloseMedicalCheckModal = () => {
        setMedicalCheckDetailModalVisible(false);
        setSelectedMedicalCheck(null);
    };

    const handleMedicalCheckPress = (medicalCheck: { datetime: Date }) => {
        setSelectedMedicalCheck(medicalCheck);
        setMedicalCheckDetailModalVisible(true);
    };


    const appointments = getAppointments();
    const medicines = getMedicinesForUser();
    const medicalChecks = getMedicalChecksForUser()

    const handleAccordionChange = (value: string[]) => {
        setOpenAccordionItems(value)
    }

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

    const actions = [
        {
            text: "Ontslaan",
            icon: require("../../../assets/images/user-round-x.png"),
            name: "bt_ontslaan",
            position: 1,
            color: '#EF4444'
        },
        {
            text: "Afspraak maken",
            icon: require("../../../assets/images/file-pen-line.png"),
            name: "bt_afspraak",
            position: 2,
            color: '#F8AE56'
        },
        {
            text: "Medische check",
            icon: require("../../../assets/images/file-heart.png"),
            name: "bt_medcheck",
            position: 3,
            color: '#F8AE56'
        },

        {
            text: "Bewerken",
            icon: require("../../../assets/images/user-round-pen.png"),
            name: "bt_bewerken",
            position: 4,
            color: '#F8AE56',
            iconColor: '#000'
        }
    ];
    return (
        <TitleLayout
            titleText={`${patient.firstName} ${patient.lastName}`}
            topContent={<BackButton navigation={navigation}/>}
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
                        borderRadius="$8"
                        padding="$6"
                        alignItems="center"
                        bg="$container_alt"
                    >
                        <Circle size="$10" bg="$accent" mb='$3'>
                            <SizableText size="$6" fontWeight="700" color="$accent_content">
                                {patient.firstName[0]}{patient.lastName[0]}
                            </SizableText>
                        </Circle>
                        <SizableText size="$7" fontWeight="700" color="$text">
                            {patient.firstName} {patient.lastName}
                        </SizableText>

                        <XStack alignItems="center" mt='$3'>
                            <AlertCircle size="$1" color="$danger" mr='$2'/>
                            <SizableText size="$5" color="$danger" fontWeight='700'>
                                Quarantaine: Corona
                            </SizableText>
                        </XStack>

                        <XStack alignItems="center" mt='$1'>
                            <BedSingle size="$1" color="$accent_focus" mr='$2'/>
                            <SizableText size="$5" color="$accent_focus" fontWeight='700'>
                                Kamer 101
                            </SizableText>
                        </XStack>
                    </YStack>


                    {/*Personal information */}
                    <YStack
                        width={screenWidth * 0.9}
                        backgroundColor="white"
                        borderRadius="$8"
                        padding="$6"
                        alignItems="flex-start" // Align text to the left
                        bg="$container_alt"
                        marginTop="$4"
                    >
                        <YStack m='$2'>
                            <SizableText size="$6" fontWeight="700" color="$text" mb='$1'>
                                BSN:
                            </SizableText>
                            <SizableText size="$5" color="$text">
                                123456789
                            </SizableText>
                        </YStack>
                        <YStack m='$2'>
                            <SizableText size="$6" fontWeight="700" color="$text" mb='$1'>
                                Geboortedatum:
                            </SizableText>
                            <SizableText size="$5" color="$text">
                                15-02-2009
                            </SizableText>
                        </YStack>
                        <YStack m='$2'>
                            <SizableText size="$6" fontWeight="700" color="$text" mb='$1'>
                                Ziektebeeld:
                            </SizableText>
                            <SizableText size="$5" color="$text">
                                Corona, Griep
                            </SizableText>
                        </YStack>
                        <YStack m='$2'>
                            <SizableText size="$6" fontWeight="700" color="$text" mb='$1'>
                                Voeding / Allergieën:
                            </SizableText>
                            <SizableText size="$5" color="$text">
                                Noten
                            </SizableText>
                        </YStack>

                    </YStack>

                    {/* Medicine Section */}
                    <YStack
                        width={screenWidth * 0.9}
                        backgroundColor="white"
                        borderRadius="$8"
                        padding="$5"
                        marginTop="$4"
                        bg="$container_alt"
                    >
                        <SizableText size="$6" fontWeight="700" mb='$3'>
                            Medicijnen
                        </SizableText>
                        {medicines.map((medicine, index) => (
                            <Button
                                key={index}
                                alignSelf="stretch"
                                backgroundColor="#B9D6D6"
                                borderRadius="$2"
                                justifyContent="space-between"
                                marginTop="$3"
                                h='$5'
                                pressStyle={{backgroundColor: '#B9D6D6'}}
                                onPress={() => handleMedicinePress(medicine)} // Open modal
                            >
                                <Paragraph size="$4" col='$text' fontWeight="700">{medicine.name}</Paragraph>
                                <Paragraph size="$4" col='$text' fontWeight="700">+</Paragraph>
                            </Button>
                        ))}
                    </YStack>

                    {/* Afspraken Section */}
                    <YStack
                        width={screenWidth * 0.9}
                        backgroundColor="white"
                        borderRadius="$8"
                        padding="$5"
                        marginTop="$4"
                        bg="$container_alt"
                    >
                        <SizableText size="$6" fontWeight="700" mb='$3'>
                            Afspraken
                        </SizableText>

                        {/* Accordion here*/}
                        <Accordion
                            overflow="hidden"
                            value={openAccordionItems}
                            type="multiple"
                            backgroundColor={"$bg02"}
                            onValueChange={handleAccordionChange}

                        >
                            {appointments.map((appointment, index) => {
                                const isOpen = openAccordionItems.includes(`item-${index}`);
                                return (
                                    <Accordion.Item key={index} value={`item-${index}`} mb='$3'>
                                        <Accordion.Trigger
                                            flexDirection="row"
                                            justifyContent="space-between"
                                            borderWidth={0}
                                            backgroundColor={"#B9D6D6"}
                                            borderRadius={isOpen ? '$3' : '$3'}
                                            borderBottomLeftRadius={isOpen ? 0 : '$3'}
                                            borderBottomRightRadius={isOpen ? 0 : '$3'}

                                            pressStyle={{backgroundColor: '#B9D6D6'}}
                                        >
                                            {({open}: { open: boolean }) => (
                                                <>
                                                    <Paragraph col='$text' size='$4'
                                                               fontWeight='700'>{appointment.title}</Paragraph>
                                                    <Square animation="bouncy" rotate={open ? "180deg" : "0deg"}>
                                                        <ChevronDown size="$1" color="$text"/>
                                                    </Square>
                                                </>
                                            )}
                                        </Accordion.Trigger>
                                        <Accordion.HeightAnimator animation={"bouncy"}>
                                            <Accordion.Content

                                                backgroundColor={"#B9D6D6"}
                                                paddingTop={0}
                                                animation={"bouncy"}
                                                borderBottomLeftRadius={"$3"}
                                                borderBottomRightRadius={"$3"}
                                                borderTopLeftRadius={0}
                                                borderTopRightRadius={0}
                                            >
                                                <SizableText col='$text'>
                                                    {appointment.description}
                                                </SizableText>
                                            </Accordion.Content>
                                        </Accordion.HeightAnimator>
                                    </Accordion.Item>
                                )
                            })}
                        </Accordion>

                    </YStack>


                    {/* Timeline Section */}
                    <YStack
                        width={screenWidth * 0.9}
                        backgroundColor="white"
                        borderRadius="$8"
                        padding="$5"
                        marginTop="$4"
                        bg="$container_alt"
                        maxHeight='400'
                    >
                        <SizableText size="$6" fontWeight="700" ml='$2' mb='$4'>
                            Medische Checks
                        </SizableText>
                        <ScrollView nestedScrollEnabled={true}>
                            {medicalChecks.map((check, index) => (
                                <YStack key={index} width="100%" alignItems="flex-start">
                                    {/* Top Line Separator (above the checkmark) */}

                                    <XStack space="$4" alignItems="center" mb={'$3'}>
                                        {/* Checkmark SVG */}
                                        <Svg width="20" height="20" viewBox="0 0 20 20">
                                            <Path
                                                fillRule="evenodd"
                                                clipRule="evenodd"
                                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                                                fill="#0E7490"
                                            />
                                        </Svg>

                                        {/* Content */}
                                        <YStack
                                            backgroundColor="white"
                                            borderRadius="$6"
                                            padding="$4"
                                            flex={1}
                                        >
                                            <SizableText
                                                fontSize="$6"
                                                onPress={() => handleMedicalCheckPress(check)}
                                            >
                                                {format(check.datetime, 'EEE dd-MM-yy (HH:mm)', {locale: nl})}
                                            </SizableText>
                                        </YStack>
                                    </XStack>
                                </YStack>
                            ))}
                        </ScrollView>

                    </YStack>
                </YStack>
            </ScrollView>
            {/* Floating Action Button (FAB) */}
            {/*<YStack*/}
            {/*    position="absolute"*/}
            {/*    bottom={20}*/}
            {/*    right={20}*/}
            {/*    alignItems="flex-end"*/}
            {/*    space="$2"*/}
            {/*>*/}
            {/*    <Animated.View style={fabMenuStyle}>*/}
            {/*        {isFABOpen && (*/}
            {/*            <>*/}
            {/*                <TouchableOpacity*/}
            {/*                    onPress={handleDischargePress}*/}
            {/*                    style={{*/}
            {/*                        flexDirection: 'row',*/}
            {/*                        alignItems: 'center',*/}
            {/*                        backgroundColor: 'white',*/}
            {/*                        paddingVertical: 10,*/}
            {/*                        paddingHorizontal: 15,*/}
            {/*                        borderRadius: 10,*/}
            {/*                        shadowColor: '#000',*/}
            {/*                        shadowOpacity: 0.1,*/}
            {/*                        shadowOffset: { width: 0, height: 2 },*/}
            {/*                        shadowRadius: 4,*/}
            {/*                        elevation: 3,*/}
            {/*                        marginBottom: 8,*/}
            {/*                    }}*/}
            {/*                >*/}
            {/*                    <Trash size={24} color="red" />*/}
            {/*                    <SizableText size="$5" color="red" marginLeft="$2">*/}
            {/*                        Ontslag*/}
            {/*                    </SizableText>*/}
            {/*                </TouchableOpacity>*/}


            {/*                <TouchableOpacity*/}
            {/*                    onPress={() => console.log('Afspraak maken')}*/}
            {/*                    style={{*/}
            {/*                        flexDirection: 'row',*/}
            {/*                        alignItems: 'center',*/}
            {/*                        backgroundColor: 'white',*/}
            {/*                        paddingVertical: 10,*/}
            {/*                        paddingHorizontal: 15,*/}
            {/*                        borderRadius: 10,*/}
            {/*                        shadowColor: '#000',*/}
            {/*                        shadowOpacity: 0.1,*/}
            {/*                        shadowOffset: { width: 0, height: 2 },*/}
            {/*                        shadowRadius: 4,*/}
            {/*                        elevation: 3,*/}
            {/*                        marginBottom: 8,*/}
            {/*                    }}*/}
            {/*                >*/}
            {/*                    <Calendar size={24} color="black" />*/}
            {/*                    <SizableText size="$5" color="black" marginLeft="$2">*/}
            {/*                        Afspraak maken*/}
            {/*                    </SizableText>*/}
            {/*                </TouchableOpacity>*/}
            {/*                <TouchableOpacity*/}
            {/*                    onPress={() => console.log('Med check')}*/}
            {/*                    style={{*/}
            {/*                        flexDirection: 'row',*/}
            {/*                        alignItems: 'center',*/}
            {/*                        backgroundColor: 'white',*/}
            {/*                        paddingVertical: 10,*/}
            {/*                        paddingHorizontal: 15,*/}
            {/*                        borderRadius: 10,*/}
            {/*                        shadowColor: '#000',*/}
            {/*                        shadowOpacity: 0.1,*/}
            {/*                        shadowOffset: { width: 0, height: 2 },*/}
            {/*                        shadowRadius: 4,*/}
            {/*                        elevation: 3,*/}
            {/*                        marginBottom: 8,*/}
            {/*                    }}*/}
            {/*                >*/}
            {/*                    <Pill size={24} color="black" />*/}
            {/*                    <SizableText size="$5" color="black" marginLeft="$2">*/}
            {/*                        Med Check*/}
            {/*                    </SizableText>*/}
            {/*                </TouchableOpacity>*/}

            {/*                <TouchableOpacity*/}
            {/*                    onPress={() => console.log('Edit')}*/}
            {/*                    style={{*/}
            {/*                        flexDirection: 'row',*/}
            {/*                        alignItems: 'center',*/}
            {/*                        backgroundColor: 'white',*/}
            {/*                        paddingVertical: 10,*/}
            {/*                        paddingHorizontal: 15,*/}
            {/*                        borderRadius: 10,*/}
            {/*                        shadowColor: '#000',*/}
            {/*                        shadowOpacity: 0.1,*/}
            {/*                        shadowOffset: { width: 0, height: 2 },*/}
            {/*                        shadowRadius: 4,*/}
            {/*                        elevation: 3,*/}
            {/*                    }}*/}
            {/*                >*/}
            {/*                    <Edit3 size={24} color="#000" />*/}
            {/*                    <SizableText size="$5" color="#000" marginLeft="$2">*/}
            {/*                        Edit*/}
            {/*                    </SizableText>*/}
            {/*                </TouchableOpacity>*/}
            {/*            </>*/}
            {/*        )}*/}
            {/*    </Animated.View>*/}

            {/*</YStack>*/}


            <View>
                <FloatingAction
                    color='#F8AE56'
                    actions={actions}
                    onPressItem={name => {
                        switch (name) {
                            case "bt_ontslaan":
                                handleDischargePress();
                                break;
                            case "bt_afspraak":
                                console.log('Afspraak maken');
                                break;
                            case "bt_medcheck":
                                console.log('Medische check');
                                break;
                            case "bt_bewerken":
                                console.log('Bewerken');
                                break;
                            default:
                                console.log(`Unknown action: ${name}`);
                        }
                    }}
                />
            </View>

            <DeleteModal
                visible={isDischargeModalVisible}
                onDone={handleDischargeConfirm}
                onClose={handleCloseModal}
                screenWidth={screenWidth}
                patientName={patient.firstName + ' ' + patient.lastName}
                patientNumber={patient.patientNumber}
        />
            <MedicineDetailModal
                visible={isMedicineDetailModalVisible}
                onClose={handleCloseMedicineModal}
                screenWidth={screenWidth}
                medicine={selectedMedicine}
            />
            <MedicalCheckDetailModal
                visible={isMedicalCheckDetailModalVisible}
                onClose={handleCloseMedicalCheckModal}
                screenWidth={screenWidth}
                medicalCheck={selectedMedicalCheck}
            />
        </TitleLayout>
    );
}
