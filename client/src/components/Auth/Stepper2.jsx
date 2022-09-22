import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { signupContext } from "./Signup";
import React, { useContext, useState } from "react";
import OtpInput from "react-otp-input";
import { client } from "../utils/axiosClient";

const Stepper2 = () => {
  const { stepIncrement, signupData } = useContext(signupContext);
  const [otp, setOtp] = useState("");
  const handleChange = (otp) => {
    setOtp(otp);
  };
  const handleSubmit = () => {
    client
      .post("/verifyotp", { phone: signupData.phone, otp: otp })
      .then((response) => {
        if (response.status === 200) {
          stepIncrement();
        }
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
        Enter OTP
      </Typography>
      <Typography variant="body1" sx={{ color: "GrayText", fontSize: "10px" }}>
        OTP is sended to{" "}
        <span style={{ fontWeight: "bold" }}>{signupData.phone}</span>
      </Typography>
      <Box>
        <OtpInput
          value={otp}
          onChange={handleChange}
          numInputs={6}
          shouldAutoFocus
          focusStyle={{ outline: "none" }}
          inputStyle={{
            width: "1.5rem",
            border: "none",
            borderBottom: "2px solid blue",
            backgroundColor: "unset",
            margin: "2rem 0.5rem",
          }}
          isInputNum={true}
        />
      </Box>
      <Typography variant="caption">Didn't recieve the Code ?</Typography>
      <Typography
        variant="body1"
        sx={{
          fontSize: "14px",
          fontWeight: 800,
          color: "#1976d2",
          cursor: "pointer",
        }}
      >
        Resend
      </Typography>
      <Box>
        <Button
          variant="outlined"
          sx={{ margin: "2rem" }}
          onClick={handleSubmit}
        >
          Next
        </Button>
      </Box>
    </Box>
  );
};

export default Stepper2;