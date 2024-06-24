/* eslint-disable */
import {
    FieldPath,
    FieldValues,
    SubmitHandler,
    UseFormReturn,
} from 'react-hook-form';

import { BoxProps } from '@mui/material';

export type FormItemContextValue = {
    id: string;
};
export type FormFieldContextValue<
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
    name: TName;
};
export type FormProps = {
    Row?: boolean;
    Column?: boolean;
    onSubmit?: SubmitHandler<any>;
    methods: UseFormReturn<any, undefined>;
} & Omit<BoxProps, 'onSubmit'>;
