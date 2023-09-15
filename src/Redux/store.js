import { persistStore, persistReducer } from 'redux-persist';
import { configureStore } from "@reduxjs/toolkit";
import storage from 'redux-persist/lib/storage';
import UserSlice from './UserSlice';
import CompanySlice from './CompanySlice';
import UserReduxSlice from '../Redux/UserSlice';

const persistConfig = {
    key: 'root',      
    storage,     
};

const persistedReducer = persistReducer(persistConfig, UserSlice);
const persistedCompanyReducer = persistReducer(persistConfig, CompanySlice);

const Store = configureStore({
    reducer: {
        user: persistedReducer,
        company: persistedCompanyReducer,
    },
});

const persistor = persistStore(Store);

export { Store, persistor };
