import React, { useEffect, useState } from 'react'
import DeliveryForm from './DeliveryForm'
import { addDelivery, updateDelivery, getOne } from 'actions/DeliveryActions'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import paths from 'routes/paths'
import { DELIVERY_STATUS } from 'constant'

const Add = ({ isUpdate, history, match }) => {
    const [delivery, setDelivery] = useState()

    const dispatch = useDispatch()
    const submit = values => {
        let func
        if (isUpdate) {
            func = updateDelivery
        } else {
            func = addDelivery
            values.status = DELIVERY_STATUS.PREPARE
        }
        dispatch(func(values))
        toast.success(`${isUpdate ? 'Update' : 'Add'} delivery success`, {
            position: toast.POSITION.BOTTOM_RIGHT,
        })
    }

    useEffect(() => {
        if (isUpdate) {
            let { id } = match.params
            let delivery = getOne(id)
            if (delivery) {
                setDelivery(delivery)
            } else {
                history.push(paths.delivery.list)
            }
        }
    }, [])

    return (
        <div className="mt-3">
            <div className="text-center mb-4">
                <h2>{isUpdate ? 'Update' : 'Add'} Delivery</h2>
            </div>
            <div>{(!isUpdate || (isUpdate && delivery)) && <DeliveryForm delivery={delivery} onSubmit={submit} />}</div>
        </div>
    )
}

export default Add
