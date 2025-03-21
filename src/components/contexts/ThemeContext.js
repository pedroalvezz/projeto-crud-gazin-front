import React, { createContext, useState, useMemo, useContext } from "react";
import { DarkTheme } from "../themes";
import { LightTheme } from "../themes/Light";
import { Box, CssBaseline, GlobalStyles, ThemeProvider } from "@mui/material";

// Definindo o contexto com um valor inicial
const ThemeContext = createContext(undefined);

// Função para acessar o contexto
export const useAppThemeContext = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error("useAppThemeContext must be used within a ThemeProvider");
    }
    return context;
};

export const AppThemeProvider = ({ children }) => {
    const [themeName, setThemeName] = useState('light');  // Valor inicial como 'light'

    // Função para alternar o tema
    const toggleTheme = () => {
        setThemeName(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    const theme = useMemo(() => {
        const selectedTheme = themeName === 'light' ? LightTheme : DarkTheme;
        console.log("Tema ativo:", themeName);
        console.log("Background Default:", selectedTheme.palette.background.default);
        return selectedTheme;
    }, [themeName]);

    return (
        <ThemeContext.Provider value={{ themeName, toggleTheme }}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <GlobalStyles
                    styles={{
                        body: { backgroundColor: theme.palette.background.default, margin: 0, height: "100vh" },
                        html: { height: "100vh" }
                    }}
                />
                <Box width="100vw" height="100vh" bgcolor={theme.palette.background.default}>
                    {children}
                </Box>

            </ThemeProvider>
        </ThemeContext.Provider>
    );
};
