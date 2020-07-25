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
    static ACTIVE = 'ACTIVE';
    static SOLD = 'SOLD';
    static DELETED = 'DELETED';
}

export class UserStatus {
    static ACTIVE = 'ACTIVE';
    static BLOCKED = 'BLOCKED';
    static DELETED = 'DELETED';
}

export const OfferCategory= [
    {name: 'BIOGRAPHIES_REPORTS_FACT'},
    {name: 'JOURNALS_MAGAZINES'},
    {name: 'FOR_CHILDREN'},
    {name: 'FOR_YOUTH'},
    {name: 'FANTASY_SCIFI_HORROR'},
    {name: 'HISTORICAL'},
    {name: 'COMIC_BOOK_MANGA'},
    {name: 'CRIME_SENSATION_THRILLER'},
    {name: 'POPULAR_SCIENCE'},
    {name: 'FOREIGN_LANGUAGE'},
    {name: 'COOKING_DIETS'},
    {name: 'NOVEL'},
    {name: 'ROMANCE_EROTIC'},
    {name: 'SCHOOL_AND_ACADEMICAL'},
    {name: 'BELLES_LETTRES'},
    {name: 'SPECIALIST_LITERATURE'},
    {name: 'ART'},
    {name: 'GUIDEBOOKS_PERSONAL_GROWTH'},
    {name: 'TOURISM_TRAVEL_SPORT_LEISURE'},
    {name: 'OTHER'},
];



export const OfferCondition = [
    {value: 5, name: 'NEW'},
    {value: 4, name: 'PERFECT'},
    {value: 3, name: 'GOOD'},
    {value: 2, name: 'USED'},
    {value: 1, name: 'DESTROYED'}
];