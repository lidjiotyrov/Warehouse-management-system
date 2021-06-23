import {ADD_PRODUCT_IN_WAREHOUSE} from "../../constans/constans";

const initState = {
  warehouses: [
    {
      id: 1,
      item: 'Элистинский',
      address: 'Элиста, улица Ленина 232',
      type: 'Средний',
      status: 'Не заполнен',
      production: [
        {id: 1, item: 'Картошка', amount: 22},
        {id: 2, item: 'Хлеб', amount: 23},
        {id: 3, item: 'Молоко', amount: 32},
      ],
    },
    {
      id: 2,
      item: 'Таганрогский',
      address: 'Таганрог, ул. Греческая, 323',
      type: 'Средний',
      status: 'Не заполнен',
      production: [
        {id: 1, item: 'Картошка', amount: 22},
        {id: 2, item: 'Хлеб', amount: 23},
        {id: 3, item: 'Молоко', amount: 32},
      ],
    },
    {
      id: 3,
      item: 'Ростовский',
      address: 'Ростов-на-Дону, улица Ростовская, 33',
      type: 'Крупный',
      status: 'Заполнен',
      production: [
        {id: 1, item: 'Картошка', amount: 22},
        {id: 2, item: 'Хлеб', amount: 23},
        {id: 3, item: 'Молоко', amount: 32},
      ],
    }
  ]
}

const warehousesReducer = (state = initState, action) => {
  switch (action.type) {
    case ADD_PRODUCT_IN_WAREHOUSE:
      const production = action.production
      return {
        ...state,
        warehouses: state.warehouses.map(warehouse => production.find(item => item.warehouseName === warehouse.item) ? {
          ...warehouse,
          production: warehouse.production.map(product => product.item === production.find(item => item.warehouseName === warehouse.item).product ? {
            ...product,
            id: warehouse.production.length + 1,
            amount: product.amount + production.find(item => item.warehouseName === warehouse.item).amount
          } : product)
        } : warehouse)
      }
    default:
      return state
  }

}

export default warehousesReducer