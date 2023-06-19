import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { AppBar, Drawer, Container } from '@mui/material';
import { mainListItems } from './listItems';
import { Grid } from '@mui/material';
// import Card from './card';
// import Button from '@mui/material/Button';
// import axios from 'axios';
import { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, Legend, Tooltip } from 'recharts';
import LinearProgress from '@mui/material/LinearProgress';

//import { mainListItems } from '../components/listItems';

const mdTheme = createTheme();

const COLORS = ['#1976d2', '#4CAF50', '#ff9800', '#F44336'];

function Storage() {
  const [open, setOpen] = useState(true);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const [storageData, setStorageData] = useState(null);
  const [pieData, setPieData] = useState(null);

  useEffect(() => {
    const fetchPieData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/storage/media/'); // Pie Chart Backend API
        const data = await response.json();
        setPieData(data);
      } catch (error) {
        console.error('Error fetching storage data:', error);
      }
    };

    const fetchStorageData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/storage/storage-info/'); // Line Progress API endpoint
        const data = await response.json();
        setStorageData(data);
      } catch (error) {
        console.error('Error fetching storage data:', error);
      }
    };

    fetchPieData();
    fetchStorageData();
  }, []);

  if (!pieData || !storageData) {
    return <div>Loading...</div>; // Show a loading state while fetching data
  }
 
  const totalStorage = storageData.total;
  const usedStorage = storageData.used;
  const remainingStorage = storageData.remaining;
  const storagePercentage = Math.round((usedStorage / totalStorage) * 100);
  
  
  
  const data = [
    { name: 'Documents', value: pieData.documents },
    { name: 'Images', value: pieData.images },
    { name: 'Videos', value: pieData.videos },
    { name: 'Music', value: pieData.music },
  ];
  <LinearProgress
  variant="determinate"
  value={usedStorage}
  max={totalStorage}
  // Rest of your code
/>


  return (
    
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: '24px',
              backgroundColor: '#E3E1FF', //APPBAR color
            }}
          >
            <IconButton
              edge="start"
              color="white"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: '36px',
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h3"
              variant="h5"
              // cloudpi text color
              noWrap
              sx={{ flexGrow: 1, color: '#50469D' }}
            >
              CloudPi
            </Typography>
            <IconButton color="white">
              <Badge badgeContent={4} color="error">
                <AccountCircleIcon />
              </Badge>
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          sx={{
            width: '240px',
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {
              width: '240px',
              boxSizing: 'border-box',
              backgroundColor: '#E3E1FF',
            },
          }}
          open={open}
        >
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List>{mainListItems}</List>
          <Divider />
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: '#F3F2FF',
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
            paddingTop: '75px',
          }}
        >
          <Toolbar />

          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'flex-start',
              padding: '24px',
            }}
          >
            <PieChart width={400} height={400} style={{ margin: 'auto', marginTop: '300px' }}>
              <Pie
                data={data}
                cx={200}
                cy={200}
                innerRadius={100}
                outerRadius={150}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Legend
                verticalAlign="middle"
                align="right"
                layout="vertical"
                wrapperStyle={{ position: 'fixed', bottom: '75px', right: '75px' }}
              />
              <Tooltip />
            </PieChart>

            <Box
              sx={{
                position: 'fixed',
                top: '30',
                left: '8',
                width: '100%',
                zIndex: '9999',
                padding: '75px',
              }}
            >
              <Typography variant="h6">CloudPi</Typography>
              <LinearProgress
    variant="determinate"
    value={storagePercentage} // Pass the storage percentage as the value prop
    sx={{
      marginTop: '10px',
      width: '80%',
      '& .MuiLinearProgress-bar': {
        backgroundColor: '#50469D',
        height: '50px',
      },
      '& .MuiLinearProgress-barColorPrimary': {
        backgroundColor: '#E3E1FF',
      },
    }}
  />
              <Typography variant="body2" sx={{ marginTop: '10px' }}>
                {storagePercentage}% Used
              </Typography>
            </Box>

            <Container container spacing={3}></Container>
            <Toolbar />
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default function StorageContent() {
  return <Storage />;
}