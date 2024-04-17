import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { RouterProvider } from "react-router-dom";
import './App.css';
import router from "./config/router";
import { AuthProvider } from './contexts/AuthProvider';

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
        <RouterProvider router={router} />
      </AuthProvider>
      
    </>
  )
}

export default App
