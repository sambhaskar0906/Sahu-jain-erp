import React, { useState } from 'react';
import {
  Grid,
  TextField,
  MenuItem,
  Typography,
  Divider,
  Stack,
  Box,
  CircularProgress,
  Button,
  Select,
  InputLabel,
  FormControl,
  Snackbar,
  Alert
} from '@mui/material';
import { School } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { submitSubjectInfo } from '../../features/personalInfo/personalInfoSlice'; // adjust path if needed

const subjectOptions = {
  BA: {
    major: ['History', 'Political Science', 'Economics', 'Psychology', 'Sociology'],
    minor: ['Philosophy', 'Geography', 'Education', 'Hindi', 'English']
  },
  BCom: {
    major: ['Accountancy', 'Business Studies', 'Economics'],
    minor: ['Mathematics', 'Statistics', 'Banking']
  },
  BSc: {
    major: ['Physics', 'Chemistry', 'Mathematics', 'Biology', 'Computer Science'],
    minor: ['Environmental Science', 'Electronics', 'Zoology', 'Geology']
  }
};

const SubjectInfoForm = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.personalInfo);

  const [course, setCourse] = useState('');
  const [majorSubject, setMajorSubject] = useState([]);
  const [minorSubject, setMinorSubject] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = () => {
    if (!course || majorSubject.length === 0 || majorSubject.length > 2 || !minorSubject) {
      setError('Please select a course, 1 or 2 major subjects, and a minor subject');
      return;
    }
    if (majorSubject.includes(minorSubject)) {
      setError('Major and Minor subjects cannot be the same');
      return;
    }

    dispatch(submitSubjectInfo({ course, majorSubject, minorSubject }))
      .unwrap()
      .then(() => {
        setSuccess(true);
        setCourse('');
        setMajorSubject([]);
        setMinorSubject('');
      })
      .catch((err) => {
        setError(err.message || 'Something went wrong');
      });
  };

  return (
    <Box p={2}>
      <Typography variant="h6" gutterBottom>
        <School fontSize="small" sx={{ mr: 1 }} />
        Subject Information
      </Typography>
      <Divider sx={{ mb: 2 }} />

      <Grid container spacing={2}>
        <Grid size={{ xs: 12, sm: 4 }}>
          <FormControl fullWidth>
            <InputLabel id="course-label">Course</InputLabel>
            <Select
              labelId="course-label"
              id="course"
              value={course}
              label="Course"
              onChange={(e) => {
                setCourse(e.target.value);
                setMajorSubject([]);
                setMinorSubject('');
              }}
            >
              {Object.keys(subjectOptions).map((key) => (
                <MenuItem key={key} value={key}>
                  {key}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        {course && (
          <>
            <Grid size={{ xs: 12, sm: 4 }}>
              <FormControl fullWidth>
                <InputLabel id="major-label">Major Subject(s)</InputLabel>
                <Select
                  labelId="major-label"
                  id="majorSubject"
                  multiple
                  value={majorSubject}
                  label="Major Subject"
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value.length <= 2) {
                      setMajorSubject(value);
                    }
                  }}
                  renderValue={(selected) => selected.join(', ')}
                >
                  {subjectOptions[course].major.map((subject) => (
                    <MenuItem key={subject} value={subject}>
                      {subject}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

            </Grid>

            <Grid size={{ xs: 12, sm: 4 }}>
              <FormControl fullWidth>
                <InputLabel id="minor-label">Minor Subject</InputLabel>
                <Select
                  labelId="minor-label"
                  id="minorSubject"
                  value={minorSubject}
                  label="Minor Subject"
                  onChange={(e) => setMinorSubject(e.target.value)}
                >
                  {subjectOptions[course].minor.map((subject) => (
                    <MenuItem key={subject} value={subject}>
                      {subject}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </>
        )}
      </Grid>

      <Stack direction="row" justifyContent="flex-end" spacing={2} mt={3}>
        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : 'Submit'}
        </Button>
      </Stack>

      {/* Success Message */}
      <Snackbar
        open={success}
        autoHideDuration={3000}
        onClose={() => setSuccess(false)}
      >
        <Alert severity="success" variant="filled">
          Subject info submitted successfully!
        </Alert>
      </Snackbar>

      {/* Error Message */}
      <Snackbar
        open={Boolean(error)}
        autoHideDuration={4000}
        onClose={() => setError('')}
      >
        <Alert severity="error" variant="filled">
          {error}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default SubjectInfoForm;
