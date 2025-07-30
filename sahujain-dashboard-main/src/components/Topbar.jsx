import React, { useState } from "react";
import {
    AppBar,
    Toolbar,
    Typography,
    Box,
    Avatar,
    InputBase,
    useMediaQuery,
    IconButton,
    Badge,
    styled,
    Menu,
    MenuItem,
    ListItemIcon,
    ListItemText,
    Divider,
} from "@mui/material";
import {
    Search as SearchIcon,
    Notifications as NotificationsIcon,
    Email as EmailIcon,
    Menu as MenuIcon,
    LightMode as LightModeIcon,
    DarkMode as DarkModeIcon,
} from "@mui/icons-material";
import { alpha } from "@mui/material/styles";
import PersonIcon from "@mui/icons-material/Person";
import InfoIcon from "@mui/icons-material/Info";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import LogoutIcon from "@mui/icons-material/Logout";
import LockResetIcon from "@mui/icons-material/LockReset";

const GradientAppBar = styled(AppBar)(({ theme }) => ({
    background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
    color: theme.palette.getContrastText(theme.palette.primary.main),
    boxShadow: "0 4px 20px 0 rgba(0,0,0,0.12)",
    backdropFilter: "blur(6px)",
    border: "none",
    transition: "all 0.3s ease",
    "&:hover": {
        boxShadow: "0 6px 24px 0 rgba(0,0,0,0.16)",
    },
}));

const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: 12,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
        width: "auto",
    },
    transition: "all 0.3s ease",
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create("width"),
        width: "100%",
        [theme.breakpoints.up("md")]: {
            width: "20ch",
            "&:focus": {
                width: "30ch",
            },
        },
    },
}));

const Topbar = ({ toggleSidebar, mode, toggleColorMode }) => {
    const isMobile = useMediaQuery("(max-width:600px)");
    const [anchorEl, setAnchorEl] = useState(null);

    const handleProfileOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleProfileClose = () => {
        setAnchorEl(null);
    };

    return (
        <GradientAppBar position="sticky">
            <Toolbar sx={{ px: { xs: 2, sm: 3 } }}>
                {/* Left Section */}
                <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
                    {isMobile && (
                        <IconButton
                            color="inherit"
                            onClick={toggleSidebar}
                            sx={{ mr: 1.5 }}
                        >
                            <MenuIcon />
                        </IconButton>
                    )}
                    <Search>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Search..."
                            inputProps={{ "aria-label": "search" }}
                        />
                    </Search>
                </Box>

                {/* Right Section */}
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                    <IconButton color="inherit" onClick={toggleColorMode}>
                        {mode === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
                    </IconButton>

                    {!isMobile && (
                        <>
                            <IconButton color="inherit">
                                <Badge badgeContent={4} color="error">
                                    <EmailIcon />
                                </Badge>
                            </IconButton>
                            <IconButton color="inherit">
                                <Badge badgeContent={3} color="error">
                                    <NotificationsIcon />
                                </Badge>
                            </IconButton>
                        </>
                    )}

                    <Box
                        onClick={handleProfileOpen}
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                            p: 1,
                            borderRadius: 1,
                            cursor: "pointer",
                            "&:hover": {
                                backgroundColor: "rgba(255,255,255,0.1)",
                            },
                        }}
                    >
                        <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                            Admin User
                        </Typography>
                        <Avatar
                            alt="Admin"
                            src="https://i.pravatar.cc/300?img=32"
                            sx={{
                                width: 36,
                                height: 36,
                                border: "2px solid rgba(255,255,255,0.3)",
                            }}
                        />
                    </Box>

                    {/* Profile Dropdown Menu */}
                    <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleProfileClose}
                        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                        transformOrigin={{ vertical: "top", horizontal: "right" }}
                        PaperProps={{
                            elevation: 4,
                            sx: {
                                minWidth: 220,
                                mt: 1,
                                borderRadius: 2,
                                p: 0.5,
                                backgroundColor: 'background.paper',
                                boxShadow: '0px 6px 20px rgba(0,0,0,0.1)',
                            },
                        }}
                    >
                        <MenuItem>
                            <ListItemIcon>
                                <PersonIcon />
                            </ListItemIcon>
                            <ListItemText primary="Admin Name" secondary="Shubham Bhaskar" />
                        </MenuItem>
                        <MenuItem>
                            <ListItemIcon>
                                <InfoIcon />
                            </ListItemIcon>
                            <ListItemText primary="Email" secondary="admin@gmail.com" />
                        </MenuItem>
                        <MenuItem>
                            <ListItemIcon>
                                <ManageAccountsIcon />
                            </ListItemIcon>
                            <ListItemText primary="Admin ID" secondary="ADM123456" />
                        </MenuItem>

                        <Divider sx={{ my: 1 }} />

                        <MenuItem onClick={() => alert("Change Password")}>
                            <ListItemIcon>
                                <LockResetIcon color="warning" />
                            </ListItemIcon>
                            <ListItemText primary="Change Password" />
                        </MenuItem>
                        <MenuItem onClick={() => alert("Logout")}>
                            <ListItemIcon>
                                <LogoutIcon color="error" />
                            </ListItemIcon>
                            <ListItemText primary="Logout" />
                        </MenuItem>
                    </Menu>
                </Box>
            </Toolbar>
        </GradientAppBar>
    );
};

export default Topbar;
