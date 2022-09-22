import { Box, Button, TextField, Typography } from "@mui/material";
import { signupContext } from "./Signup";
import React, { useContext, useState } from "react";
import { validationP1 } from "../utils/validation";
import { useEffect } from "react";
import { client } from "../utils/axiosClient";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { loginToggle } from "../Pages/Auth/Auth";

const Stepper1 = () => {
  const navigate = useNavigate();
  const { stepIncrement, setsignupData, signupData } =
  useContext(signupContext);
  const [error, setError] = useState({});
  const [submit, setSubmit] = useState(false);
  const [data, setData] = useState({
    fullName: "",
    email: "",
    phone: "",
  });

  const { setToggle } = useContext(loginToggle);
  

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const getOtp = () => {
    client
      .post("/getotp", { phone: data.phone })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSubmit = () => {
    setError(validationP1(data));
    client
      .post("/user", { phone: data.phone, email: data.email })
      .then(() => {
        setSubmit(true);
      })
      .catch((error) => {
        toast.info(error.response.data.msg);
        navigate("/login");
        setToggle(false);
      });
  };

  useEffect(() => {
    if (Object.keys(error).length === 0 && submit) {
      setsignupData({ ...signupData, ...data });
      getOtp()
      stepIncrement();
    }
  }, [error, submit]);

  return (
    <Box
      display="flex"
      flexDirection={"column"}
      alignItems="center"
      justifyContent="center"
    >
      <Typography sx={{ marginTop: "2rem" }} variant="h5">
        Tell us more about you !
      </Typography>

      <Box
        component="form"
        sx={{
          width: { xs: "70%" },
          margin: { xs: 1 },
          alignItems: { xs: "center" },
        }}
      >
        <TextField
          margin="dense"
          label="Full Name"
          variant="standard"
          name="fullName"
          onChange={handleChange}
          error={error.fullName ? true : false}
          helperText={error.fullName && `${error.fullName}`}
          sx={{ width: { xs: "100%" } }}
        />
        <TextField
          id="standard-basic"
          margin="dense"
          label="E- mail"
          name="email"
          error={error.email ? true : false}
          helperText={error.email && `${error.email}`}
          variant="standard"
          onChange={handleChange}
          sx={{ width: { xs: "100%" } }}
        />
        <TextField
          id="standard-basic"
          margin="dense"
          name="phone"
          label="Phone number"
          variant="standard"
          error={error.phone ? true : false}
          helperText={error.phone && `${error.phone}`}
          onChange={handleChange}
          sx={{ width: { xs: "100%" } }}
        />
      </Box>
      <Box>
        <Button
          variant="outlined"
          sx={{ margin: "2rem" ,}}
          onClick={handleSubmit}
        >
          Next
        </Button>
      </Box>
    </Box>
  );
};

export default Stepper1;
