import { Button, TextField, Typography, Modal } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { client } from "../../utils/axiosClient";
import { loginValidation } from "../../utils/validation";
import { toast } from "react-toastify";
import Forgotpassword from "./Forgotpassword";

const Login = ({ action }) => {
  let navigate = useNavigate();
  const [error, setError] = useState({});
  const [submit, setSubmit] = useState(false);
  const [open, setOpen] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleClick = () => {
    client
      .post("/forgotpassword", { email: data.email })
      .then(() => setOpen(true))
      .catch((error) => toast.error(error.response.data.msg));
  };

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    setError(loginValidation(data));
    setSubmit(true);
  };

  useEffect(() => {
    if (Object.keys(error).length === 0 && submit) {
      client
        .post("/auth/login", { ...data })
        .then((response) => {
          toast.success("Logined succesfuly");
          localStorage.setItem("accesstoken", response.data.accessToken);
          navigate("/"); 
        })
        .catch((error) => {
          setData({
            email: "",
            password: "",
          });
          toast.error(error.response.data.msg);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error, submit]);

  return (
    <Box display="flex" alignItems="center" justifyContent="center">
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
          margin="dense"
          label="Email"
          variant="standard"
          value={data.email}
          onChange={handleChange}
          name="email"
          error={error.email ? true : false}
          helperText={error.email && `${error.email}`}
          sx={{ width: { xs: "100%" } }}
        />
        <TextField
          id="standard-basic"
          margin="dense"
          label="Password"
          variant="standard"
          name="password"
          value={data.password}
          error={error.password ? true : false}
          helperText={error.password && `${error.password}`}
          onChange={handleChange}
          type="password"
          sx={{ width: { xs: "100%" } }}
        />
        <Link
          style={{
            textDecoration: "none",
            color: "#1976d2",
            fontSize: "0.8rem",
            marginTop: "0.7rem",
          }}
          onClick={handleClick}
        >
          Forgot Password
        </Link>
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Forgotpassword />
        </Modal>
        <Button
          variant="outlined"
          sx={{ marginTop: 4, marginBottom: 3 }}
          fullWidth
          onClick={handleSubmit}
        >
          Login
        </Button>
        <Typography variant="body2" fontSize="0.7rem">
          You don't have an account ?{" "}
          <Link
            //to={"/signup"}
            style={{ textDecoration: "none", color: "#1976d2" }}
            onClick={() => {
              navigate("/signup");
              action(true);
            }}
          >
            Signup
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default Login;
