import i18n from 'i18next';

export function formatDateToString(date, removeSeconds = true, removeDateIfToday = true, recentDaysAsWords = true) {
    let result = '';
    const dateObj = new Date(date);
    const now = new Date();
    if (!removeDateIfToday || dateObj.toDateString() !== now.toDateString()) {
        console.log(dateObj.toLocaleDateString(), ' difference ', daysBetween(now, dateObj));
        if (recentDaysAsWords && daysBetween(dateObj, now) < 7) {
            result += i18n.t('date.days.' + dateObj.getDay());
        } else {
            result += dateObj.toLocaleDateString();
        }
    } else {
        result += i18n.t('date.days.today');
    }

    if (result) {
        result += ', '
    }

    result += addLeadingZeroIfNecessary(dateObj.getHours());
    result += ':';
    result += addLeadingZeroIfNecessary(dateObj.getMinutes());
    if (!removeSeconds) {
        result += ':';
        result += addLeadingZeroIfNecessary(dateObj.getSeconds());
    }

    return result;
}

function addLeadingZeroIfNecessary(number) {
    if(number < 10) {
        return '0' + String(number);
    }
    return String(number);
}

function treatAsUTC(date) {
    var result = new Date(date);
    result.setMinutes(result.getMinutes() - result.getTimezoneOffset());
    return result;
}

function daysBetween(startDate, endDate) {
    var millisecondsPerDay = 24 * 60 * 60 * 1000;
    return (treatAsUTC(endDate) - treatAsUTC(startDate)) / millisecondsPerDay;
}

