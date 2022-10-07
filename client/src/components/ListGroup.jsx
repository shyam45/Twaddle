import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import IconButton from "@mui/material/IconButton";
import { Divider, ListSubheader, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { useEffect } from "react";

export default function ListGroup({ notifications }) {
  const [notification, setNotifications] = useState([]);

  useEffect(() => {
    notifications.forEach((value) =>
      setNotifications((oldArray) => [...oldArray , value])
    );
  }, []);

  return (
    <List
      sx={{
        width: "100%",
        maxWidth: 500,
        bgcolor: "background.paper",
      }}
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          Notifications
        </ListSubheader>
      }
    >
      <Divider />
      {notification.map((value) => (
        <ListItem
          key={value.user_id}
          secondaryAction={
            <IconButton aria-label="comment">
              {value.followedBy && <PersonAddAltIcon />}
            </IconButton>
          }
        >
          <img
            src="https://imgs.search.brave.com/loxLMHzPFMRkXU9FB1oW4pkw_t9qb10xHQ4ufsV9eFU/rs:fit:860:692:1/g:ce/aHR0cHM6Ly93d3cu/a2luZHBuZy5jb20v/cGljYy9tLzUyLTUy/NjIzN19hdmF0YXIt/cHJvZmlsZS1oZC1w/bmctZG93bmxvYWQu/cG5n"
            alt=""
            style={{
              height: "1.5rem",
              borderRadius: "50%",
              marginRight: "5px",
            }}
          />
          <Box>
            <Typography sx={{fontSize:'13px'}}>{value.likedBy || value.followedBy}</Typography>
            <Typography sx={{fontSize:'10px'}}>{value.likedBy ? `${value.likedBy} liked your post.` : `${value.followedBy} started followed you.`}</Typography>
          </Box>
        </ListItem>
      ))}
    </List>
  );
}
