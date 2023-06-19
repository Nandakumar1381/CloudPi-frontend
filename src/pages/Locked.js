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
import { mainListItems } from './listItems';
import { Grid } from '@mui/material';
import Card from './cardLock';
import Button from '@mui/material/Button';
import { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';

const drawerWidth = 240;

const theme = createTheme();

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      background: '#E3E1FF', // Change drawer's background color here
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

const mdTheme = createTheme(
  {
    typography: {
      fontFamily: 'Poppins',
    },
  },
  {
    palette: {
      primary: {
        main: '#E3E1FF',
      }, // Change the primary color here
    },
  },
);

const Container = styled(Grid)`
  margin-top: 100px;
  margin-left: 25px;
  margin-right: 25px;
`;

function Locked() {
  const [open, setOpen] = React.useState(true);
  const [isOTPVerified, setIsOTPVerified] = React.useState(false);
  const [otpValue, setOtpValue] = React.useState('');
  const [dialogOpen, setDialogOpen] = React.useState(false);
  
  const [selectedFile, setSelectedFile] = useState(null);
  const [title, setTitle] = useState("Upload");
  const [cardData, setCardData] = useState([]);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  React.useEffect(() => {
    fetch('http://127.0.0.1:8000/documents/upload/') // Replace with your actual endpoint URL
      .then((response) => {
        if (!response.ok) {
          throw new Error('Request failed with status code ' + response.status);
        }
        return response.json();
      })
      .then((data) => {
        setCardData(data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);

  const handleUploadClick = (file_) => {
    if (!file_) return;
  
    const formData = new FormData();
    formData.append("name", file_.name);
    formData.append("file", file_);
  
    fetch('http://127.0.0.1:8000/locked/upload/', {
      method: 'POST',
      body: formData
    })
      .then(response => {
        if (response.ok) {
          console.log('File uploaded successfully.');
          setTitle("Done");
  
          // Clear the existing card data
          setCardData([]);
  
          // Fetch the updated card data after successful upload
          
        } else {
          console.error('File upload failed.');
          setTitle("Failed");
        }
        setTimeout(() => {
          setTitle("Upload");
        }, 1000);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  const handleOTPSubmit = () => {
    // Here you can perform the OTP verification logic
    // If the OTP is verified successfully, update the isOTPVerified state variable to true
    setIsOTPVerified(true);
    setDialogOpen(false); // Close the dialog after OTP verification

    fetch('http://127.0.0.1:8000/locked/verify-otp/', {
      method: 'POST', // Use the appropriate HTTP method (POST, GET, etc.)
      headers: {
        'Content-Type': 'application/json', // Set the appropriate Content-Type header
      },
      body: JSON.stringify({ otp: otpValue }), // Pass the OTP value in the request body
    })
      .then(response => response.json())
      .then(data => {
        // Handle the response data from the API
        console.log('API response:', data);
        // Update state or perform any other necessary actions based on the response
      })
      .catch(error => {
        // Handle any errors that occurred during the API request
        console.log('API request error:', error);
      });
  };

  const handleGetOTP = () => {
    fetch('http://127.0.0.1:8000/locked/send-otp/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => {
        // Handle the response data from the API
        console.log('API response:', data);
        // Perform any necessary actions based on the response
        setDialogOpen(true); // Open the dialog to enter OTP
      })
      .catch(error => {
        // Handle any errors that occurred during the API request
        console.log('API request error:', error);
      });
  };
  
  

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
              Locked
            </Typography>

            {/* upload button */}
            <div class="upload-btn-wrapper">
              <Button
                variant="contained"
                sx={{
                  backgroundColor: '#50469D',
                  color: '#ffffff',
                  '&:hover': {
                    backgroundColor: '#3B3272',
                  },
                  marginRight: '25px',
                  '&:hover .MuiButton-label': {
                    color: '#ffffff',
                  },
                }}
                onClick={handleUploadClick}
              >
                {title}
              </Button>
              <input
                onChange={(e) => {
                  handleUploadClick(e.target.files[0], e);
                }}
                type="file"
                name="myfile"
              />
            </div>

            
            <IconButton>
              <Badge>
                <AccountCircleIcon />
                <Typography variant="body1" sx={{ marginLeft: 1, color: '#50469D' }}>
                  CloudPi
                </Typography>
              </Badge>
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
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
          <List component="nav" sx={{ mt: 2 }}>
            {mainListItems}
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: 'white', //bg colour of main component
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          {isOTPVerified ? (
            <Container container spacing={3}>
              <Grid item xs={12} sm={6} md={4}>
                <Card />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Card />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Card />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Card />
              </Grid>
              {/* Add more Grid items with Card components here */}
            </Container>
          ) : (
            <Container container justifyContent="center" alignItems="center" style={{ height: '100vh' }}>
              <Button variant="contained" onClick={handleGetOTP} sx={{
                    backgroundColor: '#50469D',
                    color: '#ffffff', 
                    margin: 'auto', // Center the button horizontally
                     marginTop: '200px', 
                     width: '200px', // Set the desired width of the button
                     height: '60px',
                    '&:hover': {
                    backgroundColor: '#3B3272',
                    },
                }} size="large">
                GET OTP
              </Button>
              <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} 
              style={{ backgroundColor: '#50469D', color: '#FFFFFF' }}>
                <DialogTitle style={{color: '#50469D'}}>Please enter the OTP that has been sent to your mail.</DialogTitle>
                <DialogContent>
                  <TextField
                    autoFocus
                    margin="dense"
                    id="otp"
                    label="Enter OTP"
                    type="number"
                    fullWidth
                    value={otpValue}
                    onChange={(e) => setOtpValue(e.target.value)}
                  />
                </DialogContent>
                <DialogActions>
                  <Button onClick={() => setDialogOpen(false)} 
                  sx={{ color: '#FF5722' }}>
                    Cancel
                    </Button>
                  <Button onClick={handleOTPSubmit} sx={{ color: '#FF5722' }}>Submit</Button>
                </DialogActions>
              </Dialog>
            </Container>
          )}
          <Toolbar />
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default function LockedContent() {
  return <Locked />;
}
