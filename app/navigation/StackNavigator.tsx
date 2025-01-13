import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

// Import your screens
import ActivateScreen from '../screens/activate_screen';
import StartShiftScreen from "../screens/startShift_screen";
import HomeScreen from "../screens/home_screen";
import IntakeScreen from "../screens/intake/intake1_screen";
import PatientListScreen from "../screens/patientList_screen";
import ChildDetailScreen from "../screens/child-detail/childDetail_screen";
import MapScreen from "../screens/map_screen";
import AgreementPickChildScreen from "../screens/agreement/agreementPickChild_screen";
import MedcheckPickChildScreen from "../screens/medcheck/medcheckPickChild_screen";
import ShiftScreen from "../screens/shift/shift_screen";

// Define RootStackParamList directly here
type RootStackParamList = {
    ActivateScreen: undefined;
    StartShiftScreen: undefined;
    HomeScreen: undefined;
    PatientListScreen: undefined;
    IntakeScreen: undefined;
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
        <Stack.Navigator initialRouteName="ActivateScreen">
            <Stack.Screen name="ActivateScreen" component={ActivateScreen}
                          options={{
                              headerShown: false, // Keep header hidden
                          }}/>
            <Stack.Screen name="StartShiftScreen" component={StartShiftScreen}
                          options={{
                              headerShown: false, // Keep header hidden
                          }}/>

            {/*Home screen plus all the links that are present in the home screen*/}
            <Stack.Screen name="HomeScreen" component={HomeScreen}
                          options={{
                              headerShown: false, // Keep header hidden
                          }}/>
            <Stack.Screen name="PatientListScreen" component={PatientListScreen}
                            options={{
                                headerShown: false, // Keep header hidden
                            }}/>

            <Stack.Screen name={"IntakeScreen"} component={IntakeScreen}
                            options={{
                                headerShown: false, // Keep header hidden
                            }}/>
            <Stack.Screen name="AgreementPickChildScreen" component={AgreementPickChildScreen}
                            options={{
                                headerShown: false, // Keep header hidden
                            }}/>
            <Stack.Screen name="MedcheckPickChildScreen" component={MedcheckPickChildScreen}
                          options={{
                              headerShown: false, // Keep header hidden
                          }}/>
            <Stack.Screen name="ShiftScreen" component={ShiftScreen}
                          options={{
                              headerShown: false, // Keep header hidden
                          }}/>

            <Stack.Screen name="ChildDetailScreen" component={ChildDetailScreen}
                            options={{
                                headerShown: false, // Keep header hidden
                            }}/>
            <Stack.Screen name={'MapScreen'} component={MapScreen}
                            options={{
                                headerShown: false, // Keep header hidden
                            }}/>


        </Stack.Navigator>
    );
}
