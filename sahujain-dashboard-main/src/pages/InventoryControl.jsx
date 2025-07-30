import React from "react";
import {
    Box,
    Typography,
    Grid,
    Paper,
    Avatar,
    Stack,
} from "@mui/material";

const inventoryData = [
    { item: "Laptop", stock: 25 },
    { item: "Monitor", stock: 14 },
    { item: "Keyboard", stock: 40 },
];

const InventoryControl = () => {
    return (
        <Box>
            <Typography variant="h4" gutterBottom>
                Inventory Control
            </Typography>
            <Grid container spacing={3}>
                {inventoryData.map((inv, i) => (
                    <Grid size={{ xs: 12, md: 4 }} md={4} key={i}>
                        <Paper elevation={1} sx={{ p: 2 }}>
                            <Stack direction="row" alignItems="center" spacing={2}>
                                <Avatar>{inv.item[0]}</Avatar>
                                <Box>
                                    <Typography variant="h6">{inv.item}</Typography>
                                    <Typography variant="body2">Stock: {inv.stock}</Typography>
                                </Box>
                            </Stack>
                        </Paper>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default InventoryControl;
