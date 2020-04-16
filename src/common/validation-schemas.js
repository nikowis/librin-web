import * as Yup from "yup";
import {setLocale} from "yup";

setLocale({
    mixed: {
        default: 'validations.default',
        required: 'validations.required',
    },
    string: {
        min: ({min}) => ({key: 'validations.min', values: {min}}),
        email: 'validations.email'
    }
});

export const registerSchema = Yup.object().shape({
    login: Yup.string()
        .email()
        .required(),
    password: Yup.string()
        .min(1)
        .required(),
    repeatPassword: Yup.string()
        .required()
        .oneOf([Yup.ref('password')], 'validations.passwordMatch')
});

export const loginSchema = Yup.object().shape({
    login: Yup.string()
        .email()
        .required(),
    password: Yup.string()
        .required()
});

export const profileSchema = Yup.object().shape({
    password: Yup.string(),
    repeatPassword: Yup.string()
        .when("password", {
            is: (val) => val,
            then: Yup.string().required()
        })
        .oneOf([Yup.ref('password')], 'validations.passwordMatch')
});

export const createOfferSchema = Yup.object().shape({
    title: Yup.string()
        .min(2)
        .required(),
    author: Yup.string()
        .min(2)
        .required()
});