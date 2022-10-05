import React from "react";
import { Box } from "@mui/system";
import logo from "../../../assets/logo.png"
import './Appbar.css'
import Icons from "../icons/Icons";
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { InputAdornment, TextField } from "@mui/material";
const Appbar = () => {
  return (
    <>
      <Box className="appbar">
        <Box className="menusection">
          <img className="logo" src={logo} alt=""/>
          <Box sx={{
            width: "40%",
            display: "flex",
            justifyContent: "space-around"}}>
          <Icons/>
          </Box>
        </Box>
        <Box className="profilsection">
          <TextField placeholder="Search" InputProps={{
            endAdornment: <InputAdornment position="end"><SearchOutlinedIcon /></InputAdornment>,
          }}/>
          <img src="https://imgs.search.brave.com/loxLMHzPFMRkXU9FB1oW4pkw_t9qb10xHQ4ufsV9eFU/rs:fit:860:692:1/g:ce/aHR0cHM6Ly93d3cu/a2luZHBuZy5jb20v/cGljYy9tLzUyLTUy/NjIzN19hdmF0YXIt/cHJvZmlsZS1oZC1w/bmctZG93bmxvYWQu/cG5n" alt="" style={{height:"1.5rem",borderRadius:"50%"}}/>
        </Box>
      </Box>
    </>
  );
};

export default Appbar;
