// src/theme.js
import { createTheme } from '@mui/material/styles';

const getDesignTokens = (mode) => ({
    palette: {
        mode,
        ...(mode === 'light'
            ? {
                // Light mode colors
                primary: { main: '#0D47A1' },
                secondary: { main: '#1976D2' },
                success: { main: '#388E3C' },
                warning: { main: '#FBC02D' },
                info: { main: '#0288D1' },
                background: { default: '#FAFAFA', paper: '#fff' },
                text: {
                    primary: '#212121',
                    secondary: '#616161',
                },
            }
            : {
                // Dark mode colors
                primary: { main: '#90CAF9' },
                secondary: { main: '#64B5F6' },
                success: { main: '#81C784' },
                warning: { main: '#FFD54F' },
                info: { main: '#4FC3F7' },
                background: { default: '#121212', paper: '#1E1E1E' },
                text: {
                    primary: '#FFFFFF',
                    secondary: '#B0BEC5',
                },
            }),
    },
    typography: {
        fontFamily: "'Poppins', sans-serif",
        h1: { fontSize: '3rem', fontWeight: 700, lineHeight: 1.3, marginBottom: '1rem' },
        h2: { fontSize: '2.5rem', fontWeight: 600, lineHeight: 1.35, marginBottom: '0.9rem' },
        h3: { fontSize: '2rem', fontWeight: 600, lineHeight: 1.4, marginBottom: '0.8rem' },
        h4: { fontSize: '1.6rem', fontWeight: 500, lineHeight: 1.5, marginBottom: '0.7rem' },
        h5: { fontSize: '1.3rem', fontWeight: 500, lineHeight: 1.6, marginBottom: '0.6rem' },
        h6: { fontSize: '1.1rem', fontWeight: 500, lineHeight: 1.7, marginBottom: '0.5rem' },
        body1: { fontSize: '1rem', fontWeight: 400, lineHeight: 1.6, marginBottom: '1rem' },
        body2: { fontSize: '0.9rem', fontWeight: 400, lineHeight: 1.5, marginBottom: '0.8rem' },
    },
    spacing: 8,
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: "none",
                    borderRadius: 8,
                    padding: '8px 16px',
                    fontWeight: 500,
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                elevation1: {
                    borderRadius: 12,
                    padding: '16px',
                    boxShadow: '0px 4px 20px rgba(0,0,0,0.06)',
                },
            },
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundColor: mode === 'light' ? '#fff' : '#1E1E1E',
                    color: mode === 'light' ? '#000' : '#fff',
                    boxShadow: '0 2px 10px rgba(0,0,0,0.04)',
                },
            },
        },
        MuiToolbar: {
            styleOverrides: {
                root: {
                    minHeight: 64,
                },
            },
        },
    },
});

// Function to create the theme based on mode
const theme = (mode = 'light') => createTheme(getDesignTokens(mode));

export default theme;
