import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';import './App.css';
import router from "./config/router";
import { AuthProvider } from './contexts/AuthProvider';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Details from './components/Details';
import Private from './components/Private';
import Dashboard from './components/Dashboard';
import Signup from './components/Signup';


function App() {
  const [count, setCount] = useState(0)
  const auth = getAuth()
  const user = auth.currentUser;

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
      <AuthProvider>
        <Router>
          <Routes>
            <Route exact path='/' element={<Private/>}>
                    <Route exact path='/' element={<Dashboard />}/>
            </Route>
            <Route exact path='/details' element={<Private/>}>
                    <Route exact path='/details' element={<Details />}/>
            </Route>
            <Route exact path='/signup' element={<Signup/>}>
                    
            </Route>
          </Routes>
        </Router>
      </AuthProvider>
      
    </>
  )
}

export default App
