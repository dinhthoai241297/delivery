import React, { useEffect, useState } from 'react'
import DeliveryForm from './DeliveryForm'
import { addDelivery, updateDelivery, getOne } from 'actions/DeliveryActions'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import paths from 'routes/paths'
import { DELIVERY_STATUS } from 'constant'
import { SubmissionError } from 'redux-form'
import { fromToday } from 'utils/ValidationForm'

const Add = ({ isUpdate, history, match }) => {
    const [delivery, setDelivery] = useState()

    const dispatch = useDispatch()
    const submit = values => {
        let func
        if (isUpdate) {
            func = updateDelivery
            values.status = Number(values.status)
        } else {
            func = addDelivery
            values.status = DELIVERY_STATUS.PREPARE
        }
        if (values.status === DELIVERY_STATUS.PREPARE) {
            let mes = fromToday(values.deliveryDate)
            if (mes) {
                throw new SubmissionError({
                    deliveryDate: mes,
                })
            }
        }
        dispatch(func(values))
        toast.success(`${isUpdate ? 'Update' : 'Add'} delivery success`, {
            position: toast.POSITION.BOTTOM_RIGHT,
        })
    }

    useEffect(() => {
        if (isUpdate) {
            let { id } = match.params
            let delivery = getOne(Number(id))
            if (delivery) {
                setDelivery(delivery)
            } else {
                history.push(paths.delivery.list)
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
