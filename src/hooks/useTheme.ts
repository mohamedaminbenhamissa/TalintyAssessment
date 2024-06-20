import { createContext, useContext } from 'react';

import { ThemeContextType } from '../context/ThemeContext/ThemeTypes';

export const ThemeContext = createContext<ThemeContextType | undefined>(
    undefined,
);
export const useTheme = (): ThemeContextType => {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};
