import React from 'react';
import {useTranslation} from "react-i18next";
import TermsAndConditionsDownloadLink from "./TermsAndConditionsDownloadLink";
import PrivacyPolicyDownloadLink from "./PrivacyPolicyDownloadLink";

function RegisterConsentComponent() {

    const {t} = useTranslation();

    return <div>
        {t('consent.intro')}<TermsAndConditionsDownloadLink/>{t('consent.separator')}<PrivacyPolicyDownloadLink/>{t('consent.outro')}
    </div>
}

RegisterConsentComponent.propTypes = {};

export default RegisterConsentComponent;
