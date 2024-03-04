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
} from '@mui/material';

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
  // Dummy data for dropdowns
  const divisions = ['A', 'B', 'C', 'D'];
  const subdivisions = ['1', '2', '3'];
  const branches = ['Computer Engineering'];
  const semesters = ['1', '2', '3', '4', '5', '6', '7', '8'];

  const [selectedDivision, setSelectedDivision] = useState('');
  const [selectedSubdivision, setSelectedSubdivision] = useState('');
  const [selectedBranch, setSelectedBranch] = useState('');
  const [selectedSemester, setSelectedSemester] = useState('');

  const handleDivisionChange = (event) => setSelectedDivision(event.target.value);
  const handleSubdivisionChange = (event) => setSelectedSubdivision(event.target.value);
  const handleBranchChange = (event) => setSelectedBranch(event.target.value);
  const handleSemesterChange = (event) => setSelectedSemester(event.target.value);

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
        </FormControl>

        <Button variant="contained" color="primary">
          Submit
        </Button>
      </Box>
    </ThemeProvider>
  );
};

export default Details;
