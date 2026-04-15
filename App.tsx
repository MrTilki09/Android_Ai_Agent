import "./global.css"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { StatusBar, Text, useColorScheme, useWindowDimensions, View } from 'react-native';
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
import { useEffect } from 'react';
import { useMigrations } from "drizzle-orm/op-sqlite/migrator";
import { addDemoData, clearMemory, db } from "./src/db/client";
import migrations from './drizzle/migrations';
import { SliderMain } from "./app/launch/SliderMain";
import { createAsyncStorage } from "@react-native-async-storage/async-storage";
import LoginLoader from "./app/loaders/LoginLoader";
import { useMutation } from "@tanstack/react-query";
import { handleFirstAppLaunch } from "./components/userFunctions";



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
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <NavigationContainer linking={linking} fallback={<View />}>
          <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
          <AppContent />
        </NavigationContainer>
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}

function AppContent() {
  const dimensions = useWindowDimensions();
  const { success, error } = useMigrations(db, migrations);
  const storage = createAsyncStorage("appDB");
  var firstLaunchChecked = false;
  const { mutateAsync: handleFirstLaunch , status} = useMutation({
    mutationFn: handleFirstAppLaunch
  });


  useEffect(() => {
    console.log("Migrations - Success:", success, "Error:", error);
  }, [success, error, status]);

  useEffect(() => {
    const checkFirstLaunch = async () => {
      const value = await storage.getItem("first_launch");
      if (value === "true") {
        firstLaunchChecked = true;
      }
    };
    handleFirstLaunch();
    checkFirstLaunch();
  }, [handleFirstLaunch]);

  if (error) {
    return <Text>Migration Error: {error.message}</Text>;
  }

  if (!success && status === "idle") {
    return (
      <LoginLoader />
    );
  }


  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ThemeProvider>
        <Drawer.Navigator
          screenOptions={{
            drawerType: dimensions.width >= 768 ? 'permanent' : 'front',
            headerShown: false  // This hides the entire header
          }}
        >          
        {firstLaunchChecked && (
          <Drawer.Screen name="sss" component={SliderMain} 
           options={{
                drawerItemStyle: { display: 'none' } // Hide from drawer menu
              }} />
        )}

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
    </SafeAreaView>
  );
}

export default App;
