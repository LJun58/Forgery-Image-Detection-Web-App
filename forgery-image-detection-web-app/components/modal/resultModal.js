import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import { useTheme } from "@mui/material/styles";
import FullImageModal from "./fullImageModal";

export function ResultModal({ open, onClose, results }) {
  const router = useRouter();
  const theme = useTheme();

  const [modalResults, setModalResults] = useState([]);
  const [fullImageOpen, setFullImageOpen] = useState(null); // Stores index of clicked image

  const handleFullImageOpen = (index) => {
    setFullImageOpen(index);
  };

  useEffect(() => {
    setModalResults(results);
  }, [results]); // Update only when results prop changes

  const [hoveredImage, setHoveredImage] = useState(null);

  const handleImageHover = (index) => {
    setHoveredImage(index);
  };

  const handleImageLeave = () => {
    setHoveredImage(null);
  };

  return (
    <Modal
      open={open}
      onClose={() => onClose()}
      closeAfterTransition
      keepMounted
      sx={{
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
            ...theme.components.ModalBox.styleOverrides.root,
            maxHeight: "80%",
            overflowY: "auto",
          }}
          textAlign="center"
        >
          <Typography
            variant="modalTitle"
            gutterBottom
            sx={{ color: "#FF0000", marginBottom: "30px" }}
          >
            Forgery Detection Results
          </Typography>

          {modalResults.length > 0 ? (
            modalResults.map((result, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "20px",
                  flexDirection: "row", // Display image and text side by side
                }}
              >
                <Button
                  onClick={() => handleFullImageOpen(index)}
                  style={{
                    width: "150px",
                    height: "150px",
                    marginRight: "20px", // Add margin to separate image and text
                    cursor: "pointer",
                  }}
                >
                  <img
                    src={result.url}
                    alt={`Image ${index + 1}`}
                    style={{
                      width: "auto",
                      height: "100%",
                      cursor: "pointer",
                    }}
                    onMouseEnter={() => handleImageHover(index)}
                    onMouseLeave={handleImageLeave}
                  />
                </Button>
                <Typography variant="body1">
                  {result.result === 0
                    ? "The image is authentic"
                    : "The image is forged."}
                </Typography>
              </Box>
            ))
          ) : (
            <Typography variant="body1">
              No images uploaded for detection.
            </Typography>
          )}

          {fullImageOpen !== null && (
            <FullImageModal
              open={true}
              imageUrl={modalResults[fullImageOpen].url}
              onClose={() => setFullImageOpen(null)}
            />
          )}

          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={11.25}
            marginTop={4.75}
            marginBottom={4}
          >
            <Button
              variant="contained"
              color="success"
              onClick={() => onClose()}
            >
              Finish
            </Button>
          </Stack>
        </Box>
      </Fade>
    </Modal>
  );
}
