import { configureStore } from "@reduxjs/toolkit";

import bookingReducer from "../features/Booking/bookingSlice";
import loginReducer from "../features/User/loginSlice";

export const store = configureStore({
  reducer: {
    bookings: bookingReducer,
    login: loginReducer,
  },
});
