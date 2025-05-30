
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import GalleryScreen from '../screens/GalleryScreen';
import RegistrationScreen from '../screens/RegistrationScreen';

import CardModal from '../components/modals/CardModal';
import CardView from '../components/modals/CardView';


const Stack = createNativeStackNavigator();

export default function AppNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName='Gallery'
                screenOptions={{
                    navigationBarColor: '#11131A',
                    contentStyle:{
                        backgroundColor: '#11131A'
                    },
                    headerShown: false,
                    animation: 'fade'
                }}
            >
                <Stack.Screen name="Gallery" component={GalleryScreen} />
                <Stack.Screen name="Registration" component={RegistrationScreen} />
                <Stack.Screen name="CardModal" component={CardModal} />
                <Stack.Screen name="CardView" component={CardView} options={{ animation: 'fade', presentation: 'transparentModal' }} />

            </Stack.Navigator>
        </NavigationContainer>
    );
}
