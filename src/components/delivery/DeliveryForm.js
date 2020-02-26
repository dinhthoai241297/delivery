import React, { useEffect, useState } from 'react'
import { Field, reduxForm } from 'redux-form'
import InputText from 'components/form/InputText'
import { required, number, positive } from 'utils/ValidationForm'
import InputDatepicker from 'components/form/InputDatepicker'
import InputTextarea from 'components/form/InputTextarea'
import Select from 'components/form/Select'
import { DELIVERY_STATUS } from 'constant/index'
import { useHistory } from 'react-router-dom'
import paths from 'routes/paths'

let DeliveryForm = ({ delivery, pristine, submitting, handleSubmit, reset, ...props }) => {
    const [isLeaveAfterSuccess, setIsLeaveAfterSuccess] = useState(false)
    const history = useHistory()

    useEffect(() => {
        props.initialize({
            status: DELIVERY_STATUS.PREPARE,
            ...delivery,
        })
    }, [])

    useEffect(() => {
        if (props.submitSucceeded) {
            if (!delivery) {
                reset()
            }
            if (isLeaveAfterSuccess) {
                history.push(paths.delivery.list)
            }
        } else {
            setIsLeaveAfterSuccess(false)
        }
    }, [props])

    const submitAndLeave = () => {
        setIsLeaveAfterSuccess(true)
        handleSubmit()
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="row mb-3">
                <div className="col-12 col-lg-6 mb-3">
                    <Field
                        validate={required}
                        label="Recipient Name"
                        name="recipientName"
                        component={InputText}
                        type="text"
                    />
                </div>
                <div className="col-12 col-lg-6 mb-3">
                    <Field
                        validate={required}
                        label="Recipient Address"
                        name="recipientAddress"
                        component={InputText}
                        type="text"
                    />
                </div>
                <div className="col-12 col-lg-6 mb-3">
                    <Field
                        label="Weight (Pound)"
                        name="weight"
                        component={InputText}
                        type="number"
                        validate={[required, number, positive]}
                    />
                </div>
                <div className="col-12 col-lg-6 mb-3">
                    <Field
                        validate={required}
                        label="Price ($)"
                        name="price"
                        component={InputText}
                        type="number"
                        validate={[required, number, positive]}
                    />
                </div>
                <div className="col-12 col-lg-6 mb-3">
                    <Field
                        label="Estimated delivery date"
                        name="deliveryDate"
                        component={InputDatepicker}
                        type="date"
                        validate={required}
                    />
                </div>
                <div className="col-12 col-lg-6 mb-3">
                    <Field
                        disabled={!delivery}
                        label="Status"
                        name="status"
                        component={Select}
                        options={[
                            { label: 'Prepare', value: DELIVERY_STATUS.PREPARE },
                            { label: 'Delivered', value: DELIVERY_STATUS.DELIVERED },
                        ]}
                    />
                </div>
                <div className="col-12 mb-3">
                    <Field label="Description" name="description" component={InputTextarea} type="text" />
                </div>
            </div>
            <div className="text-right">
                {!delivery && (
                    <button
                        disabled={pristine || submitting}
                        onClick={reset}
                        type="button"
                        className="btn btn-warning mr-3"
                    >
                        <i className="far fa-file mr-2"></i>Clear form
                    </button>
                )}
                <button type="submit" className="btn btn-secondary mr-3">
                    <i className="fas fa-save mr-2"></i>Save and {delivery ? 'Edit' : 'Add'}
                </button>
                <button onClick={submitAndLeave} type="button" className="btn btn-primary">
                    <i className="fas fa-save mr-2"></i>Save
                </button>
            </div>
        </form>
    )
}

DeliveryForm = reduxForm({
    // a unique name for the form
    form: 'delivery',
})(DeliveryForm)

export default DeliveryForm
