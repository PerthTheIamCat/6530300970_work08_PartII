import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  signInPromise,
  doSignOut,
  fetchUserProfileByEmail,
} from "../../firebase/AuthModel";

export const signInUser = createAsyncThunk(
  "auth/signInUser",
  async ({ email, password }) => {
    const user = await signInPromise(email, password);
    return {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName || "",
    };
  }
);

export const signOutUser = createAsyncThunk("auth/signOutUser", async () => {
  await doSignOut();
  return true;
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    status: "idle", // idle | loading | succeeded | failed
    error: null,
    profile: null,
  },
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
      state.status = action.payload ? "succeeded" : "idle";
    },
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signInUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(signInUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.status = "succeeded";
      })
      .addCase(signInUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error?.message || "Login failed";
      })
      .addCase(signOutUser.fulfilled, (state) => {
        state.user = null;
        state.status = "idle";
        state.profile = null;
      })
      .addCase(fetchUserProfile.pending, (state) => {
        // keep current status but clear error
        state.error = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.profile = action.payload;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.error = action.error?.message || "Fetch profile failed";
      });
  },
});

export const { setUser, clearError } = authSlice.actions;
export default authSlice.reducer;

export const fetchUserProfile = createAsyncThunk(
  "auth/fetchUserProfile",
  async ({ email }) => {
    const profile = await fetchUserProfileByEmail(email);
    return profile;
  }
);
