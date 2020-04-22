import i18n from 'i18next';

export function translate(obj) {
    if(typeof obj === 'string' || obj instanceof String) {
        return i18n.t(obj);
    } else {
        return i18n.t(obj.key, {value: obj.value});
    }
}
