export const required = value => (value ? undefined : `This field can't be blank`)
export const number = value => (!value || /^-?\d*\.?\d*$/.test(value) ? undefined : `This field allow only number`)
export const maxLength = max => value => (value && value.length > max ? `Must be ${max} characters or less` : undefined)
export const minLength = min => value => (value && value.length < min ? `Must be ${min} characters or more` : undefined)
