
const initState = {
    warehouses: [
        {
            id: 1,
            item: 'Элистинский',
            address: 'Элиста, улица Ленина 232',
            type: 'Средний',
            status: 'Не заполнен',
            production: [
                {id:1, item: 'Картошка', amount: 22},
                {id:2, item: 'Хлеб', amount: 23},
                {id:3, item: 'Молоко', amount: 32},
            ],
        },
        {
            id: 2,
            item: 'Таганрогский',
            address: 'Таганрог, ул. Греческая, 323',
            type: 'Средний',
            status: 'Не заполнен',
            production: [
                {id:1, item: 'Картошка', amount: 22},
                {id:2, item: 'Хлеб', amount: 23},
                {id:3, item: 'Молоко', amount: 32},
                {id:4, item: 'Рыба', amount: 14},
            ],
        },
        {
            id: 3,
            item: 'Ростовский',
            address: 'Ростов-на-Дону, улица Ростовская, 33',
            type: 'Крупный',
            status: 'Заполнен',
            production: [
                {id:1, item: 'Картошка', amount: 22},
                {id:2, item: 'Хлеб', amount: 23},
                {id:3, item: 'Молоко', amount: 32},
                {id:4, item: 'Рыба', amount: 14},
            ],
        }
    ]
}

const warehousesReducer = (state=initState, action) => {
    switch (action.type) {
        default:
            return state
    }

}

export default warehousesReducer