import { configureStore } from "@reduxjs/toolkit";

import bookingReducer from "../features/Booking/bookingSlice";

export const store = configureStore({
  reducer: {
    bookings: bookingReducer,
  },
});
