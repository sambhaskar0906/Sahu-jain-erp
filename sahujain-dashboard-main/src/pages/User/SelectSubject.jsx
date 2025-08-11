import React, { useState, useEffect } from 'react';
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
import { submitSubjectInfo } from '../../features/personalInfo/personalInfoSlice';

const subjectOptions = {
  "B.A.": {
    major: ['Hindi', 'Sociology', 'Mathematics', 'English', 'Geography', 'Political Science', 'Sanskrit', 'Economics', 'Music(Tabla)', 'Physical Education'],
    minor: ['Hindi', 'Sociology', 'Mathematics', 'English', 'Geography', 'Political Science', 'Sanskrit', 'Economics', 'Music(Tabla)', 'Physical Education']
  },
  "B.Com.": {
    major: ['Accountancy', 'Business Studies', 'Economics'],
    minor: ['Mathematics', 'Statistics', 'Banking']
  },
  "B.Sc.(ZBC)": {
    major: ['Zoology', 'Chemistry', 'Botany'],
    minor: ['Zoology', 'Chemistry', 'Botany']
  },
  "B.Sc.(Math)": {
    major: ['Physics', 'Chemistry', 'Mathematics'],
    minor: ['Physics', 'Chemistry', 'Mathematics']
  },
  "M.A.": {
    major: ['Hindi', 'Sociology', 'Mathematics', 'English (Self-Financed)', 'Geography (Self-Financed)', 'Political Science (Self-Financed)'],
    minor: ['Hindi', 'Sociology', 'Mathematics', 'English (Self-Financed)', 'Geography (Self-Financed)', 'Political Science (Self-Financed)']
  },
  "M.Com.": {
    major: ['History', 'Political Science', 'Economics', 'Psychology', 'Sociology'],
    minor: ['Philosophy', 'Geography', 'Education', 'Hindi', 'English']
  },
  "M.Sc.": {
    major: ['Chemistry', 'Mathematics'],
    minor: ['Chemistry', 'Mathematics']
  },
  "PhD": {
    major: ['Hindi', 'Sociology', 'Mathematics', 'English', 'Geography', 'Political Science', 'Commerce', 'Chemistry'],
    minor: ['Hindi', 'Sociology', 'Mathematics', 'English', 'Geography', 'Political Science', 'Commerce', 'Chemistry']
  },
};

const semesterOptions = ['First Semester', 'Third Semester', 'Fifth Semester'];

const SubjectInfoForm = ({ onNext }) => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.personalInfo);

  const [course, setCourse] = useState('');
  const [semester, setSemester] = useState('');
  const [majorSubject, setMajorSubject] = useState([]);
  const [minorSubject, setMinorSubject] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const subjectInfo = useSelector((state) => state.user.subjectInfo);

  useEffect(() => {
    if (subjectInfo) {
      setCourse(subjectInfo.course || '');
      setSemester(subjectInfo.semester || '');
      setMajorSubject(subjectInfo.majorSubject || []);
      setMinorSubject(subjectInfo.minorSubject?.[0] || '');
    }
  }, [subjectInfo]);


  console.log('subjectInfo from Redux:', subjectInfo);

  const handleSubmit = () => {
    if (!course || !semester || majorSubject.length === 0 || majorSubject.length > 2 || !minorSubject) {
      setError('Please select a course, 1 or 2 major subjects, and a minor subject');
      return;
    }
    if (majorSubject.includes(minorSubject)) {
      setError('Major and Minor subjects cannot be the same');
      return;
    }

    dispatch(submitSubjectInfo({ course, semester, majorSubject, minorSubject }))
      .unwrap()
      .then(() => {
        setSuccess(true);
        setCourse('');
        setSemester('');
        setMajorSubject([]);
        setMinorSubject('');
        onNext();
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

        {/* Semester */}
        {course && (
          <Grid size={{ xs: 12, sm: 4 }}>
            <FormControl fullWidth>
              <InputLabel id="semester-label">Semester</InputLabel>
              <Select
                labelId="semester-label"
                id="semester"
                value={semester}
                label="Semester"
                onChange={(e) => {
                  setSemester(e.target.value);
                  setMajorSubject([]);
                  setMinorSubject('');
                }}
              >
                {semesterOptions.map((sem) => (
                  <MenuItem key={sem} value={sem}>
                    {sem}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        )}

        {course && (
          <>
            {/* Major Subject */}
            <Grid size={{ xs: 12, sm: 4 }}>
              <FormControl fullWidth>
                <InputLabel id="major-label">Major Subject(s)</InputLabel>
                <Select
                  labelId="major-label"
                  id="majorSubject"
                  multiple
                  value={majorSubject}
                  label="Major Subject(s)"
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value.length <= 2) {
                      setMajorSubject(value);
                      if (value.includes(minorSubject)) {
                        setMinorSubject('');
                      }
                    }
                  }}
                  renderValue={(selected) => selected.join(', ')}
                >
                  {subjectOptions[course].major.map((subject) => (
                    <MenuItem key={subject} value={subject} selected={majorSubject.includes(subject)}>
                      {subject}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* Minor Subject */}
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
                  {subjectOptions[course].minor
                    .filter((subject) => !majorSubject.includes(subject))
                    .map((subject) => (
                      <MenuItem key={subject} value={subject} selected={minorSubject === subject}>
                        {subject}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Grid>

          </>
        )}
      </Grid>

      {/* Selected Major Subjects display */}
      {majorSubject.length > 0 && (
        <Box sx={{ mt: 2 }}>
          <Typography
            variant="subtitle2"
            sx={{ fontWeight: 'bold', color: '#1976d2', mb: 0.5 }}
          >
            Selected Major Subject(s) ({majorSubject.length}/2)
          </Typography>
          <TextField
            fullWidth
            variant="outlined"
            size="small"
            value={majorSubject.join(', ')}
            InputProps={{
              readOnly: true,
              style: { backgroundColor: '#f5f5f5', fontWeight: 500 }
            }}
          />
        </Box>
      )}

      {/* Selected Minor Subject display */}
      {minorSubject && (
        <Box sx={{ mt: 2 }}>
          <Typography
            variant="subtitle2"
            sx={{ fontWeight: 'bold', color: '#1976d2', mb: 0.5 }}
          >
            Selected Minor Subject (1/1)
          </Typography>
          <TextField
            fullWidth
            variant="outlined"
            size="small"
            value={minorSubject}
            InputProps={{
              readOnly: true,
              style: { backgroundColor: '#f5f5f5', fontWeight: 500 }
            }}
          />
        </Box>
      )}


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
