import React from 'react';
import {useTranslation} from "react-i18next";
import Api from "../../common/api-communication";

function PrivacyPolicyDownloadLink() {

    const {t} = useTranslation();

    return <a href={Api.getPrivacyPolicyURL()} download={t('privacyPolicy') + ".pdf"}>
        {t('privacyPolicy')}
    </a>
}

PrivacyPolicyDownloadLink.propTypes = {
};

export default PrivacyPolicyDownloadLink;
