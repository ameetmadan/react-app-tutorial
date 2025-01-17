import { createContext, useContext } from 'react';
import { Toaster, ToastMessageCreationSettings, createToastMessage, ToastMessage } from './toaster';

export type ToasterSubscriber = {
    id: string;
    onShowMessage: (message: ToastMessage) => void;
};

// The toaster subscriber lets us do something via the onShowMessage function. This could be deploying a back-end or DB task.

export class SubscribableToaster implements Toaster {
    private subscribers: ToasterSubscriber[];

    constructor() {
        // On initialization, we bind the functions showMessage, subscribe and unSubscribe to our class of SubscriableToaster
        this.subscribers = [];
        this.showMessage = this.showMessage.bind(this);
        this.subscribe = this.subscribe.bind(this);
        this.unSubscribe = this.unSubscribe.bind(this);
    }

    // Loop and execute through all contents  of the onShowMessage prop
    showMessage(settings: ToastMessageCreationSettings) {
        const toastMessage = createToastMessage(settings);
        this.subscribers.forEach((subscriber) => {
            subscriber.onShowMessage(toastMessage);
        });
    }

    subscribe(subscriber: ToasterSubscriber) {
        this.subscribers = [...this.subscribers, subscriber];
    }

    unSubscribe(subscriberId: string) {
        this.subscribers = this.subscribers.filter((subscriber) => subscriber.id !== subscriberId);
    }
}

const subscribableToasterContext = createContext<null | SubscribableToaster>(null);
export const SubscribableToasterProvider = subscribableToasterContext.Provider;

export function useSubscribableToaster(): SubscribableToaster {
    const toaster = useContext(subscribableToasterContext);
    if (!toaster) {
        throw new Error('no SubscribableToaster was provided');
    }
    return toaster;
}
