import {createSlice,createAsyncThunk} from '@reduxjs/toolkit';
import axios from "../../utils/axios";
export const registerCandidate = createAsyncThunk(
  'candidate/register',
  async (formData, { rejectWithValue }) => {
    try {
      const res = await axios.post('/candidate/first-registration', formData);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Registration failed');
    }
  }
);

export const loginCandidate = createAsyncThunk(
  'candidate/login',
  async ({ applicationId, password }, { rejectWithValue }) => {
    console.log("API call started with", { applicationId, password })
    try {
      const res = await axios.post('candidate/login', { applicationId, password });
            const token = res.data?.data?.token;

      if (token) {
        localStorage.setItem("token", token); // ✅ Save token here
        console.log("Token saved to localStorage:", token);
      } else {
        console.warn("Token missing in response");
      }
      return res.data.data;
    } catch (err) {
        console.log("API error:", err); 
      return rejectWithValue(err.response?.data?.message || 'Login failed');
    }
  }
);
const initialState = {
  loading: false,
  error: null,
  user: null,
  token: null,
  success: false,
};
const candidateSlice = createSlice({
  name: 'candidate',
  initialState,
  reducers: {
    logoutCandidate: (state) => {
      state.user = null;
      state.token = null;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Registration
    builder
      .addCase(registerCandidate.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(registerCandidate.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.user = action.payload.candidate;
      })
      .addCase(registerCandidate.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Login
      .addCase(loginCandidate.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginCandidate.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.success = true;
      })
      .addCase(loginCandidate.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logoutCandidate } = candidateSlice.actions;
export default candidateSlice.reducer;