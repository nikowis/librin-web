import React from 'react';
import {useTranslation} from "react-i18next";
import Api from "../../common/api-communication";

function CookiesPolicyLink() {

    const {t} = useTranslation();

    return <a href={Api.getCookiesPolicyLink()} download={t('cookiePolicy') + ".pdf"}>
        {t('cookiePolicy')}
    </a>


}

CookiesPolicyLink.propTypes = {
};

export default CookiesPolicyLink;
