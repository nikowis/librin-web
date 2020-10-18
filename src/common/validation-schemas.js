import * as Yup from "yup";
import {setLocale} from "yup";
import {InvalidMailDomains} from './../common/invalid-domains';

const specialPolishChars = '\u0104\u0106\u0118\u0141\u0143\u015A\u0179\u017B\u0105\u0107\u0119\u0142\u0144\u015B\u017A\u017C\u00F3\u00D3';
const lettersRegex = new RegExp('^[a-zA-Z' + specialPolishChars + ']+$');
const usernameRegex = new RegExp('^[a-zA-Z0-9]+$');
const moneyRegex = new RegExp('^\\d+([\\.|,]\\d{1,2})?$');
const passwordRegex = new RegExp('^(?=.*[a-zA-Z' + specialPolishChars + '])(?=.*[0-9])(?=\\S+$).{8,}$');

setLocale({
    mixed: {
        default: 'validations.default',
        required: 'validations.required',
    },
    string: {
        min: ({min}) => ({key: 'validations.min', value: min}),
        max: ({max}) => ({key: 'validations.max', value: max}),
        email: 'validations.email',
        matches: 'validations.regexp'
    }
});

export const registerSchema = Yup.object().shape({
    email: Yup.string()
        .email()
        .test('email-domain-check', 'validations.incorrectEmailDomain', v => {
            let invDomains = InvalidMailDomains;
            let startIdx = v.indexOf('@') + 1;
            let domain = v.substring(startIdx);
            return invDomains.indexOf(domain) === -1;
        })
        .required(),
    firstName: Yup.string()
        .matches(lettersRegex)
        .min(2)
        .max(128)
        .required(),
    lastName: Yup.string()
        .matches(lettersRegex)
        .min(2)
        .max(128)
        .required(),
    username: Yup.string()
        .matches(usernameRegex)
        .min(2)
        .max(20)
        .required(),
    password: Yup.string()
        .matches(passwordRegex, 'validations.passwordRegexFormat')
        .required()
});

export const changePasswordSchema = Yup.object().shape({
    password: Yup.string()
        .matches(passwordRegex, 'validations.passwordRegexFormat')
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

export const generateResetPasswordSchema = Yup.object().shape({
    email: Yup.string()
        .email()
        .required()
});


export const profileSchema = Yup.object().shape({
    firstName: Yup.string()
        .matches(lettersRegex)
        .min(2)
        .max(128)
        .required(),
    lastName: Yup.string()
        .matches(lettersRegex)
        .min(2)
        .max(128)
        .required(),
});

export const createOfferSchema = Yup.object().shape({
    title: Yup.string()
        .min(2)
        .max(128)
        .required(),
    author: Yup.string()
        .min(2)
        .max(128)
        .required(),
    category: Yup.string()
        .min(1)
        .required().nullable(),
    condition: Yup.string()
        .min(1)
        .required().nullable(),
    description: Yup.string()
        .max(512).nullable(),
    price: Yup.string()
        .required()
        .max(999999)
        .matches(moneyRegex),
    photos: Yup.array(
        Yup.object({
            name: Yup.string().required().nullable(),
            url: Yup.string(),
        }).required().nullable()
    ).nullable().min(1)
});


export const editOfferSchema = Yup.object().shape({
    title: Yup.string()
        .min(2)
        .max(128)
        .required(),
    author: Yup.string()
        .min(2)
        .max(128)
        .required(),
    category: Yup.string()
        .min(1)
        .required().nullable(),
    condition: Yup.string()
        .min(1)
        .required().nullable(),
    description: Yup.string()
        .max(512).nullable(),
    price: Yup.string()
        .required()
        .max(999999)
        .matches(moneyRegex),
    photos: Yup.array(
        Yup.object({
            name: Yup.string().required().nullable(),
            url: Yup.string(),
        }).required().nullable()
    ).nullable().min(1)
});

export const deleteAccountSchema = Yup.object().shape({
    password: Yup.string()
        .min(1)
        .required()
});

export const reportSchema = Yup.object().shape({
    description: Yup.string().max(512).required()
});