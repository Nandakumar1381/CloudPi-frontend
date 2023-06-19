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
// import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
// import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';

const iconColor = '#50469D';

export default function CardComponent() {
  const [fileData, setFileData] = useState([]);
  const [selectedFileId, setSelectedFileId] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const fetchFileData = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/locked/upload/');
      const data = await response.json();
      setFileData(data);
    } catch (error) {
      console.log('Error fetching file data:', error);
    }
  };

  useEffect(() => {
    fetchFileData();
  }, []);

  const handleStarClick = () => {
    // Check if the current file is already starred or not
    const selectedFile = fileData.find((file) => file.id === selectedFileId);
    const isStarred = selectedFile && selectedFile.isStarred;
  
    // Update the file's starred status in the fileData array
    const updatedFileData = fileData.map((file) => {
      if (file.id === selectedFileId) {
        return {
          ...file,
          isStarred: !isStarred, // Toggle the starred status
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
      fetch(`http://127.0.0.1:8000/locked/${selectedFileId}/delete/`, {
        method: 'DELETE',
        // Add any necessary headers and body data if required
      })
        .then(response => {
          if (response.ok) {
            console.log('File deleted successfully.');
            fetchFileData(); // Fetch file data to refresh the component
          } else {
            console.log('Failed to delete the file.');
          }
        })
        .catch(error => {
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

  

  const handleUpload = async () => {
    // Handle file upload logic here
    // After successful upload, call fetchFileData to refresh the component
    await fetchFileData();
  };

  // const getFileIconComponent = (extension) => {
  //   if (extension === 'jpg' || extension === 'png') {
  //     return 'img'; // Render as an 'img' element for image files
  //   } else if (extension === 'pdf') {
  //     return <PictureAsPdfIcon />; // Render the PictureAsPdfIcon for PDF files
  //   } else if (extension === 'txt' || extension === 'doc') {
  //     return <InsertDriveFileIcon />; // Render the InsertDriveFileIcon for text and document files
  //   } else if (extension === 'mp3' || extension === 'mp4') {
  //     return <PlayCircleOutlineIcon />; // Render the PlayCircleOutlineIcon for audio and video files
  //   } else {
  //     return null; // Render null for unknown file types
  //   }
  // };
  

  const truncateFileName = (name) => {
    if (name.length <= 12) {
      return name;
    } else {
      return name.substring(0, 12) + '...';
    }
  };

  return (
    <div>
      <Grid container spacing={2} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        {fileData.map((file) => (
          <Grid item xs={12} sm={6} md={4} key={file.id}>
            <Card sx={{ width: 250, height: 250 }} style={{ border: '1px solid #e0e0e0' }}>
              <CardHeader
                avatar={<Avatar sx={{ bgcolor: '#50469D' }} aria-label="user">N</Avatar>}
                title={truncateFileName(file.name)}
                subheader={file.date}
              />
               <CardMedia 
                component={PictureAsPdfIcon}
                height="194"
                style={{ fontSize: 128, color: '#E3E1FF' }} // Customize the size and color of the icon as needed
                alt="File Preview" />

              <CardContent>{/* Content goes here */}</CardContent>
              <CardActions disableSpacing style={{ position: 'relative' }}>
                <IconButton aria-label="add to favorites" onClick={handleStarClick} style={{ position: 'absolute', top: '90px', left: '10px' }}>
                    {file.isStarred ? (
                    <StarIcon style={{ color: iconColor }} />
                    ) : (
                    <StarBorderOutlinedIcon style={{ color: iconColor }} />
                    )}
                </IconButton>
                <IconButton aria-label="delete" onClick={() => handleDeleteClick(file.id)} style={{ position: 'absolute', top: '90px', left: '45px' }}>
                    <DeleteIcon style={{ color: iconColor }} />
                </IconButton>
                </CardActions>


            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={deleteDialogOpen} onClose={handleDeleteCancel}>
        <DialogTitle>Delete File</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this file?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel}>Cancel</Button>
          <Button onClick={handleDeleteConfirm} variant="contained" color="error">Delete</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
        }