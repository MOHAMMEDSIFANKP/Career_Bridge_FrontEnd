import { persistStore, persistReducer } from 'redux-persist';
import { configureStore } from "@reduxjs/toolkit";
import storage from 'redux-persist/lib/storage';
import UserSlice from './UserSlice';
import UserReduxSlice from '../Redux/UserSlice';

const persistConfig = {
    key: 'root',      
    storage,     
};

const persistedReducer = persistReducer(persistConfig, UserSlice);

const Store = configureStore({
    reducer: {
        user: persistedReducer,
    },
});

const persistor = persistStore(Store);

export { Store, persistor };
