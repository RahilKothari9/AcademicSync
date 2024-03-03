import { useEffect, useState } from 'react'
import Signup from './components/Signup'
import './App.css'
import { getAuth } from 'firebase/auth'

function App() {
  const [count, setCount] = useState(0)
  const auth = getAuth()
  const user = auth.currentUser;

  useEffect(()=>{
    console.log(auth)
    console.log(user)
  })
  return (
    <>
      <Signup/>
    </>
  )
}

export default App
