import React from 'react'

const Select = ({ options = [], disabled, input, label, meta: { touched, error }, type = 'text' }) => (
    <div>
        <label htmlFor={input.name}>{label}</label>
        <select
            disabled={disabled}
            {...input}
            type={type}
            className={'form-control' + (touched && error ? ' is-invalid' : '')}
        >
            {options.map((el, index) => (
                <option key={index} value={el.value}>
                    {el.label}
                </option>
            ))}
        </select>
        {touched && error && <span className="invalid-feedback">{error}</span>}
    </div>
)

export default Select
