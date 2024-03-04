import React from 'react';
import { useState } from 'react';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Box,
  Button,
  Typography,
  createTheme,
  ThemeProvider,
  Alert,
  TextField,
} from '@mui/material';
import { db } from '../firebase'; // Import db from firebase.js
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import { auth } from '../firebase';


// Custom theme with red and black colors
const theme = createTheme({
  palette: {
    primary: {
      main: '#FF0000', // Red color
    },
    text: {
      primary: '#FF0000', // Black color
    },
  },
});

const Details = () => {
  
  const [loading, setLoading] = useState(false);

  const divisions = ['A', 'B', 'C', 'D'];
  const subdivisions = ['1', '2', '3'];
  const branches = ['Computer Engineering'];
  const semesters = ['1', '2', '3', '4', '5', '6', '7', '8'];

  const [selectedDivision, setSelectedDivision] = useState('');
  const [selectedSubdivision, setSelectedSubdivision] = useState('');
  const [selectedBranch, setSelectedBranch] = useState('');
  const [selectedSemester, setSelectedSemester] = useState('');
  const [rollNumber, setRollNumber] = useState('');


  const handleDivisionChange = (event) => setSelectedDivision(event.target.value);
  const handleSubdivisionChange = (event) => setSelectedSubdivision(event.target.value);
  const handleBranchChange = (event) => setSelectedBranch(event.target.value);
  const handleSemesterChange = (event) => setSelectedSemester(event.target.value);

  const [alertOpen, setAlertOpen] = useState(false); // State to control alert visibility

 const handleSubmit = async () => {
    setLoading(true); // Set loading to true when processing starts
    const userId = auth.currentUser.uid; // Assuming auth is imported from firebase.js
    const details = {
      division: selectedDivision,
      subdivision: selectedSubdivision,
      branch: selectedBranch,
      semester: selectedSemester,
      userId: userId,
      rollNumber: rollNumber,
    };

    // Check if a document with the same userId already exists
    const q = query(collection(db, "details"), where("userId", "==", userId));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      // If no documents match the query, add the new document
      await addDoc(collection(db, "details"), details);
      console.log("Document added successfully.");
    } else {
      console.log("A document with this userId already exists.");
      setAlertOpen(true); // Show the alert
    }

    setLoading(false); // Set loading to false when processing is done
 };

 const handleAlertClose = () => {
    setAlertOpen(false); // Hide the alert
 };

  return (
    <ThemeProvider theme={theme}>
      <Box padding={2} width={'70vw'}>
        <Typography variant="h3" color="primary" gutterBottom>
          Add Details
        </Typography>

        <FormControl fullWidth sx={{ marginBottom: 2 }}>
          <InputLabel>Branch</InputLabel>
          <Select
            value={selectedBranch}
            onChange={handleBranchChange}
            label="Branch"
            sx={{ width: '100%', '& .MuiOutlinedInput-root': { borderColor: 'primary' } }}
          >
            {branches.map((branch) => (
              <MenuItem key={branch} value={branch}>
                {branch}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth sx={{ marginBottom: 2 }}>
          <InputLabel>Semester</InputLabel>
          <Select
            value={selectedSemester}
            onChange={handleSemesterChange}
            label="Semester"
            sx={{ width: '100%' }}
          >
            {semesters.map((semester) => (
              <MenuItem key={semester} value={semester}>
                {semester}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth sx={{ marginBottom: 2 }}>
          <InputLabel>Division</InputLabel>
          <Select
            value={selectedDivision}
            onChange={handleDivisionChange}
            label="Division"
            sx={{ width: '100%' }}
          >
            {divisions.map((division) => (
              <MenuItem key={division} value={division}>
                {division}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth sx={{ marginBottom: 2 }}>
          <InputLabel>Subdivision</InputLabel>
          <Select
            value={selectedSubdivision}
            onChange={handleSubdivisionChange}
            label="Subdivision"
            sx={{ width: '100%' }}
          >
            {subdivisions.map((subdivision) => (
              <MenuItem key={subdivision} value={subdivision}>
                {subdivision}
              </MenuItem>
            ))}
          </Select>
          <TextField
            label="Roll Number"
            variant="outlined"
            value={rollNumber}
            onChange={(e) => setRollNumber(e.target.value)}
            fullWidth
            margin="normal"
        />
        </FormControl>

        <Button variant="contained" color="primary" onClick={handleSubmit}>
            Submit
        </Button>

        {alertOpen && (
        <Alert severity="error" onClose={handleAlertClose}>
          A document with this userId already exists.
        </Alert>
      )}
      </Box>
    </ThemeProvider>
  );
};

export default Details;
