import React from 'react';
import {useTranslation} from "react-i18next";
import Api from "../../common/api-communication";

function TermsAndConditionsLink() {

    const {t} = useTranslation();

    return <a href={Api.getTermsAndConditionsURL()} download={t('termsAndConditions') + ".pdf"}>
        {t('termsAndConditions')}
    </a>


}

TermsAndConditionsLink.propTypes = {
};

export default TermsAndConditionsLink;
