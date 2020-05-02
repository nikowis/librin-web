import React, {useEffect} from 'react';
import '../../App.scss';
import Api from "./../../common/api-communication"
import {useParams, withRouter} from 'react-router-dom';
import {useTranslation} from "react-i18next";
import {Formik} from 'formik';
import {editOfferSchema} from "../../common/validation-schemas";
import {connect} from "react-redux";
import {HIDE_NOTIFICATION, OFFER_UPDATED, SHOW_NOTIFICATION} from "../../redux/actions";
import {NOTIFICATION_DURATION} from "../../common/app-constants";
import {TextField} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import CurrencyTextField from '@unicef/material-ui-currency-textfield'
import {translate} from "../../common/i18n-helper";
import PropTypes from "prop-types";
import LoaderView from "../LoaderView";
import {MY_OFFERS} from "../../common/paths";
import Card from "@material-ui/core/Card";
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";


function EditOfferView(props) {

    const {t} = useTranslation();
    const {dispatch, history} = props;
    let {id} = useParams();
    const propId = props.id;

    useEffect(() => {
        if (propId === null || propId.toString() !== id) {
            dispatch(Api.getMyOffer(id));
        }
    }, [dispatch, id, propId]);

    const handleSubmit = (data, actions) => {
        actions.setSubmitting(true);
        Api.updateOffer(data).payload.then((response) => {
            if (!response.error) {
                dispatch({type: OFFER_UPDATED, payload: response});
                dispatch({type: SHOW_NOTIFICATION, payload: t('notification.offerUpdated')});
                setTimeout(() => {
                    dispatch({type: HIDE_NOTIFICATION})
                }, NOTIFICATION_DURATION);
                history.push(MY_OFFERS);
            } else if (response.status && response.status === 400) {
                response.errors.forEach(err => {
                    actions.setFieldError(err.field, err.defaultMessage);
                });
            }
        }).finally(() => actions.setSubmitting(false));
    };

    const loadFileToURI = (resolve, file) => {
        let reader = new FileReader();
        reader.onload = () => resolve({name: file.name, content: reader.result, url: URL.createObjectURL(file)});
        reader.readAsDataURL(file);
    };

    const handleUploadFile = (e, formikSetFieldValue) => {
        const files = e.target.files;
        Object.keys(files).forEach(i => {
            const file = files[i];
            new Promise(resolve => loadFileToURI(resolve, file))
            // .then(file => this.compressFile(file))
            // .then(file => this.validateFile(file))
                .then(file => {
                    formikSetFieldValue("attachment", file);
                });
        })
    };

    function base64ToFile(base64, filename) {
        var arr = base64.split(','),
            mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]),
            n = bstr.length,
            u8arr = new Uint8Array(n);

        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }

        return new File([u8arr], filename, {type: mime});
    }


    const initializeAttachmentFromBase64 = (attachment) => {
        const file = base64ToFile(attachment.content, attachment.name);
        return {name: attachment.name, content: attachment.content, url: URL.createObjectURL(file)}
    };


    const getView = () => {
        return (
            <Card>
                <Formik validationSchema={editOfferSchema} onSubmit={handleSubmit} enableReinitialize={true}
                        initialValues={{
                            id: props.id,
                            title: props.title,
                            author: props.author,
                            price: props.price,
                            attachment: initializeAttachmentFromBase64(props.attachment)
                        }}
                >
                    {({
                          values,
                          errors,
                          touched,
                          handleChange,
                          handleSubmit,
                          handleBlur,
                          isSubmitting,
                          setFieldValue
                      }) => (
                        <form onSubmit={handleSubmit}>
                            <div>
                                <TextField
                                    label={t('id')}
                                    name="id"
                                    value={values.id}
                                    disabled={true}
                                    margin="normal"
                                />
                            </div>
                            <div>
                                <TextField
                                    error={errors.title && touched.title}
                                    label={t('title')}
                                    name="title"
                                    value={values.title}
                                    variant={'outlined'}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    helperText={(errors.title && touched.title) ? translate(errors.title) : ''}
                                    margin="normal"
                                />
                            </div>
                            <div>
                                <TextField
                                    error={errors.author && touched.author}
                                    label={t('author')}
                                    name="author"
                                    value={values.author}
                                    variant={'outlined'}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    helperText={(errors.author && touched.author) ? translate(errors.author) : ''}
                                    margin="normal"
                                />
                            </div>
                            <div>
                                <CurrencyTextField
                                    error={errors.price && touched.price}
                                    label={t('price')}
                                    name="price"
                                    minimumValue={"0"}
                                    variant={'outlined'}
                                    value={values.price}
                                    currencySymbol={t('currencySymbol')}
                                    outputFormat="string"
                                    decimalCharacter="."
                                    decimalCharacterAlternative=","
                                    decimalPlacesShownOnBlur={2}
                                    digitGroupSeparator={""}
                                    decimalPlaces={2}
                                    onChange={(event, value) => setFieldValue('price', value)}
                                    onBlur={handleBlur}
                                    helperText={(errors.price && touched.price) ? translate(errors.price) : ''}
                                    margin="normal"
                                />
                            </div>
                            <div>
                                <input
                                    accept="image/*"
                                    id="attachment"
                                    style={{display: 'none'}}
                                    onChange={(event) => {
                                        handleUploadFile(event, setFieldValue);
                                    }}
                                    type="file"
                                />
                                <label htmlFor="attachment">

                                    <Container maxWidth="xs">
                                        <Typography component="div"
                                                    style={{backgroundColor: '#ebedee', height: '30vh'}}>
                                            {values.attachment ?
                                                <div style={{
                                                    height: '100%', width: '100%',
                                                    backgroundImage: 'url(' + values.attachment.url + ')',
                                                    backgroundSize: '100% 100%',
                                                    border: '1px black'
                                                }}
                                                /> :
                                                <AddAPhotoIcon fontSize={'large'}/>
                                            }
                                        </Typography>
                                    </Container>
                                    {values.attachment && values.attachment.name ? values.attachment.name : t('offers.edit.upload')}
                                </label>
                            </div>
                            <Button variant="contained" color="primary" type="submit" disabled={isSubmitting}>
                                {t('offers.edit.submit')}
                            </Button>
                        </form>
                    )}
                </Formik>


            </Card>
        );
    };

    return (
        <React.Fragment>
            {props.title === null || props.id.toString() !== id ? <LoaderView/> : getView()}
        </React.Fragment>
    );
}

EditOfferView.propTypes = {
    id: PropTypes.number,
    title: PropTypes.string,
    author: PropTypes.string
};

export default connect(state => ({
    id: state.myoffers.currentOffer.id,
    title: state.myoffers.currentOffer.title,
    author: state.myoffers.currentOffer.author,
    price: state.myoffers.currentOffer.price,
    attachment: state.myoffers.currentOffer.attachment,
}))(withRouter(EditOfferView));
