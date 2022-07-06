// src/pages/IndexPage.tsx

import { FC } from 'react';
import { NavBarPage } from '@components/page-layout';
import { T, useTranslator } from '@packages/core/i18n';
import { useCurrentUser } from '@packages/core/auth';
import { FunctionalLink } from '@packages/core/routing';
import { useToaster } from '@packages/core/toaster';
import { Alert } from '@mui/material';

export const IndexPage: FC = () => {
    const { t } = useTranslator();
    const currentUser = useCurrentUser();
    const { showMessage } = useToaster();
    const username =
        currentUser.type === 'authenticated' ? currentUser.data.username : t('core.currentUser.guestDisplayName');
    const greeting = <T id="pages.indexPage.greeting" placeholders={{ username: <strong>{username}</strong> }} />;
    return (
        <NavBarPage title="Home">
            {greeting}
            <div style={{ marginTop: '15px' }}>
                <Alert severity="info">
                    <strong>MuiToasterSubscriber:</strong>
                    <br />
                    Note that if a toast message is displayed and you click outside of it, this toast message will
                    automatically be closed.
                    <br />
                    <br />
                    <FunctionalLink onClick={() => showMessage({ content: greeting })}>
                        Trigger info toast
                    </FunctionalLink>
                    <br />
                    <FunctionalLink
                        onClick={() => {
                            showMessage({
                                severity: 'info',
                                autoHideDurationInMs: 1000,
                                content: <>Info: {greeting}</>,
                            });
                            showMessage({
                                severity: 'success',
                                autoHideDurationInMs: 1000,
                                content: <>Success: {greeting}</>,
                            });
                            showMessage({
                                severity: 'warning',
                                autoHideDurationInMs: 1000,
                                content: <>Warning: {greeting}</>,
                            });
                            showMessage({
                                severity: 'error',
                                autoHideDurationInMs: 1000,
                                content: <>Error: {greeting}</>,
                            });
                        }}>
                        trigger multiple success toasts
                    </FunctionalLink>
                </Alert>
            </div>
        </NavBarPage>
    );
};
