import { createContext, useContext, useState } from "react";

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

    return (
        <ThemeContext.Provider value={{ backgroundColor, setBackgroundColor }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    return useContext(ThemeContext);
}
