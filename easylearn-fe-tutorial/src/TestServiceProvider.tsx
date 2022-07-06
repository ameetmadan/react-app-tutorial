// src/TestServiceProvider.tsx

import {
    anonymousAuthUser,
    AuthUser,
    CurrentUserProvider,
    CurrentUserRepository,
    CurrentUserRepositoryProvider,
} from '@packages/core/auth';
import { FC, PropsWithChildren, useRef, useState } from 'react';
import { Config, ConfigProvider } from '@packages/core/config';
import { MemoryRouter } from 'react-router-dom';
import {
    createI18n,
    I18n,
    I18nProvider,
    TranslationPlaceholders,
    Translator,
    TranslatorProvider,
    I18nManager,
    LanguageCode,
    I18nManagerProvider,
} from '@packages/core/i18n';
import { SubscribableToaster, SubscribableToasterProvider, ToasterProvider } from '@packages/core/toaster';

class StubCurrentUserRepository implements CurrentUserRepository {
    setCurrentUser(currentUser: AuthUser) {}
    init() {}
}

class StubI18nManager implements I18nManager {
    setLanguage(_: LanguageCode) {}
    init() {}
}

class StubTranslator implements Translator {
    t(translationId: string, _?: TranslationPlaceholders): string {
        return translationId;
    }
}

export const TestServiceProvider: FC<PropsWithChildren<{}>> = (props) => {
    const stubCurrentUserRepositoryRef = useRef(new StubCurrentUserRepository());
    const [i18nState] = useState<I18n>(createI18n('en-US'));
    const toasterRef = useRef(new SubscribableToaster());
    const translatorRef = useRef<Translator>(new StubTranslator());
    const configRef = useRef<Config>({
        companyName: 'LearnEasy',
    });
    const i18nManagerRef = useRef<I18nManager>(new StubI18nManager());

    return (
        <MemoryRouter>
            <ConfigProvider value={configRef.current}>
                <ToasterProvider value={toasterRef.current}>
                    <SubscribableToasterProvider value={toasterRef.current}>
                        <I18nProvider value={i18nState}>
                            <I18nManagerProvider value={i18nManagerRef.current}>
                                <TranslatorProvider value={translatorRef.current}>
                                    <CurrentUserRepositoryProvider value={stubCurrentUserRepositoryRef.current}>
                                        <CurrentUserProvider value={anonymousAuthUser}>
                                            {props.children}
                                        </CurrentUserProvider>
                                    </CurrentUserRepositoryProvider>
                                </TranslatorProvider>
                            </I18nManagerProvider>
                        </I18nProvider>
                    </SubscribableToasterProvider>
                </ToasterProvider>
            </ConfigProvider>
        </MemoryRouter>
    );
};
