import { FC, ReactNode, useEffect } from 'react';
import { useConfig } from '@packages/core/config';
import { CssBaseline } from '@mui/material';
import { MuiToasterSubscriber, useSubscribableToaster } from '@packages/core/toaster';

export type BlankPageProps = {
    title: string;
    children?: ReactNode;
};

export const BlankPage: FC<BlankPageProps> = (props) => {
    const { companyName } = useConfig();
    const toaster = useSubscribableToaster();
    const titleParts: string[] = [];
    if (props.title) {
        titleParts.push(props.title);
    }
    if (companyName) {
        titleParts.push(companyName);
    }
    useEffect(() => {
        if (document) {
            // only adjust this in browser environment
            document.title = titleParts.join(' — ');
        }
    });
    return (
        <>
            <CssBaseline />
            {props.children}
            <MuiToasterSubscriber toaster={toaster} />
        </>
    );
};
