if (process.env.NODE_ENV === 'production') {
    module.exports = require('redux/store/configureStore.prod')
} else {
    module.exports = require('redux/store/configureStore.dev')
}
