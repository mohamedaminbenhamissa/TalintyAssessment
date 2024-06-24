import { FormProvider } from "react-hook-form";

import { Box } from "@mui/material";

import { FormProps } from "./types";

const Form = (props: FormProps) => {
  const { children, onSubmit, methods, Row, Column, sx, ...rest } = props;
  return (
    <FormProvider {...methods}>
      <form
        style={{ width: "100%", height: "100%" }}
        onSubmit={onSubmit ? methods.handleSubmit(onSubmit) : () => {}}
      >
        <Box
          {...rest}
          sx={{
            ...sx,
            ...((Row || Column) && { display: "flex" }),
            ...(Column && { flexDirection: "column" }),
          }}
        >
          {children}
        </Box>
      </form>
    </FormProvider>
  );
};

export { Form };
