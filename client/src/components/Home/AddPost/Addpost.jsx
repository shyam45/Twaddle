import React, { useRef, useState } from "react";
import { Box } from "@mui/system";
import { Avatar, Button, Card, CardContent, CardHeader, CardMedia, IconButton, Typography } from "@mui/material";
import { red } from "@mui/material/colors";
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import MoreVertIcon from "@mui/icons-material/MoreVert";
import axios from "axios";
import { client } from "../../../utils/axiosClient";

function Addpost (props) {
  const [image,setImage] = useState('')
  const [description,setDescription] = useState('')
  const inputRef = useRef(null);
  const handleClick = () => {
    inputRef.current.click();
  };
  const handleFileChange = event => {
    setImage(event.target.files && event.target.files[0])
  }

  const handleSubmit = ()=> {
    const formData = new FormData()
    formData.append("file",image)
    formData.append("upload_preset","u7lj9tra")
    axios.post("https://api.cloudinary.com/v1_1/djkop1xi1/image/upload",formData).then((response)=>{
      client.post('/post',{authorId:'1234',image:response.data.url,description:description})
    }).then(()=>{
      props.setModal(false)
    })
  }
  return (
    <>
      <Card sx={{ width: "100%", marginY: "1rem" }}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              S
            </Avatar>
          }
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title="shyam_tvr"
          subheader="September 14, 2016"
          subheaderTypographyProps={{ fontSize: "10px" }}
        />
        <CardMedia>
          <Box
            component="form"
            sx={{
              height:'20rem',
              display: "flex",
              flexDirection:'column',
              justifyContent: "center",
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
              flexDirection='column'
              justifyContent="center"
              alignItems="center"
              sx={{
                width: "100%",
                backgroundColor: "white",
              }}
              onClick={handleClick}
            >
              {image ? (
                <img
                  src={URL.createObjectURL(image)}
                  alt=""
                  style={{height:'20rem',}}
                ></img>
              ) : (
                <>
                    <AddPhotoAlternateOutlinedIcon sx={{ fontSize: "5rem" }} />
                    <Typography >Upload or drop a file right here</Typography>
                </>
              )}
            </Box>
          </Box>
        </CardMedia>

        <CardContent sx={{ padding: " 1rem", display: "flex"}}>
          <Typography
            variant="body2"
            color="text.secondary"
            style={{ fontSize: "10px", maxLines: 1 }}
          >
            <span
              style={{
                fontSize: "12px",
                fontWeight: 800,
                marginRight: "0.5rem",
              }}
            >
              shyam_tvr
            </span>
          </Typography>
          <textarea placeholder="Add a Description" style={{width:'70%'}} onChange = {(e)=>{setDescription(e.target.value)}}/>
          <Button variant='contained' sx={{marginLeft:'0.5rem'}} onClick = {handleSubmit}>Post </Button>
        </CardContent>
      </Card>
    </>
  );
}

export default Addpost;
