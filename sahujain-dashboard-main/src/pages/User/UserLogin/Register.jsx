import React, { useState } from 'react';
import {
    Box,
    Button,
    TextField,
    Typography,
    Paper,
    Grid,
    Link,
    Divider,
    Avatar
} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import SchoolIcon from '@mui/icons-material/School';
import { useNavigate } from 'react-router-dom';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { IconButton, InputAdornment } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import {registerCandidate,sendVerificationCode} from "../../../features/user/userSlice"

const Register = () => {
    const [otpSent, setOtpSent] = useState(false);
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const dispatch = useDispatch();
   const formik = useFormik({
  initialValues: {
    email: '',
    otp: '',
    dob: null,
    password: '',
  },
  validationSchema: Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    otp: otpSent
      ? Yup.string()
          .required('OTP is required')
          .length(6, 'OTP must be 6 digits')
      : Yup.string(),
    dob: Yup.date()
      .required('Date of Birth is required')
      .max(new Date(), 'Date cannot be in future'),
    password: Yup.string()
      .min(8, 'Minimum 8 characters')
      .matches(/[A-Z]/, 'At least one uppercase letter')
      .matches(/[a-z]/, 'At least one lowercase letter')
      .matches(/[0-9]/, 'At least one number')
      .matches(/[@$!%*?&]/, 'At least one special character')
      .required('Password is required'),
  }),
  onSubmit: async (values) => {
    console.log('✅ Formik onSubmit triggered with:', values);
    const payload = {
      email: values.email,
      password: values.password,
      dob: values.dob,
      verificationCode: values.otp,
    };

    const result = await dispatch(registerCandidate(payload));

    if (registerCandidate.fulfilled.match(result)) {
      alert('Registration Successful');
      navigate('/');
    } else {
      alert(result.payload || 'Something went wrong');
    }
  },
});


    const handleSendOtp = async () => {
  if (formik.values.email && !formik.errors.email) {
    const result = await dispatch(sendVerificationCode(formik.values.email));

    if (sendVerificationCode.fulfilled.match(result)) {
      setOtpSent(true);
      alert('✅ OTP sent to ' + formik.values.email);
    } else {
      alert(result.payload || '❌ Failed to send OTP');
    }
  }
};



    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="100vh"
            sx={{
                background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
                px: 2,
            }}
        >
            <Paper
                elevation={10}
                sx={{
                    width: '100%',
                    maxWidth: 750,
                    p: 4,
                    borderRadius: 4,
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    background: 'rgba(255, 255, 255, 0.9)',
                    backdropFilter: 'blur(10px)',
                }}
            >
                {/* College Header */}
                <Box textAlign="center" mb={4}>
                    <Avatar
                        sx={{
                            bgcolor: 'primary.main',
                            mx: 'auto',
                            mb: 2,
                            width: 60,
                            height: 60,
                            boxShadow: '0 4px 12px rgba(25, 118, 210, 0.3)'
                        }}
                    >
                        <SchoolIcon fontSize="large" />
                    </Avatar>
                    <Typography variant="h4" color="primary" fontWeight="bold" gutterBottom>
                        Sahu Jain College
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary" sx={{ letterSpacing: 1 }}>
                        STUDENT REGISTRATION PORTAL
                    </Typography>
                </Box>

                <form onSubmit={formik.handleSubmit} noValidate>
                    <Grid container spacing={3} alignItems="center">
                        {/* Email & OTP Button */}
                        <Grid size={{ xs: 9 }}>
                            <TextField
                                fullWidth
                                label="Email Address"
                                name="email"
                                variant="outlined"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                error={formik.touched.email && Boolean(formik.errors.email)}
                                helperText={formik.touched.email && formik.errors.email}
                                InputProps={{
                                    style: { borderRadius: 8 }
                                }}
                            />
                        </Grid>
                        <Grid size={{ xs: 3 }}>
                            <Button
                                variant="contained"
                                onClick={handleSendOtp}
                                disabled={!formik.values.email || Boolean(formik.errors.email)}
                                fullWidth
                                sx={{
                                    height: '56px',
                                    borderRadius: 8,
                                    textTransform: 'none',
                                    fontWeight: 'bold',
                                    boxShadow: 'none',
                                    mb: 1.5,
                                    '&:hover': {
                                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
                                    }
                                }}
                            >
                                Send OTP
                            </Button>
                        </Grid>

                        {/* OTP Input */}
                        {otpSent && (
                            <Grid size={{ xs: 12 }}>
                                <TextField
                                    fullWidth
                                    label="Enter 6-digit OTP"
                                    name="otp"
                                    variant="outlined"
                                    value={formik.values.otp}
                                    onChange={formik.handleChange}
                                    error={formik.touched.otp && Boolean(formik.errors.otp)}
                                    helperText={formik.touched.otp && formik.errors.otp}
                                    InputProps={{
                                        style: { borderRadius: 8 }
                                    }}
                                />
                            </Grid>
                        )}

                        {/* Date of Birth */}
                        <Grid size={{ xs: 12 }}>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DatePicker
                                    label="Date of Birth"
                                    inputFormat="dd-MM-yyyy"
                                    value={formik.values.dob}
                                    onChange={(date) => formik.setFieldValue('dob', date)}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            fullWidth
                                            variant="outlined"
                                            error={formik.touched.dob && Boolean(formik.errors.dob)}
                                            helperText={formik.touched.dob && formik.errors.dob}
                                            InputProps={{
                                                ...params.InputProps,
                                                sx: {
                                                    borderRadius: 2,
                                                },
                                            }}
                                            sx={{ width: '100%' }}
                                        />
                                    )}
                                />
                            </LocalizationProvider>
                        </Grid>


                        {/* Password */}
                        <Grid size={{ xs: 12 }}>
                            <TextField
                                fullWidth
                                label="Create Password"
                                name="password"
                                type={showPassword ? 'text' : 'password'}
                                variant="outlined"
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                error={formik.touched.password && Boolean(formik.errors.password)}
                                helperText={formik.touched.password && formik.errors.password}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={() => setShowPassword((prev) => !prev)}
                                                edge="end"
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                    style: { borderRadius: 8 },
                                }}
                            />
                        </Grid>

                        {/* Submit Button */}
                        <Grid size={{ xs: 12 }} mt={2}>
                            <Button
                                fullWidth
                                variant="contained"
                                color="primary"
                                type="submit"
                                size="large"
                                sx={{
                                    height: 50,
                                    borderRadius: 8,
                                    fontSize: '1rem',
                                    fontWeight: 'bold',
                                    textTransform: 'none',
                                    boxShadow: '0 4px 12px rgba(25, 118, 210, 0.3)',
                                    '&:hover': {
                                        transform: 'translateY(-2px)',
                                        boxShadow: '0 6px 16px rgba(25, 118, 210, 0.4)',
                                    },
                                    transition: 'all 0.3s ease'
                                }}
                            >
                                Register Now
                            </Button>
                        </Grid>

                        {/* Divider */}
                        <Grid size={{ xs: 12 }}>
                            <Divider sx={{
                                my: 2,
                                '&::before, &::after': {
                                    borderColor: 'rgba(0, 0, 0, 0.1)',
                                }
                            }}>
                                <Typography variant="body2" color="text.secondary">
                                    OR
                                </Typography>
                            </Divider>
                        </Grid>

                        {/* Already have an account? */}
                        <Grid size={{ xs: 12 }}>
                            <Typography align="center" variant="body2" sx={{ color: 'text.secondary' }}>
                                Already have an account?{' '}
                                <Link
                                    component="button"
                                    onClick={() => navigate('/')}
                                    underline="hover"
                                    sx={{
                                        fontWeight: 'bold',
                                        color: 'primary.main',
                                        '&:hover': {
                                            color: 'primary.dark'
                                        }
                                    }}
                                >
                                    Login here
                                </Link>
                            </Typography>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Box>
    );
};

export default Register;