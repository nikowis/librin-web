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

export const OfferCategory = [
    {name: 'FANTASY'},
    {name: 'HISTORY'},
    {name: 'COMIC_BOOK'},
    {name: 'CRIMINAL'},
    {name: 'SCI_FI'},
    {name: 'OTHER'}
]

export const OfferCondition = [
    {value: 5, name: 'NEW'},
    {value: 4, name: 'PERFECT'},
    {value: 3, name: 'GOOD'},
    {value: 2, name: 'USED'},
    {value: 1, name: 'DESTROYED'}
]