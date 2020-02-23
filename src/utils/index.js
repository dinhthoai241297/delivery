// obj: date => String: mm/dd/yyyy
export const formatDate = date => `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`

export const kFormatter = num => {
    return Math.abs(num) > 999
        ? Math.sign(num) * (Math.abs(num) / 1000).toFixed(1) + 'K'
        : Math.sign(num) * Math.abs(num)
}

export const formatNumber = money => {
    return (money + '').replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
}
