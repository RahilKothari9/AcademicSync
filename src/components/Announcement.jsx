import React, {useState, useEffect} from 'react'
import { Button, Alert, Grid } from '@mui/material';
import { useAuth } from '../contexts/AuthProvider';
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { collection, query, where, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from '../firebase'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

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
    
    <div>
      {error && <Alert onClose={() => {setError("")}} severity="error" sx={{mb: 2}}>{error}</Alert>}

    
    <div className='centerer'>
    <div className='foodwrapper'>
          {linkArr.map((item) => (
            <Grid item key={item.id} xs={12} sm={6} md={4} lg={10}>
              
              <Card sx={{ minWidth: 250 }} className='foodcard'>
                <CardContent>
                
                  <h2>{item.name}</h2>
                    
                  <h3>{item.description}</h3>
                  
                </CardContent>

              </Card>
            </Grid>
            
          ))}
        </div>
    </div>
    
    </div>
  )
}