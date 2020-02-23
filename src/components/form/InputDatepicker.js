import React from 'react'
import Datepicker from 'react-datepicker'
import { formatDate } from 'utils/index'
import styled from 'styled-components'

const InputDatepicker = ({ input, label, meta: { touched, error } }) => (
    <div>
        <label htmlFor={input.name}>{label}</label>
        <StyledWrapDatepicker>
            <Datepicker
                {...input}
                selected={input.value ? new Date(input.value) : null}
                onChange={date => input.onChange(formatDate(date))}
                dateFormat="mm/dd/yyyy"
                className={'form-control' + (touched && error ? ' is-invalid' : '')}
                autoComplete="off"
            />
        </StyledWrapDatepicker>
        {touched && error && <span className="invalid-feedback d-block">{error}</span>}
    </div>
)

export default InputDatepicker

const StyledWrapDatepicker = styled.div`
    > div {
        width: 100%;
    }
`
