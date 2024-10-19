import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from './slice/userSlice';
import productSlice from './slice/productSlice';
import orderSlice from './slice/orderSlice';
import orderDetailSlice from './slice/orderDetailSlice';
import statisticSlice from './slice/statisticSlice';
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
}

const rootReducer = combineReducers({
    staff: userReducer,
    products: productSlice,
    order: orderSlice,
    orderDetail: orderDetailSlice,
    statistic: statisticSlice,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],

            },
            serializableCheck: false,
        }),
})


export let persistor = persistStore(store)
