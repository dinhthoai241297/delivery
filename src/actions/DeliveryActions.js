import * as types from 'actions/ActionTypes'
import repository from 'mockAPI/Repository'

export const addDelivery = payload => dispatch => {
    repository.saveDelivery(payload)
    dispatch({
        type: types.ADD_DELIVERY,
        payload,
    })
}

export const getList = search => dispatch => {
    let list = repository.listDelivery()
    dispatch({
        type: types.LIST_DELIVERY,
        payload: list,
    })
}

export const changeStatus = (list, newStatus) => dispatch => {
    repository.changeStatus(list, newStatus)
    dispatch({
        type: types.CHANGE_STATUS,
        payload: {
            list,
            newStatus,
        },
    })
}

export const updateDelivery = payload => dispatch => {
    repository.saveDelivery(payload)
    dispatch({
        type: types.UPDATE_DELIVERY,
        payload,
    })
}

export const getOne = id => {
    let rs = repository.findOne(id)
    return rs
}

export const deleteDelivery = payload => dispatch => {
    repository.deleteDelivery(payload)
    dispatch({
        type: types.DELETE_DELIVERY,
        payload,
    })
}
