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
import { fromToday } from 'utils/ValidationForm'
import { toast } from 'react-toastify'

const List = ({ history, location }) => {
    const dispatch = useDispatch()
    const deliveryList = useSelector(state => state.DeliveryReducer)
    const [selected, setSelected] = useState([])
    const [search, setSearch] = useState('')
    const [filterStatus, setFilterStatus] = useState(0)
    const [confirmDelete, setConfirmDelete] = useState()
    const [isShowModal, setIsShowModal] = useState(false)

    const fetchList = () => {
        dispatch(getList())
    }

    useEffect(() => {
        if (deliveryList.length === 0) {
            fetchList()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const toggleSelect = id => {
        let tmp = [...selected]
        let index = tmp.findIndex(el => el === id)
        if (index !== -1) {
            tmp.splice(index, 1)
        } else {
            tmp.push(id)
        }
        setSelected(tmp)
    }

    const filter = () => {
        let resultStatus = deliveryList.filter(el => filterStatus === 0 || el.status === filterStatus)
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
        console.debug(newStatus)
        if (newStatus === DELIVERY_STATUS.PREPARE) {
            let valid = checkChangeStatusToPrepare(list)
            if (!valid) {
                toast.warn('Deliver date invalid for change status to prepare', {
                    position: toast.POSITION.BOTTOM_RIGHT,
                })
                return false
            }
        }
        dispatch(changeStatus(list, newStatus))
        return true
    }

    const checkChangeStatusToPrepare = listId => {
        let list = deliveryList.filter(el => listId.includes(el.id))
        for (let i = 0; i < list.length; i++) {
            if (fromToday(list[i].deliveryDate)) {
                return false
            }
        }
        return true
    }

    const hanleChangeStatusMulti = (list, newStatus) => {
        let rs = submitChangeStatus(list, newStatus)
        if (rs) {
            let tmp = filter().map(el => el.id)
            setSelected(selected.filter(id => tmp.includes(id)))
        }
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
        setFilterStatus(Number(fs))
    }, [location.search])

    const changeFilterStatus = e => {
        let { value } = e.target
        setSelected([])
        history.push(location.pathname + '?fs=' + value)
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
                <div className="row pt-3 pb-3">
                    <StyledFilter className="col-12 col-lg-6 text-right mb-2 mb-lg-0">
                        <b>Status</b>
                        <select
                            value={filterStatus}
                            onChange={changeFilterStatus}
                            id="filter-status"
                            className="form-control ml-2"
                        >
                            <option value={0}>All</option>
                            <option value={DELIVERY_STATUS.PREPARE}>Prepare</option>
                            <option value={DELIVERY_STATUS.DELIVERED}>Delivery</option>
                        </select>
                    </StyledFilter>
                    <div className="col-12 col-lg-6 order-lg-first">
                        <StyledActionMultiRecord show={selected.length !== 0}>
                            <input
                                onChange={toggleSelectAll}
                                checked={selected.length !== 0 && filter().length === selected.length}
                                type="checkbox"
                            />
                            {selected.length !== 0 && (
                                <>
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
                                </>
                            )}
                        </StyledActionMultiRecord>
                    </div>
                </div>
                <StyledTable responsive>
                    <thead>
                        <tr>
                            <th></th>
                            <th width="15%">Name</th>
                            <th width="15%">Address</th>
                            <th width="10%">Weight</th>
                            <th width="10%">Price</th>
                            <th width="10%">Estimated</th>
                            <th className="spec">Status</th>
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

const StyledFilter = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;

    select {
        width: auto;
    }
`

const StyledActionMultiRecord = styled.div`
    padding: 0 0.75rem;

    > * {
        margin-bottom: 3px;
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
