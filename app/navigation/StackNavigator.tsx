import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

// Import your screens
import ActivateScreen from '../screens/activate_screen';
import StartShiftScreen from "../screens/startShift_screen";
import HomeScreen from "../screens/home_screen";
import IntakeScreen from "../screens/intake_screen";
import PatientListScreen from "../screens/patientList_screen";
import ChildDetailScreen from "../screens/childDetail_screen";

// Create a Stack Navigator
const Stack = createStackNavigator();

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
            <Stack.Screen name="ChildDetailScreen" component={ChildDetailScreen}
                            options={{
                                headerShown: false, // Keep header hidden
                            }}/>


        </Stack.Navigator>
    );
}
