import React from 'react';
import '../../App.scss';
import Api from "./../../common/api-communication"
import {withRouter} from 'react-router-dom';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {useTranslation} from "react-i18next";
import {Formik} from 'formik';
import {createOfferSchema} from "../../common/validation-schemas";
import {connect} from "react-redux";
import {CREATE_HABIT, HIDE_NOTIFICATION, SHOW_NOTIFICATION} from "../../redux/actions";
import {HABITS} from "../../common/paths";
import {NOTIFICATION_DURATION} from "../../common/app-constants";

function CreateOfferView(props) {

    const {t} = useTranslation();
    const {dispatch, history} = props;

    const handleSubmit = (data, actions) => {
        Api.createOffer(data).payload.then((response) => {
            if (!response.status) {
                dispatch({type: CREATE_HABIT});
                dispatch({type: SHOW_NOTIFICATION, payload: t('notification.habitCreated')});
                setTimeout(() => {
                    dispatch({type: HIDE_NOTIFICATION})
                }, NOTIFICATION_DURATION);
                history.push(HABITS);
            } else if (response.status && response.status === 400) {
                response.errors.forEach(err => {
                    actions.setFieldError(err.field, err.defaultMessage);
                });
            }
        });
    };

    return (
        <Formik validationSchema={createOfferSchema} onSubmit={handleSubmit}
                initialValues={{
                    title: '',
                    description: ''
                }}
        >
            {({touched, errors, handleSubmit, handleChange, values}) => (
                <Form noValidate onSubmit={handleSubmit}>
                    <Form.Group controlId="title">
                        <Form.Label>
                            {t('title')}
                        </Form.Label>
                        <Form.Control name="title" value={values.title} onChange={handleChange} type="text"
                                      placeholder={t('title')}
                                      isInvalid={touched.title && !!errors.title}/>
                        <Form.Control.Feedback type="invalid">
                            {t(errors.title)}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="description">
                        <Form.Label>
                            {t('description')}
                        </Form.Label>
                        <Form.Control name="description" value={values.description} onChange={handleChange}
                                      as="textarea" rows="3" placeholder={t('description')}
                                      isInvalid={touched.description && !!errors.description}/>
                        <Form.Control.Feedback type="invalid">
                            {t(errors.description)}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        {t('offers.create.submit')}
                    </Button>
                </Form>
            )}
        </Formik>
    );
}

CreateOfferView.propTypes = {};

export default connect()(withRouter(CreateOfferView));
