import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import { Timestamp, addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthProvider';
import { db, storage } from '../firebase';



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
    <Box 
      sx={{
        
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px',
        ml: 25
       
      }}>
      <Typography variant="h6" gutterBottom>
        Create Event
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <TextField
              id="name"
              label="Name"
              variant="outlined"
              value={name}
              color='secondary'
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
              color='secondary'
              onChange={handleDescriptionChange}
              multiline
              required
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="date"
              label="Date"
              type="date"
              variant="outlined"
              value={date}
              onChange={handleDateChange}
              required
              fullWidth
              color='secondary'
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="time"
              label="Time"
              type="time"
              variant="outlined"
              value={time}
              onChange={handleTimeChange}
              required
              color='secondary'
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={12}>
  <div
    style={{
      height: '100px',
      border: '1px dashed white',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}
    
    onDragOver={(event) => {
      event.preventDefault();
    }}
    onDrop={(event) => {
      event.preventDefault();
      setFiles(Array.from(event.dataTransfer.files));
    }}
  >
    <input
      type="file"
      style={{ display: 'none' }}
      onChange={(event) => {
        setFiles(Array.from(event.target.files));
      }}
      multiple
      id="file-input"
    />
    <label htmlFor="file-input">Drag and drop PDF files here or click to select</label>
  </div>
</Grid>
        </Grid>
        <Button
        sx={{marginTop: '3em', width: '50%', height: '3.5em'}}
          variant="contained"
          color="secondary"
          type="submit"
        >
          Create Event
        </Button>
      </form>
     
    </Box>
  );
};

export default CreateEvent;
