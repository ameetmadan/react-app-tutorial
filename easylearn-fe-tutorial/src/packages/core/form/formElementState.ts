import { Translation } from '@packages/core/i18n';
import { Entry } from '../collection';

export type Message = {
    id: string;
    severity: 'info' | 'success' | 'warning' | 'error';
    translation: Translation;
};

// The (partial) path of a form element or the whole path of a field message
export type FieldMessagePath = (string | number)[];

// The message which belongs to a field or a parameter, delivered by an endpoint or something else
export type FieldMessage = {
    path: FieldMessagePath;
    message: Message;
};

// An enum to define the types for all form element types.
// Normally I suggest using a string union type but we need this later as an object.
// The random string after "textField-" is to make sure that the value is recognized
// as a form element type of this package.

export enum FormElementTypes {
    TEXT_FIELD = 'textField-c615d5de',
    CHECKBOX = 'checkbox-c615d5de',
    SINGLE_SELECTION = 'singleSelection-c615d5de',
}

// Create a new form element state for a single selection:
export type SingleSelectionState<D = any> = GenericFormElementState<
    FormElementTypes.SINGLE_SELECTION,
    { chosenOption: null | Entry<D>; messages: Message[] }
>;

// Write a single state selection factory function, to reuse it later:
export function createSingleSelectionState<D = any>(
    partial: Partial<Omit<SingleSelectionState, 'type'>> = {}
): SingleSelectionState<D> {
    return {
        messages: [],
        chosenOption: null,
        ...partial,
        type: FormElementTypes.SINGLE_SELECTION,
    };
}

type GenericFormElementState<T extends FormElementTypes, P extends object = {}> = {
    type: T;
    pathPart?: FieldMessagePath;
} & P;

export type TextFieldState = GenericFormElementState<
    FormElementTypes.TEXT_FIELD,
    { value: string; messages: Message[] }
>;

export type CheckboxState = GenericFormElementState<
    FormElementTypes.CHECKBOX,
    {
        value: boolean;
        messages: Message[];
    }
>;

export function createTextFieldState(partial: Partial<Omit<TextFieldState, 'type'>> = {}): TextFieldState {
    return {
        messages: [],
        value: '',
        ...partial,
        type: FormElementTypes.TEXT_FIELD,
    };
}

// add the factory function like we have done for the TextFieldState
export function createCheckboxState(partial: Partial<Omit<CheckboxState, 'type'>> = {}): CheckboxState {
    return {
        messages: [],
        value: false,
        ...partial,
        type: FormElementTypes.CHECKBOX,
    };
}

// Add the state to the FormElementState union type:
export type FormElementState = TextFieldState | CheckboxState | SingleSelectionState;
