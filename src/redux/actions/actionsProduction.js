import {ADD_PRODUCT} from "../../constans/constans";


export const addProduct = (product) => {
  return {type: ADD_PRODUCT, payload: {...product}}
}