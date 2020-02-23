import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Button, InputGroup, FormControl, Table } from 'react-bootstrap'
import paths from 'routes/paths'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getList, changeStatus, deleteDelivery } from 'actions/DeliveryActions'
import Item from './Item'
import BtnStatus from 'components/elements/BtnStatus'
import { DELIVERY_STATUS } from 'constant'
import qs from 'query-string'
import ModalConfirm from 'components/elements/ModalConfirm'
import ReactTooltip from 'react-tooltip'

const List = ({ history, location }) => {
    const dispatch = useDispatch()
    const deliveryList = useSelector(state => state.DeliveryReducer)
    const [selected, setSelected] = useState([])
    const [search, setSearch] = useState('')
    const [filterStatus, setFilterStatus] = useState(0)
    const [confirmDelete, setConfirmDelete] = useState()
    const [isShowModal, setIsShowModal] = useState(false)

    useEffect(() => {
        if (deliveryList.length === 0) {
            dispatch(getList())
        }
    }, [])

    const toggleSelect = id => {
        let tmp = [...selected]
        let index = tmp.findIndex(el => el == id)
        if (index !== -1) {
            tmp.splice(index, 1)
        } else {
            tmp.push(id)
        }
        setSelected(tmp)
    }

    const filter = () => {
        let resultStatus = deliveryList.filter(el => filterStatus == 0 || el.status == filterStatus)
        return resultStatus.filter(el => {
            let tmp = Object.values(el).toString()
            // search in all field
            return !search || tmp.toLocaleLowerCase().indexOf(search.toLocaleLowerCase()) !== -1
        })
    }

    const toggleSelectAll = () => {
        let list = filter()
        if (selected.length === list.length) {
            setSelected([])
        } else {
            setSelected(list.map(el => el.id))
        }
    }

    const submitChangeStatus = (list, newStatus) => {
        dispatch(changeStatus(list, newStatus))
    }

    const hanleChangeStatusMulti = (list, newStatus) => {
        submitChangeStatus(list, newStatus)
        let tmp = filter().map(el => el.id)
        setSelected(selected.filter(id => tmp.includes(id)))
    }

    const openConfirmDeleteOne = id => {
        setConfirmDelete(id)
        setIsShowModal(true)
    }

    const submitDelete = list => {
        setIsShowModal(false)
        dispatch(deleteDelivery(list))
        setSelected(selected.filter(el => !list.includes(el)))
    }

    const renList = () => {
        let rs = []
        rs = filter().map((el, index) => (
            <Item
                changeStatus={submitChangeStatus}
                selected={selected.includes(el.id)}
                toggleSelect={toggleSelect}
                delivery={el}
                key={index}
                deleteOne={openConfirmDeleteOne}
            />
        ))
        if (rs.length === 0) {
            rs.push(
                <tr key={0}>
                    <td colSpan="8" className="text-center pt-3 pb-3 pl-0 pr-0">
                        No data
                        <hr />
                    </td>
                </tr>
            )
        }
        return rs
    }

    useEffect(() => {
        let { fs = 0 } = qs.parse(location.search)
        const status = ['0', '1', '2']
        if (!status.includes(fs + '')) {
            fs = 0
        }
        setFilterStatus(fs)
    }, [location.search])

    const changeFilterStatus = () => {
        let newStatus = (Number(filterStatus) + 1) % 3
        setSelected([])
        history.push(location.pathname + '?fs=' + newStatus)
    }

    return (
        <div>
            <ModalConfirm
                show={isShowModal}
                onHide={() => setIsShowModal(false)}
                onExiting={() => setConfirmDelete(undefined)}
                title="Confirm delete"
                message="Confirm delete delivery selected. This action can't be undo."
                onAgree={() => submitDelete(confirmDelete ? [confirmDelete] : selected)}
            />
            <StyledFunctionHead>
                <div>
                    <InputGroup>
                        <FormControl
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            placeholder="Search delivery"
                        />
                    </InputGroup>
                </div>
                <div>
                    <Button as={Link} to={paths.delivery.add} variant="primary">
                        <i className="fas mr-2 fa-plus"></i>Add
                    </Button>
                </div>
            </StyledFunctionHead>
            <div>
                <StyledActionMultiRecord show={selected.length !== 0}>
                    <input
                        onChange={toggleSelectAll}
                        checked={selected.length !== 0 && filter().length === selected.length}
                        type="checkbox"
                    />
                    <BtnStatus
                        onClick={() => hanleChangeStatusMulti(selected, DELIVERY_STATUS.DELIVERED)}
                        status={DELIVERY_STATUS.DELIVERED}
                    />
                    <BtnStatus
                        onClick={() => hanleChangeStatusMulti(selected, DELIVERY_STATUS.PREPARE)}
                        status={DELIVERY_STATUS.PREPARE}
                    />
                    <button className="btn btn-sm btn-danger" onClick={() => setIsShowModal(true)}>
                        <i className="fas fa-trash-alt mr-1"></i>Delete
                    </button>
                </StyledActionMultiRecord>
                <StyledTable responsive>
                    <thead>
                        <tr>
                            <th></th>
                            <th width="15%">Name</th>
                            <th width="15%">Address</th>
                            <th width="10%">Weight</th>
                            <th width="10%">Price</th>
                            <th width="10%">Estimated</th>
                            <th data-tip="Click to filter with status" className="spec" onClick={changeFilterStatus}>
                                Status
                                {filterStatus == DELIVERY_STATUS.PREPARE && (
                                    <i className="far fa-clock ml-2 text-warning"></i>
                                )}
                                {filterStatus == DELIVERY_STATUS.DELIVERED && (
                                    <i className="fas fa-truck ml-2 text-success"></i>
                                )}
                                <ReactTooltip />
                            </th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>{renList()}</tbody>
                </StyledTable>
            </div>
        </div>
    )
}

export default List

const StyledActionMultiRecord = styled.div`
    padding: 0.75rem;

    > * {
        margin-bottom: 3px;
    }

    button {
        opacity: 0;
        ${props => (props.show ? 'opacity: 1;' : '')}
    }

    > * {
        margin-right: 20px;

        :last-child {
            margin-right: 0;
        }
    }
`

const StyledFunctionHead = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin: 20px 0;
`

const StyledTable = styled(Table)`
    tr {
        td:last-child,
        th:last-child {
            text-align: center;
        }
    }

    button {
        white-space: nowrap;
    }

    .btn-status {
        min-width: 100px;
    }

    .spec {
        text-align: center;
        white-space: nowrap;
        cursor: pointer;
        position: relative;
    }

    tbody {
        tr {
            td {
                :first-child {
                    width: 1%;
                }

                :last-child {
                    white-space: nowrap;
                }
            }
        }
    }
`
