import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { DialogContentText } from "@mui/material";
import warning from "@/assets/close-circle.png";

interface SkipPopupProps {
  open: boolean;
  onClose: () => void;
}

const skipPopup = ({ open, onClose }: SkipPopupProps) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      sx={{
        "& .MuiPaper-root": {
          borderRadius: "20px",
        },
      }}
    >
      <DialogTitle>
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
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <img
            src={warning}
            alt="Popup"
            style={{
              width: "100%",
              maxWidth: 150,
              height: "auto",
              marginBottom: "20px",
            }}
          />
          <DialogContentText align="center" sx={{ fontWeight: "bold" }}>
            Attention !
          </DialogContentText>
          <DialogContentText align="center">
            Sorry but you can’t skip the test questions imperdiet amet nisi
            convallis. Sit sit rutrum enim sagittis ut.
          </DialogContentText>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default skipPopup;
