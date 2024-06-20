import { Components } from '@mui/material';

export const overridesButtonBase = (): Pick<Components, 'MuiButtonBase'> => ({
    MuiButtonBase: {
        styleOverrides: {
            root: {
                '& .MuiRadio-root': {
                    color: '#404040',
                },
                '& .MuiRadio-root.Mui-checked': {
                    color: '#EA0096',
                },
            },
        },
    },
});

