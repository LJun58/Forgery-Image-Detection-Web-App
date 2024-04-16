import { useState } from "react";
import { useRouter } from "next/router";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import { useTheme } from "@mui/material/styles";

export function SuccessfulModal({ open, onClose }) {
  console.log(open);
  console.log(onClose);
  const router = useRouter();
  const theme = useTheme();

  const handleProceed = async () => {
    router.push("/login");
  };

  return (
    <Modal
      open={open}
      onClose={() => onClose()}
      closeAfterTransition
      keepMounted
    >
      <Fade
        in={open}
        unmountOnExit
      >
        <Box
          sx={{
            ...theme.components.ModalBox.styleOverrides.root,
          }}
          textAlign="center"
        >
          <Typography
            variant="modalTitle"
            gutterBottom
            sx={{ color: "#FF0000", marginBottom: "30px" }}
          >
            Successful Registered
          </Typography>

          <Typography variant="h4">
            Please Proceed to Login Page to Login.
          </Typography>

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
              //   disabled={isDeleting}
              onClick={handleProceed}
            >
              Proceed
            </Button>
          </Stack>
        </Box>
      </Fade>
    </Modal>
  );
}
