import { useEffect, useState } from "react";

import { Controller, useFormContext } from "react-hook-form";

import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import SelectList from "@mui/material/Select";

import { useTranslation } from "@/hooks/useTranslation";

import { SelectProps } from "./types";

function Select<T>(props: SelectProps<T>): JSX.Element {
  const {
    variant,
    name,
    label,
    data,
    margin,
    width,
    minWidth,
    fullWidth,
    rules,
    helperText,
    size,
    disabled,
    required,
    getOptionValue,
    getOptionLabel,
    onSelectionchange,
    sx,
    defaultValue,
  } = props;
  const { t } = useTranslation("language");
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    window.addEventListener("scroll", handleClose);
    return () => window.removeEventListener("scroll", handleClose);
  }, []);

  const { control } = useFormContext();
  //render
  const renderItem = () => {
    return data.map((item, index) => {
      return (
        <MenuItem key={index} value={getOptionValue(item)}>
          {getOptionLabel(item)}
        </MenuItem>
      );
    });
  };
  return (
    <Controller
      control={control}
      name={name}
      rules={{
        ...(required && { required: t("Required") }),
        ...rules,
      }}
      render={({ field: { onChange, value }, fieldState: { error } }) => {
        const isError = error && error.message !== null;
        return (
          <FormControl
            variant={variant || "outlined"}
            size={size}
            style={{ margin, width, minWidth }}
            sx={sx}
            error={isError}
            fullWidth={typeof fullWidth === "boolean" ? fullWidth : true}
          >
            <InputLabel id={label}>{label}</InputLabel>
            <SelectList
              labelId={`select-${label}`}
              id={label}
              open={open}
              onClose={handleClose}
              onOpen={handleOpen}
              value={value || ""}
              error={isError}
              label={label}
              disabled={disabled}
              onChange={(e) => {
                onChange(e);
                onSelectionchange?.(e?.target?.value);
              }}
              defaultValue={defaultValue}
            >
              {renderItem()}
            </SelectList>
            <FormHelperText error={props.isError || isError}>
              {helperText || error?.message}
            </FormHelperText>
          </FormControl>
        );
      }}
    />
  );
}
export { Select };
