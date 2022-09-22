import { Button, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { signupContext } from './Signup'
import React, { useContext, useEffect, useState } from 'react'
import { usernameValidation } from '../utils/validation'
import { client } from '../utils/axiosClient'
import { toast } from "react-toastify";

const Stepper4 = () => {
  const {signupData,setsignupData,stepIncrement} = useContext(signupContext)
  const [error, setError] = useState({});
  const [submit, setSubmit] = useState(false);
  const [username, setUsername] = useState("")
  const handleChange = (e) => {
    setUsername(e.target.value);
  };
  const handleSubmit = () => {
    setError(usernameValidation(username));
    client.post("/usernamevalid",{username : username})
    .then(()=>{
      setSubmit(true);
    })
    .catch(()=>{
      toast.warning("username already taken")
    })
  };
  useEffect(() => {
    if (Object.keys(error).length === 0 && submit) {
      setsignupData({...signupData,username:username})
      stepIncrement()
    } 
  }, [error,submit]);
    return (
        <Box 
        display="flex"
        flexDirection={"column"}
        alignItems="center"
        justifyContent="center"
        >
          <Typography sx={{marginTop : '2rem'}} variant='h6'>Set a unique username</Typography>
        <Box
          component="form"
          sx={{
            width: { xs: "70%" },
            margin: { xs: 3 },
            alignItems: { xs: "center" },
          }}
        >
          <TextField
            id="standard-basic"
            type='text'
            margin="dense"
            label="username"
            variant="standard"
            error ={error.username ? true : false}
            helperText={error.username && `${error.username}`}
            onChange={handleChange}
            sx={{ width: { xs: "100%" } }}
          />
        </Box>
        <Box>
          <Button variant='outlined' sx={{margin:'2rem'}} onClick={handleSubmit}>Next</Button>
        </Box>
        </Box>
    )
}

export default Stepper4