import {
  ADD_PRODUCT_IN_WAREHOUSE,
  ADD_WAREHOUSE,
  DELETE_PRODUCT_IN_WAREHOUSE, DELETE_WAREHOUSE,
  MOVE_PRODUCT
} from "../../constans/constans";


export const addProductInWarehouse = (product) => {
  return { type: ADD_PRODUCT_IN_WAREHOUSE, product }
}

export const addWarehouse = (warehouse) => {
  return { type: ADD_WAREHOUSE, warehouse }
}

export const deleteProductInWarehouse = (product) => {
  return { type: DELETE_PRODUCT_IN_WAREHOUSE, product }
}

export const moveProduct = (product) => {
  return { type: MOVE_PRODUCT, product }
}

export const deleteWarehouse = (warehouseName) => {
  return { type: DELETE_WAREHOUSE, warehouseName }
}