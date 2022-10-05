import { Grid } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import Appbar from "../../components/Home/Appbar/Appbar";
import Posts from "../../components/Home/Posts/Posts";
import Profile from "../../components/Home/Profile/Profile";
import Suggetion from "../../components/Home/suggetion/suggetion";
import Story from "../../components/Home/Story/Story";
import { client } from "../../utils/axiosClient";

const Home = () => {
  const [user,setUser] = useState({})
  const [posts,setPosts] = useState([])
  useEffect(() => {
    client.get('/user/633940dba75a6ecb02c520c4').then((response)=>{
      setUser(response.data[0])
      client.get('/post/timeline/633940dba75a6ecb02c520c4').then((response)=>{
        setPosts(response.data)
      })
    })
  }, [])
  return (
    <>
      <Appbar />
      <Box sx={{ marginTop: "1.5rem", marginX: { xs: ".5rem", md: "5rem" } }}>
        <Grid container spacing={3}>
          <Grid
            item
            sx={{ display: { xs: "none", md: "block" }, position: "sticky" }}
            md={3}
          >
            <Profile {...user}/>
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Story />
            {
              posts.map((post)=>{
                return <Posts {...post}/>
              })
            } 
          </Grid>
          <Grid item sx={{ display: { xs: "none", md: "block" } }} md={3}>
            <Suggetion />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Home;
