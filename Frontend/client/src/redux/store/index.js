import { combineReducers, configureStore } from '@reduxjs/toolkit';
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
import userSlice from '../slices/userSlice';
import productSlice from '../slices/productSlice';
import cartSlice from '../slices/cartSlice';
import orderSlice from '../slices/orderSlice';
import orderDetailSlice from '../slices/orderDetailSlice';

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
}

const rootReducer = combineReducers({
    user: userSlice,
    product: productSlice,
    cart: cartSlice,
    order: orderSlice,
    orderDetail: orderDetailSlice,
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