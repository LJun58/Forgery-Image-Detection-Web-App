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
      <Box
        sx={{
          maxWidth: "90vw", // Set maximum width to 90% of viewport width
          maxHeight: "90vh", // Set maximum height to 90% of viewport height
          overflowY: "auto", // Enable vertical scrolling if necessary
          position: "relative",
        }}
      >
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
