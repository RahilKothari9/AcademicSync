import {
  Alert,
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../components/css/singup.css";
import { useAuth } from "../contexts/AuthProvider";
import { db } from "../firebase"; // Import db from firebase.js
import "./css/details.css";

// Custom theme with red and black colors
const theme = createTheme({
  palette: {
    primary: {
      main: "#40c9ff", // sku blue color
    },
    text: {
      primary: "#000000", // Black color
    },
  },
});

const Details = () => {
  const [loading, setLoading] = useState(false);

  const divisions = ["A", "B", "C", "D"];
  const subdivisions = ["1", "2", "3"];
  const branches = ["Computer Engineering"];
  const semesters = ["1", "2", "3", "4", "5", "6", "7", "8"];

  const [selectedDivision, setSelectedDivision] = useState("");
  const [selectedSubdivision, setSelectedSubdivision] = useState("");
  const [selectedBranch, setSelectedBranch] = useState("");
  const [selectedSemester, setSelectedSemester] = useState("");
  const [rollNumber, setRollNumber] = useState("");
  const navigate = useNavigate();

  const handleDivisionChange = (event) =>
    setSelectedDivision(event.target.value);
  const handleSubdivisionChange = (event) =>
    setSelectedSubdivision(event.target.value);
  const handleBranchChange = (event) => setSelectedBranch(event.target.value);
  const handleSemesterChange = (event) =>
    setSelectedSemester(event.target.value);

  const [alertOpen, setAlertOpen] = useState(false); // State to control alert visibility
  const { currentUser } = useAuth();
  // console.log(currentUser)
  const handleSubmit = async () => {
    setLoading(true); // Set loading to true when processing starts
    const userId = currentUser.uid; // Assuming auth is imported from firebase.js
    const details = {
      division: selectedDivision,
      subdivision: selectedSubdivision,
      branch: selectedBranch,
      semester: selectedSemester,
      userId: userId,
      rollNumber: rollNumber,
      role: "Student",
      name: currentUser.displayName,
      email: currentUser.email,
    };

    // Check if a document with the same userId already exists
    const q = query(collection(db, "details"), where("userId", "==", userId));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      // If no documents match the query, add the new document
      await addDoc(collection(db, "details"), details);
      console.log("Document added successfully.");
      navigate("/");
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
    <div className="body">
      <ThemeProvider theme={theme}>
        <Box
          mt={"10vh"}
          padding={2}
          width={"80%"}
          className=" form-container"
          sx={{ margin: "auto", position: "absolute" }}
        >
          <Typography variant="h3" color="white" gutterBottom align="center">
            Add Details
          </Typography>

          <FormControl fullWidth sx={{ marginBottom: 1.5 }}>
            <InputLabel sx={{ color: "white" }}>Branch</InputLabel>
            <Select
              labelStyle={{ color: "#ff0000" }}
              value={selectedBranch}
              onChange={handleBranchChange}
              label="Branch"
              MenuProps={{
                PaperProps: {
                  style: {
                    backgroundColor: "#EBE8E2", // Set your desired lighter shade here
                  },
                },
              }}
              sx={{
                width: "100%",
                "& .MuiOutlinedInput-root": { borderColor: "primary" },
                color: "white",
                ".MuiOutlinedInput-notchedOutline": {
                  borderColor: "rgba(228, 219, 233, 0.25)",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "rgba(228, 219, 233, 0.25)",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "rgba(228, 219, 233, 0.25)",
                },
                ".MuiSvgIcon-root ": {
                  fill: "white !important",
                },
              }}
            >
              {branches.map((branch) => (
                <MenuItem key={branch} value={branch}>
                  {branch}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth sx={{ marginBottom: 1.5 }}>
            <InputLabel sx={{ color: "white" }}>Semester</InputLabel>
            <Select
              value={selectedSemester}
              onChange={handleSemesterChange}
              label="Semester"
              MenuProps={{
                PaperProps: {
                  style: {
                    backgroundColor: "#EBE8E2", // Set your desired lighter shade here
                  },
                },
              }}
              sx={{
                width: "100%",
                "& .MuiOutlinedInput-root": { borderColor: "primary" },
                color: "white",
                ".MuiOutlinedInput-notchedOutline": {
                  borderColor: "rgba(228, 219, 233, 0.25)",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "rgba(228, 219, 233, 0.25)",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "rgba(228, 219, 233, 0.25)",
                },
                ".MuiSvgIcon-root ": {
                  fill: "white !important",
                },
              }}
            >
              {semesters.map((semester) => (
                <MenuItem key={semester} value={semester}>
                  {semester}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth sx={{ marginBottom: 1.5 }}>
            <InputLabel sx={{ color: "white" }}>Division</InputLabel>
            <Select
              value={selectedDivision}
              onChange={handleDivisionChange}
              label="Division"
              MenuProps={{
                PaperProps: {
                  style: {
                    backgroundColor: "#EBE8E2", // Set your desired lighter shade here
                  },
                },
              }}
              sx={{
                width: "100%",
                "& .MuiOutlinedInput-root": { borderColor: "primary" },
                color: "white",
                ".MuiOutlinedInput-notchedOutline": {
                  borderColor: "rgba(228, 219, 233, 0.25)",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "rgba(228, 219, 233, 0.25)",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "rgba(228, 219, 233, 0.25)",
                },
                ".MuiSvgIcon-root ": {
                  fill: "white !important",
                },
              }}
            >
              {divisions.map((division) => (
                <MenuItem key={division} value={division}>
                  {division}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth sx={{ marginBottom: 1.5 }}>
            <InputLabel sx={{ color: "white" }}>Subdivision</InputLabel>
            <Select
              value={selectedSubdivision}
              onChange={handleSubdivisionChange}
              label="Subdivision"
              MenuProps={{
                PaperProps: {
                  style: {
                    backgroundColor: "#EBE8E2", // Set your desired lighter shade here
                  },
                },
              }}
              sx={{
                width: "100%",
                "& .MuiOutlinedInput-root": { borderColor: "primary" },
                color: "white",
                ".MuiOutlinedInput-notchedOutline": {
                  borderColor: "rgba(228, 219, 233, 0.25)",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "rgba(228, 219, 233, 0.25)",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "rgba(228, 219, 233, 0.25)",
                },
                ".MuiSvgIcon-root ": {
                  fill: "white !important",
                },
              }}
            >
              {subdivisions.map((subdivision) => (
                <MenuItem key={subdivision} value={subdivision}>
                  {subdivision}
                </MenuItem>
              ))}
            </Select>
            <TextField
              className="white"
              label="Roll Number"
              variant="outlined"
              value={rollNumber}
              inputProps={{
                // Add inputProps here
                type: "number",
                minLength: 11,
                maxLength: 11,
              }}
              sx={{
                mt: 4,
                width: "100%",
                "& .MuiOutlinedInput-root": { borderColor: "primary" },
                "& .MuiOutlinedInput-input": {
                  // Target the input element directly
                  color: "#40c9ff",
                  textAlign: "center",
                },
                ".MuiOutlinedInput-notchedOutline": {
                  borderColor: "rgba(228, 219, 233, 0.25)",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "rgba(228, 219, 233, 0.25)",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "rgba(228, 219, 233, 0.25)",
                },
                ".MuiSvgIcon-root ": {
                  fill: "white !important",
                },
                ".MuiInputLabel-root": {
                  color: "white",
                },
              }}
              onChange={(e) => setRollNumber(e.target.value)}
              fullWidth
              margin="normal"
            />
          </FormControl>

          <Button
            variant="contained"
            backgroundColour="white"
            color="primary"
            onClick={handleSubmit}
            sx={{ display: "block", margin: "auto" }}
          >
            Submit
          </Button>

          {alertOpen && (
            <Alert
              severity="error"
              onClose={handleAlertClose}
              sx={{ marginTop: 2 }}
            >
              A document with this userId already exists.
            </Alert>
          )}
        </Box>
      </ThemeProvider>
    </div>
  );
};

export default Details;
