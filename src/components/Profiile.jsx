import DeleteIcon from '@mui/icons-material/Delete';
import { Avatar, Button, Card, CardContent, CardHeader, Container, Divider, Grid, IconButton, List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';

const Profile = ({ name = 'John Doe', surname = '', headline = '', ...otherProps }) => {
  const [experience, setExperience] = useState(['Company A - Position A', 'Company B - Position B']);
  const [education, setEducation] = useState(['Your Education Details']);
  const [newExperience, setNewExperience] = useState('');
  const [newEducation, setNewEducation] = useState('');

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

  return (
    <Container style={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%'}}>
    <div style={{ padding: 20, width: '100%', maxWidth: '1000px' }}>
      <Typography variant="h1" gutterBottom >
        Profile
      </Typography> 
      
        <Grid item xs={12} md={4} sx={{display: 'flex', flexDirection:'column', justifyContent: 'center', alignItems: 'center',}}>
          <Avatar alt="Profile Picture" src="https://zos.alipay.com/v2/avatar_signin.svg" style={{ width: 180, height: 180 }} /> {/* Replace with actual image URL */}
          <Typography variant="h2">{name}</Typography>
          <Typography>{headline}</Typography>
          <Button variant="contained" color="secondary" sx={{margin: '3%'}}>Connect</Button>
        </Grid>
        <Grid item xs={12} md={8}>
          {/* Experience, Education, Contact Information sections */}
          <Card style={{ marginBottom: 20,  }}>
            <CardHeader title="Experience" />
            <CardContent>
              <List>
                {experience.map((item, index) => (
                  <ListItem key={index}>
                    <ListItemAvatar>
                      <Avatar>{item[0]}</Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={item} />
                    <ListItemSecondaryAction>
                      <IconButton edge="end" aria-label="delete" onClick={() => deleteExperience(index)}>
                        <DeleteIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>
              <TextField
                value={newExperience}
                onChange={(e) => setNewExperience(e.target.value)}
                placeholder="Add new experience"
                multiline
                rows={4}
                style={{ width: 'calc(100% - 80px)' }}
              />
              <Button sx={{marginTop: '3%'}} variant="contained" color="primary" onClick={addExperience} disabled={!newExperience}>
                Add Experience
              </Button>
            </CardContent>
          </Card>

          <Divider />

          <Card style={{ marginBottom: 20,  }}>
            <CardHeader title="Education" />
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
                placeholder="Add new education"
                multiline
                rows={4}
                style={{ width: 'calc(100% - 80px)' }}
              />
              <Button variant="contained" color="primary" sx={{marginTop: '3%'}} onClick={addEducation} disabled={!newEducation}>
                Add Education
              </Button>
            </CardContent>
          </Card>

          <Divider />

          <Card style={{ marginBottom: 20,  }}>
            <CardHeader title="Contact Information" />
            <CardContent>
              <Typography>Your Contact Information (Edit this section)</Typography>
              {/* Add form or list for contact details */}
            </CardContent>
          </Card>
        </Grid>
      
    </div>
    </Container>
  );
};

export default Profile;