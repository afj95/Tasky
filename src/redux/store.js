import { configureStore } from '@reduxjs/toolkit'
import AsyncStorage from '@react-native-async-storage/async-storage';
import hardSet from 'redux-persist/es/stateReconciler/hardSet';
import { persistStore, persistReducer } from "redux-persist";
import { combineReducers, } from "redux";
import thunk from 'redux-thunk';
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

const store = configureStore({
    reducer: persistedReducer,
    middleware: [thunk]
})

const persistor = persistStore(store);

export { store, persistor }