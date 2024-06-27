import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Button } from "@mui/material";
import warning from "@/assets/danger.png";

const skipPopup = ({ open, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose}>
        {/* <CheatingPopup open={showPopup} onClose={handleClose} /> */}
      <DialogTitle>
        Popup Title
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <img
          src={warning}
          alt="Popup"
          style={{ width: "100%", marginBottom: "20px" }}
        />
        <DialogContentText>Rule-breaking detected !</DialogContentText>
        <DialogContentText>
          Lorem ipsum dolor sit amet consectetur. Blandit lacus mattis imperdiet
          amet nisi convallis. Sit sit rutrum enim sagittis ut.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default skipPopup;
