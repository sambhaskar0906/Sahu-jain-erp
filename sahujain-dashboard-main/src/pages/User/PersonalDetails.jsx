import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
    Grid,
    TextField,
    MenuItem,
    Divider,
    Stack,
    Typography,
    Box,
    Button,
    Checkbox,
    FormHelperText,
    FormControlLabel
} from '@mui/material';
import { Person, Email, Phone, CalendarToday, Fingerprint, HowToVote } from '@mui/icons-material';
import CategoryIcon from '@mui/icons-material/Category';
import FamilyRestroomIcon from '@mui/icons-material/FamilyRestroom';
import HomeIcon from '@mui/icons-material/Home';
import { useDispatch } from 'react-redux';
import { submitPersonalInfo } from "../../features/personalInfo/personalInfoSlice"
const genders = ['Male', 'Female', 'Other'];
const castes = ['General', 'OBC', 'SC', 'ST'];
const categories = ['None', 'PWD', 'EWS', 'Ex-Serviceman'];
const nationalities = ['Indian', 'Other'];
const religions = ['Hindu', 'Muslim', 'Christian', 'Sikh', 'Other'];
const weightageOptions = ['Yes', 'No'];

const validationSchema = Yup.object().shape({
    firstName: Yup.string().required('First Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    mobileNumber: Yup.string()
        .matches(/^[0-9]{10}$/, 'Mobile number must be 10 digits')
        .required('Mobile number is required'),
    whatsappNumber: Yup.string()
        .matches(/^[0-9]{10}$/, 'WhatsApp number must be 10 digits')
        .required('WhatsApp number is required'),
    dob: Yup.date().required('Date of Birth is required'),
    gender: Yup.string().required('Gender is required'),
    nationality: Yup.string().required('Nationality is required'),
    caste: Yup.string().required('Caste is required'),
    permanentAddress: Yup.object().shape({
        address: Yup.string().required('Permanent Address is required'),
        city: Yup.string().required('City is required'),
        state: Yup.string().required('State is required'),
        pin: Yup.string()
            .matches(/^[0-9]{6}$/, 'Pin code must be 6 digits')
            .required('Pin code is required')
    }),
    temporaryAddress: Yup.object().shape({
        address: Yup.string().when('sameAsPermanent', {
            is: false,
            then: Yup.string().required('Temporary Address is required')
        }),
        city: Yup.string().when('sameAsPermanent', {
            is: false,
            then: Yup.string().required('City is required')
        }),
        state: Yup.string().when('sameAsPermanent', {
            is: false,
            then: Yup.string().required('State is required')
        }),
        pin: Yup.string().when('sameAsPermanent', {
            is: false,
            then: Yup.string()
                .matches(/^[0-9]{6}$/, 'Pin code must be 6 digits')
                .required('Pin code is required')
        })
    }),
    fathersName: Yup.string().required("Father's Name is required"),
    mothersName: Yup.string().required("Mother's Name is required"),
    aadharNumber: Yup.string()
        .matches(/^[0-9]{12}$/, 'Aadhar number must be 12 digits')
        .required('Aadhar number is required'),
    candidatePhoto: Yup.mixed()
        .required('Photo is required')
        .test('fileSize', 'Max 50KB', (value) => !value || value.size <= 50 * 1024)
        .test('fileType', 'Only JPG/JPEG allowed', (value) =>
            !value || ['image/jpeg', 'image/jpg'].includes(value.type)
        ),
    candidateSignature: Yup.mixed()
        .required('Signature is required')
        .test('fileSize', 'Max 100KB', (value) => !value || value.size <= 100 * 1024)
        .test('fileType', 'Only PDF/JPG/JPEG allowed', (value) =>
            !value || ['application/pdf', 'image/jpeg', 'image/jpg'].includes(value.type)
        ),

});

const PersonalDetails = () => {
    const [otpSent, setOtpSent] = useState(false);
    const [sameAsPermanent, setSameAsPermanent] = useState(false);
    const dispatch = useDispatch();
    const formik = useFormik({
        initialValues: {
            firstName: '',
            middleName: '',
            lastName: '',
            email: '',
            mobileNumber: '',
            whatsappNumber: '',
            dob: '',
            gender: '',
            nationality: '',
            caste: '',
            specialCategory: '',
            religion: '',
            aadharNumber: '',
            voterId: '',
            weightageClaimed: '',
            permanentAddress: {
                address: '',
                city: '',
                state: '',
                pin: ''
            },
            temporaryAddress: {
                address: '',
                city: '',
                state: '',
                pin: ''
            },
            fathersName: '',
            mothersName: '',
            parentsMobile: '',
            candidatePhoto: null,
            candidateSignature: null,
        },
        validationSchema,
        onSubmit: (values) => {

            dispatch(submitPersonalInfo(values));

        }
    });

    const handleSameAsPermanent = (checked) => {
        setSameAsPermanent(checked);
        if (checked) {
            formik.setFieldValue('temporaryAddress', { ...formik.values.permanentAddress });
        } else {
            formik.setFieldValue('temporaryAddress', {
                address: '',
                city: '',
                state: '',
                pin: ''
            });
        }
    };

    return (
        <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={3}>
                {/* Personal Information Section */}
                <Grid size={{ xs: 12 }}>
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
                        <Person sx={{ color: '#1a237e' }} />
                        <Typography
                            variant="h6"
                            sx={{
                                fontWeight: 700,
                                color: '#1a237e',
                                textTransform: 'uppercase',
                                letterSpacing: 0.5,
                            }}
                        >
                            Personal Information
                        </Typography>
                    </Stack>
                    <Divider sx={{ mb: 3 }} />
                </Grid>

                <Grid size={{ xs: 12, sm: 4 }}>
                    <TextField
                        fullWidth
                        name="firstName"
                        label="First Name *"
                        variant="outlined"
                        size="small"
                        value={formik.values.firstName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                        helperText={formik.touched.firstName && formik.errors.firstName}
                    />
                </Grid>
                <Grid size={{ xs: 12, sm: 4 }}>
                    <TextField
                        fullWidth
                        name="middleName"
                        label="Middle Name"
                        variant="outlined"
                        size="small"
                        value={formik.values.middleName}
                        onChange={formik.handleChange}
                    />
                </Grid>
                <Grid size={{ xs: 12, sm: 4 }}>
                    <TextField
                        fullWidth
                        name="lastName"
                        label="Last Name *"
                        variant="outlined"
                        size="small"
                        value={formik.values.lastName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                        helperText={formik.touched.lastName && formik.errors.lastName}
                    />
                </Grid>

                <Grid size={{ xs: 12, sm: 6 }} mb={1}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <TextField
                            fullWidth
                            name="email"
                            label="Email *"
                            type="email"
                            variant="outlined"
                            size="small"
                            InputProps={{
                                startAdornment: (
                                    <Email color="action" sx={{ mr: 1 }} />
                                )
                            }}
                            sx={{ height: 40 }}
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.email && Boolean(formik.errors.email)}
                            helperText={formik.touched.email && formik.errors.email}
                        />
                        <Button
                            variant="contained"
                            size="small"
                            onClick={() => setOtpSent(true)}
                            sx={{
                                height: 40,
                                px: 2,
                                minWidth: 100,
                                whiteSpace: 'nowrap',
                                fontWeight: 600,
                                bgcolor: 'primary.main',
                                '&:hover': {
                                    bgcolor: 'primary.dark',
                                },
                                display: 'flex',
                                alignItems: 'center',
                            }}
                        >
                            Send OTP
                        </Button>
                    </Box>
                </Grid>

                <Grid size={{ xs: 12, sm: 6 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <TextField
                            fullWidth
                            label="Enter OTP"
                            type="number"
                            variant="outlined"
                            size="small"
                            sx={{ height: 40 }}
                        />
                        <Button
                            variant="outlined"
                            size="small"
                            sx={{
                                height: 40,
                                px: 2,
                                minWidth: 100,
                                fontWeight: 600,
                                borderColor: '#1a237e',
                                color: '#1a237e',
                                display: 'flex',
                                alignItems: 'center',
                                '&:hover': {
                                    bgcolor: '#e8eaf6',
                                }
                            }}
                        >
                            Verify
                        </Button>
                    </Box>
                    {otpSent && (
                        <Typography variant="caption" sx={{ color: 'green', mt: 0.5 }}>
                            OTP has been sent to your email.
                        </Typography>
                    )}
                </Grid>

                <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                        fullWidth
                        name="mobileNumber"
                        label="Mobile Number *"
                        type="number"
                        variant="outlined"
                        size="small"
                        InputProps={{
                            startAdornment: (
                                <Phone color="action" sx={{ mr: 1 }} />
                            )
                        }}
                        value={formik.values.mobileNumber}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.mobileNumber && Boolean(formik.errors.mobileNumber)}
                        helperText={formik.touched.mobileNumber && formik.errors.mobileNumber}
                    />
                </Grid>

                <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                        fullWidth
                        name="whatsappNumber"
                        label="WhatsApp Mobile Number *"
                        type="number"
                        variant="outlined"
                        size="small"
                        InputProps={{
                            startAdornment: (
                                <Phone color="action" sx={{ mr: 1 }} />
                            )
                        }}
                        value={formik.values.whatsappNumber}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.whatsappNumber && Boolean(formik.errors.whatsappNumber)}
                        helperText={formik.touched.whatsappNumber && formik.errors.whatsappNumber}
                    />
                </Grid>

                {/* Additional Personal Details */}
                <Grid size={{ xs: 12, sm: 4 }}>
                    <TextField
                        fullWidth
                        name="dob"
                        label="Date of Birth *"
                        type="date"
                        InputLabelProps={{ shrink: true }}
                        variant="outlined"
                        size="small"
                        InputProps={{
                            startAdornment: (
                                <CalendarToday color="action" sx={{ mr: 1 }} />
                            )
                        }}
                        value={formik.values.dob}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.dob && Boolean(formik.errors.dob)}
                        helperText={formik.touched.dob && formik.errors.dob}
                    />
                </Grid>
                <Grid size={{ xs: 12, sm: 4 }}>
                    <TextField
                        select
                        fullWidth
                        name="gender"
                        label="Gender *"
                        variant="outlined"
                        size="small"
                        value={formik.values.gender}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.gender && Boolean(formik.errors.gender)}
                        helperText={formik.touched.gender && formik.errors.gender}
                    >
                        {genders.map((option) => (
                            <MenuItem key={option} value={option}>{option}</MenuItem>
                        ))}
                    </TextField>
                </Grid>
                <Grid size={{ xs: 12, sm: 4 }}>
                    <TextField
                        select
                        fullWidth
                        name="nationality"
                        label="Nationality *"
                        variant="outlined"
                        size="small"
                        value={formik.values.nationality}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.nationality && Boolean(formik.errors.nationality)}
                        helperText={formik.touched.nationality && formik.errors.nationality}
                    >
                        {nationalities.map((option) => (
                            <MenuItem key={option} value={option}>{option}</MenuItem>
                        ))}
                    </TextField>
                </Grid>

                {/* Category Information */}
                <Grid size={{ xs: 12 }} mt={5}>
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
                        <CategoryIcon sx={{ color: '#1a237e' }} />
                        <Typography
                            variant="h6"
                            sx={{
                                fontWeight: 700,
                                color: '#1a237e',
                                textTransform: 'uppercase',
                                letterSpacing: 0.5,
                            }}
                        >
                            Category Information
                        </Typography>
                    </Stack>
                    <Divider sx={{ mb: 3 }} />
                </Grid>

                <Grid size={{ xs: 12, sm: 4 }}>
                    <TextField
                        select
                        fullWidth
                        name="caste"
                        label="Caste *"
                        variant="outlined"
                        size="small"
                        value={formik.values.caste}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.caste && Boolean(formik.errors.caste)}
                        helperText={formik.touched.caste && formik.errors.caste}
                    >
                        {castes.map((option) => (
                            <MenuItem key={option} value={option}>{option}</MenuItem>
                        ))}
                    </TextField>
                </Grid>
                <Grid size={{ xs: 12, sm: 4 }}>
                    <TextField
                        select
                        fullWidth
                        name="specialCategory"
                        label="Special Category"
                        variant="outlined"
                        size="small"
                        value={formik.values.specialCategory}
                        onChange={formik.handleChange}
                    >
                        {categories.map((option) => (
                            <MenuItem key={option} value={option}>{option}</MenuItem>
                        ))}
                    </TextField>
                </Grid>
                <Grid size={{ xs: 12, sm: 4 }}>
                    <TextField
                        select
                        fullWidth
                        name="religion"
                        label="Religion"
                        variant="outlined"
                        size="small"
                        value={formik.values.religion}
                        onChange={formik.handleChange}
                    >
                        {religions.map((option) => (
                            <MenuItem key={option} value={option}>{option}</MenuItem>
                        ))}
                    </TextField>
                </Grid>

                {/* Document Information */}
                <Grid size={{ xs: 12 }}>
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
                        <Fingerprint sx={{ mr: 1, color: '#1a237e' }} />
                        <Typography
                            variant="h6"
                            sx={{
                                fontWeight: 700,
                                color: '#1a237e',
                                textTransform: 'uppercase',
                                letterSpacing: 0.5,
                            }}
                        >
                            Documents Details
                        </Typography>
                    </Stack>
                    <Divider sx={{ mb: 3 }} />
                </Grid>

                <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                        fullWidth
                        name="aadharNumber"
                        label="Aadhar Card Number *"
                        variant="outlined"
                        size="small"
                        InputProps={{
                            startAdornment: (
                                <Fingerprint color="action" sx={{ mr: 1 }} />
                            )
                        }}
                        value={formik.values.aadharNumber}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.aadharNumber && Boolean(formik.errors.aadharNumber)}
                        helperText={formik.touched.aadharNumber && formik.errors.aadharNumber}
                    />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                        fullWidth
                        name="voterId"
                        label="Voter ID Number"
                        variant="outlined"
                        size="small"
                        InputProps={{
                            startAdornment: (
                                <HowToVote color="action" sx={{ mr: 1 }} />
                            )
                        }}
                        value={formik.values.voterId}
                        onChange={formik.handleChange}
                    />
                </Grid>

                <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                        select
                        fullWidth
                        name="weightageClaimed"
                        label="Weightage Claimed"
                        variant="outlined"
                        size="small"
                        value={formik.values.weightageClaimed}
                        onChange={formik.handleChange}
                    >
                        {weightageOptions.map((option) => (
                            <MenuItem key={option} value={option}>{option}</MenuItem>
                        ))}
                    </TextField>
                </Grid>

                {/* Address Section */}
                <Grid size={{ xs: 12 }} mt={5}>
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
                        <HomeIcon sx={{ color: '#1a237e' }} />
                        <Typography
                            variant="h6"
                            sx={{
                                fontWeight: 700,
                                color: '#1a237e',
                                textTransform: 'uppercase',
                                letterSpacing: 0.5,
                            }}
                        >
                            Address Information
                        </Typography>
                    </Stack>
                    <Divider sx={{ mb: 3 }} />
                </Grid>

                {/* Permanent Address */}
                <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                        fullWidth
                        name="permanentAddress.address"
                        label="Permanent Address *"
                        variant="outlined"
                        size="small"
                        multiline
                        rows={3}
                        value={formik.values.permanentAddress.address}
                        onChange={(e) =>
                            formik.setFieldValue('permanentAddress.address', e.target.value)
                        }
                        onBlur={formik.handleBlur}
                        error={formik.touched.permanentAddress?.address && Boolean(formik.errors.permanentAddress?.address)}
                        helperText={formik.touched.permanentAddress?.address && formik.errors.permanentAddress?.address}
                    />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                        fullWidth
                        name="permanentAddress.city"
                        label="City / Town *"
                        variant="outlined"
                        size="small"
                        value={formik.values.permanentAddress.city}
                        onChange={(e) =>
                            formik.setFieldValue('permanentAddress.city', e.target.value)
                        }
                        onBlur={formik.handleBlur}
                        error={formik.touched.permanentAddress?.city && Boolean(formik.errors.permanentAddress?.city)}
                        helperText={formik.touched.permanentAddress?.city && formik.errors.permanentAddress?.city}
                    />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                        fullWidth
                        name="permanentAddress.state"
                        label="State *"
                        variant="outlined"
                        size="small"
                        value={formik.values.permanentAddress.state}
                        onChange={(e) =>
                            formik.setFieldValue('permanentAddress.state', e.target.value)
                        }
                        onBlur={formik.handleBlur}
                        error={formik.touched.permanentAddress?.state && Boolean(formik.errors.permanentAddress?.state)}
                        helperText={formik.touched.permanentAddress?.state && formik.errors.permanentAddress?.state}
                    />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                        fullWidth
                        name="permanentAddress.pin"
                        label="Pin Code *"
                        variant="outlined"
                        size="small"
                        type="number"
                        value={formik.values.permanentAddress.pin}
                        onChange={(e) =>
                            formik.setFieldValue('permanentAddress.pin', e.target.value)
                        }
                        onBlur={formik.handleBlur}
                        error={formik.touched.permanentAddress?.pin && Boolean(formik.errors.permanentAddress?.pin)}
                        helperText={formik.touched.permanentAddress?.pin && formik.errors.permanentAddress?.pin}
                    />
                </Grid>

                {/* Same as Permanent */}
                <Grid size={{ xs: 12 }}>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={sameAsPermanent}
                                onChange={(e) => handleSameAsPermanent(e.target.checked)}
                                color="primary"
                            />
                        }
                        label="Same as Permanent Address"
                    />
                </Grid>

                {/* Temporary Address */}
                {!sameAsPermanent && (
                    <>
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <TextField
                                fullWidth
                                name="temporaryAddress.address"
                                label="Temporary Address *"
                                variant="outlined"
                                size="small"
                                multiline
                                rows={3}
                                value={formik.values.temporaryAddress.address}
                                onChange={(e) =>
                                    formik.setFieldValue('temporaryAddress.address', e.target.value)
                                }
                                onBlur={formik.handleBlur}
                                error={formik.touched.temporaryAddress?.address && Boolean(formik.errors.temporaryAddress?.address)}
                                helperText={formik.touched.temporaryAddress?.address && formik.errors.temporaryAddress?.address}
                            />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <TextField
                                fullWidth
                                name="temporaryAddress.city"
                                label="City / Town *"
                                variant="outlined"
                                size="small"
                                value={formik.values.temporaryAddress.city}
                                onChange={(e) =>
                                    formik.setFieldValue('temporaryAddress.city', e.target.value)
                                }
                                onBlur={formik.handleBlur}
                                error={formik.touched.temporaryAddress?.city && Boolean(formik.errors.temporaryAddress?.city)}
                                helperText={formik.touched.temporaryAddress?.city && formik.errors.temporaryAddress?.city}
                            />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <TextField
                                fullWidth
                                name="temporaryAddress.state"
                                label="State *"
                                variant="outlined"
                                size="small"
                                value={formik.values.temporaryAddress.state}
                                onChange={(e) =>
                                    formik.setFieldValue('temporaryAddress.state', e.target.value)
                                }
                                onBlur={formik.handleBlur}
                                error={formik.touched.temporaryAddress?.state && Boolean(formik.errors.temporaryAddress?.state)}
                                helperText={formik.touched.temporaryAddress?.state && formik.errors.temporaryAddress?.state}
                            />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <TextField
                                fullWidth
                                name="temporaryAddress.pin"
                                label="Pin Code *"
                                variant="outlined"
                                size="small"
                                type="number"
                                value={formik.values.temporaryAddress.pin}
                                onChange={(e) =>
                                    formik.setFieldValue('temporaryAddress.pin', e.target.value)
                                }
                                onBlur={formik.handleBlur}
                                error={formik.touched.temporaryAddress?.pin && Boolean(formik.errors.temporaryAddress?.pin)}
                                helperText={formik.touched.temporaryAddress?.pin && formik.errors.temporaryAddress?.pin}
                            />
                        </Grid>
                    </>
                )}

                {/* Parent Details */}
                <Grid size={{ xs: 12 }} mt={5}>
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
                        <FamilyRestroomIcon sx={{ color: '#1a237e' }} />
                        <Typography
                            variant="h6"
                            sx={{
                                fontWeight: 700,
                                color: '#1a237e',
                                textTransform: 'uppercase',
                                letterSpacing: 0.5,
                            }}
                        >
                            Parent Details
                        </Typography>
                    </Stack>
                    <Divider sx={{ mb: 3 }} />
                </Grid>

                <Grid size={{ xs: 12, sm: 4 }}>
                    <TextField
                        fullWidth
                        name="fathersName"
                        label="Father's Name *"
                        variant="outlined"
                        size="small"
                        value={formik.values.fathersName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.fathersName && Boolean(formik.errors.fathersName)}
                        helperText={formik.touched.fathersName && formik.errors.fathersName}
                    />
                </Grid>
                <Grid size={{ xs: 12, sm: 4 }}>
                    <TextField
                        fullWidth
                        name="mothersName"
                        label="Mother's Name *"
                        variant="outlined"
                        size="small"
                        value={formik.values.mothersName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.mothersName && Boolean(formik.errors.mothersName)}
                        helperText={formik.touched.mothersName && formik.errors.mothersName}
                    />
                </Grid>
                <Grid size={{ xs: 12, sm: 4 }}>
                    <TextField
                        fullWidth
                        name="parentsMobile"
                        label="Parent's Mobile Number"
                        variant="outlined"
                        size="small"
                        type="number"
                        value={formik.values.parentsMobile}
                        onChange={formik.handleChange}
                    />
                </Grid>

                {/* Candidate Photo */}
                <Grid size={{ xs: 12, sm: 6 }}>
                    <Typography variant="subtitle1" fontWeight={600}>
                        Candidate Photo (JPG/JPEG - Max 50KB)
                    </Typography>
                    <Button variant="contained" component="label" sx={{ mt: 1 }}>
                        Upload Photo
                        <input
                            hidden
                            type="file"
                            accept=".jpg,.jpeg"
                            name="candidatePhoto"
                            onChange={(e) => {
                                const file = e.currentTarget.files[0];
                                formik.setFieldValue('candidatePhoto', file);
                            }}
                        />
                    </Button>
                    {formik.errors.candidatePhoto && (
                        <FormHelperText error>{formik.errors.candidatePhoto}</FormHelperText>
                    )}
                    {formik.values.candidatePhoto && (
                        <Typography variant="body2" mt={1}>
                            {formik.values.candidatePhoto.name}
                        </Typography>
                    )}
                </Grid>

                {/* Candidate Signature */}
                <Grid size={{ xs: 12, sm: 6 }}>
                    <Typography variant="subtitle1" fontWeight={600}>
                        Candidate Signature (PDF/JPG/JPEG - Max 100KB)
                    </Typography>
                    <Button variant="contained" component="label" sx={{ mt: 1 }}>
                        Upload Signature
                        <input
                            hidden
                            type="file"
                            accept=".pdf,.jpg,.jpeg"
                            name="candidateSignature"
                            onChange={(e) => {
                                const file = e.currentTarget.files[0];
                                formik.setFieldValue('candidateSignature', file);
                            }}
                        />
                    </Button>
                    {formik.errors.candidateSignature && (
                        <FormHelperText error>{formik.errors.candidateSignature}</FormHelperText>
                    )}
                    {formik.values.candidateSignature && (
                        <Typography variant="body2" mt={1}>
                            {formik.values.candidateSignature.name}
                        </Typography>
                    )}
                </Grid>


                {/* Submit Button */}
                <Grid size={{ xs: 12 }} sx={{ mt: 2 }}>
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        gap: 2
                    }}>
                        <Button
                            variant="outlined"
                            size="large"
                            sx={{
                                px: 4,
                                fontWeight: 600,
                                borderColor: '#1a237e',
                                color: '#1a237e'
                            }}
                            onClick={() => formik.resetForm()}
                        >
                            Reset
                        </Button>
                        <Button
                            type="submit"
                            variant="contained"
                            size="large"
                            sx={{
                                px: 4,
                                fontWeight: 600,
                                bgcolor: '#1a237e',
                                '&:hover': {
                                    bgcolor: '#303f9f'
                                }
                            }}
                        >
                            Save & Continue
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </form>
    );
};

export default PersonalDetails;