// src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Box } from '@mui/material';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';

import DashboardHome from './pages/DashboardHome';
import CustomerManagement from './pages/CustomerManagement';
import SalesReport from './pages/SalesReport';
import InventoryControl from './pages/InventoryControl';
import FinancialOverview from './pages/FinancialOverview';
import Settings from './pages/Settings';
import Registration from './pages/User/Registration';
import Login from './pages/User/UserLogin/Login';
import Register from './pages/User/UserLogin/Register';

const App = ({ mode, toggleColorMode }) => (
  <>
    {/* <Box sx={{ display: 'flex' }}>
      <Sidebar />
      <Box sx={{ flexGrow: 1 }}>
        <Topbar mode={mode} toggleColorMode={toggleColorMode} />
        <Box sx={{ p: 3 }}>
          <Routes>
            <Route path="/" element={<DashboardHome />} />
            <Route path="/customers" element={<CustomerManagement />} />
            <Route path="/sales" element={<SalesReport />} />
            <Route path="/inventory" element={<InventoryControl />} />
            <Route path="/finance" element={<FinancialOverview />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </Box>
      </Box>
    </Box> */}
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/registration" element={<Registration />} />
    </Routes>
  </>
);

export default App;
