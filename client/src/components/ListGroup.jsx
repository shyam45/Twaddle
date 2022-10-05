import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import IconButton from "@mui/material/IconButton";
import { Divider, ListSubheader, Typography } from "@mui/material";
import { Box } from "@mui/system";

export default function ListGroup() {
  return (
    <List sx={{
            width: "100%", 
            maxWidth: 500, 
            bgcolor: "background.paper" 
        }}
        subheader={
            <ListSubheader component="div" id="nested-list-subheader">
              Friend Requests
            </ListSubheader>
          }
        >
            <Divider />
      {["sanu_sanu", "sanal_dominic"].map((value) => (
        <ListItem
          key={value}
          secondaryAction={
            <IconButton aria-label="comment">
              <PersonAddAltIcon />
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
            <Typography sx={{fontSize:'13px'}}>{value}</Typography>
            <Typography sx={{fontSize:'10px'}}>{value} started following you . </Typography>
          </Box>
        </ListItem>
      ))}
    </List>
  );
}
