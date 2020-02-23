export const DELIVERY_STATUS = {
    PREPARE: 1,
    DELIVERED: 2,
}

export const DELIVERY_STATUS_UI = {
    [DELIVERY_STATUS.DELIVERED]: {
        badge: 'success',
        icon: 'fas fa-truck',
        label: 'Delivered',
    },
    [DELIVERY_STATUS.PREPARE]: {
        badge: 'warning',
        icon: 'far fa-clock',
        label: 'Prepare',
    },
}
