import { Alert, Grid } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthProvider';
import { db } from '../firebase';

export default function Announcement() {
  const [error, setError] = useState("")

  const { currentUser, logout } = useAuth()

  



  const [linkArr, setLinkArr] = useState([]);

  const [userInfo, setUserInfo] = useState({userId: "", role: ' ', division:' ', subdivision:' '})



  useEffect(() => {
    const getLinks = async(info) => 
    {
        // console.log(userInfo)
        const q = query(collection(db, "Announcements"), where("division", "==", info.division), where("subdivision", "==", info.subdivision));
        const docSnap = await getDocs(q);

        const arr = [];
        docSnap.forEach((doc) => {
            arr.push({...doc.data(), id:doc.id});
          });        

        setLinkArr(arr);
        // console.log(linkArr)
    };
    const x = async()=>{
        const q = query(collection(db, "details"), where("userId", "==", currentUser.uid));
        const querySnapshot = await getDocs(q);
        // console.log("Hi")
        const userList = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })); 
        // console.log(userList)
        
        getLinks(userList[0]);
        
      }
      x();

  }, []);

  const delay = ms => new Promise(
    resolve => setTimeout(resolve, ms)
  );

  

  return (
    <div sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      {error && <Alert onClose={() => {setError("")}} severity="error" sx={{mb: 2}}>{error}</Alert>}
      <div className='centerer' sx={{ width: '80%', margin: '0 auto', overFlow: "scroll"}}>
        <div className='foodwrapper'>
          {linkArr.map((item) => (
            <Grid item key={item.id} xs={12} sm={6} md={4} lg={10}   sx={{ 
        display: 'flex', 
        justifyContent: 'center' 
    }}>
            <Card 
    sx={{ 
        minWidth: 550, 
        maxWidth: '90%', // Decrease the width here
        mb: 2, 
        backgroundColor: 'rgba(128, 0, 128, 0.1)', // Change the background color here
        border: '1px solid #888',
        boxShadow: '5px 5px 15px rgba(0, 0, 0, 0.3)' 
    }} 
    className='foodcard'
>
                <CardContent sx={{ textAlign: 'center' }}>
                  <Typography variant="h5" component="div" sx={{ mb: 1, fontSize: "2em" }}>
                    {item.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{fontSize: '1.5em'}}>
                    {item.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </div>
      </div>
    </div>
  )
}