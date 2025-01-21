import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// Import your screens
import ActivateScreen from '../screens/activate_screen';
import StartShiftScreen from "../screens/startShift_screen";
import HomeScreen from "../screens/home_screen";
import IntakeOneScreen from "../screens/intake/intake1_screen";
import IntakeTwoScreen from "../screens/intake/intake2_screen";
import PatientListScreen from "../screens/patientList_screen";
import ChildDetailScreen from "../screens/child-detail/childDetail_screen";
import MapScreen from "../map/map_screen";
import AgreementPickChildScreen from "../screens/agreement/agreementPickChild_screen";
import MedcheckPickChildScreen from "../screens/medcheck/medcheckPickChild_screen";
import ShiftScreen from "../screens/shift/shift_screen";

// Define RootStackParamList directly here
type RootStackParamList = {
    ActivateScreen: undefined;
    StartShiftScreen: undefined;
    HomeScreen: undefined;
    PatientListScreen: undefined;
    IntakeOneScreen: undefined;
    IntakeTwoScreen: undefined;
    AgreementPickChildScreen: undefined;
    MedcheckPickChildScreen: undefined;
    ShiftScreen: undefined;
    ChildDetailScreen: { patient: any };
    MapScreen: undefined;
};

// Create a Stack Navigator
const Stack = createStackNavigator<RootStackParamList>();  // Type the navigator

export default function StackNavigator() {
    return (
        <Stack.Navigator
            initialRouteName="ActivateScreen"
        >
            <Stack.Screen
                name="ActivateScreen"
                component={ActivateScreen}
                options={{
                    headerShown: false,
                    cardStyle: { backgroundColor: 'transparent' },
                }}
            />
            <Stack.Screen
                name="StartShiftScreen"
                component={StartShiftScreen}
                options={{
                    headerShown: false,
                    cardStyle: { backgroundColor: 'transparent' },
                }}
            />
            <Stack.Screen
                name="HomeScreen"
                component={HomeScreen}
                options={{
                    headerShown: false,
                    cardStyle: { backgroundColor: 'transparent' },
                }}
            />
            <Stack.Screen
                name="PatientListScreen"
                component={PatientListScreen}
                options={{
                    headerShown: false,
                    cardStyle: { backgroundColor: 'transparent' },
                }}
            />
            <Stack.Screen
                name="IntakeOneScreen"
                component={IntakeOneScreen}
                options={{
                    headerShown: false,
                    cardStyle: { backgroundColor: 'transparent' },
                }}
            />
            <Stack.Screen
                name="IntakeTwoScreen"
                component={IntakeTwoScreen}
                options={{
                    headerShown: false,
                    cardStyle: { backgroundColor: 'transparent' },
                }}
            />
            <Stack.Screen
                name="AgreementPickChildScreen"
                component={AgreementPickChildScreen}
                options={{
                    headerShown: false,
                    cardStyle: { backgroundColor: 'transparent' },
                }}
            />
            <Stack.Screen
                name="MedcheckPickChildScreen"
                component={MedcheckPickChildScreen}
                options={{
                    headerShown: false,
                    cardStyle: { backgroundColor: 'transparent' },
                }}
            />
            <Stack.Screen
                name="ShiftScreen"
                component={ShiftScreen}
                options={{
                    headerShown: false,
                    cardStyle: { backgroundColor: 'transparent' },
                }}
            />
            <Stack.Screen
                name="ChildDetailScreen"
                component={ChildDetailScreen}
                options={{
                    headerShown: false,
                    cardStyle: { backgroundColor: 'transparent' },
                }}
            />
            <Stack.Screen
                name="MapScreen"
                component={MapScreen}
                options={{
                    headerShown: false,
                    cardStyle: { backgroundColor: 'transparent' },
                }}
            />
        </Stack.Navigator>
    );
}