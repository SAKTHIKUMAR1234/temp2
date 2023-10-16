import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetch_get } from "../utils";

export const showList = createAsyncThunk(
  "showList",
  async (args,{ rejectWithValue }) => {
    const response = await fetch_get("http://192.168.1.197:5005/recommendation/get")
    try {
      const result = await response.data
      return result
    } catch (error) {
      return rejectWithValue(error)
    }
  }
);


export const interestList = createSlice({
  name: "interestList",
  initialState: {
    lists: [],
    loading: false,
    error: null,
  },
  reducers: {
    curdList: (state, action) => {
      return {...state, lists: action.payload}
    }
  },
  extraReducers: (builder) =>{
    builder.addCase(showList.pending, (state)=>{
      state.loading = true;
    })
    builder.addCase(showList.fulfilled, (state, action)=>{
      state.loading = false;
      state.lists = action.payload
    })
    builder.addCase(showList.rejected, (state, action)=>{
      state.loading = false;
      state.error = action.payload;
    })

    // [showList.pending]: (state) => {
    //   state.loading = true;
    // },
    // [showList.fulfilled]: (state, action) => {
    //   debugger
    //   console.log("Hello")
    //   state.loading = false;
    //   state.lists =action.payload;
    // },
    // [showList.rejected]: (state, action) => {
    //   state.loading = false;
    //   state.error = action.payload;
    // },
  }
});

export const {
  curdList,
 } = interestList.actions;

export default interestList.reducer;
