import React, { useState } from 'react';
import {
    Grid,
    TextField,
    MenuItem,
    Typography,
    Divider,
    Stack,
    Box,
    CircularProgress
} from '@mui/material';
import { School } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { submitAcademicInfo } from '../../features/personalInfo/personalInfoSlice'; // adjust path if needed

const educationLevels = ['High School', 'Intermediate', 'Graduation'];
const boards = ['UP Board', 'CBSE', 'ICSE', 'Other'];
const scoreTypes = ['Percentage', 'CGPA'];

const AcademicInformation = () => {
    const dispatch = useDispatch();
    const { loading } = useSelector((state) => state.personalInfo);

    const [academicData, setAcademicData] = useState(
        educationLevels.map((level) => ({
            level,
            board: '',
            subject: '',
            yearOfPassing: '',
            scoreType: 'Percentage',
            marksObtained: '',
            maximumMarks: '',
            percentage: '',
            cgpa: ''
        }))
    );

    const handleChange = (index, field, value) => {
        const updated = [...academicData];
        updated[index][field] = value;

        // Auto-calculate percentage
        if (field === 'marksObtained' || field === 'maximumMarks') {
            const marksObtained = parseFloat(updated[index].marksObtained || 0);
            const maximumMarks = parseFloat(updated[index].maximumMarks || 0);
            updated[index].percentage =
                maximumMarks > 0 ? ((marksObtained / maximumMarks) * 100).toFixed(2) : '';
        }

        setAcademicData(updated);
    };

    const handleScoreTypeChange = (index, value) => {
        const updated = [...academicData];
        updated[index].scoreType = value;
        // Reset related fields when score type changes
        if (value === 'Percentage') {
            updated[index].cgpa = '';
        } else {
            updated[index].marksObtained = '';
            updated[index].maximumMarks = '';
            updated[index].percentage = '';
        }
        setAcademicData(updated);
    };

    const handleSubmit = () => {
        console.log('Submitting:', academicData);
        dispatch(submitAcademicInfo(academicData));
    };

    return (
        <>
            <Stack
                direction="row"
                alignItems="center"
                spacing={1}
                sx={{
                    backgroundColor: '#c5cae9',
                    borderLeft: '6px solid #1a237e',
                    borderRadius: 1,
                    px: 2,
                    py: 1,
                    mb: 2,
                }}
            >
                <School sx={{ color: '#1a237e' }} />
                <Typography variant="h6" sx={{ fontWeight: 700, color: '#1a237e', textTransform: 'uppercase' }}>
                    Academic Information
                </Typography>
            </Stack>

            <Divider sx={{ mb: 3 }} />

            {educationLevels.map((level, index) => (
                <Box key={index} sx={{ mb: 4 }}>
                    <Typography
                        variant="subtitle1"
                        sx={{
                            fontWeight: 700,
                            fontSize: '1rem',
                            color: '#1a237e',
                            backgroundColor: '#e8eaf6',
                            px: 2,
                            py: 1,
                            borderRadius: 1,
                            mb: 2,
                            textTransform: 'uppercase',
                        }}
                    >
                        {level}
                    </Typography>

                    <Grid container spacing={2}>
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <TextField
                                fullWidth
                                label={`${level} Board`}
                                variant="outlined"
                                size="small"
                                select
                                value={academicData[index].board}
                                onChange={(e) => handleChange(index, 'board', e.target.value)}
                            >
                                {boards.map((board) => (
                                    <MenuItem key={board} value={board}>
                                        {board}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>

                        <Grid size={{ xs: 12, sm: 6 }}>
                            <TextField
                                fullWidth
                                label={`${level} Subject`}
                                variant="outlined"
                                size="small"
                                value={academicData[index].subject}
                                onChange={(e) => handleChange(index, 'subject', e.target.value)}
                            />
                        </Grid>

                        <Grid size={{ xs: 12, sm: 3 }}>
                            <TextField
                                fullWidth
                                label="yearOfPassing of Passing"
                                type="number"
                                variant="outlined"
                                size="small"
                                value={academicData[index].yearOfPassing}
                                onChange={(e) => handleChange(index, 'yearOfPassing', e.target.value)}
                            />
                        </Grid>

                        <Grid size={{ xs: 12, sm: 3 }}>
                            <TextField
                                select
                                fullWidth
                                label="Score Type"
                                value={academicData[index].scoreType}
                                onChange={(e) => handleScoreTypeChange(index, e.target.value)}
                                size="small"
                            >
                                {scoreTypes.map((type) => (
                                    <MenuItem key={type} value={type}>
                                        {type}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>

                        {academicData[index].scoreType === 'Percentage' ? (
                            <>
                                <Grid size={{ xs: 12, sm: 3 }}>
                                    <TextField
                                        fullWidth
                                        label="Marks marksObtained"
                                        type="number"
                                        variant="outlined"
                                        size="small"
                                        value={academicData[index].marksObtained}
                                        onChange={(e) =>
                                            handleChange(index, 'marksObtained', e.target.value)
                                        }
                                    />
                                </Grid>

                                <Grid size={{ xs: 12, sm: 3 }}>
                                    <TextField
                                        fullWidth
                                        label="maximumMarksimum Marks"
                                        type="number"
                                        variant="outlined"
                                        size="small"
                                        value={academicData[index].maximumMarks}
                                        onChange={(e) =>
                                            handleChange(index, 'maximumMarks', e.target.value)
                                        }
                                    />
                                </Grid>

                                <Grid size={{ xs: 12, sm: 3 }}>
                                    <TextField
                                        fullWidth
                                        label="Percentage"
                                        variant="outlined"
                                        size="small"
                                        value={academicData[index].percentage || ''}
                                        InputProps={{ readOnly: true }}
                                    />
                                </Grid>
                            </>
                        ) : (
                            <Grid size={{ xs: 12, sm: 3 }}>
                                <TextField
                                    fullWidth
                                    label="CGPA"
                                    variant="outlined"
                                    size="small"
                                    value={academicData[index].cgpa}
                                    onChange={(e) =>
                                        handleChange(index, 'cgpa', e.target.value)
                                    }
                                />
                            </Grid>
                        )}
                    </Grid>
                </Box>
            ))}

            <Box sx={{ justifyContent: 'flex-end', display: 'flex' }} mt={4}>
                <button
                    style={{
                        backgroundColor: '#1a237e',
                        color: '#fff',
                        padding: '10px 30px',
                        border: 'none',
                        borderRadius: '8px',
                        fontSize: '16px',
                        fontWeight: '600',
                        cursor: loading ? 'not-allowed' : 'pointer',
                        boxShadow: '0px 4px 10px rgba(32, 20, 20, 0.2)',
                        minWidth: '180px',
                    }}
                    onClick={handleSubmit}
                    disabled={loading}
                >
                    {loading ? <CircularProgress size={24} color="inherit" /> : 'Save & Changes'}
                </button>
            </Box>
        </>
    );
};

export default AcademicInformation;
