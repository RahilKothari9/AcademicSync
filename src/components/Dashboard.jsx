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
import CreateAnnouncement from './CreateAnnouncement';
import Announcement from './Announcement';
import CreateEvent from './CreateEvent';
import Events from './Events';
import AdminDashboard from './Admin';

function Dashboard({location}) {

  const [theme, colorMode] = useMode();
  const auth = getAuth();
    const user = auth.currentUser;
    const navigate = useNavigate();
    // useEffect(()=>{
    //     if(!user)navigate("/signup")
    //     console.log(user)
    // },[])
   
	return (
		<ColorModeContext.Provider value={colorMode}>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<div className="app">
					<Sidebar />
					<main className="content">
						<Topbar />
            {location === "ca" && <CreateAnnouncement/>}
            {location === "announcement" && <Announcement/>}
			{location === 'ce' && <CreateEvent/>}
			{location === 'events' && <Events/>}
			{location === 'admin' && <AdminDashboard/>}
					</main>
				</div>
			</ThemeProvider>
		</ColorModeContext.Provider>
	);
  
}

export default Dashboard