import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import { Grid } from '@mui/material';
import { Link } from 'react-router-dom';
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
import SearchIcon from '@mui/icons-material/Search';
import { mainListItems} from './listItems';
import AppWidgetSummary from '../components/AppWidgetSummary';
import Card from "./cardDoc";

const drawerWidth = 240;

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
      }
);

const Container = styled(Grid)`
  margin-top: 20px;
`;

function DashboardContent() {
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
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
              CloudPi
            </Typography>
            <SearchIcon style={{ marginRight: 5, marginLeft : 5 }} />
              <input
                type="text"
                placeholder="  Search"
                style={{ color: '#50469D', border: 'none', background: 'transparent' }}
              />
            <IconButton>
              <Badge>
                <AccountCircleIcon />
                <Typography variant="body1" sx={{ marginLeft: 1, color : "#454080" }}>
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
            padding : '50px',
          }}
        >
          {/* docs,imgs,music,vids */}
          <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
          <Link to="/documents">
            <AppWidgetSummary title="Documents" icon={'ant-design:file-text-filled'} />
          </Link>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
          <Link to="/images">
            <AppWidgetSummary title="Images" color="success" icon={'ant-design:picture-filled'} />
          </Link>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
          <Link to="/videos">
            <AppWidgetSummary title="Videos" color="warning" icon={'ant-design:video-camera-filled'} />
           </Link>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
          <Link to="/music">
            <AppWidgetSummary title="Music" color="error" icon={'ant-design:customer-service-filled'} />
          </Link>
          </Grid>
          </Grid>
          
        {/* FileGrid components */}
        

       
    <Card/>
        
          <Toolbar />
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default function Dashboard() {
  return <DashboardContent />;
}