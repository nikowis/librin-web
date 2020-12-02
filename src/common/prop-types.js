import PropTypes from "prop-types";

export const userPropType = PropTypes.shape({
    id: PropTypes.number.isRequired,
    username: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    avgRating: PropTypes.number,
    ratingCount: PropTypes.number,
});

export const photoPropType = PropTypes.shape({
    name: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired
});

export const cityPropType = PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    type: PropTypes.string,
    displayName: PropTypes.string,
});

export const offerPropType = PropTypes.shape({
    apiError: PropTypes.string,
    id: PropTypes.number,
    title: PropTypes.string,
    author: PropTypes.string,
    condition: PropTypes.string,
    category: PropTypes.string,
    price: PropTypes.PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    status: PropTypes.string,
    ownerId: PropTypes.number,
    soldToMe: PropTypes.bool,
    buyerId: PropTypes.number,
    owner: userPropType,
    photos: PropTypes.arrayOf(photoPropType),
    exchange: PropTypes.bool,
    shipment: PropTypes.bool,
    selfPickup: PropTypes.bool,
    selfPickupCity: cityPropType
});

export const conversationPropType = PropTypes.shape({
    id: PropTypes.number,
    read: PropTypes.bool,
    messages: PropTypes.array,
    offer: offerPropType,
    createdAt: PropTypes.string,
    customer: userPropType
});