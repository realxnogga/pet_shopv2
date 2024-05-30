
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storageSession from 'redux-persist/lib/storage/session'; // Use sessionStorage
import { combineReducers } from '@reduxjs/toolkit';
import { AdminLoginSliceReducer } from './feature/admin/loginSlice';
import { AdminSidebarSliceReducer } from './feature/admin/adminsidebarSlice';
import { AdminProductSliceReducer } from './feature/admin/adminproductSlice';

const persistConfig = {
  key: 'root',
  storage: storageSession, // Use sessionStorage
}

const rootReducer = combineReducers({
    AdminLoginSliceName: AdminLoginSliceReducer,
    AdminSidebarSliceName: AdminSidebarSliceReducer,
    AdminProductSliceName: AdminProductSliceReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const Store = configureStore({
  reducer: persistedReducer
});

export const persistor = persistStore(Store);
