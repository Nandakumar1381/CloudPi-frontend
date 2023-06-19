import * as React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';

//import backgroundImage from '../assets/3608319.jpg';

const defaultTheme = createTheme({
  typography: {
    fontFamily: 'Poppins',
  },
  palette: {},
  palette: {
    warning: {
      main: '#ff9800',
      dark: '#f57c00',
    },
  },
});

export default function SignIn() {
  const [isErrorDialogOpen, setIsErrorDialogOpen] = useState(false);
  const navigate = useNavigate();

  const handleDialogClose = () => {
    setIsErrorDialogOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const username = data.get('email');
    const password = data.get('password');

    axios
      .post('http://127.0.0.1:8000/api/login/', { username, password })
      .then((response) => {
        // Handle the response from the backend
        console.log(response.status);
        if (response.status===200) {
          navigate('/dashboard');
        } else {
          setIsErrorDialogOpen(true);
        }
      })
      .catch((error) => {
        // Handle any errors
        console.error(error);
        setIsErrorDialogOpen(true);
      });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
          backgroundColor: '#454080',
          //backgroundImage: `url(${backgroundImage})`,
          //backgroundRepeat: 'no-repeat',
          //backgroundSize: 'cover',
          //backgroundPosition: 'center',
        }}
      >
        <Typography component="h1" variant="h5" sx={{ color: 'white', marginLeft: '80px', marginRight: 'auto' }}>
          Login
        </Typography>
        <form onSubmit={handleSubmit} style={{ width: '100%', marginTop: '1rem' }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            sx={{
              marginLeft: '80px',
              marginRight: 'auto',
              '& .MuiInputBase-input': {
                color: 'white',
              },
              '& .MuiFormLabel-root': {
                color: 'white',
              },
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: 'white',
                },
                '&:hover fieldset': {
                  borderColor: 'white',
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'white',
                },
                pl: 2,
                width: '30%',
              },
            }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            sx={{
              marginLeft: '80px',
              marginRight: 'auto',
              '& .MuiInputBase-input': {
                color: 'white',
              },
              '& .MuiFormLabel-root': {
                color: 'white',
              },
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: 'white',
                },
                '&:hover fieldset': {
                  borderColor: 'white',
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'white',
                },
                width: '30%',
              },
            }}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              mb: 2,
              bgcolor: 'warning.main',
              '&:hover': { bgcolor: 'warning.dark' },
              width: '30%',
              marginLeft: '80px',
              marginRight: 'auto',
            }}
          >
            Sign In
          </Button>
        </form>
      </div>

      <Dialog open={isErrorDialogOpen} onClose={handleDialogClose} PaperProps={{ sx: { backgroundColor: '#454080' } }}>
      <DialogTitle sx={{ color: 'white' }}>Wrong Credentials</DialogTitle>
      <DialogContent>
        <Typography variant="body1" sx={{ color: 'white' }}>
          The username or password you entered is incorrect.
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDialogClose} sx={{ color: 'warning.main' }}>
          Close
        </Button>
      </DialogActions>
    </Dialog>

    </ThemeProvider>
  );
}