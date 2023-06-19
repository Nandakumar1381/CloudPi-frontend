import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import { purple } from '@mui/material/colors';
import DeleteIcon from '@mui/icons-material/Delete';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import StarIcon from '@mui/icons-material/Star';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';

const iconColor = '#50469D';

export default function CardComponent() {
  const [fileData, setFileData] = useState([]);
  const [selectedFileId, setSelectedFileId] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const fetchFileData = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/documents/upload/');
      const data = await response.json();
      setFileData(data);
    } catch (error) {
      console.log('Error fetching file data:', error);
    }
  };

  useEffect(() => {
    fetchFileData();
  }, []);

  const handleStarClick = (id) => {
    // Update the file's starred status in the fileData array
    const updatedFileData = fileData.map((file) => {
      if (file.id === id) {
        return {
          ...file,
          isStarred: !file.isStarred, // Toggle the starred status
        };
      }
      return file;
    });

    // Update the fileData state with the updated file data
    setFileData(updatedFileData);
  };

  const handleDeleteClick = (id) => {
    setSelectedFileId(id);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (selectedFileId) {
      fetch(`http://127.0.0.1:8000/documents/${selectedFileId}/delete/`, {
        method: 'DELETE',
        // Add any necessary headers and body data if required
      })
        .then((response) => {
          if (response.ok) {
            console.log('File deleted successfully.');
            fetchFileData(); // Fetch file data to refresh the component
          } else {
            console.log('Failed to delete the file.');
          }
        })
        .catch((error) => {
          console.log('An error occurred while deleting the file.', error);
        })
        .finally(() => {
          setDeleteDialogOpen(false);
          setSelectedFileId(null);
        });
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setSelectedFileId(null);
  };

  const truncateFileName = (name) => {
    if (name.length <= 12) {
      return name;
    } else {
      return name.substring(0, 12) + '...';
    }
  };

  return (
    <div style={{ marginTop: '55px' }}>
      <Grid
        container
        spacing={2}
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
        }}
      >
        {fileData.map((file) => (
          <Grid item xs={12} sm={6} md={4} key={file.id}>
            <Card
              sx={{ width: 250, height: 250 }}
              style={{ border: '1px solid #e0e0e0' }}
            >
              <CardHeader
                avatar={
                  <Avatar sx={{ bgcolor: '#50469D' }} aria-label="user">
                    N
                  </Avatar>
                }
                title={truncateFileName(file.name)}
                subheader={file.date}
              />
              <CardMedia
                component={PictureAsPdfIcon}
                style={{
                  fontSize: 90,
                  color: '#E3E1FF',
                  textAlign: 'center',
                  marginLeft: 75,
                }}
                alt="File Preview"
              />

              <CardContent>{/* Content goes here */}</CardContent>
              <CardActions disableSpacing style={{ position: 'relative' }}>
                <IconButton
                  aria-label="add to favorites"
                  onClick={() => handleStarClick(file.id)}
                  style={{}}
                >
                  {file.isStarred ? (
                    <StarIcon style={{ color: iconColor }} />
                  ) : (
                    <StarBorderOutlinedIcon style={{ color: iconColor }} />
                  )}
                </IconButton>
                <IconButton
                  aria-label="delete"
                  onClick={() => handleDeleteClick(file.id)}
                  style={{}}
                >
                  <DeleteIcon style={{ color: iconColor }} />
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={deleteDialogOpen} onClose={handleDeleteCancel}>
        <DialogTitle>Delete File</DialogTitle>
        <DialogContent>Are you sure you want to delete this file?</DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel}>Cancel</Button>
          <Button
            onClick={handleDeleteConfirm}
            variant="contained"
            color="error"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
