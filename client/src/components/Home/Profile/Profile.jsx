import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea } from "@mui/material";

export default function Profile({ ...user }) {
  return (
    <Card sx={{ maxWidth: 250 }}>
      <CardActionArea>
        <img
          src={user.profile}
          alt=""
          style={{
            height: "5rem",
            width: "5rem",
            borderRadius: "50%",
            border: "2px solid white",
            position: "absolute",
            top: "25%",
            left: "0.5rem",
            objectPosition: "cover",
          }}
        />
        <CardMedia
          component="img"
          height="120"
          image={user.coverPicture}
          alt="green iguana"
        />
        <CardContent>
          <Typography
            key="1"
            gutterBottom
            variant="h5"
            component="div"
            sx={{ marginTop: "1rem", marginBottom: "0" }}
          >
            {user.fullName}
          </Typography>
          <Typography
            key="2"
            variant="body2"
            color="text.secondary"
            sx={{ fontSize: "10px" }}
          >
            {user.username}
          </Typography>
          <Typography
            key="3"
            variant="body2"
            color="text.secondary"
            sx={{ fontSize: "10px", marginTop: "0.5rem" }}
          >
            {`${user.Posts ? user.Posts.length : "0"} Posts | ${
              user.following ? user.following.length : "0"
            } Following | ${
              user.followers ? user.followers.length : "0"
            } Followers`}
          </Typography>
          <Button
            variant="outlined"
            sx={{ fontSize: "0.65rem", marginTop: "0.5rem" }}
          >
            View Profile
          </Button>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
