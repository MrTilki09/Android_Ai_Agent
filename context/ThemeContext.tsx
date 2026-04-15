import { createAsyncStorage } from "@react-native-async-storage/async-storage";
import { createContext, useContext, useEffect, useState } from "react";

type ThemeContextType = {
    backgroundColor: string;
    setBackgroundColor: (color: string) => void;
};

const ThemeContext = createContext<ThemeContextType>({
    backgroundColor: "#0d1117",
    setBackgroundColor: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [backgroundColor, setBackgroundColor] = useState("#0d1117");
    const storage = createAsyncStorage("appDB");

    useEffect(() => {
        // Load the background color from AsyncStorage when the component mounts
        const loadBackgroundColor = async () => {
            try {
                const storedColor = await storage.getItem("backgroundColor");
                console.log("Loaded background color:", storedColor);
                if (storedColor) {
                    setBackgroundColor(storedColor);
                }
            } catch (error) {
                console.error("Failed to load background color:", error);
            }
        };
        loadBackgroundColor();
    }, []);



    return (
        <ThemeContext.Provider value={{ backgroundColor, setBackgroundColor }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    return useContext(ThemeContext);
}
