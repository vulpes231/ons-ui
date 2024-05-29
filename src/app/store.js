import { configureStore } from "@reduxjs/toolkit";
import webhookReducer from "../features/webhookSlice";

const store = configureStore({
  reducer: {
    webhook: webhookReducer,
  },
});

export default store;
