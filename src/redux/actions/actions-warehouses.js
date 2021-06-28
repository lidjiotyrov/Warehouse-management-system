import {ADD_PRODUCT_IN_WAREHOUSE, ADD_WAREHOUSE} from "../../constans/constans";


export const addProductInWarehouse = (product) => {
  return { type: ADD_PRODUCT_IN_WAREHOUSE, product }
}

export const addWarehouse = (warehouse) => {
  return { type: ADD_WAREHOUSE, warehouse }
}