export const PAPER_ELEVATION = 0;
export const API_ERROR_NOTIFICATION_DURATION = 5000;
export const AUTH_ERROR_NOTIFICATION_DURATION = 5000;
export const NOTIFICATION_DURATION = 5000;
export const DEFAULT_PAGE_SIZE = 12;
export const DEFAULT_SORT = 'id';
export const UPDATED_AT_SORT = 'updatedAt';
export const CREATED_AT_SORT = 'createdAt';
export const DESC_SORT = 'desc';
export const ASC_SORT = 'asc';

export class OfferStatus {
    static INACTIVE = 'INACTIVE';
    static ACTIVE = 'ACTIVE';
    static SOLD = 'SOLD';
    static DELETED = 'DELETED';
}

export class UserStatus {
    static ACTIVE = 'ACTIVE';
    static BLOCKED = 'BLOCKED';
    static DELETED = 'DELETED';
}

export const OfferFilterCategory = [
    {name: 'BIOGRAPHIES_REPORTS_FACT', value: 'BIOGRAPHIES,REPORTS,FACT_LITERATURE'},
    {name: 'JOURNALS_MAGAZINES', value: 'JOURNALS_MAGAZINES'},
    {name: 'FOR_CHILDREN', value: 'FOR_CHILDREN'},
    {name: 'FOR_YOUTH', value: 'FOR_YOUTH'},
    {name: 'FANTASY_SCIFI_HORROR', value: 'FANTASY,SCIFI,HORROR'},
    {name: 'HISTORICAL', value: 'HISTORICAL'},
    {name: 'COMIC_BOOK_MANGA', value: 'COMIC_BOOK,MANGA'},
    {name: 'CRIME_SENSATION_THRILLER', value: 'CRIME,SENSATION,THRILLER'},
    {name: 'POPULAR_SCIENCE', value: 'POPULAR_SCIENCE'},
    {name: 'FOREIGN_LANGUAGE', value: 'FOREIGN_LANGUAGE'},
    {name: 'COOKING_DIETS', value: 'COOKING_DIETS'},+
    {name: 'NOVEL', value: 'NOVEL'},
    {name: 'ROMANCE_EROTIC', value: 'ROMANCE,EROTIC'},
    {name: 'SCHOOL_AND_ACADEMICAL', value: 'SCHOOL_BOOKS,ACADEMICAL_BOOKS,LINGUISTIC_BOOKS'},
    {name: 'BELLES_LETTRES', value: 'BELLES_LETTRES,POETRY,DRAMA'},
    {name: 'SPECIALIST_LITERATURE', value: 'SPECIALIST_LITERATURE'},
    {name: 'ART', value: 'ART'},
    {name: 'GUIDEBOOKS_PERSONAL_GROWTH', value: 'GUIDEBOOKS,PERSONAL_GROWTH'},
    {name: 'TOURISM_TRAVEL_SPORT_LEISURE', value: 'TOURISM_TRAVEL,SPORT_LEISURE'},
    {name: 'OTHER', value: 'OTHER'},
];

export const OfferCategory = [
    {name: 'BIOGRAPHIES'},
    {name: 'REPORTS'},
    {name: 'FACT_LITERATURE'},
    {name: 'JOURNALS_MAGAZINES'},
    {name: 'FOR_CHILDREN'},
    {name: 'FOR_YOUTH'},
    {name: 'FANTASY'},
    {name: 'SCIFI'},
    {name: 'HORROR'},
    {name: 'HISTORICAL'},
    {name: 'COMIC_BOOK'},
    {name: 'MANGA'},
    {name: 'CRIME'},
    {name: 'SENSATION'},
    {name: 'THRILLER'},
    {name: 'POPULAR_SCIENCE'},
    {name: 'FOREIGN_LANGUAGE'},
    {name: 'LINGUISTIC_BOOKS'},
    {name: 'COOKING_DIETS'},
    {name: 'NOVEL'},
    {name: 'ROMANCE'},
    {name: 'EROTIC'},
    {name: 'SCHOOL_BOOKS'},
    {name: 'ACADEMICAL_BOOKS'},
    {name: 'BELLES_LETTRES'},
    {name: 'POETRY'},
    {name: 'DRAMA'},
    {name: 'SPECIALIST_LITERATURE'},
    {name: 'ART'},
    {name: 'GUIDEBOOKS'},
    {name: 'PERSONAL_GROWTH'},
    {name: 'PERSONAL_GROWTH'},
    {name: 'TOURISM_TRAVEL'},
    {name: 'SPORT_LEISURE'},
    {name: 'OTHER'},
];



export const OfferCondition = [
    {value: 5, name: 'NEW'},
    {value: 4, name: 'PERFECT'},
    {value: 3, name: 'GOOD'},
    {value: 2, name: 'USED'},
    {value: 1, name: 'DESTROYED'}
];

export function convertConditionValueToInt(strValue) {
    return strValue ? OfferCondition.filter(c => c.name === strValue)[0].value : null;
}

export function convertConditionValueToString(intValue) {
    return intValue ? OfferCondition.filter(c => c.value === intValue)[0].name : null;
}
