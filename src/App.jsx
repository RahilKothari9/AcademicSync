import { useEffect, useState } from 'react'
import Signup from './components/Signup'
import './App.css'
import router from "./config/router";
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { BrowserRouter, Route, RouterProvider, Routes } from "react-router-dom";

function App() {
  const [count, setCount] = useState(0)
  const auth = getAuth()
  const user = auth.currentUser;

  useEffect(()=>{
    //console.log(auth)
    
  })
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
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
    <>
      {/* <Signup/> */}
      <RouterProvider router={router} />
    </>
  )
}

export default App
