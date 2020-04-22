import React, {useEffect} from 'react';
import '../../App.scss';
import Api from "./../../common/api-communication"
import {useParams, withRouter} from 'react-router-dom';
import {useTranslation} from "react-i18next";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import LoaderView from "../LoaderView";
import {TextField} from "@material-ui/core";
import CurrencyTextField from "@unicef/material-ui-currency-textfield";
import Card from "@material-ui/core/Card/Card";

function EditOfferView(props) {

    const {t} = useTranslation();
    const {dispatch} = props;
    let {id} = useParams();
    const propId = props.id;

    useEffect(() => {
        if (propId === null || propId.toString() !== id) {
            dispatch(Api.getOffer(id));
        }
    }, [dispatch, id, propId]);

    const getView = () => {
        return (
            <>
                <div>
                    <TextField
                        label={t('id')}
                        name="id"
                        value={props.id}
                        disabled={true}
                        margin="normal"
                    />
                </div>
                <div>
                    <TextField
                        label={t('title')}
                        name="title"
                        value={props.title}
                        disabled={true}
                        margin="normal"
                    />
                </div>
                <div>
                    <TextField
                        label={t('author')}
                        name="author"
                        value={props.author}
                        disabled={true}
                    />
                </div>
                <div>
                    <CurrencyTextField
                        label={t('price')}
                        name="price"
                        minimumValue={"0"}
                        value={props.price}
                        currencySymbol="PLN"
                        outputFormat="string"
                        decimalCharacter="."
                        decimalCharacterAlternative=","
                        decimalPlacesShownOnBlur={2}
                        digitGroupSeparator={""}
                        disabled={true}
                        margin="normal"
                    />
                </div>
            </>
        );
    };

    return (
        <Card>
            {props.title === null || props.id.toString() !== id ? <LoaderView/> : getView()}
        </Card>
    );
}

EditOfferView.propTypes = {
    id: PropTypes.number,
    title: PropTypes.string,
    author: PropTypes.string,
    price: PropTypes.string,
};

export default connect(state => ({
    id: state.offers.currentOffer.id,
    title: state.offers.currentOffer.title,
    author: state.offers.currentOffer.author,
    price: state.offers.currentOffer.price
}))(withRouter(EditOfferView));
