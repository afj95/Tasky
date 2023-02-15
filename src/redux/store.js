import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from "redux-persist";
import AsyncStorage from '@react-native-async-storage/async-storage';
import hardSet from 'redux-persist/es/stateReconciler/hardSet';
import promiseMiddleware from "redux-promise";
// Reducers
import {
    globalReducer,
    authReducer,
    projectsReducer,
    usersReducer,
    tasksReducer
} from './reducers'

const rootReducer = combineReducers({
    globalReducer,
    authReducer,
    projectsReducer,
    usersReducer,
    tasksReducer
});

const persistConfig = {
    key: 'tasky-V1.0.0',
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