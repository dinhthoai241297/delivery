import * as types from 'actions/ActionTypes'

const initialState = []

const DeliveryReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.LIST_DELIVERY: {
            return [...action.payload]
        }
        case types.ADD_DELIVERY: {
            return [...state, action.payload]
        }
        case types.DELETE_DELIVERY: {
            let tmp = [...state],
                list = action.payload
            return tmp.filter(el => !list.includes(el.id))
        }
        case types.UPDATE_DELIVERY: {
            let tmp = [...state]
            let index = tmp.findIndex(el => el.id === action.payload.id)
            if (index !== -1) {
                tmp[index] = action.payload
            }
            return tmp
        }
        case types.CHANGE_STATUS: {
            let tmp = [...state],
                { list, newStatus } = action.payload
            tmp.forEach(element => {
                if (list.includes(element.id)) {
                    element.status = newStatus
                }
            })
            return tmp
        }
        default: {
            return state
        }
    }
}

export default DeliveryReducer
