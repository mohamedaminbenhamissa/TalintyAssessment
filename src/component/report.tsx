import React, { FC, useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Divider,
  Typography,
  IconButton,
  Box,
  TextField,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AttachFileOutlinedIcon from "@mui/icons-material/AttachFileOutlined";
import SendIcon from "@mui/icons-material/Send";
import { useTranslation } from "@/hooks/useTranslation";

interface ReportPopupProps {
  open: boolean;
  onClose: () => void;
}

const ReportPopup: FC<ReportPopupProps> = ({ open, onClose }) => {
  const [file, setFile] = useState<File | null>(null);
  const { t, i18n } = useTranslation("report");

  useEffect(() => {
    document.dir = i18n.language === "ar" ? "rtl" : "ltr";
  }, [i18n.language]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setFile(files[0]);
    }
  };

  const handleAttachFile = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const fileInputRef = React.useRef<HTMLInputElement>(null);

  return (
    <Dialog open={open} onClose={onClose} sx={{ borderRadius: "20px" }}>
      <DialogTitle
        sx={{
          bgcolor: "#D3D3D3",
          color: "#fff",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {t("title")}
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            color: "#fff",
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <Divider />
      <DialogContent>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            mx: "auto",
            mt: 2,
            gap: 1,
          }}
        >
          <TextField
            id="outlined-basic"
            variant="outlined"
            multiline
            minRows={10}
            maxRows={15}
            placeholder={t("pholder")}
            sx={{
              width: "100%",
            }}
          />
          <input
            ref={fileInputRef}
            type="file"
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
        </Box>
      </DialogContent>
      <DialogActions sx={{ p: 2, justifyContent: "space-between" }}>
        <Button
          variant="outlined"
          color="primary"
          sx={{
            borderColor: "#023651",
            color: "#023651",
            backgroundColor: "transparent",
            px: 4,
            py: 1,
            borderRadius: "10px",
            ":hover": {
              borderColor: "#023651",
              backgroundColor: "transparent",
              color: "#023651",
            },
          }}
          size="small"
          startIcon={<AttachFileOutlinedIcon />}
          onClick={handleAttachFile}
        >
          {t("btnfile")}
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          sx={{
            background: "#023651",
            color: "#fff",
            px: 4,
            py: 1,
            borderRadius: "10px",
            ":hover": {
              background: "#023651",
              color: "#fff",
            },
          }}
          size="small"
          endIcon={<SendIcon />}
        >
          {t("btnsend")}
        </Button>
      </DialogActions>
      {file && (
        <DialogContent>
          <Typography variant="body2">
            {t("file")} {file.name}
          </Typography>
        </DialogContent>
      )}
      <DialogContent>
        <Typography variant="body2">{t("guide")}</Typography>
      </DialogContent>
    </Dialog>
  );
};

export default ReportPopup;
