
const initState = {
    warehouses: [
        {
            id: 1,
            item: 'Элистинский',
            production: [
                {id:1, item: 'Картошка', amount: 22},
                {id:2, item: 'Хлеб', amount: 23},
                {id:3, item: 'Молоко', amount: 32},
            ],
        },
        {
            id: 2,
            item: 'Таганрогский',
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