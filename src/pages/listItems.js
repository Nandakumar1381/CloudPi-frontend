import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LockIcon from '@mui/icons-material/Lock';
import StarIcon from '@mui/icons-material/Star';
import StorageIcon from '@mui/icons-material/Storage';
import { Link } from 'react-router-dom';

const iconColor = '#50469D';

export const mainListItems = (
  <React.Fragment>
    <ListItemButton component={Link} to="/dashboard">
      <ListItemIcon>
        <DashboardIcon style={{ color: iconColor }}/>
      </ListItemIcon>
      <ListItemText primary="Dashboard" style={{ color: iconColor }} />
    </ListItemButton>

    {/* <ListItemButton component={Link} to="/allfiles">
      <ListItemIcon>
        <FolderIcon />
      </ListItemIcon>
      <ListItemText primary="All Files" />
    </ListItemButton> */}

    <ListItemButton component={Link} to="/locked">
      <ListItemIcon>
        <LockIcon style={{ color: iconColor }}/>
      </ListItemIcon>
      <ListItemText primary="Locked" style={{ color: iconColor }}/>
    </ListItemButton>

    <ListItemButton>
      <ListItemIcon component={Link} to="/starred">
        <StarIcon style={{ color: iconColor }}/>
      </ListItemIcon>
      <ListItemText primary="Starred" style={{ color: iconColor }}/>
    </ListItemButton>

    
    <ListItemButton>
      <ListItemIcon component={Link} to="/storage">
        <StorageIcon style={{ color: iconColor }}/>
      </ListItemIcon>
      <ListItemText primary="Storage" style={{ color: iconColor }}/>
    </ListItemButton>
    
  </React.Fragment>
);