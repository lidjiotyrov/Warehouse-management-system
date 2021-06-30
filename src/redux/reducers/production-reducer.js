import {ADD_PRODUCT, DELETE_PRODUCT, EDIT_PRODUCT, MOVE_PRODUCT_OF_WAREHOUSE} from "../../constans/constans";

const initState = {
  production: [
    {_id: 'Картофель', id: 1, item: 'Картофель', inWarehouse: 66, unallocated: 10},
    {_id: 'Хлеб', id: 2, item: 'Хлеб', inWarehouse: 69, unallocated: 23},
    {_id: 'Молоко', id: 3, item: 'Молоко', inWarehouse: 96, unallocated: 12},
  ]
}

const productionReducer = (state = initState, action) => {
  switch (action.type) {
    case ADD_PRODUCT:
      const product = action.product
      const checkProduct = state.production.find(prod => prod.item === product.item)

      if (checkProduct) {

        return {
          ...state,
          production: state.production.map(prod => prod.item === product.item
            ? {...prod, unallocated: prod.unallocated + product.unallocated}
            : prod)
        }
      } else {
        const id = state.production.length + 1

        return {
          ...state,
          production: [...state.production, {
            id,
            item: product.item,
            inWarehouse: product.inWarehouse,
            unallocated: product.unallocated
          }]
        }
      }

    case EDIT_PRODUCT:
      const editProduct = action.editProduct

      return {
        ...state, production: state.production.map(product => product.item === editProduct.productName
          ? {
            ...product,
            inWarehouse: product.inWarehouse + editProduct.amount,
            unallocated: product.unallocated - editProduct.amount
          }
          : product)
      }

    case DELETE_PRODUCT:
      const prodRemove = action.product

      if (action.typeDel === 'completely') {
        return {
          ...state,
          production: state.production.filter(prod => prod.item !== prodRemove)
        }
      } else {
        if (prodRemove.warehouseName) {

          return {
            ...state,
            production: state.production.map(prod => prodRemove.name === prod.item
              ? {
                ...prod,
                unallocated: prod.unallocated - prodRemove.amount,
                inWarehouse: prod.inWarehouse + prodRemove.amount
              }
              : prod)
          }
        } else {
          return {
            ...state,
            production: state.production.map(prod => prodRemove.name === prod.item ? {
              ...prod,
              unallocated: prod.unallocated - prodRemove.amount
            } : prod)
          }
        }
      }

    case MOVE_PRODUCT_OF_WAREHOUSE:
      const prodMove = action.product

      return {
        ...state,
        production: state.production.map(prod =>
          prod.item === prodMove.productName
            ? {
              ...prod,
              unallocated: prod.unallocated + prodMove.amount,
              inWarehouse: prod.inWarehouse - prodMove.amount
            }
            : prod
        )
      }

    default:
      return state
  }

}

export default productionReducer