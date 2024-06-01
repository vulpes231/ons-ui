import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const devurl = "http://localhost:5900";
const liveurl = "https://ons-bot.onrender.com";

const initialState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
};

export const sendNotification = createAsyncThunk(
  "webhook/sendNotification",
  async (formData) => {
    const url = `${liveurl}/webhook`;
    try {
      const response = await axios.post(url, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(response);
      return response.data;
    } catch (error) {
      if (error.response) {
        const errorMsg = error.response.message.data;
        throw new Error(errorMsg);
      } else {
        throw error;
      }
    }
  }
);

const webHookSlice = createSlice({
  name: "webhook",
  initialState,
  reducers: {
    reset(state) {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(sendNotification.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(sendNotification.fulfilled, (state) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
    });
    builder.addCase(sendNotification.rejected, (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = action.error.message;
    });
  },
});

export const { reset } = webHookSlice.actions;
export default webHookSlice.reducer;
