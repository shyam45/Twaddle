import React, { useState } from "react";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import AppsIcon from "@mui/icons-material/Apps";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import AddToPhotosIcon from "@mui/icons-material/AddToPhotos";
import ListGroup from "../../ListGroup";
import { Box } from "@mui/system";
import { Modal, Popover } from "@mui/material";
import Addpost from "../AddPost/Addpost";
import { client } from "../../../utils/axiosClient";

const Icons = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [modal, setModal] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const handleClick = async (event) => {
    setAnchorEl(event.currentTarget);
    const response = await client.get(
      "user/notifications/633940dba75a6ecb02c520c4"
    );
    setNotifications(response.data);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  return (
    <>
      <AppsIcon />
      <ChatBubbleOutlineOutlinedIcon
        sx={{ fontSize: "1.5rem", color: "#757575" }}
      />
      <AddToPhotosIcon
        sx={{ fontSize: "1.5rem", color: "#757575" }}
        onClick={() => {
          setModal(true);
        }}
      />
      <Modal
        open={modal}
        onClose={() => {
          setModal(false);
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 600,
            border: 0,
            boxShadow: 24,
          }}
        >
          <Addpost setModal={setModal} />
        </Box>
      </Modal>
      <NotificationsNoneOutlinedIcon
        sx={{ fontSize: "1.5rem", color: "#757575" }}
        aria-describedby={id}
        variant="contained"
        onClick={handleClick}
      />
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
      >
        <ListGroup notifications={notifications} />
      </Popover>
    </>
  );
};

export default Icons;
