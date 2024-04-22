import React, { useEffect, useState } from 'react';
import { Container, Grid, Select, MenuItem, Typography, Table, TableContainer, TableHead, TableBody, TableRow, TableCell } from '@mui/material';
import { collection, getDocs, setDoc, query, where, doc } from 'firebase/firestore';
import { db } from '../firebase';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDivision, setSelectedDivision] = useState('');
  const [selectedSubdivision, setSelectedSubdivision] = useState('');
  const [selectedSemester, setSelectedSemester] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        if (!selectedDivision || !selectedSubdivision || !selectedSemester) return;

        const q = query(collection(db, 'details'), where('division', '==', selectedDivision), where('subdivision', '==', selectedSubdivision), where('semester', '==', selectedSemester));
        const querySnapshot = await getDocs(q);
        const usersData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setUsers(usersData);
        // console.log(users)
        setLoading(false);
      } catch (error) {
        console.error('Error fetching users:', error);
        setLoading(false);
      }
    };

    fetchUsers();
  }, [selectedDivision, selectedSubdivision, selectedSemester]);

  const handleChangeRole = async (userId, newRole) => {
    try {
      const userQuery = query(collection(db, 'details'), where('userId', '==', userId));
      const userQuerySnapshot = await getDocs(userQuery);
      if (!userQuerySnapshot.empty) {
        const userDocRef = doc(db, 'details', userQuerySnapshot.docs[0].id);
        await setDoc(userDocRef, { role: newRole }, { merge: true });
        // Update state to reflect the changed role
        setUsers(prevUsers => prevUsers.map(user => {
          if (user.userId === userId) {
            return { ...user, role: newRole };
          }
          return user;
        }));
      } else {
        console.error('User document not found.');
      }
    } catch (error) {
      console.error('Error updating role:', error);
    }
  };
  return (
    <Container sx={{ml:'20%'}}>
      <Typography variant="h3" gutterBottom>
        Admin Dashboard
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Select
            value={selectedDivision}
            onChange={(e) => setSelectedDivision(e.target.value)}
            fullWidth
            displayEmpty
          >
            <MenuItem value="" disabled>
              Select Class Division
            </MenuItem>
            <MenuItem value="A">A</MenuItem>
            <MenuItem value="B">B</MenuItem>
            <MenuItem value="C">C</MenuItem>
            <MenuItem value="D">D</MenuItem>
          </Select>
        </Grid>
        <Grid item xs={12}>
          <Select
            value={selectedSubdivision}
            onChange={(e) => setSelectedSubdivision(e.target.value)}
            fullWidth
            displayEmpty
          >
            <MenuItem value="" disabled>
              Select Subdivision
            </MenuItem>
            <MenuItem value="1">1</MenuItem>
            <MenuItem value="2">2</MenuItem>
            <MenuItem value="3">3</MenuItem>
          </Select>
        </Grid>
        <Grid item xs={12}>
          <Select
            value={selectedSemester}
            onChange={(e) => setSelectedSemester(e.target.value)}
            fullWidth
            displayEmpty
          >
            <MenuItem value="" disabled>
              Select Semester
            </MenuItem>
            {[...Array(8)].map((_, index) => (
              <MenuItem key={index + 1} value={String(index + 1)}>{index + 1}</MenuItem>
            ))}
          </Select>
        </Grid>
      </Grid>
      {loading ? (
        <Typography variant="body1"></Typography>
      ) : (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Role</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users.map(user => (
                    <TableRow key={user.id}>
                      <TableCell>{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        <Select
                          value={user.role}
                          onChange={(e) => {
                            // console.log(user)
                            handleChangeRole(user.userId, e.target.value)}}
                        >
                          <MenuItem value="Student">Student</MenuItem>
                          <MenuItem value="Class Admin">Class Admin</MenuItem>
                          <MenuItem value="Admin">Admin</MenuItem>
                        </Select>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      )}
    </Container>
  );
};

export default AdminDashboard;
