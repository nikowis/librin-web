import React from 'react';
import {useTranslation} from "react-i18next";
import TermsAndConditionsLink from "components/policy/TermsAndConditionsLink";
import PrivacyPolicyLink from "components/policy/PrivacyPolicyLink";

function RegisterConsentComponent() {

    const {t} = useTranslation();

    return <div>
        {t('consent.intro')}<TermsAndConditionsLink/>{t('consent.separator')}<PrivacyPolicyLink/>{t('consent.outro')}
    </div>
}

RegisterConsentComponent.propTypes = {};

export default RegisterConsentComponent;
