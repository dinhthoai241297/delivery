import React, { useEffect, useState } from 'react'
import { getOne } from 'actions/DeliveryActions'
import notFound from 'assets/images/not-found.png'
import styled from 'styled-components'
import paths from 'routes/paths'
import { Link } from 'react-router-dom'
import { DELIVERY_STATUS_UI } from 'constant/index'
import { Badge } from 'react-bootstrap'
import { formatNumber } from 'utils/index'

const Details = ({
    match: {
        params: { id },
    },
}) => {
    const [delivery, setDelivery] = useState(undefined)

    useEffect(() => {
        let delivery = getOne(Number(id))
        if (delivery) {
            setDelivery(delivery)
        } else {
            setDelivery(null)
        }
    }, [id])

    if (delivery === null) {
        return (
            <div className="p-4">
                <div className="text-center">
                    <img className="mb-3" width="30%" src={notFound} alt="Not found" />
                    <h5>Delivery not found</h5>
                </div>
            </div>
        )
    }

    if (!delivery) {
        return null
    }

    const ui = DELIVERY_STATUS_UI[delivery.status]

    return (
        <div className="mt-3">
            <div className="text-center mb-4">
                <h2>Details Delivery</h2>
            </div>
            <div>
                <div className="text-center">
                    <h2>
                        <Badge variant={ui.badge}>{ui.label}</Badge>
                    </h2>
                </div>
                <StyledTable>
                    <tbody>
                        <tr>
                            <td>Delivery Name</td>
                            <td>{delivery.recipientName}</td>
                        </tr>
                        <tr>
                            <td>Delivery Address</td>
                            <td>{delivery.recipientAddress}</td>
                        </tr>
                        <tr>
                            <td colSpan="2">
                                <hr />
                            </td>
                        </tr>
                        <tr>
                            <td>Weight (Pound)</td>
                            <td>{formatNumber(delivery.weight)}</td>
                        </tr>
                        <tr>
                            <td>Price ($)</td>
                            <td>{formatNumber(delivery.price)}</td>
                        </tr>
                        <tr>
                            <td>Estimated</td>
                            <td>{delivery.deliveryDate}</td>
                        </tr>
                        <tr>
                            <td>Description</td>
                            <td>{delivery.description || '-'}</td>
                        </tr>
                    </tbody>
                </StyledTable>
                <div className="text-right">
                    <Link className="btn btn-warning" to={paths.delivery.update + '/' + delivery.id}>
                        <i className="far fa-edit mr-2"></i>Edit
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Details

const StyledTable = styled.table`
    width: 100%;

    tr {
        td {
            padding: 5px 0;
        }

        td:first-child {
            width: 1%;
            white-space: nowrap;
            padding-right: 15px;
            font-weight: bold;
        }
    }
`
