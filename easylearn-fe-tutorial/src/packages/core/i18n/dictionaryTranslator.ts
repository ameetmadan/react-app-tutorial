// src/packages/core/i18n/dictionaryTranslator.tsx

import { TranslationPlaceholders, Translator } from './translator';

export type Dictionary = {
    [key: string]: string | Dictionary;
};

// This function is bascially a JSON search function.
// We give the function the name of the dictionary, and the transalationId
// The function first checks if the dicitionary exists.
// Example: {t('path.to.translation', { username: 'Linus' })}
// What happens here is the 'path.to.transaltion' is the dictionary, 'username' is the key i.e. the translationId

function findNestedProp(dictionary: Dictionary, translationId: string): null | string {
    const translationIdParts = translationId.split('.');
    if (translationIdParts.length === 1) {
        const key = translationIdParts[0];
        if (dictionary[key] === undefined) {
            return null;
        }
        const translationContent = dictionary[key];
        if (typeof translationContent === 'string') {
            return translationContent;
        }
        console.error(`Invalid translationId "${translationId}": Translation is not a string`);
        return null;
    }
    const key = translationIdParts[0];
    if (dictionary[key] === undefined) {
        return null;
    }
    const subDictionary = dictionary[key];
    if (typeof subDictionary !== 'object') {
        return null;
    }
    const subTranslationId = translationIdParts.slice(1).join('.');
    return findNestedProp(subDictionary, subTranslationId);
}

export class DictionaryTranslator implements Translator {
    private dictionary: Dictionary;

    constructor(dictionary: Dictionary) {
        this.dictionary = dictionary;
        this.t = this.t.bind(this);
    }

    setDictionary(dictionary: Dictionary) {
        this.dictionary = dictionary;
    }

    t(translationId: string, placeholders?: TranslationPlaceholders): string {
        let translation = findNestedProp(this.dictionary, translationId);
        if (translation === null) {
            return translationId;
        }
        if (!placeholders) {
            return translation;
        }
        Object.keys(placeholders).forEach((placeholderKey) => {
            const placeholderValue = placeholders[placeholderKey];
            if (translation === null) {
                throw new Error(`this case should have been handled by an early return beforehand`);
            }
            translation = translation.replaceAll('{{' + placeholderKey + '}}', placeholderValue);
        });
        return translation;
    }
}
