import React from "react";
import { Box, Typography, Grid, Paper } from "@mui/material";

const financeData = [
    { label: "Total Revenue", value: "₹12,50,000" },
    { label: "Expenses", value: "₹4,50,000" },
    { label: "Profit", value: "₹8,00,000" },
];

const FinancialOverview = () => (
    <Box>
        <Typography variant="h4" gutterBottom>
            Financial Overview
        </Typography>
        <Grid container spacing={3}>
            {financeData.map((data, i) => (
                <Grid size={{ xs: 12, md: 4 }} key={i}>
                    <Paper elevation={1} sx={{ p: 3 }}>
                        <Typography variant="h6" color="primary">
                            {data.label}
                        </Typography>
                        <Typography variant="h5">{data.value}</Typography>
                    </Paper>
                </Grid>
            ))}
        </Grid>
    </Box>
);

export default FinancialOverview;
