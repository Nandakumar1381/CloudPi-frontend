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
import { mainListItems} from './listItems';
import { Grid } from '@mui/material';
import Card from "./cardMus";
import Button from '@mui/material/Button';
import axios from 'axios';
import { useState } from 'react';

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
      background: '#E3E1FF', // Change drawer's the background color here
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
        { palette: { 
      primary: {
          main: '#E3E1FF',} // Change the primary color here
        },
      },
);

const Container = styled(Grid)`
margin-top: 100px;
margin-left: 25px;
margin-right: 25px;
`;


function Music() {
  const [open, setOpen] = React.useState(true);
  const [selectedFile, setSelectedFile] = useState(null);
  const [title, setTitle] = useState("Upload");
  const [cardData, setCardData] = useState([]);


  const toggleDrawer = () => {
    setOpen(!open);
  };

  React.useEffect(() => {
    fetch('http://127.0.0.1:8000/music/upload/') // Replace with your actual endpoint URL
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
    formData.append("title", file_.name);
    formData.append("music", file_);
  
    fetch('http://127.0.0.1:8000/music/upload/', {
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
  

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: '24px',
              backgroundColor : '#E3E1FF' //APPBAR color
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
              sx={{ flexGrow: 1, color : "#50469D" }}
            >
              Music 
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
            {/* <input type="file"
              className='bg-black'
              onChange={(e)=>{
                // console.log()
                // setSelectedFile(e.target.files[0]);
                handleUploadClick(e.target.files[0]);
              }}
                // Add your upload logic here
              
            > */}
            
            {/* </input> */}

            <IconButton>
              <Badge>
                <AccountCircleIcon />
                <Typography variant="body1" sx={{ marginLeft: 1, color : "#50469D" }}>
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
            backgroundColor: 'white',
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
            display: 'flex',  // Display cards in a row
            flexWrap: 'wrap', // Allow cards to wrap to the next line
            justifyContent: 'flex-start', // Adjust the alignment of cards
            padding: '24px', // Add some padding between cards
          }}
        >
          <div class="">
  
    <Card sx={{ flex: 1 }}/> 
  
</div>

              
          <Container container spacing={3}>
            
          </Container>
          <Toolbar />
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default function MusicContent() {
  return <Music />;
}