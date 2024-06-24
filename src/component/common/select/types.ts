import { FieldPath, FieldValues, RegisterOptions } from 'react-hook-form';

import { SxProps, Theme } from '@mui/material';

export type SelectProps<
    T,
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
    variant?: 'filled' | 'standard' | 'outlined';
    name: TName;
    rules?: Omit<
        RegisterOptions<TFieldValues, TName>,
        'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
    >;
    data: Array<T>;
    label?: string;
    margin?: number | string;
    minWidth?: number | string;
    width?: number | string;
    fullWidth?: boolean;
    helperText?: string | null;
    isError?: boolean;
    disabled?: boolean;
    required?: boolean;
    size?: 'small' | 'medium' | undefined;
    sx?: SxProps<Theme> | undefined;
    getOptionValue: (item: T) => string | number;
    getOptionLabel: (item: T) => string | number | JSX.Element;
    onSelectionchange?: (item: number) => void;
    defaultValue?: number;
};

