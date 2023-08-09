import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BOOKINGS_URL = "http://localhost:5000/booking";
const ADD_BOOKINGS_URL = "http://localhost:5000/users/1/booking";

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

export const addBookings = createAsyncThunk("bookings/addBookings", (data) => {
  try {
    const response = axios.post(ADD_BOOKINGS_URL, data);
    //   console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching bookings:", error);

    throw error; // Throw the error to be caught in the .rejected case
  }
});

export const bookingSlice = createSlice({
  name: "bookings",
  initialState,
  reducers: {
    bookingAdded: {
      reducer(state, action) {
        state.bookings.push(action.payload);
      },
    },
  },
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

export const { bookingAdded } = bookingSlice.actions;

export default bookingSlice.reducer;
