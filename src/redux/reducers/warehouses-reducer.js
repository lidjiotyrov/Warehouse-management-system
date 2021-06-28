import {ADD_NEW_PRODUCT_IN_WAREHOUSE, ADD_PRODUCT_IN_WAREHOUSE, ADD_WAREHOUSE} from "../../constans/constans";

const initState = {
  warehouses: [
    {
      id: 1,
      item: 'Склад 1',
      address: 'Таганрог, улица Ленина 232',
      type: 'Средний',
      status: 'Не заполнен',
      production: [
        { id: 1, productName: 'Картофель', amount: 22 },
        { id: 2, productName: 'Хлеб', amount: 23 },
        { id: 3, productName: 'Молоко', amount: 32 },
      ],
    },
    {
      id: 2,
      item: 'Склад 2',
      address: 'Таганрог, ул. Греческая, 323',
      type: 'Средний',
      status: 'Не заполнен',
      production: [
        { id: 1, productName: 'Картофель', amount: 22 },
        { id: 2, productName: 'Хлеб', amount: 23 },
        { bid: 3, productName: 'Молоко', amount: 32 },
      ],
    },
    {
      id: 3,
      item: 'Склад 3',
      address: 'Ростов-на-Дону, улица Ростовская, 33',
      type: 'Крупный',
      status: 'Заполнен',
      production: [
        { id: 1, productName: 'Картофель', amount: 22 },
        { id: 2, productName: 'Хлеб', amount: 23 },
        { id: 3, productName: 'Молоко', amount: 32 },
      ],
    }
  ]
}

const warehousesReducer = (state = initState, action) => {
  switch (action.type) {
    case ADD_PRODUCT_IN_WAREHOUSE:
      const product = action.product
      const checkProductInWarehouse = state.warehouses.find(warehouse => warehouse.item === product.warehouseName)
        .production.find(prod => prod.productName === product.productName)
      if (checkProductInWarehouse) {
        return {
          ...state,
          warehouses: state.warehouses.map(warehouse => warehouse.item === product.warehouseName
            ? {
            ...warehouse, production: warehouse.production.map(prod => prod.productName === product.productName
                ? {...prod, amount: prod.amount + product.amount}: prod)
            } : warehouse)
        }
      }
      else {
        const id = state.warehouses.find(warehouse => warehouse.item === product.warehouseName).production.length + 1
        return {
          ...state,
          warehouses: state.warehouses.map(warehouse => warehouse.item === product.warehouseName
            ? {
             ...warehouse, production: [
               ...warehouse.production,
                {
                  id: id,
                  productName: product.productName,
                  amount: product.amount
                }
               ]
            }
            : warehouse)
        }
      }

    case ADD_WAREHOUSE:
      const id = state.warehouses.length + 1
      const newWarehouse = action.warehouse
      return {
        ...state,
        warehouses: [
          ...state.warehouses,
          {
           id: id,
            item: newWarehouse.item,
            address: newWarehouse.address,
            type: newWarehouse.type,
            status: newWarehouse.status,
            production: []
          }
        ]
      }

    default:
      return state
  }

}

export default warehousesReducer