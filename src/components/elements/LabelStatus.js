import React from 'react'
import { DELIVERY_STATUS, DELIVERY_STATUS_UI } from 'constant/index'

const LabelStatus = ({ status }) => {
    const btnUI = DELIVERY_STATUS_UI[status] || DELIVERY_STATUS_UI[DELIVERY_STATUS.DELIVERED]
    return <span className={`badge badge-${btnUI.badge}`}>{btnUI.label}</span>
}

export default LabelStatus
