// output: mm/dd/yyyy
const getToday = () => {
    let date = new Date()
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`
}

export const required = value => (value ? undefined : `This field can't be blank`)
export const number = value => (!value || /^-?\d*\.?\d*$/.test(value) ? undefined : `This field allow only number`)
export const maxLength = max => value => (value && value.length > max ? `Must be ${max} characters or less` : undefined)
export const minLength = min => value => (value && value.length < min ? `Must be ${min} characters or more` : undefined)
export const positive = value => (Number(value) > -1 ? undefined : 'This field must be positive')
export const fromToday = value =>
    new Date(value) >= new Date(getToday()) ? undefined : `This field can't be before today`
