import React from "react";
import {
    Typography,
    Box,
    Paper,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    TextField,
    Button,
    Stack,
} from "@mui/material";

const dummyCustomers = [
    { name: "Amit Shah", email: "amit@gmail.com", contact: "9876543210" },
    { name: "Neha Verma", email: "neha@outlook.com", contact: "8888888888" },
];

const CustomerManagement = () => {
    return (
        <Box>
            <Typography variant="h4" gutterBottom>
                Customer Management
            </Typography>

            <Paper elevation={1} sx={{ p: 2, mb: 3 }}>
                <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                    <TextField label="Search by Name" fullWidth />
                    <TextField label="Search by Email" fullWidth />
                    <Button variant="contained" color="primary">Search</Button>
                </Stack>
            </Paper>

            <Paper elevation={1}>
                <Table>
                    <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Contact</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {dummyCustomers.map((cust, index) => (
                            <TableRow key={index}>
                                <TableCell>{cust.name}</TableCell>
                                <TableCell>{cust.email}</TableCell>
                                <TableCell>{cust.contact}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>
        </Box>
    );
};

export default CustomerManagement;
