import React from 'react';
import '../../App.scss';
import {useTranslation} from "react-i18next";
import Api from "../../common/api-communication";

function TermsAndConditionsDownloadLink() {

    const {t} = useTranslation();

    return <a href={Api.getTermsAndConditionsURL()} download={t('termsAndConditions') + ".pdf"}>
        {t('termsAndConditions')}
    </a>


}

TermsAndConditionsDownloadLink.propTypes = {
};

export default TermsAndConditionsDownloadLink;
