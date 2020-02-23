import React from 'react'

const InputText = ({ input, label, meta: { touched, error }, type = 'text' }) => (
    <div>
        <label htmlFor={input.name}>{label}</label>
        <input {...input} type={type} className={'form-control' + (touched && error ? ' is-invalid' : '')} />
        {touched && error && <span className="invalid-feedback">{error}</span>}
    </div>
)

export default InputText
