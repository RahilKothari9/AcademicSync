import { Avatar, Box, FormControl, FormControlLabel, FormLabel, InputLabel, MenuItem, RadioGroup, Select, TextField } from '@mui/material';
import Radio from '@mui/material/Radio';
import { collection, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { db } from '../firebase'; // Import db from firebase.js

//import css
import "./css/userdetailes.css";


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
  <div className='whole-body'>
    


    
        <div className='userIcon' >
          <Avatar  alt="Remy Sharp"
            src="/broken-image.jpg" className='avatar'></Avatar>
            <p className='logout '>LOGOUT</p>

            <ul className='list hide' >
              <li>HOME</li>
              <li>PROFILE</li>
              <li>OPTIONS</li>
            </ul>
        </div>

        <div className='profileContent'>
          <div className='profileContentWrapper'>
            
            <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '90%' },
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
    className='radiogroup'
  
  >
    <FormControlLabel value="COMPS" control={<Radio />} label="COMPS" />
    <FormControlLabel value="IT" control={<Radio />} label="IT" />
    <FormControlLabel value="EXCP" control={<Radio />} label="EXPC" />
    <FormControlLabel value="EXTC" control={<Radio />} label="EXTC" />
    
  </RadioGroup>
  
      </div>
      <div className='roll_no' >
      <TextField
          id="standard-number"
          label="Roll Number"
          type="number"
          
          variant="standard"
          defaultValue={users.rollNumber}
        />
      </div>
      <div className='semester'>
      <FormControl sx={{width:"90%"}}  >
        <InputLabel id="demo-simple-select-label" >SEMESTER</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          
          label="Age"
          
        >
          <MenuItem value={1}>I</MenuItem>
          <MenuItem value={2}>II</MenuItem>
          <MenuItem value={3}>III</MenuItem>
          <MenuItem value={4}>IV</MenuItem>
          <MenuItem value={5}>V</MenuItem>
          <MenuItem value={6}>VI</MenuItem>
          <MenuItem value={7}>VII</MenuItem>
          <MenuItem value={8}>VIII</MenuItem>
        </Select>
      </FormControl>
      </div>



    </Box>
            
          </div>
          <div className='hideFUllscreen navigation'>
            <ul className='list-mobile' >
              <li>HOME</li>
              <li>PROFILE</li>
              <li>OPTIONS</li>
            </ul>
            </div>
        </div>
    </div>
    
 );
};

export default UserDetails;
