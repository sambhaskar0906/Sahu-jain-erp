

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../utils/axios';

// --- Thunks ---


export const submitPersonalInfo = createAsyncThunk(
  'application/submitPersonalInfo',
  async (formValues, { rejectWithValue }) => {
    try {
      const formData = new FormData();

      // 🔹 Append form fields
      for (const key in formValues) {
        if (key === 'permanentAddress' || key === 'temporaryAddress') {
          for (const subKey in formValues[key]) {
            formData.append(`${key === 'permanentAddress' ? 'P' : 'T'}${subKey}`, formValues[key][subKey]);
          }
        } else if (key === 'candidatePhoto' || key === 'candidateSignature') {
          const file = formValues[key];
if (file && file instanceof File) {
  formData.append(
    key === 'candidatePhoto' ? 'candidate_photo' : 'candidate_signature',
    file
  );
} else {
  console.warn(`${key} is not a valid File. Skipping.`);
}

        } else {
          formData.append(key, formValues[key]);
        }
      }
        

      const response = await axios.post('/personalInfo/create', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);


export const submitAcademicInfo = createAsyncThunk(
  'application/submitAcademicInfo',
  async (academicRecords, { rejectWithValue }) => {
    try {
      const response = await axios.post('/personalInfo/register/academic-info', { academicRecords });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const submitSubjectInfo = createAsyncThunk(
  'application/submitSubjectInfo',
  async ({ majorSubject, minorSubject }, { rejectWithValue }) => {
    try {
      const response = await axios.post('/personalInfo/register/subject-info', {
        majorSubject,
        minorSubject,
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const submitFinalApplication = createAsyncThunk(
  'application/submitFinalApplication',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.post('/register/submit');
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const fetchApplicationStatus = createAsyncThunk(
  'application/fetchApplicationStatus',
  async (applicationId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/register/status/${applicationId}`);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// --- Slice ---

const applicationSlice = createSlice({
  name: 'application',
  initialState: {
    loading: false,
    error: null,
    personalInfo: null,
    academicInfo: null,
    subjectInfo: null,
    isSubmitted: false,
    status: null,
  },
  reducers: {
    clearApplicationState: (state) => {
      state.loading = false;
      state.error = null;
      state.personalInfo = null;
      state.academicInfo = null;
      state.subjectInfo = null;
      state.isSubmitted = false;
      state.status = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Personal Info
      .addCase(submitPersonalInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(submitPersonalInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.personalInfo = action.payload;
      })
      .addCase(submitPersonalInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Academic Info
      .addCase(submitAcademicInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(submitAcademicInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.academicInfo = action.payload;
      })
      .addCase(submitAcademicInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Subject Info
      .addCase(submitSubjectInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(submitSubjectInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.subjectInfo = action.payload;
      })
      .addCase(submitSubjectInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Final Submission
      .addCase(submitFinalApplication.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(submitFinalApplication.fulfilled, (state, action) => {
        state.loading = false;
        state.isSubmitted = true;
      })
      .addCase(submitFinalApplication.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Application Status
      .addCase(fetchApplicationStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchApplicationStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.status = action.payload;
      })
      .addCase(fetchApplicationStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearApplicationState } = applicationSlice.actions;
export default applicationSlice.reducer;
