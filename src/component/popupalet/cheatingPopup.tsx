import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { DialogContentText } from "@mui/material";
import warning from "@/assets/close-circle.png";
import { useTranslation } from "@/hooks/useTranslation";

interface CheatingPopupProps {
  open: boolean;
  onClose: () => void;
}

const CheatingPopup = ({ open, onClose }: CheatingPopupProps) => {
  const { t } = useTranslation("popups");
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
          <DialogContentText
            align="center"
            sx={{ fontSize: 24, color: "#023651" }}
          >
            {t("violation")}
          </DialogContentText>
          <DialogContentText align="center">
            {t("violationmsg")}
          </DialogContentText>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CheatingPopup;
