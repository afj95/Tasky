import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from "redux-persist";
import AsyncStorage from '@react-native-async-storage/async-storage';
import hardSet from 'redux-persist/es/stateReconciler/hardSet';
import promiseMiddleware from "redux-promise";
// Reducers
import {
    authReducer
} from './reducers'

const rootReducer = combineReducers({
    authReducer
});

const persistConfig = {
    key: 'bidMe-v1.0.2',
    // key: 'root',
    storage: AsyncStorage,
    stateReconciler: hardSet
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(
    persistedReducer,
    composeWithDevTools(applyMiddleware(promiseMiddleware, thunk))
);

const persistor = persistStore(store);

export { store, persistor }