/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import "./global.css"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { StatusBar, useColorScheme, useWindowDimensions, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Home } from "./app/Home";
import Settings from "./app/Settings";
import { ThemeProvider } from "./context/ThemeContext";
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from "@react-navigation/native";
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { DrawerNavigationProp } from '@react-navigation/drawer';


const linking = {
  prefixes: ['agenttest83://'],
  config: {
    screens: {
      // Maps the URL "agenttest83://intervention?app=com.android.chrome" to this screen
      Intervention: 'intervention',
    },
  },
};


const Drawer = createDrawerNavigator();

const queryClient = new QueryClient()

function App() {

  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <NavigationContainer linking={linking}>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <AppContent />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

function AppContent() {
  const dimensions = useWindowDimensions();

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <Drawer.Navigator
          screenOptions={{
            drawerType: dimensions.width >= 768 ? 'permanent' : 'front',
            headerShown: false  // This hides the entire header
          }}
        >
          <Drawer.Screen name="Chat" component={Home} />
          <Drawer.Screen name="Settings" component={Settings} />
          <Drawer.Screen name="Intervention" component={Intervention} />

        </Drawer.Navigator>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
