export const ROOT = '/';
export const LOGIN = '/login';
export const LOGOUT = '/logout';
export const REGISTER = '/register';
export const PROFILE = '/profile';
export const MY_OFFERS = '/myoffers';
export const EDIT_OFFER = MY_OFFERS + '/:id';
export const MESSAGES = '/messages';
export const MESSAGES_CONVERSATION = MESSAGES + '/:convId';
export const OFFERS = '/offers';
export const OFFER_VIEW = OFFERS + '/:id';
export const CREATE_OFFER = OFFERS + '/create';
export const CONFIRM_EMAIL_BASE = '/emailconfirm';
export const CONFIRM_EMAIL = CONFIRM_EMAIL_BASE + '/:confirmTokenId';
export const CHANGE_PASSWORD_BASE = '/changepassword';
export const CHANGE_PASSWORD = CHANGE_PASSWORD_BASE + '/:resetTokenId';
export const GENERATE_PASSWORD_RESET = '/passwordreset';
