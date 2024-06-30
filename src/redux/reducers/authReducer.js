import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: 'auth',
  initialState:{
    data: {},
  },
  reducers:{
    addAuth: (state, action) => {
      state.data = action.payload
    }
  }
})

export const authReducer = authSlice.reducer
export const {addAuth} = authSlice.actions
export const authSeletor = (state) => state.authReducer.data
