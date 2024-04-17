import React, {useState, useRef} from 'react';
import { TextField, Button, Container, Stack, Alert } from '@mui/material';
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from '../contexts/AuthProvider';
import { AuthProvider } from '../contexts/AuthProvider';
import { getFirestore, collection, setDoc, addDoc} from "firebase/firestore";
import {createUserWithEmailAndPassword} from "firebase/auth";
import { auth, db } from "../firebase"
import { useEffect } from 'react';
import { getDocs, query, where } from 'firebase/firestore';

 
const CreateAnnouncement= () => {

    const TitleRef = useRef()
    const TextRef = useRef()
    const { currentUser } = useAuth();
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const dbRef = collection(db, "Announcements")
    const history = useNavigate()
    const [userInfo, setUserInfo] = useState({userId: "", role: ' ', division:' ', subdivision:' '})

    useEffect( () => {
        
        const x = async()=>{
        const q = query(collection(db, "details"), where("userId", "==", currentUser.uid));
        const querySnapshot = await getDocs(q);
        
        const userList = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })); 
        setUserInfo(userList[0])
        console.log(userInfo)
      }
      x();
    //   console.log(userInfo)
     }, [])


    async function handleSubmit(e) {
        e.preventDefault();
        const data = {
            name: TitleRef.current.value,
            division: userInfo.division,
            subdivision: userInfo.subdivision,
            description: TextRef.current.value,
            user_id: currentUser.uid
         };
         addDoc(dbRef, data)
         .then(docRef => {
             console.log("Document has been added successfully");
         })
         .catch(error => {
             console.log(error);
         })
        setLoading(false);
        
    }
 
    return (
        <AuthProvider>
            <React.Fragment>
            <div className='formWrapper'>
            <h2>Create Announcement</h2>
            
            <form onSubmit={handleSubmit}>
                
                <TextField
                    type="Title"
                    variant='outlined'
                    color='secondary'
                    label="Title"
                    
                    inputRef={TitleRef}
                    sx={{mb: 2}}
                    fullWidth
                    required
                    
            
                />
                <TextField
                    type="Text"
                    variant='outlined'
                    color='secondary'
                    label="Descriprtion/Recipe"
                    
                    inputRef={TextRef}
                    fullWidth
                    
                    sx={{mb: 2}}
          
                />
                
                
                <Button disabled= {loading} variant="outlined" color="secondary" type="submit" className='submitButton font'>Add Item</Button>
            </form>
            </div>
     
        </React.Fragment>
        </AuthProvider>
        
    )
}
 
export default CreateAnnouncement;