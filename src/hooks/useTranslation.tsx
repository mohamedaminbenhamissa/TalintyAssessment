import { useTranslation as I18nTranslation } from "react-i18next";

import English from "../locales/en/en.json";

import { i18n } from "i18next";

type LanguageKeys = keyof typeof English;

type TranslationsKeys<T extends LanguageKeys> = T extends keyof typeof English
  ? keyof (typeof English)[T]
  : never;

export const useTranslation = <T extends LanguageKeys>(prefix: T) => {
  type SubKeys = TranslationsKeys<T>;

  const { t: f, i18n } = I18nTranslation("translation", {
    keyPrefix: prefix,
  });

  const t = <OptionalType extends SubKeys | string = SubKeys>(
    text: OptionalType
  ) => {
    return f(text);
  };

  return { t, i18n } as {
    t: <OptionalType extends SubKeys | string = SubKeys>(
      text: OptionalType
    ) => string;

    i18n: i18n;
  };
};
