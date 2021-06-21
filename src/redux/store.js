import { createStore, combineReducers } from 'redux';
import productionReducer from "./reducers/production-reducer";
import warehousesReducer from "./reducers/warehouses-reducer";
import commonReducer from "./reducers/common-reducer";


let reducers = combineReducers({
    common: commonReducer,
    production: productionReducer,
    warehouses: warehousesReducer,
})

let store = createStore(reducers)

export default store;