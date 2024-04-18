import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Grid, Box } from '@mui/material';
import { db, storage } from '../firebase';
import { Timestamp } from "firebase/firestore";
import { collection, addDoc, where, getDocs, query } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useAuth } from '../contexts/AuthProvider';



const CreateEvent = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [files, setFiles] = useState([]);
    const {currentUser} = useAuth()

  const [userInfo, setUserInfo] = useState({userId: "", role: ' ', division:' ', subdivision:' '})

  useEffect( () => {
      
      const x = async()=>{
      const q = query(collection(db, "details"), where("userId", "==", currentUser.uid));
      const querySnapshot = await getDocs(q);
      
      const userList = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })); 
      setUserInfo(userList[0])
      console.log(userInfo)
    }
    x();
  //   console.log(userInfo)
   }, [])


  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleDateChange = (event) => {
    setDate(event.target.value);
  };

  const handleTimeChange = (event) => {
    setTime(event.target.value);
  };

  const handleFileChange = (event) => {
    const fileList = Array.from(event.target.files);
    setFiles(fileList);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Convert date and time strings to a Date object
    const eventDate = new Date(`${date}T${time}`);

    // Convert the Date object to a Firestore Timestamp
    const firestoreTimestamp = Timestamp.fromDate(eventDate);

    // Function to upload a file and return its download URL
    const uploadFileAndGetURL = async (file) => {
      const storageRef = ref(storage, `files/${file.name}`);
      await uploadBytes(storageRef, file);
      return getDownloadURL(storageRef);
    };

    // Upload all files and get their download URLs
    const fileURLs = await Promise.all(files.map(uploadFileAndGetURL));

    // Push event data to Firestore collection
    addDoc(collection(db, 'events'), {
      name: name,
      description: description,
      date: firestoreTimestamp,
      files: fileURLs, // Store the file URLs
      division: userInfo.division,
      subdivision: userInfo.subdivision,
      semester: userInfo.semester,
      userId: currentUser.uid,
      timestamp: Timestamp.now(),
    })
    .then(() => {
      // Reset form fields after successful submission
      setName('');
      setDescription('');
      setDate('');
      setTime('');
      setFiles([]);
      alert('Event created successfully!');
    })
    .catch((error) => {
      console.error('Error adding event: ', error);
      alert('An error occurred while creating the event.');
    });
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Create Event
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              id="name"
              label="Name"
              variant="outlined"
              value={name}
              onChange={handleNameChange}
              required
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="description"
              label="Description"
              variant="outlined"
              value={description}
              onChange={handleDescriptionChange}
              multiline
              required
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="date"
              label="Date"
              type="date"
              variant="outlined"
              value={date}
              
              onChange={handleDateChange}
              required
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="time"
              label="Time"
              type="time"
              variant="outlined"
              value={time}
              onChange={handleTimeChange}
              required
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <input
              type="file"
              onChange={handleFileChange}
              multiple
            />
          </Grid>
        </Grid>
        <Button
          variant="contained"
          color="primary"
          type="submit"
        >
          Create Event
        </Button>
      </form>
    </Box>
  );
};

export default CreateEvent;
