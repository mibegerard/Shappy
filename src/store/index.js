import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import customizationReducer from './customizationReducer';
import cartReducer from './cartSlice';

const cartPersistConfig = {
  key: 'cart',
  storage
};

// Root reducer combining all slices
const rootReducer = combineReducers({
  customization: customizationReducer,
  cart: persistReducer(cartPersistConfig, cartReducer)
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE']
      }
    })
});

export const persistor = persistStore(store);
export default store;
