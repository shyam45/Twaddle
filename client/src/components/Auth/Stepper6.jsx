import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useContext } from "react";
import svg from "../../assets/Followers-rafiki.png";
import { signupContext } from "./Signup";
import { client } from "../../utils/axiosClient";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { loginToggle } from "../../Pages/Auth/Auth";

const Stepper6 = () => {
  const navigate = useNavigate()
  const { setToggle } = useContext(loginToggle);
  const { signupData } = useContext(signupContext);
  const handleSubmit = () => {
    client.post(
        "/signup",
        { ...signupData }
      )
      .then(() => {
        toast.success("Signed up Successfully");
        navigate("/login");
        setToggle(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Box
      display="flex"
      flexDirection={"column"}
      alignItems="center"
      justifyContent="center"
    >
      <Typography sx={{ marginTop: "2rem" }} variant="h6">
        You're all set. Ready?
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
        <img src={svg} alt="" style={{ height: "150px", width: "100%" }} />
      </Box>
      <Button variant="outlined" onClick={handleSubmit}>
        Let me in!
      </Button>
    </Box>
  );
};

export default Stepper6;
