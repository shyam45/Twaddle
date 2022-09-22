import * as React from "react";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import PersonIcon from '@mui/icons-material/Person';
import KeyIcon from '@mui/icons-material/Key';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import PasswordIcon from '@mui/icons-material/Password';
import BadgeIcon from '@mui/icons-material/Badge';
import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 15,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        "linear-gradient(90deg, rgba(0,122,250,1) 0%, rgba(166,166,250,1) 58%, rgba(0,125,255,1) 100%);",
      transition: "all 0.5s ease-in",
      width: "100%",
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        "linear-gradient(90deg, rgba(0,122,250,1) 0%, rgba(166,166,250,1) 58%, rgba(0,125,255,1) 100%);",
      width: "100%",
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    width: 0,
    border: 0,
    backgroundColor:
      theme.palette.mode === "dark" ? theme.palette.grey[800] : "#eaeaf0",
    borderRadius: 1,
  },
}));

const ColorlibStepIconRoot = styled("div")(({ theme, ownerState }) => ({
  backgroundColor:
    theme.palette.mode === "dark" ? theme.palette.grey[700] : "#ccc",
  zIndex: 1,
  color: "blue",
  padding: 2,
  width: 25,
  height: 25,
  display: "flex",
  borderRadius: "50%",
  transition: "all  ease-in 0.2s 0.5s",
  justifyContent: "center",
  alignItems: "center",
  ...(ownerState.active && {
    // background: "linear-gradient(to bottom, #3E01F6, #87ABF9)",
    backgroundColor:'white',
    border: '1px solid blue',
    boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)",
  }),
  ...(ownerState.completed && {
    color:"white",
    border:"1px solid white",
    backgroundColor: "blue",
  }),
}));

function ColorlibStepIcon(props) {
  const { active, completed, className } = props;

  const icons = {
    1: <PersonIcon/>,
    2: <PasswordIcon/>,
    3: <ImageOutlinedIcon />,
    4: <BadgeIcon fontSize="16px"/>,
    5: <KeyIcon />
  };

  return (
    <ColorlibStepIconRoot
      ownerState={{ completed, active }}
      className={className}
    >
      {icons[String(props.icon)]}
    </ColorlibStepIconRoot>
  );
}

ColorlibStepIcon.propTypes = {
  /**
   * Whether this step is active.
   * @default false
   */
  active: PropTypes.bool,
  className: PropTypes.string,
  /**
   * Mark the step as completed. Is passed to child components.
   * @default false
   */
  completed: PropTypes.bool,
  /**
   * The label displayed in the step icon.
   */
  icon: PropTypes.node,
};

const steps = [
  "Tell us more about you",
  "OTP",
  "upload profile image",
  "Secure your Account",
  "Finish"
];

export default function CustomizedSteppers({step}) {
  return (
    <Stack sx={{ width: "100%", marginTop: "2rem" }} spacing={4}>
      <Stepper
        alternativeLabel
        activeStep={step}
        connector={<ColorlibConnector />}
      >
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel StepIconComponent={ColorlibStepIcon}></StepLabel>
          </Step>
        ))}
      </Stepper>
    </Stack>
  );
}
