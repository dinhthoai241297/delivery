import React from 'react'
import { DELIVERY_STATUS, DELIVERY_STATUS_UI } from 'constant/index'

const BtnStatus = ({ status, ...rest }) => {
    const btnUI = DELIVERY_STATUS_UI[status] || DELIVERY_STATUS_UI[DELIVERY_STATUS.DELIVERED]
    return (
        <button className={`btn btn-status btn-${btnUI.badge} btn-sm`} {...rest}>
            <i className={`${btnUI.icon} mr-1`}></i>
            {btnUI.label}
        </button>
    )
}

export default BtnStatus
