import DeleteIcon from '@mui/icons-material/Delete';
import { Alert, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, useTheme } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { collection, deleteDoc, doc, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthProvider';
import { db } from '../firebase';
import { tokens } from "../theme";

export default function Events() {

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
  const [error, setError] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [eventToDelete, setEventToDelete] = useState(null);

  const { currentUser, logout } = useAuth();

  const [eventArr, setEventArr] = useState([]);

  const [userInfo, setUserInfo] = useState({userId: "", role: ' ', division:' ', subdivision:' '});

  //delete function
  const handleDeleteClick = (event) => {
    setEventToDelete(event);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (eventToDelete) {
      const eventRef = doc(db, 'events', eventToDelete.id);
      await deleteDoc(eventRef);
      setEventArr(eventArr.filter(event => event.id !== eventToDelete.id));
    }
    setDeleteDialogOpen(false);
  };


  useEffect(() => {
    const getEvents = async (info) => {
        
      const q = query(collection(db, "events"), where("division", "==", info.division), where("subdivision", "==", info.subdivision));
      const docSnap = await getDocs(q);

      const arr = [];
      docSnap.forEach((doc) => {
          arr.push({...doc.data(), id:doc.id});
      });        
      
      const sortedArr = arr.sort((a, b) => b.timestamp.toMillis() - a.timestamp.toMillis());
      setEventArr(sortedArr);
    };

    const getUserInfo = async () => {
      const q = query(collection(db, "details"), where("userId", "==", currentUser.uid));
      const querySnapshot = await getDocs(q);
      const userList = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
      
      if (userList.length > 0) {
        setUserInfo(userList[0]);
        console.log(userInfo)
        getEvents(userList[0]);
      }
    };

    getUserInfo();
  }, [currentUser.uid]);

  return (
    <div sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      {error && <Alert onClose={() => {setError("")}} severity="error" sx={{mb: 2}}>{error}</Alert>}
      <div className='centerer' sx={{ width: '80%', margin: '0 auto', overFlow: "scroll"}}>
        <div className='foodwrapper'>
          {eventArr.map((item) => (
            <Grid item key={item.id} xs={12} sm={6} md={4} lg={10} sx={{ display: 'flex', justifyContent: 'center' }}>
              <Card 
                sx={{ 
                  minWidth: 550, 
                  maxWidth: '90%', // Decrease the width here
                  mb: 2, 
                  backgroundColor: colors.primary[400],
                  border: '1px solid #888',
                  boxShadow: '5px 5px 15px rgba(0, 0, 0, 0.3)' 
                }} 
                backgroundColor={colors.primary[400]}
                className='foodcard'
              >
                <CardContent sx={{ textAlign: 'center' }}>
                  <Typography variant="h5" component="div" sx={{ mb: 1, fontSize: "2em", color: colors.greenAccent[600]}}>
                    {item.name}
                  </Typography>
                  <Typography variant="body2"  sx={{fontSize: '1.5em'}}>
                    Description: {item.description}
                  </Typography>
                  <Typography variant="body2"  sx={{fontSize: '1.5em'}}>
                    Date: {new Date(item.date.seconds * 1000).toLocaleString()}
                  </Typography>
                  
                  <Typography variant="body2"  sx={{fontSize: '1.5em'}}>
                    
                      {item.files.map((fileUrl, index) => (
                        
                          <a href={fileUrl} target="_blank" rel="noopener noreferrer">File {index + 1}</a>
                        
                      ))}
                    
                 </Typography>
                 <Button onClick={() => handleDeleteClick(item)} sx={{ height: '50px', backgroundColor: 'red', color: 'white' }}>
                  <DeleteIcon />
                 </Button>
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
  );
}
