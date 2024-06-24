// import { useEffect } from 'react';

import { useForm, useWatch } from "react-hook-form";

import { SxProps, Theme } from "@mui/material";

import { Form, Select } from "@/component/common";

import { useTranslation } from "@/hooks/useTranslation";
import { useEffect } from "react";

export const LangSelect = ({ sx }: { sx?: SxProps<Theme> }) => {
  const { i18n, t } = useTranslation("language");

  const methods = useForm({ defaultValues: { language: i18n.language } });
  const dataWatch = useWatch({ control: methods.control });
  useEffect(() => {
    i18n.changeLanguage(dataWatch.language);
  }, [dataWatch.language, i18n]);

  return (
    <Form methods={methods} sx={sx}>
      <Select
        label={t("language")}
        size="small"
        variant="outlined"
        name="language"
        data={[
          { Language: "arabic", key: "ar" },
          { Language: "english", key: "en" },
        ]}
        getOptionLabel={(item) => t(item.Language)}
        getOptionValue={(item) => item.key}
        sx={{ mb: "-6px" }}
      />
    </Form>
  );
};
