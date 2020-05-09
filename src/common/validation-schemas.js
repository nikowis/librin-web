import * as Yup from "yup";
import {setLocale} from "yup";

const moneyRegex = new RegExp('^\\d+([\\.|,]\\d{1,2})?$');
const lettersRegex = /^[a-zA-Z\u0104\u0106\09\u0118\09\u0141\09\u0143\09\D3\09\u015A\09\u0179\09\u017B\09\u0105\09\u0107\09\u0119\09\u0142\09\u0144\09F3\09\u015B\09\u017A\09\u017C]+$/
const usernameRegex = new RegExp('^[a-zA-Z0-9]+$');


setLocale({
    mixed: {
        default: 'validations.default',
        required: 'validations.required',
    },
    string: {
        min: ({min}) => ({key: 'validations.min', value: min}),
        email: 'validations.email',
        matches: 'validations.regexp'
    }
});

export const registerSchema = Yup.object().shape({
    email: Yup.string()
        .email()
        .required(),
    firstName: Yup.string()
        .min(2)
        .matches(lettersRegex)
        .required(),
    lastName: Yup.string()
        .matches(lettersRegex)
        .min(2)
        .required(),
    username: Yup.string()
        .matches(usernameRegex)
        .min(2)
        .required(),
    password: Yup.string()
        .min(2)
        .required(),
    repeatPassword: Yup.string()
        .required()
        .oneOf([Yup.ref('password')], 'validations.passwordMatch')
});

export const loginSchema = Yup.object().shape({
    email: Yup.string()
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
        .required(),
    price: Yup.string()
        .required()
        .matches(moneyRegex)
});


export const editOfferSchema = Yup.object().shape({
    title: Yup.string()
        .min(2)
        .required(),
    author: Yup.string()
        .min(2)
        .required(),
    price: Yup.string()
        .required()
        .matches(moneyRegex)
});

export const messageSchema = Yup.object().shape({
    content: Yup.string()
        .required()
});

export const deleteAccountSchema = Yup.object().shape({
    password: Yup.string()
        .required()
});