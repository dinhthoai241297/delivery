import React from 'react'
import { DELIVERY_STATUS } from 'constant/index'
import styled from 'styled-components'
import BtnStatus from 'components/elements/BtnStatus'
import { Link } from 'react-router-dom'
import paths from 'routes/paths'
import { formatNumber } from 'utils/index'
import ReactTooltip from 'react-tooltip'

const Iteam = ({ delivery, toggleSelect, selected, changeStatus, deleteOne }) => {
    const toggle = e => {
        toggleSelect(delivery.id)
    }

    const handleClickChange = e => {
        changeStatus(
            [delivery.id],
            delivery.status === DELIVERY_STATUS.PREPARE ? DELIVERY_STATUS.DELIVERED : DELIVERY_STATUS.PREPARE
        )
    }

    const handleClickDelete = e => {
        deleteOne(delivery.id)
    }

    return (
        <StyledTr delivered={delivery.status == DELIVERY_STATUS.DELIVERED} selected={selected}>
            <td>
                <input type="checkbox" onChange={toggle} checked={selected} />
            </td>
            <td>{delivery.recipientName}</td>
            <td>{delivery.recipientAddress}</td>
            <td>{formatNumber(delivery.weight)}</td>
            <td>{formatNumber(delivery.price)}</td>
            <td>{delivery.deliveryDate}</td>
            <td className="text-center">
                <BtnStatus
                    data-for={`btn-status-${delivery.id}`}
                    data-tip
                    onClick={handleClickChange}
                    status={delivery.status}
                />
                <ReactTooltip
                    id={`btn-status-${delivery.id}`}
                    getContent={() => (
                        <>
                            Click to change status to{' '}
                            <b>{delivery.status == DELIVERY_STATUS.DELIVERED ? 'Prepare' : 'Delivered'}</b>
                        </>
                    )}
                />
            </td>
            <td>
                <Link className="btn btn-warning mr-2 btn-sm" to={paths.delivery.update + '/' + delivery.id}>
                    <i className="far fa-edit"></i>
                </Link>
                <Link className="btn btn-info btn-sm mr-2" to={paths.delivery.details + '/' + delivery.id}>
                    <i className="far fa-eye"></i>
                </Link>
                <button onClick={handleClickDelete} className="btn btn-danger btn-sm">
                    <i className="fas fa-trash-alt"></i>
                </button>
            </td>
        </StyledTr>
    )
}

export default Iteam

const StyledTr = styled.tr`
    ${props => (props.delivered ? `background-color: #28a74545;` : '')}
    ${props => (props.selected ? `background-color: #007bfea1;` : '')}
`
