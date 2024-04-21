import DeleteIcon from '@mui/icons-material/Delete';
import { Avatar, Button, Card, CardContent, CardHeader, Container, Divider, Grid, IconButton, List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthProvider';
import { useEffect } from 'react';
import { collection, deleteDoc, doc, getDocs, query, where } from "firebase/firestore";
import { db } from '../firebase';

const Profile = ({ name = 'John Doe', surname = '', headline = '', ...otherProps }) => {
  const [error, setError] = useState("");

  const [experience, setExperience] = useState(['Company A - Position A', 'Company B - Position B']);
  const [education, setEducation] = useState([]);
  const [newExperience, setNewExperience] = useState('');
  const [newEducation, setNewEducation] = useState('');
  const { currentUser } = useAuth();
  // console.log(currentUser)

  const addExperience = () => {
    setExperience([...experience, newExperience]);
    setNewExperience('');
  };

  const deleteExperience = index => {
    setExperience(experience.filter((_, i) => i !== index));
  };

  const addEducation = () => {
    setEducation([...education, newEducation]);
    setNewEducation('');
  };

  const deleteEducation = index => {
    setEducation(education.filter((_, i) => i !== index));
  };

  const [userInfo, setUserInfo] = useState({branch: "", role: ' ', division:' ', subdivision:' ', semester: ''});
  useEffect(()=>{
    const getUserInfo = async () => {
      try {
        const q = query(collection(db, "details"), where("userId", "==", currentUser.uid));
        const querySnapshot = await getDocs(q);
        const userInfo1 = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }))[0];
        setUserInfo(userInfo1);
        console.log(userInfo)
        
      } catch (error) {
        console.error('Error getting user info:', error);
        setError('Failed to get user info');
      }
    };

    getUserInfo()
  }, [])

  return (
    <Container style={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%'}}>
    <div style={{ padding: 20, width: '100%', maxWidth: '1000px' }}>
      <Typography variant="h1" gutterBottom >
        Profile
      </Typography> 
      
        <Grid item xs={12} md={4} sx={{display: 'flex', flexDirection:'column', justifyContent: 'center', alignItems: 'center',}}>
          <Avatar alt="Profile Picture" src={currentUser.photoURL} style={{ width: 140, height: 140 }} /> {/* Replace with actual image URL */}
          <Typography variant="h2" sx={{mt:2, mb: 4}}>{currentUser.displayName}</Typography>
          <Typography>{headline}</Typography>
    
        </Grid>
        <Grid item xs={12} md={8}>
          {/* Experience, Education, Contact Information sections */}
          

          <Divider />

         

          <Divider />
          <Card style={{ marginBottom: 20,  }}>
            <CardHeader title="Achievements" />
            <CardContent>
              <List>
                {education.map((item, index) => (
                  <ListItem key={index}>
                    <ListItemText primary={item} />
                    <ListItemSecondaryAction>
                      <IconButton edge="end" aria-label="delete" onClick={() => deleteEducation(index)}>
                        <DeleteIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>
              <TextField
                value={newEducation}
                onChange={(e) => setNewEducation(e.target.value)}
                placeholder="Add new achievements"
                multiline
                rows={1}
                style={{ width: 'calc(100% - 80px)' }}
              />
              <Button variant="contained" color="primary" sx={{marginTop: '3%'}} onClick={addEducation} disabled={!newEducation}>
                Add Achievements
              </Button>
            </CardContent>
          </Card>
          <Divider/>
          <Card style={{ marginBottom: 20,  }}>
            
            <CardContent>
              <Typography variant="h4" mb="2">User Information </Typography>
              {/* Add form or list for contact details */}
              <Typography>Branch: {userInfo.branch} </Typography>
              <Typography>Division: {userInfo.division}</Typography>
              <Typography>Subdivision: {userInfo.subdivision} </Typography>
              <Typography>Semester: {userInfo.semester}</Typography>
              
              
              
            </CardContent>
          </Card>
        </Grid>
      
    </div>
    </Container>
  );
};

export default Profile;