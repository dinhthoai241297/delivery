import * as types from 'actions/ActionTypes'
import DeliveryReducer from 'reducers/DeliveryReducer'

const state = [
    {
        status: 1,
        recipientName: 'Pham',
        recipientAddress: 'Thu Duc',
        weight: '22',
        price: '12',
        deliveryDate: '2/24/2020',
        description: 'Fragile',
        id: 1582390913312,
    },
]

const dataList = [
    {
        status: 1,
        recipientName: 'Thoai',
        recipientAddress: 'Phu Nhuan',
        weight: '10',
        price: '8',
        deliveryDate: '2/25/2020',
        description: 'Fragile',
        id: 1582390913346,
    },
]

const dataUpdate = {
    status: 1,
    recipientName: 'Pham Update',
    recipientAddress: 'Thu Duc',
    weight: '22',
    price: '12',
    deliveryDate: '2/24/2020',
    description: 'Fragile',
    id: 1582390913312,
}

const dataAdd = {
    status: 1,
    recipientName: 'Pham New',
    recipientAddress: 'Thu Duc',
    weight: '24',
    price: '15',
    deliveryDate: '2/26/2020',
    description: 'Fragile',
    id: 1582390913399,
}

describe('Delivery reducer', () => {
    it('Should return a initial state', () => expect(DeliveryReducer(undefined, {})).toEqual([]))

    it('Load list delivery', () =>
        expect(DeliveryReducer(undefined, { type: types.LIST_DELIVERY, payload: dataList })).toEqual(dataList))

    it('Add new delivery', () =>
        expect(DeliveryReducer(state, { type: types.ADD_DELIVERY, payload: dataAdd })).toEqual([...state, dataAdd]))

    it('Delete delivery', () =>
        expect(DeliveryReducer(state, { type: types.DELETE_DELIVERY, payload: [dataUpdate.id] })).toEqual([]))

    it('Update delivery', () =>
        expect(DeliveryReducer(state, { type: types.UPDATE_DELIVERY, payload: dataUpdate })).toEqual([dataUpdate]))

    it('Change status', () =>
        expect(
            DeliveryReducer([...state, dataUpdate], {
                type: types.CHANGE_STATUS,
                payload: { list: [dataUpdate.id], newStatus: 2 },
            })
        ).toEqual([...state, { ...dataUpdate, status: 2 }]))
})
