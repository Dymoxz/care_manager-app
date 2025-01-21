import React, {useState, useRef, useEffect} from 'react';
import {Dimensions, ScrollView, Animated, Easing} from 'react-native';
import {Accordion, Button, Circle, Paragraph, SizableText, Spinner, Square, View, XStack, YStack,} from 'tamagui';
import TitleLayout from "../common/title_layout";
import BackButton from "../common/back_button";
import { AlertCircle, BedSingle, ChevronDown } from "@tamagui/lucide-icons";
import Svg, {Path} from "react-native-svg";
import MedicineDetailModal from "./medicineDetail_modal";
import MedicalCheckDetailModal from "./medicalCheckDetail_modal";
import {format, parseISO} from "date-fns";
import {nl} from 'date-fns/locale';
import DeleteModal from "./delete_modal";
import { FloatingAction } from "react-native-floating-action";
import CryptoJS from 'react-native-crypto-js';

const {width: screenWidth} = Dimensions.get('window');

interface Room {
    roomNumber: number;
    floor: number;
    maxCapacity: number;
    isScaled: boolean;
}

interface clinicalProfile{
    _id: string
    clinicalProfile: string
}

interface agreement{
    _id: string
    title: string
    description: string
}

interface MedCheck{
    _id: string;
    description: string;
    heartRate: number; // Corrected heartBeat
    bloodPressure: string;
    createdAt: string; // assuming there is a date in the form of string
}

interface Medicine {
    _id: string;
    name: string;
    brandName: string;
    atcCode: string;
    dosageGoals: any[]; // You can create a more specific interface if needed
}


interface Patient {
    _id: string;
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    patientNumber: number;
    bsn: string;
    clinicalProfiles: clinicalProfile[]
    diet: string
    room: Room;
    createdAt: string;
    updatedAt: string;
    length: string
    weight: string
    agreements: agreement[]
    medChecks: MedCheck[];
    medicines: Medicine[];
}

interface PatientDetailsScreenProps {
    route: {
        params: {
            patient: Patient;
        };
    };
    navigation: any;
}


//Decrypt BSN number
function decryptBSN(bsn: string):string {
    let bytes  = CryptoJS.AES.decrypt(bsn, process.env.EXPO_PUBLIC_ENCRYPTION_KEY);
    return bytes.toString(CryptoJS.enc.Utf8);
}


export default function ChildDetailScreen({route, navigation}: PatientDetailsScreenProps) {
    const {patient: initialPatient} = route.params;
    const [patient, setPatient] = useState<Patient>(initialPatient);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setLoading(true)
        const fetchPatient = async () => {
            try {
                const response = await fetch(`https://care-manager-api-cybccdb6fkffe8hg.westeurope-01.azurewebsites.net/api/patient/${initialPatient.patientNumber}`, {
                });
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                setPatient(data)
                setError(null);

            } catch (error: any) {
                console.error("Failed to fetch patient data:", error);
                setError(error.message)
            }finally {
                setLoading(false)
            }
        }
        fetchPatient();
    }, [initialPatient.patientNumber]);

    const [openAccordionItems, setOpenAccordionItems] = useState<string[]>([]);
    const [selectedMedicine, setSelectedMedicine] = useState<Medicine | null>(null);
    const [isMedicineDetailModalVisible, setMedicineDetailModalVisible] = useState(false);
    const [selectedMedicalCheck, setSelectedMedicalCheck] = useState<MedCheck | null>(null);
    const [isMedicalCheckDetailModalVisible, setMedicalCheckDetailModalVisible] = useState(false);


    const handleCloseMedicineModal = () => {
        setMedicineDetailModalVisible(false);
        setSelectedMedicine(null)
    };

    const handleMedicinePress = (medicine: Medicine) => {
        setSelectedMedicine(medicine);
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

    const handleMedicalCheckPress = (medicalCheck: MedCheck) => {
        setSelectedMedicalCheck(medicalCheck);
        setMedicalCheckDetailModalVisible(true);
    };


    const handleAccordionChange = (value: string[]) => {
        setOpenAccordionItems(value)
    }

    const [innerAccordionHeights, setInnerAccordionHeights] = useState<{ [key: string]: number }>({});
    const innerAccordionRefs = useRef<{ [key: string]: React.RefObject<View> }>({});


    useEffect(() => {
        const updateInnerHeights = () => {
            const newHeights: { [key: string]: number } = {};
            Object.keys(innerAccordionRefs.current).forEach(key => {
                const ref = innerAccordionRefs.current[key];
                if(ref && ref.current)
                {
                    // Measure the content
                    ref.current.measure((fx, fy, width, height) => {
                        newHeights[key] = height;
                    });
                }

            });
            setInnerAccordionHeights(newHeights)

        }
        updateInnerHeights();

    }, [openAccordionItems, patient.agreements])

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


    if(loading) return    <TitleLayout
        titleText={`${patient.firstName} ${patient.lastName}`}
        topContent={<BackButton navigation={navigation}/>}
    >
        <YStack backgroundColor='$background' height={screenWidth *1.2} alignItems="center" justifyContent='center'>
            <Spinner size="large" color="$primary" />
        </YStack></TitleLayout>

    if(error) return <SizableText>Error: {error}</SizableText>
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
                                Kamer {patient.room?.roomNumber || 0}
                            </SizableText>
                        </XStack>
                    </YStack>


                    {/*Personal information */}
                    <Accordion
                        overflow="hidden"
                        value={openAccordionItems}
                        type="multiple"
                        backgroundColor={"$bg02"}
                        onValueChange={handleAccordionChange}
                    >
                        <Accordion.Item value={`item-personal-info`}>
                            <YStack
                                width={screenWidth * 0.9}
                                backgroundColor="white"
                                borderRadius="$8"
                                paddingVertical="$5"
                                marginTop="$4"
                                bg="$container_alt"
                                onPress={() => {
                                    const isOpen = openAccordionItems.includes('item-personal-info');
                                    if (isOpen) {
                                        setOpenAccordionItems(openAccordionItems.filter(item => item !== 'item-personal-info'));
                                    } else {
                                        setOpenAccordionItems([...openAccordionItems, 'item-personal-info']);
                                    }
                                }}
                            >
                                <XStack justifyContent="space-between" marginHorizontal='$5' alignItems="center">
                                    <SizableText size="$6" fontWeight="700" mb='$1' textAlign="left">
                                        Persoonlijke Informatie
                                    </SizableText>
                                    <View>
                                        <Square animation="bouncy" rotate={openAccordionItems.includes(`item-personal-info`) ? "180deg" : "0deg"}>
                                            <ChevronDown size="$1" color="$text"/>
                                        </Square>
                                    </View>
                                </XStack>
                                <Accordion.HeightAnimator animation={"bouncy"}>
                                    <Accordion.Content
                                        animation={"bouncy"}
                                        bg="$container_alt"
                                        alignItems='flex-start'
                                        width="100%"
                                    >
                                        <YStack m='$2' alignItems="flex-start" width="100%">
                                            <SizableText size="$6" fontWeight="700" color="$text" mb='$1' textAlign="left">
                                                Patientnummer:
                                            </SizableText>
                                            <SizableText size="$5" color="$text" textAlign="left">
                                                {patient.patientNumber}

                                            </SizableText>
                                        </YStack>
                                        <YStack m='$2' alignItems="flex-start" width="100%">
                                            <SizableText size="$6" fontWeight="700" color="$text" mb='$1' textAlign="left">
                                                BSN:
                                            </SizableText>
                                            <SizableText size="$5" color="$text" textAlign="left">
                                                {decryptBSN(patient.bsn)}

                                            </SizableText>
                                        </YStack>
                                        <YStack m='$2' alignItems="flex-start" width="100%">
                                            <SizableText size="$6" fontWeight="700" color="$text" mb='$1' textAlign="left">
                                                Geboortedatum:
                                            </SizableText>
                                            <SizableText size="$5" color="$text" textAlign="left">
                                                { patient.dateOfBirth ? format(parseISO(patient.dateOfBirth),'dd-MM-yyyy', {locale: nl}): "N/A"}
                                            </SizableText>
                                        </YStack>
                                        <YStack m='$2' alignItems="flex-start" width="100%">
                                            <SizableText size="$6" fontWeight="700" color="$text" mb='$1' textAlign="left">
                                                Ziektebeeld:
                                            </SizableText>
                                            <YStack>
                                                {patient.clinicalProfiles && patient.clinicalProfiles.map((profile, index)=>
                                                    <SizableText key={index} size="$5" color="$text" textAlign="left">
                                                        {profile.clinicalProfile}
                                                    </SizableText>
                                                )}
                                            </YStack>
                                        </YStack>
                                        <YStack m='$2' alignItems="flex-start" width="100%">
                                            <SizableText size="$6" fontWeight="700" color="$text" mb='$1' textAlign="left">
                                                Voeding / Allergieën:
                                            </SizableText>
                                            <SizableText size="$5" color="$text" textAlign="left">
                                                {patient.diet || 'Geen allergieen of dieët wensen'}
                                            </SizableText>
                                        </YStack>
                                        <YStack m='$2' alignItems="flex-start" width="100%">
                                            <SizableText size="$6" fontWeight="700" color="$text" mb='$1' textAlign="left">
                                                Lengte:
                                            </SizableText>
                                            <SizableText size="$5" color="$text" textAlign="left">
                                                {patient.length} cm
                                            </SizableText>
                                        </YStack>
                                        <YStack m='$2' alignItems="flex-start" width="100%">
                                            <SizableText size="$6" fontWeight="700" color="$text" mb='$1' textAlign="left">
                                                Weight:
                                            </SizableText>
                                            <SizableText size="$5" color="$text" textAlign="left">
                                                {patient.weight} kg
                                            </SizableText>
                                        </YStack>
                                        <YStack m='$2' alignItems="flex-start" width="100%">
                                            <SizableText size="$6" fontWeight="700" color="$text" mb='$1' textAlign="left">
                                                Ingeschreven sinds:
                                            </SizableText>
                                            <SizableText size="$5" color="$text" textAlign="left">
                                                { patient.createdAt ? format(parseISO(patient.createdAt),'dd-MM-yyyy', {locale: nl}): "N/A"}
                                            </SizableText>
                                        </YStack>
                                    </Accordion.Content>
                                </Accordion.HeightAnimator>
                            </YStack>
                        </Accordion.Item>
                    </Accordion>

                    <Accordion
                        overflow="hidden"
                        value={openAccordionItems}
                        type="multiple"
                        backgroundColor={"$bg02"}
                        onValueChange={handleAccordionChange}
                    >
                        <Accordion.Item value={`item-medicines`}>
                            <YStack
                                width={screenWidth * 0.9}
                                backgroundColor="white"
                                borderRadius="$8"
                                paddingVertical="$5"
                                marginTop="$4"
                                bg="$container_alt"
                                onPress={() => {
                                    const isOpen = openAccordionItems.includes('item-medicines');
                                    if (isOpen) {
                                        setOpenAccordionItems(openAccordionItems.filter(item => item !== 'item-medicines'));
                                    } else {
                                        setOpenAccordionItems([...openAccordionItems, 'item-medicines']);
                                    }
                                }}
                            >
                                <XStack justifyContent="space-between" marginHorizontal='$5' alignItems="center">
                                    <SizableText size="$6" fontWeight="700" mb='$1'>
                                        Medicijnen
                                    </SizableText>
                                    <View>
                                        <Square animation="bouncy" rotate={openAccordionItems.includes(`item-medicines`) ? "180deg" : "0deg"}>
                                            <ChevronDown size="$1" color="$text"/>
                                        </Square>
                                    </View>
                                </XStack>

                                <Accordion.HeightAnimator animation={"bouncy"}>
                                    <Accordion.Content
                                        animation={"bouncy"}
                                        alignItems={"center"}
                                        bg="$container_alt"
                                    >
                                        {patient.medicines && patient.medicines.length > 0 ? (
                                            patient.medicines.map((medicine, index) => (
                                                <View key={index}>
                                                    <Button
                                                        alignSelf="stretch"
                                                        backgroundColor="#B9D6D6"
                                                        borderRadius="$2"
                                                        justifyContent="space-between"
                                                        h='$6'
                                                        width={screenWidth * 0.8}
                                                        mb='$3'
                                                        paddingLeft="$4"
                                                        paddingRight="$4"
                                                        pressStyle={{backgroundColor: '#B9D6D6'}}
                                                        onPress={() => handleMedicinePress(medicine)}
                                                    >
                                                        <Paragraph size="$4" col='$text' fontWeight="700">{medicine.name}</Paragraph>
                                                        <Paragraph size="$4" col='$text' fontWeight="700">+</Paragraph>
                                                    </Button>
                                                </View>
                                            ))
                                        ) : (
                                            <SizableText color="$text" size="$5">Geen medicijnen toegewezen</SizableText>
                                        )}

                                    </Accordion.Content>
                                </Accordion.HeightAnimator>
                            </YStack>
                        </Accordion.Item>
                    </Accordion>


                    {/* Afspraken Section */}

                    <Accordion
                        overflow="hidden"
                        value={openAccordionItems}
                        type="multiple"
                        backgroundColor={"$bg02"}
                        onValueChange={handleAccordionChange}
                    >
                        <Accordion.Item value={`item-appointments`} >
                            <YStack
                                width={screenWidth * 0.9}
                                backgroundColor="white"
                                borderRadius="$8"
                                paddingVertical="$5"
                                marginTop="$4"
                                bg="$container_alt"
                                onPress={() => {
                                    const isOpen = openAccordionItems.includes('item-appointments');
                                    if (isOpen) {
                                        setOpenAccordionItems(openAccordionItems.filter(item => item !== 'item-appointments'));
                                    } else {
                                        setOpenAccordionItems([...openAccordionItems, 'item-appointments']);
                                    }
                                }}
                            >
                                <XStack justifyContent="space-between" marginHorizontal="$5" alignItems="center">
                                    <SizableText size="$6" fontWeight="700" mb='$1'>
                                        Afspraken
                                    </SizableText>
                                    <View>
                                        <Square animation="bouncy" rotate={openAccordionItems.includes(`item-appointments`) ? "180deg" : "0deg"}>
                                            <ChevronDown size="$1" color="$text"/>
                                        </Square>
                                    </View>
                                </XStack>
                                <Accordion.HeightAnimator animation={"bouncy"}>
                                    <Accordion.Content
                                        animation={"bouncy"}
                                        alignItems={"center"}
                                        bg="$container_alt"
                                    >
                                        {patient.agreements && patient.agreements.length > 0 ? (
                                            <Accordion
                                                overflow="hidden"
                                                value={openAccordionItems}
                                                type="multiple"
                                                bg="$container_alt"
                                                onValueChange={handleAccordionChange}

                                            >
                                                {patient.agreements.map((agreement, index) => {
                                                    const isOpen = openAccordionItems.includes(`item-appointment-${index}`);

                                                    return (
                                                        <Accordion.Item key={index} value={`item-appointment-${index}`} mb='$3'>
                                                            <Accordion.Trigger
                                                                flexDirection="row"
                                                                justifyContent="space-between"
                                                                borderWidth={0}
                                                                width={screenWidth * 0.8}
                                                                backgroundColor={"#B9D6D6"}
                                                                borderRadius={'$3'}
                                                                borderBottomLeftRadius={isOpen ? 0 : '$3'}
                                                                borderBottomRightRadius={isOpen ? 0 : '$3'}
                                                                pressStyle={{backgroundColor: '#B9D6D6'}}
                                                            >
                                                                {({open}: { open: boolean }) => (
                                                                    <>
                                                                        <Paragraph col='$text' size='$4'
                                                                                   fontWeight='700'>{agreement.title}</Paragraph>
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
                                                                    <View ref={el => innerAccordionRefs.current[`item-appointment-${index}`] = el} style={{overflow:'hidden'}}>
                                                                        <SizableText col='$text'>
                                                                            {agreement.description}
                                                                        </SizableText>
                                                                    </View>
                                                                </Accordion.Content>
                                                            </Accordion.HeightAnimator>
                                                        </Accordion.Item>
                                                    )
                                                })}
                                            </Accordion>
                                        ): (
                                            <SizableText color="$text" size="$5">Geen afspraken toegewezen</SizableText>
                                        )}
                                    </Accordion.Content>
                                </Accordion.HeightAnimator>
                            </YStack>
                        </Accordion.Item>
                    </Accordion>


                    <Accordion
                        overflow="hidden"
                        value={openAccordionItems}
                        type="multiple"
                        mb="$10"
                        backgroundColor={"$bg02"}
                        onValueChange={handleAccordionChange}
                    >
                        <Accordion.Item value={`item-medical-checks`} mb='$3'>
                            <YStack
                                width={screenWidth * 0.9}
                                backgroundColor="white"
                                borderRadius="$8"
                                padding="$5"
                                marginTop="$4"
                                bg="$container_alt"
                                onPress={() => {
                                    const isOpen = openAccordionItems.includes('item-medical-checks');
                                    if (isOpen) {
                                        setOpenAccordionItems(openAccordionItems.filter(item => item !== 'item-medical-checks'));
                                    } else {
                                        setOpenAccordionItems([...openAccordionItems, 'item-medical-checks']);
                                    }
                                }}
                            >
                                <XStack justifyContent="space-between" alignItems="center">
                                    <SizableText size="$6" fontWeight="700" mb='$1'>
                                        Medische Checks
                                    </SizableText>
                                    <View>
                                        <Square animation="bouncy" rotate={openAccordionItems.includes(`item-medical-checks`) ? "180deg" : "0deg"}>
                                            <ChevronDown size="$1" color="$text"/>
                                        </Square>
                                    </View>
                                </XStack>
                                <Accordion.HeightAnimator animation={"bouncy"}>
                                    <Accordion.Content
                                        bg="$container_alt"
                                        paddingTop={0}
                                        animation={"bouncy"}
                                        marginTop={'$4'}
                                    >
                                        {patient.medChecks && patient.medChecks.length > 0 ? (
                                            <ScrollView nestedScrollEnabled={true}>
                                                {patient.medChecks.map((check, index) => (

                                                    <YStack key={index} width="100%" alignItems="flex-start"                                                                     onPress={() => handleMedicalCheckPress(check)}
                                                    >
                                                        {/* Top Line Separator (above the checkmark) */}

                                                        <XStack space="$4" alignItems="center" mb={'$3'}                                                                     onPress={() => handleMedicalCheckPress(check)}
                                                                onPress={() => handleMedicalCheckPress(check)}
                                                        >
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
                                                                >
                                                                    { check.createdAt ? format(parseISO(check.createdAt), 'EEE dd-MM-yy (HH:mm)', { locale: nl })
                                                                        : "Datum niet beschikbaar"}
                                                                </SizableText>

                                                            </YStack>
                                                        </XStack>
                                                    </YStack>
                                                ))}
                                            </ScrollView>
                                        ) : (
                                            <SizableText color="$text" size="$5">Geen medische checks gedaan</SizableText>
                                        )}
                                    </Accordion.Content>
                                </Accordion.HeightAnimator>
                            </YStack>
                        </Accordion.Item>
                    </Accordion>
                </YStack>
            </ScrollView>
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
                                navigation.navigate("IntakeOneScreen", {formData: {
                                        voornaam: patient.firstName,
                                        achternaam: patient.lastName,
                                        geboortedatumRaw: patient.dateOfBirth,
                                        bsn: decryptBSN(patient.bsn),
                                        lengte: patient.length,
                                        gewicht: patient.weight,
                                        selectedGender: null, // You might need to map the gender somehow if available
                                    }});
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