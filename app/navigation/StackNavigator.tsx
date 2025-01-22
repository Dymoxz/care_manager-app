import { createStackNavigator } from '@react-navigation/stack';
import { Easing } from 'react-native';

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

const Stack = createStackNavigator<RootStackParamList>();

const FadeTransition = {
    transitionSpec: {
        open: { animation: 'timing', config: { duration: 200, easing: Easing.ease } },
        close: { animation: 'timing', config: { duration: 200, easing: Easing.ease } },
    },
    cardStyleInterpolator: ({ current, next, layouts }) => {
        return {
            cardStyle: {
                opacity: current.progress,
            },
        };
    }
};


export default function StackNavigator() {
    return (
        <Stack.Navigator
            initialRouteName="ActivateScreen"
            screenOptions={{
                ...FadeTransition,
                cardStyle: { backgroundColor: 'transparent' },
            }}
        >
            <Stack.Screen
                name="ActivateScreen"
                component={ActivateScreen}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="StartShiftScreen"
                component={StartShiftScreen}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="HomeScreen"
                component={HomeScreen}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="PatientListScreen"
                component={PatientListScreen}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="IntakeOneScreen"
                component={IntakeOneScreen}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="IntakeTwoScreen"
                component={IntakeTwoScreen}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="AgreementPickChildScreen"
                component={AgreementPickChildScreen}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="MedcheckPickChildScreen"
                component={MedcheckPickChildScreen}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="ShiftScreen"
                component={ShiftScreen}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="ChildDetailScreen"
                component={ChildDetailScreen}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="MapScreen"
                component={MapScreen}
                options={{
                    headerShown: false,
                }}
            />
        </Stack.Navigator>
    );
}