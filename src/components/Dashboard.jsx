import React from 'react'
import { Link } from 'react-router-dom';
import { ColorModeContext, useMode } from "../theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import Topbar from './Topbar';
import Sidebar from './Sidebar';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

function Dashboard() {

  const [theme, colorMode] = useMode();
  const auth = getAuth();
    const user = auth.currentUser;
    const navigate = useNavigate();
    // useEffect(()=>{
    //     if(!user)navigate("/signup")
    //     console.log(user)
    // },[])
    onAuthStateChanged(auth, (user) => {
        if (user) {
          console.log(user)
          const uid = user.uid;
          console.log(uid)
          // ...
        } else {
          // User is signed out
          // ...
          console.log("Not")
        }
      });

	return (
		<ColorModeContext.Provider value={colorMode}>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<div className="app">
					<Sidebar />
					<main className="content">
						<Topbar />
					</main>
				</div>
			</ThemeProvider>
		</ColorModeContext.Provider>
	);
  
}

export default Dashboard