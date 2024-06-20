import { Components } from '@mui/material';

export const overridesButton = (): Pick<Components, 'MuiButton'> => ({
    MuiButton: {
        styleOverrides: {
            startIcon: {
                margin: '0px !important',
            },
            root: {
                textTransform: 'none',
                '&.Mui-disabled': {
                    // color: "#0000001C",
                },
            },
        },
    },
});

