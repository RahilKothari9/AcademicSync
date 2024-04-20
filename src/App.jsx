import { ThemeProvider } from "@mui/material";
import { getAuth } from 'firebase/auth';
import { useState } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import Dashboard from './components/Dashboard';
import Details from './components/Details';
import Private from './components/Private';
import Profile from './components/Profiile';
import Signup from './components/Signup';
import { AuthProvider } from './contexts/AuthProvider';
import { ColorModeContext, useMode } from "./theme";


function App() {
  const [count, setCount] = useState(0)
  const auth = getAuth()
  const user = auth.currentUser;
  
  const [theme, colorMode] = useMode();

  // useEffect(()=>{
  //   console.log(user)
    
  // })
  // onAuthStateChanged(auth, (user) => {
  //   if (user) {
  //     console.log(user)
  //     const uid = user.uid;
  //     console.log(uid)
  //     // ...
  //   } else {
  //     // User is signed out
  //     // ...
  //     console.log("Not")
  //   }
  // });
  return (
    <>
      {/* <Signup/> */}
      <ColorModeContext.Provider value={colorMode}>
			<ThemeProvider theme={theme}>
      <AuthProvider>
        <Router>
          <Routes>
            <Route exact path='/' element={<Private/>}>
                    <Route exact path='/' element={<Dashboard location={"announcement"}/>}/>
            </Route>
            <Route exact path='/details' element={<Private/>}>
                    <Route exact path='/details' element={<Details />}/>
            </Route>
            <Route exact path='/ca' element={<Private/>}>
                    <Route exact path='/ca' element={<Dashboard location={"ca"} />}/>
            </Route>
            <Route exact path='/announcements' element={<Private/>}>
                    <Route exact path='/announcements' element={<Dashboard location={"announcement"} />}/>
            </Route>
            <Route exact path='/ce' element={<Private/>}>
                    <Route exact path='/ce' element={<Dashboard location={"ce"} />}/>
            </Route>
            <Route exact path='/events' element={<Private/>}>
                    <Route exact path='/events' element={<Dashboard location={"events"} />}/>
            </Route>
            <Route exact path='/admin' element={<Private/>}>
                    <Route exact path='/admin' element={<Dashboard location={"admin"} />}/>
            </Route>
            <Route exact path='/profile' element={<Private/>}>
                    <Route exact path='/profile' element={<Profile />}/>
            </Route>
            <Route exact path='/signup' element={<Signup/>}>  
                    
            </Route>
          </Routes>
        </Router>
      </AuthProvider>
      </ThemeProvider>
		</ColorModeContext.Provider>
      
    </>
  )
}

export default App
