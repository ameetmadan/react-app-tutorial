import { createContext, ReactNode, useContext } from 'react';
import { v4 } from 'uuid';

type Severity = 'info' | 'success' | 'warning' | 'error';
// The 4 types of toaster messages we can have

type ToastMessageContent = ReactNode | string;
// The content of the toaster has to be a React Node so that we can "feed it" with the necessary message

export type ToastMessage = {
    id: string;
    severity: Severity;
    content: ReactNode | string;
    autoHideDurationInMs?: null | number;
};
// The message has an id, severity type, content of the message and when it should auto-hide. Makes sense.

export type ToastMessageCreationSettings = Partial<ToastMessage> & { content: ToastMessageContent };

export function createToastMessage(settings: ToastMessageCreationSettings): ToastMessage {
    return {
        id: v4(),
        severity: 'info',
        autoHideDurationInMs: 3000,
        ...settings,
    };
}

// With the uuid we give our toaster message a randomly generated ID,
// we send our type "info", we hide it after 3 seconds and also send the settings
// object to take care of any settings we need to add.

export interface Toaster {
    showMessage(settings: ToastMessageCreationSettings): void;
}

const toasterContext = createContext<null | Toaster>(null);
export const ToasterProvider = toasterContext.Provider;

export function useToaster(): Toaster {
    const ctx = useContext(toasterContext);
    if (!ctx) {
        throw new Error('no Toaster was provided');
    }
    return ctx;
}
