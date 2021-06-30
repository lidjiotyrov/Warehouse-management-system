import {
  ADD_PRODUCT_IN_WAREHOUSE,
  ADD_WAREHOUSE,
  DELETE_PRODUCT_IN_WAREHOUSE, DELETE_WAREHOUSE, MOVE_PRODUCT
} from "../../constans/constans";

const initState = {
  warehouses: [
    {
      id: 1,
      item: 'Склад 1',
      address: 'Таганрог, улица Ленина 232',
      type: 'Средний',
      status: 'Не заполнен',
      production: [
        {id: 1, productName: 'Картофель', amount: 22},
        {id: 2, productName: 'Хлеб', amount: 23},
        {id: 3, productName: 'Молоко', amount: 32},
      ],
    },
    {
      id: 2,
      item: 'Склад 2',
      address: 'Таганрог, ул. Греческая, 323',
      type: 'Средний',
      status: 'Не заполнен',
      production: [
        {id: 1, productName: 'Картофель', amount: 22},
        {id: 2, productName: 'Хлеб', amount: 23},
        {bid: 3, productName: 'Молоко', amount: 32},
      ],
    },
    {
      id: 3,
      item: 'Склад 3',
      address: 'Ростов-на-Дону, улица Ростовская, 33',
      type: 'Крупный',
      status: 'Заполнен',
      production: [
        {id: 1, productName: 'Картофель', amount: 22},
        {id: 2, productName: 'Хлеб', amount: 23},
        {id: 3, productName: 'Молоко', amount: 32},
      ],
    }
  ]
}

const warehousesReducer = (state = initState, action) => {
  switch (action.type) {
    case ADD_PRODUCT_IN_WAREHOUSE:
      const product = action.product
      const checkProductInWarehouse = state.warehouses.find(warehouse => warehouse.item === product.warehouseName)
        ?.production.find(prod => prod.productName === product.productName)
      if (checkProductInWarehouse) {
        return {
          ...state,
          warehouses: state.warehouses.map(warehouse => warehouse.item === product.warehouseName
            ? {
              ...warehouse, production: warehouse.production.map(prod => prod.productName === product.productName
                ? {...prod, amount: prod.amount + product.amount} : prod)
            } : warehouse)
        }
      } else {
        const id = state.warehouses.find(warehouse => warehouse.item === product.warehouseName).production.length + Math.random()
        return {
          ...state,
          warehouses: state.warehouses.map(warehouse => warehouse.item === product.warehouseName && product.amount > 0
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

    case DELETE_PRODUCT_IN_WAREHOUSE:
      const delProduct = action.product
      const isCount = action.product.count
      if (isCount >= 0) {
        return {
          ...state,
          warehouses: state.warehouses.map(warehouse =>
            (warehouse.item === delProduct.warehouseName
              ? {
                ...warehouse,
                production: warehouse.production.map(prod =>
                  prod.productName === delProduct.productName && prod.amount - delProduct.count > 0
                    ? {...prod, amount: prod.amount - delProduct.count}
                    : prod
                )
              }
              : warehouse)
          )
        }
      } else {
        if (delProduct.warehouseName) {
          return {
            ...state,
            warehouses: state.warehouses.map(warehouse =>
              warehouse.item === delProduct.warehouseName ?
                {
                  ...warehouse,
                  production: warehouse.production.filter(prod => prod.productName !== delProduct.productName)
                }
                : warehouse
            )
          }
        } else {
          return {
            ...state,
            warehouses: state.warehouses.map(warehouse =>
              ({
                ...warehouse,
                production: warehouse.production.filter(prod => prod.productName !== delProduct)
              })
            )
          }
        }
      }

    case MOVE_PRODUCT:
      const moveProduct = action.product
      let newState = {}
      if (moveProduct.key) {
        newState = {
          ...state,
          warehouses: state.warehouses.map(warehouse =>
            warehouse.item === moveProduct.warehouseName ? {
              ...warehouse,
              production: warehouse.production.filter(prod => prod.productName !== moveProduct.productName)
            } : warehouse)
        }
      } else {
        newState = {
          ...state,
          warehouses: state.warehouses.map(warehouse =>
            warehouse.item === moveProduct.warehouseName ? {
                ...warehouse,
                production: warehouse.production.map(prod => prod.productName === moveProduct.productName
                  ? {...prod, amount: prod.amount - moveProduct.amount}
                  : prod
                )
              }
              : warehouse
          )
        }
      }
      const checkProduct = newState.warehouses
        .find(warehouse => warehouse.item === moveProduct.newWarehouseName).production
        .find(product => product.productName === moveProduct.productName)

      if (checkProduct) {
        return {
          ...newState,
          warehouses: newState.warehouses.map(warehouse =>
            warehouse.item === moveProduct.newWarehouseName ? {
                ...warehouse,
                production: warehouse.production.map(prod => prod.productName === moveProduct.productName
                  ? {...prod, amount: prod.amount + moveProduct.amount}
                  : prod
                )
              }
              : warehouse
          )
        }
      } else {
        return {
          ...newState,
          warehouses: newState.warehouses.map(warehouse =>
            warehouse.item === moveProduct.newWarehouseName
              ? {
                ...warehouse,
                production: [
                  ...warehouse.production,
                  {
                    id: warehouse.production.length + 1,
                    productName: moveProduct.productName,
                    amount: moveProduct.amount
                  }
                ]
              }
              : warehouse
          )
        }
      }

    case DELETE_WAREHOUSE:
      const warehouseName = action.warehouseName

      return {
        ...state,
        warehouses: state.warehouses.filter(warehouse => warehouse.item !== warehouseName)
      }

    default:
      return state
  }

}

export default warehousesReducer