import React from 'react';
import {
    Box,
    Typography,
    Button,
    Card,
    CardContent,
    Avatar,
    Divider
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CelebrationIcon from '@mui/icons-material/Celebration';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import FingerprintIcon from '@mui/icons-material/Fingerprint';
import CakeIcon from '@mui/icons-material/Cake';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ThankYouPage = () => {
    const navigate = useNavigate();

    // Grab user info from Redux
    const user = useSelector((state) => state?.user?.user || {});
    const personal = useSelector((state) => state?.user?.personalInfo || {});

    const fullName = `${personal.firstName || ''} ${personal.middleName || ''} ${personal.lastName || ''}`.trim();
    const email = user.email || personal.email;
    const applicationId = user.applicationId || personal.applicationId;
    const dob = new Date(personal.dob).toLocaleDateString('en-IN');

    const onGoHome = () => navigate('/');

    return (
        <Box
            sx={{
                minHeight: '100vh',
                background: 'linear-gradient(to right, #e0f7fa, #fff3e0)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                px: 2,
            }}
        >
            <Card
                sx={{
                    maxWidth: 700,
                    width: '100%',
                    borderRadius: 4,
                    px: 4,
                    py: 6,
                    boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                    background: 'rgba(255,255,255,0.9)',
                    backdropFilter: 'blur(12px)',
                    textAlign: 'center'
                }}
            >
                <CelebrationIcon sx={{ fontSize: 42, color: '#ff9800' }} />
                <CheckCircleIcon sx={{ fontSize: 90, color: 'success.main', mt: 1 }} />
                <EmojiEmotionsIcon sx={{ fontSize: 42, color: '#fdd835', mb: 3 }} />

                <Typography variant="h4" fontWeight={700} color="primary" gutterBottom>
                    Thank You, {personal.firstName || 'Applicant'}!
                </Typography>

                <Typography variant="body1" sx={{ mb: 3, color: '#555' }}>
                    Your application has been <strong>successfully submitted</strong> to <strong>Sahu Jain College</strong>.
                </Typography>

                <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
                    We appreciate your time and effort. You will receive further communication via email.
                </Typography>

                <CardContent
                    sx={{
                        bgcolor: '#f1f8ff',
                        borderRadius: 3,
                        textAlign: 'left',
                        px: 4,
                        py: 3,
                        mb: 4,
                        border: '1px solid #90caf9',
                    }}
                >
                    <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 1, color: '#1a237e' }}>
                        Application Summary
                    </Typography>
                    <Divider sx={{ mb: 2 }} />

                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <PersonIcon sx={{ color: '#1976d2', mr: 1 }} />
                        <Typography sx={{ marginBottom: '0px' }}>{fullName || '-'}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <EmailIcon sx={{ color: '#1976d2', mr: 1 }} />
                        <Typography sx={{ marginBottom: '0px' }}>{email || '-'}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <FingerprintIcon sx={{ color: '#1976d2', mr: 1 }} />
                        <Typography sx={{ marginBottom: '0px' }}>Application ID: <strong>{applicationId || '-'}</strong></Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <CakeIcon sx={{ color: '#1976d2', mr: 1 }} />
                        <Typography sx={{ marginBottom: '0px' }}>DOB: {dob || '-'}</Typography>
                    </Box>
                </CardContent>

                <Button
                    variant="contained"
                    sx={{
                        bgcolor: '#1a237e',
                        color: '#fff',
                        fontWeight: 600,
                        px: 5,
                        py: 1.5,
                        borderRadius: 3,
                        '&:hover': {
                            bgcolor: '#303f9f',
                        },
                    }}
                    onClick={onGoHome}
                >
                    Go to Home
                </Button>
            </Card>
        </Box>
    );
};

export default ThankYouPage;
