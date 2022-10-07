import { Grid } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import Appbar from "../../components/Home/Appbar/Appbar";
import Posts from "../../components/Home/Posts/Posts";
import Profile from "../../components/Home/Profile/Profile";
import Suggetion from "../../components/Home/suggetion/suggetion";
import Story from "../../components/Home/Story/Story";
import { client } from "../../utils/axiosClient";
import { createContext } from "react";
import { useNavigate } from "react-router-dom";
export const userContext = createContext();

const Home = () => {
  const navigate = useNavigate()
  const [user, setUser] = useState({});
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    client.get("/user/633940dba75a6ecb02c520c4", {
      headers: {
      'Content-Type': 'application/json',
      'authorization' : localStorage.getItem("accesstoken")
      }
    }).then((response) => {
      setUser(response.data[0]);
      client.get("/post/timeline/633940dba75a6ecb02c520c4").then((response) => {
        setPosts(response.data);
      });
    }).catch(()=>{
      navigate('/login')
    })
  }, []);
  return (
    <>
      <userContext.Provider
        value={{
          _id: "633940dba75a6ecb02c520c4",
          fullName: "Shyam M",
          email: "shyammtvr@gmail.com",
          phone: 7356877448,
          username: "shyam_tvr",
          password:
            "$2b$10$bY2tQ1NYyMxwQwtv/6QL1eMO9Qhe8Gf2FZULw7W7vjsPFgQQhFL/q",
          profile:
            "https://res.cloudinary.com/djkop1xi1/image/upload/v1664605992/ocuetsk2uvem9qewayjr.jpg",
          coverPicture:
            "https://res.cloudinary.com/djkop1xi1/image/upload/v1663589668/cld-sample-2.jpg",
          about: "MERN Stack develepor",
          followers: ["633943c3a75a6ecb02c520c6"],
          following: ["633943c3a75a6ecb02c520c6"],
          Posts: [],
          isAdmin: false,
          desc: "I am a self-taught Mern stack Develepor",
          city: "Calicut",
          bookmarks: [],
          createdAt: { $date: "2022-10-02T07:42:19.376Z" },
          updatedAt: { $date: "2022-10-06T05:56:50.580Z" },
          __v: 0,
          notifications: [
            {
              action: "liked",
              user_id: "633940dba75a6ecb02c520c4",
              likedBy: "shyam_tvr",
              post_id: "633d6b09b8c1cddb50f87386",
              time: 1664989402275,
            },
            {
              action: "liked",
              user_id: "633943c3a75a6ecb02c520c6",
              likedBy: "man_and_his_plans",
              post_id: "633d6b09b8c1cddb50f87386",
              time: 1665027213917,
            },
          ],
        }}
      >
        <Appbar />
        <Box sx={{ marginTop: "1.5rem", marginX: { xs: ".5rem", md: "5rem" } }}>
          <Grid container spacing={3}>
            <Grid
              item
              sx={{ display: { xs: "none", md: "block" }, position: "sticky" }}
              md={3}
            >
              <Profile {...user} />
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
              {posts.map((post) => {
                return <Posts {...post} />;
              })}
            </Grid>
            <Grid item sx={{ display: { xs: "none", md: "block" } }} md={3}>
              <Suggetion />
            </Grid>
          </Grid>
        </Box>
      </userContext.Provider>
    </>
  );
};

export default Home;
