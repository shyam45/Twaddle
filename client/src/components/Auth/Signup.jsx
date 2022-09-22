import { Box } from "@mui/system";
import React from "react";
import { createContext } from "react";
import CustomizedSteppers from "./Stepper";
import Stepper1 from "./Stepper1";
import Stepper2 from "./Stepper2"; 
import Stepper3 from "./Stepper3";
import Stepper4 from "./Stepper4";
import Stepper5 from "./Stepper5";
import Stepper6 from "./Stepper6";

export const signupContext = createContext();

function Signup() {
  const [signupData,setsignupData]=React.useState({
    fullName: "",
    email: "",
    phone: "",
    profile : "",
    username : "",
    password : ""
  })
  const [step, setStep] = React.useState(0);
  const currentStep = (param) => {
    switch (param) {
      case 0:
        return <Stepper1/>
      case 1:
        return <Stepper2 />
      case 2:
        return <Stepper3 />
      case 3:
        return <Stepper4 />
      case 4:
        return <Stepper5 />
      case 5: 
        return <Stepper6 />
      default : 
        return <></>
    }
  };
  const stepIncrement = () => {
    setStep(step + 1);
  };
  const stepDecrement = () => {
    setStep(step - 1);
  }
  return (
      <>
        <Box xs={12} width='100%'>
          <CustomizedSteppers step={step} />
        </Box>
        <Box width='100%' height="80%" sx={{display: "flex",flexDirection: "column",alignItems: "center",}}>
          <signupContext.Provider value={{ signupData,setsignupData,stepIncrement,stepDecrement, step }}>
            {currentStep(step)}
          </signupContext.Provider>
        </Box>
      </>
  );
}

export default Signup;
