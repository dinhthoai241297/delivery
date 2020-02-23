import { combineReducers } from 'redux'
import AppReducer from 'reducers/AppReducer'
import DeliveryReducer from 'reducers/DeliveryReducer'
import { reducer as form } from 'redux-form'

const mainReducer = combineReducers({
    AppReducer,
    form,
    DeliveryReducer,
})

const rootReducer = (state, action) => {
    return mainReducer(state, action)
}

export default rootReducer
