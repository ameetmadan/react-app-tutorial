// src/packages/core/i18n/i18n.ts

import { createContext, useContext } from 'react';

export type LanguageCode = 'en-US' | 'en-GB' | 'de-CH';

function getLanguageId(languageCode: LanguageCode): string {
    const separator = '-';
    const languageCodeParts = languageCode.split(separator);
    languageCodeParts.pop();
    return languageCodeParts.join(separator);
}

export type I18n = {
    ampm: boolean;
    languageCode: LanguageCode;
};

// Did you notice the ampm flag? As we learned above, i18n is not only about translations. So whenever we need to render a date
// in a user-friendly manner, we can call the useI18n() hook and use the ampm flag to decide whether the date should be shown in
// 12 or 24 hours format.

export function createI18n(languageCode: LanguageCode = 'en-US'): I18n {
    return {
        ampm: getLanguageId(languageCode) === 'en',
        languageCode: languageCode,
    };
}

const context = createContext<null | I18n>(null);

export const I18nProvider = context.Provider;

export function useI18n(): I18n {
    const state = useContext(context);
    if (!state) {
        throw new Error('no i18n was provided');
    }
    return state;
}
