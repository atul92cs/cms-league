import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  pagelimit:"",
  page: 0,
  count: 0,
  isLoading: false,
  err: "",
};

export const getCount = createAsyncThunk(
  "/count/getCount",
  async (countData, { rejectWithValue }) => {
    try {
      let { apiurl } = countData;
      let result = await axios.get(`${apiurl}/count`);

      return result.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const pageSlice = createSlice({
  name: "page",
  initialState,
  reducers: {
    setPage: (state, action) => {
      let { limit, page } = action.payload;
      state.pagelimit = limit;
      state.page = page;
    },
    clearPage: (state) => {
      state.pagelimit = 0;
      state.page = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCount.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCount.fulfilled, (state, action) => {
        state.isLoading = false;
        state.count = action.payload.count;
      })
      .addCase(getCount.rejected, (state, action) => {
        state.isLoading = false;
        state.err = action.payload;
      });
  },
});

export const { setPage, clearPage } = pageSlice.actions;
export default pageSlice.reducer;