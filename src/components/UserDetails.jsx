import React, { useState, useEffect } from 'react';
import { db } from '../firebase'; // Import db from firebase.js
import { collection, getDocs } from 'firebase/firestore';
import { Typography, Box } from '@mui/material';

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
    <Box>
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
    </Box>
 );
};

export default UserDetails;