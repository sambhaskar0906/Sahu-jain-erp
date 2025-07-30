import React, { useState } from 'react';
import {
    Box,
    Button,
    TextField,
    Typography,
    Paper,
    Link,
    Avatar,
    Divider,
    Grid,
    InputAdornment,
    IconButton
} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import SchoolIcon from '@mui/icons-material/School';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { loginCandidate } from '../../../features/user/userSlice';

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const formik = useFormik({
        initialValues: {
            applicationId: '',
            password: '',
        },
        validationSchema: Yup.object({
            applicationId: Yup.string().required('Application number is required'),
            password: Yup.string().required('Password is required'),
        }),
        onSubmit: async (values) => {
    const result = await dispatch(
      loginCandidate({
        applicationId: values.applicationId,
        password: values.password,
      })
    );

    if (loginCandidate.fulfilled.match(result)) {
      alert("Login successful!");
      navigate("/registration"); 
    } else {
      alert(result.payload || "Invalid credentials");
    }
  },
});

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
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
                    maxWidth: 450,
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
                        STUDENT LOGIN PORTAL
                    </Typography>
                </Box>

                <form onSubmit={formik.handleSubmit}>
                    <Grid container spacing={2}>
                        {/* Application Number */}
                        <Grid size={{ xs: 12 }}>
                            <TextField
                                fullWidth
                                label="Application Number"
                                name="applicationId"
                                variant="outlined"
                                value={formik.values.applicationId}
                                onChange={formik.handleChange}
                                error={formik.touched.applicationId && Boolean(formik.errors.applicationId)}
                                helperText={formik.touched.applicationId && formik.errors.applicationId}
                                InputProps={{
                                    style: { borderRadius: 8 }
                                }}
                            />
                        </Grid>

                        {/* Password */}
                        <Grid size={{ xs: 12 }}>
                            <TextField
                                fullWidth
                                label="Password"
                                name="password"
                                type={showPassword ? 'text' : 'password'}
                                variant="outlined"
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                error={formik.touched.password && Boolean(formik.errors.password)}
                                helperText={formik.touched.password && formik.errors.password}
                                InputProps={{
                                    style: { borderRadius: 8 },
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                                sx={{ color: 'text.secondary' }}
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }}
                            />
                        </Grid>

                        {/* Login Button */}
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
                                Sign In
                            </Button>
                        </Grid>

                        {/* Forgot Password */}
                        <Grid size={{ xs: 12 }}>
                            <Typography align="right">
                                <Link
                                    component="button"
                                    underline="hover"
                                    sx={{
                                        fontWeight: 'medium',
                                        color: 'text.secondary',
                                        '&:hover': {
                                            color: 'primary.main'
                                        }
                                    }}
                                >
                                    Forgot Password?
                                </Link>
                            </Typography>
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

                        {/* Register Link */}
                        <Grid size={{ xs: 12 }}>
                            <Typography align="center" variant="body2" sx={{ color: 'text.secondary' }}>
                                Don't have an account?{' '}
                                <Link
                                    component="button"
                                    onClick={() => navigate('/register')}
                                    underline="hover"
                                    sx={{
                                        fontWeight: 'bold',
                                        color: 'primary.main',
                                        '&:hover': {
                                            color: 'primary.dark'
                                        }
                                    }}
                                >
                                    Register here
                                </Link>
                            </Typography>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Box>
    );
};

export default Login;