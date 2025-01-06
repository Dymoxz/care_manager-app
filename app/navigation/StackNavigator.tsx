import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

// Import your screens
import ActivateScreen from '../screens/activate_screen';
import StartShiftScreen from "../screens/startShift_screen";


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
        </Stack.Navigator>
    );
}