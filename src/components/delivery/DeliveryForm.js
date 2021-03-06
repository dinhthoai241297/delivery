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
        const initForm = () => {
            props.initialize({
                ...delivery,
            })
        }
        initForm()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleAfterSubmit = submitSucceeded => {
        if (submitSucceeded) {
            if (!delivery) {
                reset('delivery')
            }
            if (isLeaveAfterSuccess) {
                history.push(paths.delivery.list)
            }
        } else {
            setIsLeaveAfterSuccess(false)
        }
    }

    useEffect(() => {
        handleAfterSubmit(props.submitSucceeded)
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
                        validate={[required]}
                    />
                </div>
                {delivery && (
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
                )}
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
                        className="btn btn-warning mb-1"
                    >
                        <i className="far fa-file mr-2"></i>Clear Form
                    </button>
                )}
                <button type="submit" className="btn btn-secondary mb-1 ml-3">
                    <i className="fas fa-save mr-2"></i>Save and {delivery ? 'Continue Edit' : 'Add Another'}
                </button>
                <button onClick={submitAndLeave} type="button" className="btn btn-primary mb-1 ml-3">
                    <i className="fas fa-save mr-2"></i>Save and Leave
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
