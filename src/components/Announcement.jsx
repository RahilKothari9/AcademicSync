import { Alert, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Box, Grid, useTheme } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { collection, deleteDoc, doc, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthProvider';
import { db } from '../firebase';
import { tokens } from "../theme";
import DeleteIcon from '@mui/icons-material/Delete';

export default function Announcement() {
  const [error, setError] = useState("");

  const { currentUser } = useAuth();
  
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [linkArr, setLinkArr] = useState([]);
  const [userInfo, setUserInfo] = useState();

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [eventToDelete, setEventToDelete] = useState(null);

  useEffect(() => {
    const fetchAnnouncements = async (userInfo) => {
      try {
        const q = query(collection(db, "Announcements"), where("division", "==", userInfo.division), where("subdivision", "==", userInfo.subdivision));
        const querySnapshot = await getDocs(q);
        const announcements = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
        const sortedAnnouncements = announcements.sort((a, b) => b.timestamp.toMillis() - a.timestamp.toMillis());
        setLinkArr(sortedAnnouncements);
      } catch (error) {
        console.error('Error fetching announcements:', error);
        setError('Failed to fetch announcements');
      }
    };

    const getUserInfo = async () => {
      try {
        const q = query(collection(db, "details"), where("userId", "==", currentUser.uid));
        const querySnapshot = await getDocs(q);
        const userInfo1 = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }))[0];
        setUserInfo(userInfo1);
        fetchAnnouncements(userInfo1);
      } catch (error) {
        console.error('Error getting user info:', error);
        setError('Failed to get user info');
      }
    };

    getUserInfo();
  }, [currentUser.uid]);

  const handleDeleteClick = (event) => {
    setEventToDelete(event);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (eventToDelete) {
      const eventRef = doc(db, 'Announcements', eventToDelete.id);
      await deleteDoc(eventRef);
      setLinkArr(linkArr.filter(event => event.id !== eventToDelete.id));
    }
    setDeleteDialogOpen(false);
  };

  return (
    <div sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      {error && <Alert onClose={() => { setError("") }} severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      <div className='centerer' sx={{ width: '80%', margin: '0 auto', overflow: "scroll" }}>
        <div className='foodwrapper'>
          {linkArr.map((item) => (
            <Grid item key={item.id} xs={12} sm={6} md={4} lg={10} sx={{ display: 'flex', justifyContent: 'center' }}>
              <Card
                sx={{
                  width:'60%',
                  maxWidth: '90%', // Decrease the width here
                  mb: 2,
                  ml:8,
                  backgroundColor: colors.primary[400],
                  border: '1px solid #888',
                  boxShadow: '5px 5px 15px rgba(0, 0, 0, 0.3)'
                }}
                className='foodcard'
              >
                <CardContent sx={{ textAlign: 'center' }}>
                <Box sx={{ display: 'flex', flexDirection: 'row' }}>

                  {userInfo.role !== 'Student' && (
                    <Typography variant="h5" component="div" sx={{ flexGrow: 1, mb: 1, ml: 6, fontSize: "2em", color: colors.greenAccent[600]}}>
                      {item.name}
                    </Typography>
                  )}
                  {userInfo.role === 'Student' && (
                    <Typography variant="h5" component="div" sx={{ flexGrow: 1, mb: 1, fontSize: "2em", color: colors.greenAccent[600]}}>
                      {item.name}
                    </Typography>
                  )}
                  {userInfo.role !== 'Student' && (
                    <Button onClick={() => handleDeleteClick(item)} sx={{ height: '25px', fontsize: "1em", backgroundColor: 'red', color: 'white' }}>
                      <DeleteIcon />
                    </Button>
                  )}
                </Box>
                  <Typography variant="body2" sx={{ fontSize: '1.5em' }}>
                    {item.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </div>
      </div>
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        PaperProps={{
    style: {
      
      borderRadius: '15px',
      padding: '20px',
    },
  }}
      >
        <DialogTitle>{"Confirm Delete"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this event?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)} sx={{ backgroundColor: '#757575', color: '#fff' }}>
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color="primary" sx={{ backgroundColor: '#f44336', color: '#fff' }} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
