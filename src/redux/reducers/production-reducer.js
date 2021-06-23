import {ADD_PRODUCT, EDIT_PRODUCT} from "../../constans/constans";

const initState = {
  production: [
    {id: 1, item: 'Картошка', inWarehouse: 100, unallocated: 10},
    {id: 2, item: 'Хлеб', inWarehouse: 50, unallocated: 23},
    {id: 3, item: 'Молоко', inWarehouse: 34, unallocated: 12},
  ]
}

const productionReducer = (state = initState, action) => {
  switch (action.type) {
    case ADD_PRODUCT:
      const id = state.production.length + 1
      return {
        ...state,
        production: [...state.production, {
          id,
          item: action.payload.item,
          inWarehouse: action.payload.inWarehouse,
          unallocated: action.payload.unallocated
        }]
      }

    case EDIT_PRODUCT:
      return {
        ...state, production: state.production.map(product => product)
      }

    default:
      return state
  }

}

export default productionReducer