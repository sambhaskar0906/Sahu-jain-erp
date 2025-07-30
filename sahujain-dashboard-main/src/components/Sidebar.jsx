import React from "react";
import {
    Drawer,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Toolbar,
    Box,
    Typography,
    useTheme,
} from "@mui/material";
import { NavLink } from "react-router-dom";

import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import InventoryIcon from "@mui/icons-material/Inventory";
import ReceiptIcon from "@mui/icons-material/Receipt";
import SettingsIcon from "@mui/icons-material/Settings";

const drawerWidth = 220;

const menuItems = [
    { label: "Dashboard", path: "/", icon: <DashboardIcon /> },
    { label: "Customers", path: "/customers", icon: <PeopleIcon /> },
    { label: "Inventory", path: "/inventory", icon: <InventoryIcon /> },
    { label: "Reports", path: "/sales", icon: <ReceiptIcon /> },
    { label: "Settings", path: "/settings", icon: <SettingsIcon /> },
];

const Sidebar = () => {
    const theme = useTheme();

    return (
        <Drawer
            variant="permanent"
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: {
                    width: drawerWidth,
                    boxSizing: "border-box",
                    background: `linear-gradient(to bottom, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`,
                    color: theme.palette.common.white,
                    borderRight: "none",
                    boxShadow: "2px 0 10px rgba(0,0,0,0.2)",
                },
            }}
        >
            <Toolbar
                sx={{
                    background: `linear-gradient(to right, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                    color: "white",
                    justifyContent: "center",
                    py: 2,
                }}
            >
                <Typography
                    variant="h6"
                    sx={{ fontWeight: 600, fontFamily: "Poppins, sans-serif" }}
                >
                    SJC ERP Dashboard
                </Typography>
            </Toolbar>

            <Box sx={{ mt: 2 }}>
                <List>
                    {menuItems.map(({ label, path, icon }) => (
                        <ListItemButton
                            key={label}
                            component={NavLink}
                            to={path}
                            sx={{
                                color: "white",
                                mx: 2,
                                my: 1,
                                borderRadius: "12px",
                                display: "flex",
                                alignItems: "center",
                                gap: 1.5,
                                transition: "0.3s ease",
                                paddingY: 1.2,
                                paddingX: 2,
                                "&.active": {
                                    backgroundColor: theme.palette.secondary.main,
                                    color: theme.palette.common.white,
                                    boxShadow: `0 0 10px ${theme.palette.secondary.light}`,
                                },
                                "&:hover": {
                                    backgroundColor: "rgba(255,255,255,0.15)",
                                    boxShadow: `0 3px 12px rgba(0,0,0,0.3)`,
                                },
                            }}
                        >
                            <ListItemIcon
                                sx={{
                                    color: "inherit",
                                    minWidth: "auto",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                            >
                                {icon}
                            </ListItemIcon>
                            <ListItemText
                                primary={label}
                                primaryTypographyProps={{
                                    fontSize: 15,
                                    fontWeight: 500,
                                    fontFamily: "Poppins, sans-serif",
                                    sx: {
                                        m: 0,
                                    },
                                }}
                                sx={{ m: 0 }}
                            />
                        </ListItemButton>
                    ))}
                </List>
            </Box>
        </Drawer>
    );
};

export default Sidebar;
