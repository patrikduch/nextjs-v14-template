import { configureStore, createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import { useMemo } from 'react';

// Define the state interface
export interface State {
  apiData: {
    name: string,
    error?: string
  }
}

// Define the initial state
const initialState: State = {
  apiData: {
    name: "",
    error: ""
  }
};

// Asynchronous action to fetch data from an API
export const fetchApiData = createAsyncThunk(
  'tick/fetchApiData',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/hello`);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

// Create a slice of the Redux store
const tickSlice = createSlice({
  name: 'tick',
  initialState,
  reducers: {
    
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchApiData.fulfilled, (state, action) => {
        state.apiData = action.payload;
      })
      .addCase(fetchApiData.rejected, (state, action) => {
        state.apiData.error = action.payload as string;
      });
  },
});

// Create the Redux store with the slice reducer
export const initializeStore = (preloadedState?: { tick: State }) =>
  configureStore({
    reducer: {
      tick: tickSlice.reducer,
    },
    preloadedState,
  });

// Define types for the store, dispatch, and state selectors
type Store = ReturnType<typeof initializeStore>;
type AppDispatch = Store['dispatch'];
type RootState = ReturnType<Store['getState']>;

// Create hooks for typed dispatch and selector
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// Hook to initialize the store for Next.js pages
export function useStore(preloadedState: { tick: State }) {
  const store = useMemo(() => initializeStore(preloadedState), [preloadedState]);
  return store;
}
