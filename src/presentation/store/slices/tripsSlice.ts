import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Trip } from '../../../domain/entities/Trip';

interface TripsState {
  trips: Trip[];
  isLoading: boolean;
  error: string | null;
}

const initialState: TripsState = {
  trips: [],
  isLoading: false,
  error: null,
};

const tripsSlice = createSlice({
  name: 'trips',
  initialState,
  reducers: {
    tripsStart: state => {
      state.isLoading = true;
      state.error = null;
    },
    tripsSuccess: (state, action: PayloadAction<Trip[]>) => {
      state.isLoading = false;
      state.trips = action.payload;
      state.error = null;
    },
    tripsFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    tripCreated: (state, action: PayloadAction<Trip>) => {  // ⭐ THÊM ACTION NÀY
      state.trips.unshift(action.payload); // Thêm vào đầu danh sách
    },
    tripUpdated: (state, action: PayloadAction<Trip>) => {
      const index = state.trips.findIndex(trip => trip.id === action.payload.id);
      if (index !== -1) {
        state.trips[index] = action.payload;
      }
    },
    tripDeleted: (state, action: PayloadAction<string>) => {
      state.trips = state.trips.filter(trip => trip.id !== action.payload);
    },
    clearTripsError: state => {
      state.error = null;
    },
  },
});

export const {
  tripsStart,
  tripsSuccess,
  tripsFailure,
  tripCreated,  // ⭐ EXPORT ACTION MỚI
  tripUpdated,
  tripDeleted,
  clearTripsError,
} = tripsSlice.actions;

export default tripsSlice.reducer;