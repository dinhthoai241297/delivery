import React from 'react'
import { DELIVERY_STATUS, DELIVERY_STATUS_UI } from 'constant/index'

const BtnStatus = ({ status, clazz = '', showLabel = true, ...rest }) => {
    const btnUI = DELIVERY_STATUS_UI[status] || DELIVERY_STATUS_UI[DELIVERY_STATUS.DELIVERED]
    return (
        <button className={`btn btn-${btnUI.badge} btn-sm ${clazz}`} {...rest}>
            <i className={`${btnUI.icon}`}></i>
            {showLabel && <span className="ml-1">{btnUI.label}</span>}
        </button>
    )
}

export default BtnStatus
