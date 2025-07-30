import React, { useState } from 'react';
import {
    Box,
    Typography,
    Stepper,
    Step,
    StepLabel,
    useTheme,
    useMediaQuery,
    Paper,
    Divider,
    Avatar,
    Button
} from '@mui/material';
import { School } from '@mui/icons-material';
import PersonalDetails from './PersonalDetails';
import AcademicInformation from './AcademicInformation';
import SelectSubject from './SelectSubject';
import PaymentSubmission from './PaymentSubmission';


const steps = ['Personal Details', 'Academic Information', 'Select Subject', 'Payment & Submission'];

const Registration = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [activeStep, setActiveStep] = useState(0);

    const handleNext = () => {
        setActiveStep((prev) => prev + 1);
    };

    const handleBack = () => {
        setActiveStep((prev) => prev - 1);
    };

    return (
        <>
            <Box sx={{
                p: isMobile ? 2 : 4,
                background: 'linear-gradient(135deg, #f5f7fa 0%, #e4e8f0 100%)',
                minHeight: '100vh'
            }}>
                {/* Header */}
                <Box sx={{
                    maxWidth: 1200,
                    mx: 'auto',
                    mb: 4,
                    textAlign: 'center'
                }}>
                    <Avatar sx={{
                        bgcolor: '#1a237e',
                        width: 70,
                        height: 70,
                        mx: 'auto',
                        mb: 2
                    }}>
                        <School sx={{ fontSize: 40 }} />
                    </Avatar>
                    <Typography variant="h4" sx={{
                        fontWeight: 700,
                        color: '#1a237e',
                        mb: 1,
                        textTransform: 'uppercase'
                    }}>
                        Sahu Jain College
                    </Typography>
                    <Typography variant="h5" sx={{
                        fontWeight: 600,
                        color: theme.palette.primary.dark,
                        mb: 2
                    }}>
                        Student Registration Form
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary" sx={{ fontStyle: 'italic' }}>
                        NH-74, Kotwali Road, Najibabad, Bijnor, Uttar Pradesh • sahujaincollege17@gmail.com
                    </Typography>
                </Box>

                {/* Stepper + Form */}
                <Paper elevation={4} sx={{
                    borderRadius: 2,
                    overflow: 'hidden',
                    borderTop: '4px solid #1a237e'
                }}>
                    {/* Top Banner */}
                    <Box sx={{
                        bgcolor: '#1a237e',
                        p: 2,
                        color: 'white',
                        textAlign: 'center'
                    }}>
                        <Typography variant="h6" sx={{ fontWeight: 600 }}>
                            Academic Year 2025-2026
                        </Typography>
                    </Box>

                    {/* Stepper */}
                    <Stepper activeStep={activeStep} alternativeLabel sx={{
                        p: 3,
                        bgcolor: '#f8f9fa',
                        borderBottom: '1px solid #e0e0e0'
                    }}>
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel sx={{
                                    '& .MuiStepLabel-label': {
                                        fontWeight: 600,
                                        color: theme.palette.text.primary
                                    }
                                }}>
                                    {label}
                                </StepLabel>
                            </Step>
                        ))}
                    </Stepper>

                    {/* Step Content */}
                    <Box sx={{ p: isMobile ? 2 : 4 }}>
                        {activeStep === 0 && <PersonalDetails />}
                        {activeStep === 1 && <AcademicInformation />}
                        {activeStep === 2 && <SelectSubject />}
                        {activeStep === 3 && <PaymentSubmission />}

                        {/* Navigation Buttons */}
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
                            <Button
                                disabled={activeStep === 0}
                                onClick={handleBack}
                                variant="outlined"
                                sx={{
                                    borderColor: '#1a237e',
                                    color: '#1a237e',
                                    fontWeight: 600
                                }}
                            >
                                Back
                            </Button>
                            {activeStep < steps.length - 1 ? (
                                <Button
                                    variant="contained"
                                    onClick={handleNext}
                                    sx={{
                                        bgcolor: '#1a237e',
                                        '&:hover': { bgcolor: '#303f9f' },
                                        fontWeight: 600
                                    }}
                                >
                                    Next
                                </Button>
                            ) : (
                                <Button
                                    variant="contained"
                                    color="success"
                                    sx={{ fontWeight: 600 }}
                                >
                                    Submit
                                </Button>
                            )}
                        </Box>
                    </Box>
                </Paper>
            </Box>

            {/* Footer */}
            <Box sx={{ textAlign: 'center', mt: 4 }}>
                <Divider sx={{ mb: 2, mx: 'auto', width: '60%' }} />
                <Typography variant="caption" color="textSecondary">
                    © {new Date().getFullYear()} Sahu Jain College. All Rights Reserved.
                </Typography>
                <Typography variant="caption" color="textSecondary" display="block">
                    Crafted by <Box component="span" sx={{ fontWeight: 600, color: theme.palette.grey[700] }}>Shubham Bhaskar</Box>
                </Typography>
            </Box>
        </>
    );
};

export default Registration;
