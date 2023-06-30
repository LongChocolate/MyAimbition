import {StatusBar} from 'expo-status-bar';
import { useColorScheme, View} from 'react-native';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import RootNavigator from './src/routes';
import HomeNavigator from './src/routes/HomeRoute';

export default function App() {
    const isDarkMode = useColorScheme() === 'dark';

    return (
        <SafeAreaProvider>
            <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
            <RootNavigator />
        </SafeAreaProvider>
    );
}
