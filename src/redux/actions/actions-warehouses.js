import {ADD_PRODUCT_IN_WAREHOUSE, ADD_WAREHOUSE, DELETE_PRODUCT_IN_WAREHOUSE} from "../../constans/constans";


export const addProductInWarehouse = (product) => {
  return { type: ADD_PRODUCT_IN_WAREHOUSE, product }
}

export const addWarehouse = (warehouse) => {
  return { type: ADD_WAREHOUSE, warehouse }
}

export const deleteProductInWarehouse = (productName) => {
  return { type: DELETE_PRODUCT_IN_WAREHOUSE, productName }
}