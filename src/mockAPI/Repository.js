const data = JSON.parse(localStorage.getItem('mock-data')) || { list: [] }

const saveToLocalStore = () => {
    localStorage.setItem('mock-data', JSON.stringify(data))
}

export default {
    findOne: id => {
        let rs = data.list.find(el => el.id === id)
        return !rs || rs.status === -1 ? undefined : rs
    },

    listDelivery: filter => {
        return data.list.filter(el => el.status !== -1)
    },

    deleteDelivery: list => {
        data.list.forEach(element => {
            if (list.includes(element.id)) {
                element.status = -1
            }
        })
        saveToLocalStore()
        return list
    },

    saveDelivery: payload => {
        if (payload.id) {
            let index = data.list.findIndex(el => el.id === payload.id)
            if (index !== -1) {
                data.list[index] = payload
            } else {
                payload = undefined
            }
        } else {
            payload.id = new Date().getTime()
            data.list.push(payload)
        }
        if (payload) {
            saveToLocalStore()
        }
        return payload
    },

    changeStatus: (list, newStatus) => {
        data.list.forEach(element => {
            if (list.includes(element.id)) {
                element.status = newStatus
            }
        })
        saveToLocalStore()
        return list
    },
}
