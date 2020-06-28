import React from 'react';
import {connect} from "react-redux";

import {withRouter} from "react-router-dom";
import OffersPaginatedGrid from "./OffersPaginatedGrid";
import {OFFERS} from "../../common/paths";

function OffersView(props) {

    return (
        <>
            <OffersPaginatedGrid offerLinkBase={OFFERS}/>
        </>
    );

}

OffersView.propTypes = {

};

export default connect(state => ({
}))(withRouter(OffersView));
