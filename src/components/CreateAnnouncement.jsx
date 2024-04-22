import { Alert, Button, TextField, Box } from '@mui/material';
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { AuthProvider, useAuth } from '../contexts/AuthProvider';
import { db } from "../firebase";
import { Timestamp } from "firebase/firestore";


const CreateAnnouncement= () => {

    const TitleRef = useRef()
    const TextRef = useRef()
    const { currentUser } = useAuth();
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const dbRef = collection(db, "Announcements")
    const history = useNavigate()
    const [userInfo, setUserInfo] = useState({userId: "", role: ' ', division:' ', subdivision:' '})
    const [showAlert, setShowAlert] = useState(false); // State for showing the alert
    const [title, setTitle] = useState(''); // State for title input
    const [text, setText] = useState(''); // State for text input

    useEffect( () => {
        
        const x = async()=>{
        const q = query(collection(db, "details"), where("userId", "==", currentUser.uid));
        const querySnapshot = await getDocs(q);
        
        const userList = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })); 
        setUserInfo(userList[0])
        // console.log(userInfo)
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
            user_id: currentUser.uid,
            timestamp: Timestamp.now(),
            
         };
         addDoc(dbRef, data)
         .then(docRef => {
             console.log("Document has been added successfully");
             setShowAlert(true); // Show the alert
             setTitle(''); // Reset the title
             setText(''); // Reset the text
             setTimeout(() => setShowAlert(false), 5000); // Hide the alert after 5 seconds
         })
         .catch(error => {
             console.log(error);
         })
        setLoading(false);
        
    }
 
    return (
        <AuthProvider>
            <React.Fragment>
                <Box sx={{ml: '15%'}}>
            <div className='formWrapper'>
            <h2>Create Announcement</h2>
            
            {showAlert && 
                <Alert severity="success" sx={{ mb: 2 }}>
                    Announcement created successfully!
                </Alert>
            }

            <form onSubmit={handleSubmit} sx={{display: "flex", flexDirection: "column"}}>
                
            <TextField
                type="Title"
                variant='outlined'
                color='secondary'
                label="Title"
                inputRef={TitleRef}
                value={title}
                onChange={e => setTitle(e.target.value)}
                sx={{mb: 2, width: '80%'}}
                required
            />
            <TextField
                type="Text"
                variant='outlined'
                color='secondary'
                label="Announcement"
                inputRef={TextRef}
                value={text}
                onChange={e => setText(e.target.value)}
                sx={{mb: 2, width: '80%'}}
            />
                
                <div>
                <Button disabled= {loading} variant="outlined" color="secondary" type="submit" className='submitButton font'  sx={{ 
                    mt: 2, // Add some margin-top for spacing
                    padding: '10px 20px', // Increase padding for a larger button
                    fontSize: '1.1em', // Increase font size
                    textTransform: 'none', // Remove uppercase transformation
                }}>Add Item</Button>
                </div>
                
            </form>
            </div>
            </Box>
        </React.Fragment>
        </AuthProvider>
        
    )
}
 
export default CreateAnnouncement;