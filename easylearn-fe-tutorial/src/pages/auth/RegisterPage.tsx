// src/pages/auth/RegisterPage.tsx

import { FC, useState } from 'react';
import { NavBarPage } from '@components/page-layout';
import { useTranslator, T } from '@packages/core/i18n';
import {
    Button,
    Checkbox,
    CheckboxState,
    createCheckboxState,
    createTextFieldState,
    Form,
    TextField,
    TextFieldState,
} from '@packages/core/form';
import { FunctionalLink } from '@packages/core/routing';
import { Typography } from '@mui/material';
import { createSingleSelectionState, SingleSelectionState } from '@packages/core/form';

// Add the following import statements
import { SingleSelection } from '@packages/core/form/SingleSelection';
import { Entry, useArrayCollectionProvider } from '@packages/core/collection';

// Create the genders array
type GenderId = 'f' | 'm' | 'o';
const genderIds: GenderId[] = ['f', 'm', 'o'];

type RegistrationFormState = {
    usernameField: TextFieldState;
    emailField: TextFieldState;
    passwordField: TextFieldState;
    agreeCheckbox: CheckboxState;
    genderSelection: SingleSelectionState<GenderId>;
};

function createRegistrationFormState(): RegistrationFormState {
    return {
        usernameField: createTextFieldState(),
        emailField: createTextFieldState(),
        passwordField: createTextFieldState(),
        agreeCheckbox: createCheckboxState(),
        genderSelection: createSingleSelectionState(),
    };
}

type RegistrationFormProps = {
    data: RegistrationFormState;
    onChangeData: (data: RegistrationFormState) => void;
};

const RegistrationForm: FC<RegistrationFormProps> = (props) => {
    const { t } = useTranslator();
    const genderIdsProvider = useArrayCollectionProvider<GenderId>({
        dataArray: genderIds,
        createEntryKey: (gId) => gId,
    });
    const termsAndConditionsLabel = (
        <T
            id="pages.registerPage.agreeOnTermsAndConditions"
            placeholders={{
                termsAndConditions: (
                    <FunctionalLink onClick={() => console.log('open terms and conditions')}>
                        {t('pages.registerPage.termsAndConditions')}
                    </FunctionalLink>
                ),
            }}
        />
    );
    return (
        <Form>
            <SingleSelection
                data={props.data.genderSelection}
                onChangeData={(data) => props.onChangeData({ ...props.data, genderSelection: data })}
                provider={genderIdsProvider}
                renderOption={(e: Entry<GenderId>) => {
                    switch (e.data) {
                        case 'f':
                            return t('pages.registerPage.genderOptions.female');
                        case 'm':
                            return t('pages.registerPage.genderOptions.male');
                        case 'o':
                            return t('pages.registerPage.genderOptions.other');
                        default:
                            console.error(`genderId "${e.data}" is not supported!`);
                            return null;
                    }
                }}
                label={t('pages.registerPage.gender')}
                variant="outlined"
                margin="dense"
                canChooseNone
                fullWidth
            />
            <TextField
                label={t('pages.registerPage.username')}
                data={props.data.usernameField}
                onChangeData={(data) => props.onChangeData({ ...props.data, usernameField: data })}
                type="text"
                maxLength={16}
                variant="outlined"
                margin="dense"
                fullWidth
                name="username"
            />
            <TextField
                label={t('pages.registerPage.email')}
                data={props.data.emailField}
                onChangeData={(data) => props.onChangeData({ ...props.data, emailField: data })}
                type="text"
                maxLength={191}
                variant="outlined"
                margin="dense"
                fullWidth
                name="email"
            />
            <TextField
                label={t('pages.registerPage.password')}
                data={props.data.passwordField}
                onChangeData={(data) => props.onChangeData({ ...props.data, passwordField: data })}
                type="password"
                variant="outlined"
                margin="dense"
                fullWidth
                name="password"
            />
            <Checkbox
                label={termsAndConditionsLabel}
                data={props.data.agreeCheckbox}
                onChangeData={(data) => props.onChangeData({ ...props.data, agreeCheckbox: data })}
                margin="dense"
            />
        </Form>
    );
};

export const RegisterPage: FC = () => {
    const { t } = useTranslator();
    const [registrationForm, setRegistrationForm] = useState(createRegistrationFormState());
    return (
        <NavBarPage title={t('pages.registerPage.title')}>
            <Typography component="h1" variant="h5">
                {t('pages.registerPage.title')}
            </Typography>
            <RegistrationForm data={registrationForm} onChangeData={(data) => setRegistrationForm(data)} />
            <Button margin="dense" variant="outlined" color="primary">
                {t('pages.registerPage.signUp')}
            </Button>
        </NavBarPage>
    );
};
