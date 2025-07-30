import React from "react";
import {
    Typography,
    Box,
    TextField,
    Stack,
    Button,
    Paper,
} from "@mui/material";

const Settings = () => {
    return (
        <Box>
            <Typography variant="h4" gutterBottom>
                Admin Settings
            </Typography>
            <Paper elevation={1} sx={{ p: 3, maxWidth: 600 }}>
                <Stack spacing={3}>
                    <TextField label="Full Name" defaultValue="Admin User" />
                    <TextField label="Email" defaultValue="admin@example.com" />
                    <TextField label="Password" type="password" />
                    <Button variant="contained">Update Settings</Button>
                </Stack>
            </Paper>
        </Box>
    );
};

export default Settings;
