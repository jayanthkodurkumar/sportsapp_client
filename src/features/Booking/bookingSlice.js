import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
// const initialState = [
//   {
//     first_name: "raina",
//     last_name: "raina",
//     user_name: "jjoe",
//     date: "2023-06-02",
//     start_time: "11:00:00",
//     end_time: "12:00:00",
//     user: {
//       user_id: 1,
//       first_name: "jane",
//       last_name: "doe",
//       user_name: "jdoe",
//       password: "password123",
//       role: "admin",
//     },
//     bookingId: 1,
//   },
//   {
//     first_name: "dave",
//     last_name: "mohd",
//     user_name: "david",
//     date: "2023-06-02",
//     start_time: "11:00:00",
//     end_time: "12:00:00",
//     user: {
//       user_id: 1,
//       first_name: "jane",
//       last_name: "doe",
//       user_name: "jdoe",
//       password: "password123",
//       role: "admin",
//     },
//     bookingId: 2,
//   },
// ];

const BOOKINGS_URL = "http://localhost:8080/booking";

const initialState = {
  bookings: [],
  status: "idle",
  error: null,
};
export const fetchBookings = createAsyncThunk(
  "bookings/fetchBookings",
  async () => {
    try {
      const response = await axios.get(BOOKINGS_URL);
      //   console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching bookings:", error);

      throw error; // Throw the error to be caught in the .rejected case
    }
  }
);

export const bookingSlice = createSlice({
  name: "bookings",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchBookings.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchBookings.fulfilled, (state, action) => {
        state.status = "suceeded";

        state.bookings = action.payload; // Update state with fetched bookings
        // console.log(state.bookings);
      })
      .addCase(fetchBookings.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const selectAllBookings = (state) => state.bookings.bookings;
export const getBookingsStatus = (state) => state.bookings.status;
export const getBookingsError = (state) => state.bookings.error;

export default bookingSlice.reducer;
