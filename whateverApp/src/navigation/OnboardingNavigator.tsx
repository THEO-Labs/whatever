// OnboardingNavigator.tsx
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Step1 from '../components/Onboarding/Step1';
import Step2 from '../components/Onboarding/Step2';
import Step3 from '../components/Onboarding/Step3';
import Step4 from '../components/Onboarding/Step4';
import Step5 from '../components/Onboarding/Step5';
import Step6 from '../components/Onboarding/Step6';
import Step7 from '../components/Onboarding/Step7';

const Stack = createNativeStackNavigator();
export type RootStackParamList = {
    Step1: undefined;
    Step2: undefined;
    Step3: undefined;
    Step4: undefined;
    Step5: undefined;
    Step6: undefined;
    Step7: undefined;
    Home: undefined;
};
export default function OnboardingNavigator() {
    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="Step1" component={Step1}/>
            <Stack.Screen name="Step2" component={Step2}/>
            <Stack.Screen name="Step3" component={Step3}/>
            <Stack.Screen name="Step4" component={Step4}/>
            <Stack.Screen name="Step5" component={Step5}/>
            <Stack.Screen name="Step6" component={Step6}/>
            <Stack.Screen name="Step7" component={Step7}/>
        </Stack.Navigator>
    );
}
