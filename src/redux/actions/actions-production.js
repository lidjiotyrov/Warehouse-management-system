import {ADD_PRODUCT, DELETE_PRODUCT, EDIT_PRODUCT} from "../../constans/constans";


export const addProduct = (product) => {
  return {type: ADD_PRODUCT, product}
}

export const editProduction = (editProduct) => {
  return {type: EDIT_PRODUCT, editProduct}
}

export const deleteProduction = (product, typeDel) => {
  return {type: DELETE_PRODUCT, product, typeDel}
}