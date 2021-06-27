import {ADD_NEW_PRODUCT_IN_WAREHOUSE, ADD_PRODUCT_IN_WAREHOUSE} from "../../constans/constans";


export const addProductInWarehouse = (product) => {
  return { type: ADD_PRODUCT_IN_WAREHOUSE, product }
}
export const addNewProductInWarehouse = (production) => {
  return { type: ADD_NEW_PRODUCT_IN_WAREHOUSE, production }
}