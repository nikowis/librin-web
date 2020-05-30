import React from 'react';
import {useTranslation} from "react-i18next";
import Api from "../../common/api-communication";

function PrivacyPolicyLink() {

    const {t} = useTranslation();

    return <a href={Api.getPrivacyPolicyURL()} download={t('privacyPolicy') + ".pdf"}>
        {t('privacyPolicy')}
    </a>
}

PrivacyPolicyLink.propTypes = {
};

export default PrivacyPolicyLink;
