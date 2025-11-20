import { createSlice } from "@reduxjs/toolkit";
import { getAboutUser, getAllUser, getConnectionsRequest, getMyConnectionRequests, loginUser, registerUser } from "../../action/authAction";

const initialState = {
  user: undefined,
  isError: false,
  isSuccess: false,
  isLoading: false,
  loggedIn: false,
  isTokenThere:false,
  message: "", // always string
  profileFetched: false,
  connections: [],
  connectionRequest: [],
  all_users:[],
  all_profiles_fetched:false
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: () => initialState,
    handleLoginUser: (state) => {
      state.message = "hello";
    },
    emptyMessage: (state) => {
      state.message = "";
    },
    setTokenisThere:(state)=>{
      state.isTokenThere=true
    },
    setTokenISNotThere:(state)=>{
      state.isTokenThere=false
    }
  },
  extraReducers: (builder) => {
    builder
      // 🔹 LOGIN
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.message = "Knocking the door...";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.loggedIn = true;
        state.message = "Login is Successfully";
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        // 🧠 Fix: if backend sends object, safely handle
        state.message =
          action.payload?.message || "Login failed! Please check credentials.";
      })

      // 🔹 REGISTER
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.message = "Registering you...";
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        // state.loggedIn = true;
        // 🧠 Always assign string, not object
        state.message = "Registration is successful! Please login.";
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message =
          action.payload?.message || "Registration failed! Try again.";
      })
      .addCase(getAboutUser.pending, (state) => {
  state.isLoading = true;
})
.addCase(getAboutUser.fulfilled, (state, action) => {
  state.isLoading = false;
  state.isError = false;
  state.profileFetched = true;
  state.user = action.payload; // ✅ fixed
})
.addCase(getAboutUser.rejected, (state, action) => {
  state.isLoading = false;
  state.isError = true;
  state.message = action.payload?.message || "Failed to fetch user profile.";
})
.addCase(getAllUser.fulfilled,(state,action)=>{
  state.isLoading=false;
  state.isError=false;
  state.all_profiles_fetched=true,
  state.all_users=action.payload.profiles

})
.addCase(getConnectionsRequest.fulfilled,(state,action)=>{
  state.connections = action.payload
})
.addCase(getMyConnectionRequests.fulfilled,(state,action)=>{
  state.connectionRequest = action.payload
})
.addCase(getConnectionsRequest.rejected,(state,action)=>{
  state.message = action.payload
})
  },
})

export const { reset, emptyMessage,setTokenISNotThere,setTokenisThere } = authSlice.actions;
export default authSlice.reducer;
