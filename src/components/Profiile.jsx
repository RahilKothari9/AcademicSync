import { Grid } from "@mui/material";
import { useEffect } from "react";
import { useParams } from "react-router";


import '../components/css/profile.css';
import UsereProfile from "./UsereProfile";

const Profile = ({ userProfile, setUserProfile }) => {
  const params = useParams();

  useEffect(() => {}, [params]);
  return (
    <>
      <Grid item xs={12} sm={6} md={4}>
        
        <UsereProfile
          userProfile={userProfile}
          setUserProfile={setUserProfile}
        />
        <FeaturedPosts />
        <Activity />

        <Experiences
          userProfile={userProfile}
          setUserProfile={setUserProfile}
        />
        <Education />
        <Licenses />
        <Skills />
        <Courses />
        <Interests />
      </Grid>
    </>
  );
};
export default Profile;