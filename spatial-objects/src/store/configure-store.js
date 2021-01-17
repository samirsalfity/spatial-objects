import {createStore} from "redux";
import polygonsReducer from './reducer'


export default () => {
    const store = createStore(polygonsReducer);
    return store;
}