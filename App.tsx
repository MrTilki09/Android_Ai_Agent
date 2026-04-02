import "./global.css"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { StatusBar, useColorScheme, useWindowDimensions, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Home } from "./app/Home";
import Settings from "./app/Settings";
import Intervention from "./app/Intervention";
import { ThemeProvider } from "./context/ThemeContext";
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from "@react-navigation/native";
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { DrawerNavigationProp } from '@react-navigation/drawer';
import { Apps } from "./app/Apps";
import { Chat } from "./app/Chat";


const linking = {
  prefixes: ['agenttest83://'],
  config: {
    screens: {
      // Maps the URL "agenttest83://intervention?app=com.android.chrome" to Intervention screen
      Intervention: 'intervention',
      Chat: 'chat',
      Settings: 'settings',
      Apps: 'apps',
    },
  },
};


const Drawer = createDrawerNavigator();

const queryClient = new QueryClient()

function App() {

  const isDarkMode = useColorScheme() === 'dark';
  

  return (
    <SafeAreaProvider>
      <NavigationContainer linking={linking} fallback={<View />}>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <AppContent />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

function AppContent() {
  const dimensions = useWindowDimensions();

  return (
    <SafeAreaView style={{ flex: 1 }}>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <Drawer.Navigator
          screenOptions={{
            drawerType: dimensions.width >= 768 ? 'permanent' : 'front',
            headerShown: false  // This hides the entire header
          }}
        >
          <Drawer.Screen name="Home" component={Home} />
          <Drawer.Screen name="Chat" component={Chat} />
          <Drawer.Screen name="Settings" component={Settings} />
          <Drawer.Screen name="Apps" component={Apps} />
          <Drawer.Screen 
            name="Intervention" 
            component={Intervention}
            options={{
              drawerItemStyle: { display: 'none' } // Hide from drawer menu
            }}
          />
        </Drawer.Navigator>
      </ThemeProvider>
    </QueryClientProvider>
    </SafeAreaView>
  );
}

export default App;
