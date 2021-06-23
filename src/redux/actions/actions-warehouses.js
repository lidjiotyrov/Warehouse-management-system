import {ADD_PRODUCT_IN_WAREHOUSE} from "../../constans/constans";


export const addProductInWarehouse = (production) => {
  return { type: ADD_PRODUCT_IN_WAREHOUSE, production }
}