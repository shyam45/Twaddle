import React, { useContext , useRef } from "react";
import { signupContext } from "./Signup";
import { Box, Button, Typography } from "@mui/material";
import SensorOccupiedOutlinedIcon from "@mui/icons-material/SensorOccupiedOutlined";
import { useState } from "react";
import axios from "axios";
const Stepper3 = () => {
  const { stepIncrement, setsignupData ,signupData} = useContext(signupContext);
  const [profile,setProfile] = useState('')
  const inputRef = useRef(null);
  const handleClick = () => {
    inputRef.current.click();
  };
  const handleFileChange = event => {
    setProfile(event.target.files && event.target.files[0])
  }
  const handleSubmit = () =>{
    const formData = new FormData()
    formData.append("file",profile)
    formData.append("upload_preset","u7lj9tra")
    axios.post("https://api.cloudinary.com/v1_1/djkop1xi1/image/upload",formData).then((response)=>{
      console.log()
      setsignupData({...signupData,profile:response.data.url})
    })
    stepIncrement()
  }
  return (
    <Box
      display="flex"
      flexDirection={"column"}
      alignItems="center"
      justifyContent="center"
    >
      <Typography sx={{ marginTop: "2rem" }} variant="h5">
        Upload a profile picture
      </Typography>
      <Box
        component="form"
        sx={{
          display: "flex",
          justifyContent: "center",
          width: { xs: "70%" },
          margin: { xs: 3 },
          alignItems: { xs: "center" },
        }}
      >
        <input
            style={{ display: "none" }}
            ref={inputRef}
            type="file"
            name="profile"
            onChange={handleFileChange}
          />
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          sx={{
            height: "10rem",
            width: "10rem",
            borderRadius: "50%",
            backgroundColor: "white",
          }}
          onClick={handleClick}
        >
        {profile ?  <img src={URL.createObjectURL(profile)} alt="" style={{height : "9rem",width:"9rem",borderRadius:"50%"}}></img> :<SensorOccupiedOutlinedIcon sx={{ fontSize: "5rem" }} />}
        </Box>
      </Box>
      <Box>
        <Button
          variant="outlined"
          sx={{ margin: "2rem" }}
          onClick={handleSubmit}
        >
          {profile ? 'Next' : 'Skip'}
        </Button>
      </Box>
    </Box>
  );
};

export default Stepper3;
