import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";

const FullImageModal = ({ open, imageUrl, onClose }) => (
  <Modal
    open={open}
    onClose={onClose}
    closeAfterTransition
    BackdropProps={{
      onClick: onClose, // Close on backdrop click
    }}
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <Fade
      in={open}
      unmountOnExit
    >
      <Box sx={{ position: "relative", width: "80%" }}>
        <img
          src={imageUrl}
          alt="Full Image"
          style={{ width: "100%" }}
        />
        <IconButton
          sx={{ position: "absolute", top: 10, right: 10, color: "red" }}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      </Box>
    </Fade>
  </Modal>
);

export default FullImageModal;
