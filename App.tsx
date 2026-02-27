/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import "./global.css"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { StatusBar, useColorScheme, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Home } from "./app/Home";
import { ThemeProvider } from "./context/ThemeContext";


const queryClient = new QueryClient()

function App() {
  
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <AppContent />
    </SafeAreaProvider>
  );
}

function AppContent() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <View style={{ flex: 1 }}>
          <Home />
        </View>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
