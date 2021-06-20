import {ADD_PRODUCT} from "../../constans/constans";

const initState = {
    production: [
        {id: 1, item: 'Картошка', amount: 100},
        {id: 2, item: 'Хлеб', amount: 50},
        {id: 3, item: 'Молоко', amount: 34},
    ]
}

const productionReducer = (state= initState, action) => {
    switch (action.type) {
        case ADD_PRODUCT:
            const id = state.production.length + 1
            return {
                ...state,
                production: [...state.production, {id, item: action.payload.item, amount: action.payload.amount}]
            }

        default:
            return state
    }

}

export default productionReducer