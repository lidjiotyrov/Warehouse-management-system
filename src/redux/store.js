import { createStore, combineReducers } from 'redux';
import productionReducer from "./reducers/production-reducer";
import warehousesReducer from "./reducers/warehouses-reducer";


let reducers = combineReducers({
    production: productionReducer,
    warehouses: warehousesReducer,
})

let store = createStore(reducers)

export default store;