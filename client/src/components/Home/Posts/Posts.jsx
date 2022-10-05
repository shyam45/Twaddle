import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import CommentIcon from "@mui/icons-material/Comment";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import "./Posts.css";
import Actions from "./Actions";
import { AvatarGroup, IconButton, Popover } from "@mui/material";
import { Box } from "@mui/system";
import Comment from "./comment";
import { useState } from "react";
import { useEffect } from "react";
import { client } from "../../../utils/axiosClient";

export default function Posts({ ...post }) {
  const users = {
    _id: { $oid: "633940dba75a6ecb02c520c4" },
    fullName: "Shyam M",
    email: "shyammtvr@gmail.com",
    phone: 7356877448,
    username: "shyam_tvr",
    password: "$2b$10$bY2tQ1NYyMxwQwtv/6QL1eMO9Qhe8Gf2FZULw7W7vjsPFgQQhFL/q",
    profile:
      "https://res.cloudinary.com/djkop1xi1/image/upload/v1664605992/ocuetsk2uvem9qewayjr.jpg",
    coverPicture:
      "https://res.cloudinary.com/djkop1xi1/image/upload/v1663589668/cld-sample-2.jpg",
    about: "MERN Stack develepor",
    followers: [],
    following: ["633943c3a75a6ecb02c520c6"],
    Posts: [],
    isAdmin: false,
    desc: "I am a self-taught Mern stack Develepor",
    city: "Calicut",
    bookmarks: [],
    createdAt: { $date: "2022-10-02T07:42:19.376Z" },
    updatedAt: { $date: "2022-10-04T07:22:13.814Z" },
    __v: 0,
  };
  const [like, setlike] = useState(post.likes ? post.likes.length : 0);
  const [isLiked, setIsLiked] = useState(
    post.likes.includes("633943c3a75a6ecb02c520c6") ? true : false
  );
  const [bookmarked, setBookmarked] = useState(
    users.bookmarks.includes(post._id) ? true : false
  );
  const [user, setUser] = useState({});
  const [expanded, setExpanded] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    client.get(`/user/${post.authorId}`).then((response) => {
      setUser(response.data[0]);
    });
  }, []);

  const handlebookmarks = () => {
    client
      .put(`/user/bookmark/${post._id}`, {
        user_id: "633940dba75a6ecb02c520c4",
      })
      .then(() => {
        setBookmarked(!bookmarked);
      });
  };

  const handleLike = () => {
    client
      .put(`/post/like/${post._id}`, { user_id: "633943c3a75a6ecb02c520c6" })
      .then(() => {
        setlike(isLiked ? like - 1 : like + 1);
        setIsLiked(!isLiked);
      });
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ width: "100%", marginY: "1rem" }}>
      <CardHeader
        avatar={
          user ? (
            <img
              src={user.profile}
              alt=""
              style={{
                height: "2.5rem",
                width: "2.5rem",
                borderRadius: "50%",
                border: "1px solid blue",
              }}
            />
          ) : (
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              {" "}
              S{" "}
            </Avatar>
          )
        }
        action={
          <IconButton aria-label="settings" onClick={handleClick}>
            <MoreVertIcon aria-describedby={id} variant="contained" />
          </IconButton>
        }
        title={user.username}
        subheader={Intl.DateTimeFormat("en", { dateStyle: "long" }).format(
          new Date(post.createdAt)
        )}
        subheaderTypographyProps={{ fontSize: "10px" }}
      />
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Actions />
      </Popover>
      <CardMedia component="img" image={post.image} />

      <CardContent sx={{ padding: "1rem" }}>
        <Typography
          variant="body2"
          color="text.secondary"
          style={{ fontSize: "10px", maxLines: 1 }}
        >
          <span
            style={{ fontSize: "12px", fontWeight: 800, marginRight: "0.5rem" }}
          >
            {user.username}
          </span>
          {post.description}
        </Typography>
        <Box sx={{ display: "flex" }}>
          <Typography
            variant="body2"
            style={{ fontSize: "10px", padding: "0.5rem" }}
          >{`${like} Likes`}</Typography>
          <AvatarGroup max={3} sx={{ marginLeft: "auto" }}>
            <Avatar
              sx={{ height: "1rem", width: "1rem" }}
              alt="Remy Sharp"
              src="/static/images/avatar/1.jpg"
            />
            <Avatar
              sx={{ height: "1rem", width: "1rem" }}
              alt="Travis Howard"
              src="/static/images/avatar/2.jpg"
            />
            <Avatar
              sx={{ height: "1rem", width: "1rem" }}
              alt="Cindy Baker"
              src="/static/images/avatar/3.jpg"
            />
          </AvatarGroup>
        </Box>
      </CardContent>

      <CardActions
        sx={{ padding: "0 1rem", marginBottom: ".5rem" }}
        disableSpacing
      >
        <IconButton aria-label="add to favorites" onClick={handleLike}>
          {isLiked ? (
            <FavoriteIcon sx={{ color: "black" }} />
          ) : (
            <FavoriteIcon />
          )}
        </IconButton>
        <IconButton aria-label="share" onClick={handlebookmarks}>
          {bookmarked ? (
            <BookmarkIcon sx={{ color: "black" }} />
          ) : (
            <BookmarkIcon />
          )}
        </IconButton>
        <CommentIcon
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
          sx={{ marginLeft: "auto", color: "text.secondary" }}
        />
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <Comment />
      </Collapse>
    </Card>
  );
}
