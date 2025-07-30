import React, { useState } from 'react';
import {
    Box,
    Typography,
    Divider,
    Button,
    Grid,
    TextField,
    Alert
} from '@mui/material';

const PaymentSubmission = () => {
    const [showSBIInput, setShowSBIInput] = useState(false);
    const [sbiRefNo, setSbiRefNo] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleConfirmPay = () => {
        alert('Payment Process Initiated!');
    };

    const handleSBICollectClick = () => {
        window.open('https://www.onlinesbi.sbi/sbicollect/icollecthome.htm', '_blank');
        setShowSBIInput(true);
        setSubmitted(false);
    };

    const handleSBISubmit = () => {
        if (sbiRefNo.trim() !== '') {
            setSubmitted(true);
            console.log('SBI Reference No:', sbiRefNo);
        }
    };

    return (
        <Box>
            {/* Payment Summary */}
            <Box
                sx={{
                    mb: 4,
                    p: 3,
                    borderRadius: 2,
                    background: 'linear-gradient(145deg, #e8eaf6, #ffffff)',
                    boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
                }}
            >
                <Typography variant="h6" fontWeight={600} color="primary" gutterBottom>
                    Payment Summary
                </Typography>
                <Divider sx={{ mb: 2 }} />
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography>Registration Fee</Typography>
                    <Typography>₹500</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography>Processing Charges</Typography>
                    <Typography>₹50</Typography>
                </Box>
                <Divider sx={{ my: 1 }} />
                <Box sx={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700 }}>
                    <Typography>Total</Typography>
                    <Typography>₹550</Typography>
                </Box>
            </Box>

            {/* Payment Methods */}
            <Box sx={{ mb: 4 }}>
                <Typography variant="h6" fontWeight={600} gutterBottom>
                    Choose Payment Method
                </Typography>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={4}>
                        <Button fullWidth variant="outlined" sx={{ py: 1.5, fontWeight: 600 }}>
                            💳 Debit/Credit Card
                        </Button>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Button fullWidth variant="outlined" sx={{ py: 1.5, fontWeight: 600 }}>
                            🏦 Net Banking
                        </Button>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Button fullWidth variant="outlined" sx={{ py: 1.5, fontWeight: 600 }}>
                            📱 UPI / QR Code
                        </Button>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            sx={{ py: 1.5, fontWeight: 600 }}
                            onClick={handleSBICollectClick}
                        >
                            🏛️ Pay via SBI Collect
                        </Button>
                    </Grid>
                </Grid>
            </Box>

            {/* SBI Collect Reference Input */}
            {showSBIInput && (
                <Box
                    sx={{
                        mb: 3,
                        p: 2,
                        border: '1px dashed #90caf9',
                        borderRadius: 2,
                        backgroundColor: '#f1f8ff'
                    }}
                >
                    <Typography variant="subtitle1" gutterBottom>
                        Enter SBI Collect Reference Number
                    </Typography>
                    <TextField
                        fullWidth
                        label="SBI Reference Number"
                        variant="outlined"
                        value={sbiRefNo}
                        onChange={(e) => setSbiRefNo(e.target.value)}
                        sx={{ mb: 2 }}
                    />
                    <Button
                        variant="contained"
                        color="success"
                        onClick={handleSBISubmit}
                        sx={{ textTransform: 'none', fontWeight: 600 }}
                    >
                        Submit Reference Number
                    </Button>

                    {submitted && (
                        <Alert severity="success" sx={{ mt: 2 }}>
                            SBI Reference Number Submitted: <strong>{sbiRefNo}</strong>
                        </Alert>
                    )}
                </Box>
            )}

            {/* UPI Section */}
            <Box
                sx={{
                    mb: 3,
                    p: 2,
                    border: '1px dashed #9fa8da',
                    borderRadius: 2,
                    textAlign: 'center',
                    backgroundColor: '#f3f4ff'
                }}
            >
                <Typography variant="subtitle1" gutterBottom>
                    Scan this QR or enter UPI ID
                </Typography>
                <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/QR_code_example.svg/800px-QR_code_example.svg.png"
                    alt="UPI QR"
                    width={130}
                    height={130}
                    style={{ marginBottom: 12 }}
                />
                <Typography variant="caption" color="textSecondary" display="block">
                    OR
                </Typography>
                <Typography
                    variant="body2"
                    sx={{
                        mt: 1,
                        px: 2,
                        py: 1,
                        backgroundColor: '#fff',
                        border: '1px solid #c5cae9',
                        borderRadius: 1,
                        display: 'inline-block'
                    }}
                >
                    sahujaincollege@upi
                </Typography>
            </Box>

            {/* Confirm & Pay */}
            <Typography
                variant="caption"
                color="textSecondary"
                sx={{ display: 'block', mb: 2 }}
            >
                By clicking "Confirm & Pay", you agree to the terms and privacy policy of Sahu Jain College.
            </Typography>

            <Box textAlign="center">
                <Button
                    variant="contained"
                    color="success"
                    size="large"
                    onClick={handleConfirmPay}
                    sx={{
                        px: 5,
                        py: 1.5,
                        borderRadius: 3,
                        fontWeight: 600,
                        boxShadow: 2,
                        textTransform: 'none'
                    }}
                >
                    Confirm & Pay ₹550
                </Button>
            </Box>
        </Box>
    );
};

export default PaymentSubmission;
