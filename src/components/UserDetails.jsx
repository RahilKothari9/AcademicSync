import { Avatar, Box, FormControlLabel, FormLabel, RadioGroup, TextField } from '@mui/material';
import Radio from '@mui/material/Radio';
import { collection, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { db } from '../firebase'; // Import db from firebase.js

//import css
import './css/userDetails';


const UserDetails = () => {
 const [users, setUsers] = useState([]);

 useEffect(() => {
    const fetchUsers = async () => {
      const userCollection = collection(db, "details");
      const userSnapshot = await getDocs(userCollection);
      const userList = userSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
      setUsers(userList);
    };

    fetchUsers();
 }, []);

 return (
  <div>
    {/* <Box>
      {users.map(user => (
        <Box key={user.id} sx={{ marginBottom: 2 }}>
          <Typography variant="h6" color="error">User Details</Typography>
          <Typography variant="body1" color="error">Division: {user.division}</Typography>
          <Typography variant="body1" color="error">Subdivision: {user.subdivision}</Typography>
          <Typography variant="body1" color="error">Branch: {user.branch}</Typography>
          <Typography variant="body1" color="error">Semester: {user.semester}</Typography>
          <Typography variant="body1" color="error">User ID: {user.userId}</Typography>
          <Typography variant="body1" color="error">Roll Number: {user.rollNumber}</Typography>
        </Box>
      ))}
    </Box> */}


    <div >
        <div className='userIcon'>
          <Avatar  
  alt="Remy Sharp"
  src="/broken-image.jpg"></Avatar>
        </div>

        <div className='profileContent'>
          <div className='profileContentWrapper'>
            
            <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
    <div className='name'>
    <TextField
          id="standard-helperText"
          label="Name"
          
          variant="standard"
        />
    </div>
      <div className='email'>
      <TextField
          id="standard-helperText"
          label="Email"
          
          variant="standard"
        />
  
      </div>
      
      <div className='course'>
      <FormLabel id="demo-radio-buttons-group-label">Course</FormLabel>
  <RadioGroup
    aria-labelledby="demo-radio-buttons-group-label"
    defaultValue="COMPS"
    name="radio-buttons-group"
  >
    <FormControlLabel value="COMPS" control={<Radio />} label="COMPS" />
    <FormControlLabel value="IT" control={<Radio />} label="IT" />
    <FormControlLabel value="EXCP" control={<Radio />} label="EXPC" />
    <FormControlLabel value="EXTC" control={<Radio />} label="EXTC" />
    
  </RadioGroup>
  
      </div>
      <div className='roll_no'>
      <TextField
          id="standard-number"
          label="Number"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          variant="standard"
        />
      </div>



    </Box>
            
          </div>
        </div>
    </div>
    </div>
 );
};

export default UserDetails;
