import React, { useState, useEffect } from "react";
import { getSession, useSession } from "next-auth/react";
import axios from "axios";
import {
  Box,
  Typography,
  CircularProgress,
  Avatar,
  Button,
  TextField,
  Alert,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import Stack from "@mui/material/Stack";
import { useRouter } from "next/router";
import Snackbar from "@mui/material/Snackbar";

function stringToColor(string) {
  let hash = 0;
  let i;

  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }

  return color;
}

function stringAvatar(name) {
  const initials = name
    .split(" ")
    .map((part) => part[0])
    .join("");
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: initials,
  };
}

function ProfilePage({ profile }) {
  const [editMode, setEditMode] = useState(false);
  const [editedProfile, setEditedProfile] = useState(profile);
  const [originalProfile, setOriginalProfile] = useState(profile);
  const { data: session } = useSession();
  const router = useRouter();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [contactError, setContactError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [usernameError, setUsernameError] = useState("");

  // Update editedProfile state when profile prop changes
  useEffect(() => {
    setEditedProfile(profile);
    setOriginalProfile(profile);
  }, [profile]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProfile({ ...editedProfile, [name]: value });
  };

  const handleEdit = () => {
    setOriginalProfile(editedProfile);
    setEditMode(true);
  };

  const handleSave = async () => {
    if (!editedProfile.username) {
      setUsernameError("Please enter a username.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(editedProfile.email)) {
      setEmailError("Please enter a valid email address.");
      return;
    }

    const contactRegex = /^\d+$/;
    if (!contactRegex.test(editedProfile.contact)) {
      setContactError("Please enter a valid contact number.");
      return;
    }

    const response = await fetch("/api/profile", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        // Authorization: $(session.user.accessToken),
        // withCredentials: true,
      },
      body: JSON.stringify({
        userId: session.user.id,
        editedProfile: editedProfile,
      }),
    });

    if (response.ok) {
      setOpenSnackbar(true);
      setSnackbarSeverity("success");
      setSnackbarMessage("Profile updated successfully!");
      router.push(router.asPath);
      // After successfully saving, update the originalProfile state
      setOriginalProfile(editedProfile);
      // Disable edit mode
      setEditMode(false);
      setUsernameError("");
      setEmailError("");
      setContactError("");
    } else {
      const errCode = response.status;
      const errMessage = await response.json();
      setOpenSnackbar(true);
      setSnackbarSeverity("error");
      setSnackbarMessage(
        `${response.status} - ${response.statusText} : ${errMessage.message}\nPlease try again.`
      );
      setUsernameError("");
      setEmailError("");
      setContactError("");
      // alert(
      //   `${response.status} - ${response.statusText} : ${errMessage.message}\nPlease try again.`
      // );

      switch (errCode) {
        case 400: {
          router.push("/400");
          break;
        }
        case 404: {
          router.push("/404");
          break;
        }
        case 500: {
          router.push("/500");
          break;
        }
        default: {
          router.push("/error");
          break;
        }
      }
    }
  };

  const handleCancel = () => {
    setEditedProfile(originalProfile);
    setEditMode(false);
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: 4,
      }}
    >
      {profile ? (
        <Box
          sx={{
            width: "100%",
            maxWidth: 400,
            bgcolor: "#fff",
            borderRadius: 8,
            p: 4,
            display: "flex",
            flexDirection: "column",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar
              // alt={profile.username}
              // src={profile.avatarUrl}
              sx={{ width: 100, height: 100 }}
              // style={{ fontSize: "2rem" }}
              {...stringAvatar(profile.username)}
            />
            <Typography
              variant="h6"
              sx={{ marginBottom: 2, color: "#333", fontWeight: "bold" }} // Added fontWeight: "bold"
            >
              {profile.username}
            </Typography>
          </Box>

          <Typography
            variant="h4"
            sx={{ color: "#666", marginBottom: 1, fontWeight: "bold" }} // Added fontWeight: "bold"
          >
            Username:
          </Typography>
          <TextField
            name="username" // Corrected the name attribute to "username"
            value={editMode ? editedProfile.username : profile.username}
            onChange={handleInputChange}
            variant="outlined"
            fullWidth
            error={!!usernameError}
            helperText={usernameError}
            InputProps={{
              readOnly: !editMode,
              sx: { mb: 2 },
            }}
          />

          <Typography
            variant="h4"
            sx={{ color: "#666", marginBottom: 1, fontWeight: "bold" }} // Added fontWeight: "bold"
          >
            Email:
          </Typography>
          <TextField
            name="email"
            value={editMode ? editedProfile.email : profile.email}
            onChange={handleInputChange}
            variant="outlined"
            fullWidth
            error={!!emailError}
            helperText={emailError}
            InputProps={{
              readOnly: !editMode,
              sx: { mb: 2 },
            }}
          />
          <Typography
            variant="h4"
            sx={{ color: "#666", marginBottom: 1, fontWeight: "bold" }} // Added fontWeight: "bold"
          >
            Contact:
          </Typography>
          <TextField
            name="contact"
            value={editMode ? editedProfile.contact : profile.contact}
            onChange={handleInputChange}
            variant="outlined"
            fullWidth
            error={!!contactError}
            helperText={contactError}
            InputProps={{
              readOnly: !editMode,
              sx: { mb: 2 },
            }}
            required
          />
          {!editMode && (
            <Stack
              direction="row"
              spacing={2}
              justifyContent="flex-end"
            >
              <Button
                variant="contained"
                onClick={handleEdit}
                startIcon={<EditIcon />}
                sx={{ mt: 2 }}
              >
                Edit
              </Button>
            </Stack>
          )}
          {editMode && (
            <Stack
              direction="row"
              spacing={2}
              justifyContent="flex-end"
            >
              <Button
                variant="outlined"
                onClick={handleCancel}
                startIcon={<CancelIcon />}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                onClick={handleSave}
                startIcon={<SaveIcon />}
                sx={{ mr: 2 }}
              >
                Save
              </Button>
            </Stack>
          )}
          <Snackbar
            open={openSnackbar}
            autoHideDuration={6000} // Optional: Hide automatically after 6 seconds
            onClose={handleSnackbarClose}
          >
            <Alert severity={snackbarSeverity}>{snackbarMessage}</Alert>
          </Snackbar>
        </Box>
      ) : (
        <CircularProgress />
      )}
    </Box>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  let profile = null;

  if (session) {
    try {
      const response = await axios.get("http://localhost:3000/api/profile", {
        headers: {
          Cookie: context.req.headers.cookie,
        },
      });
      profile = response.data;
    } catch (error) {
      console.error("Failed to fetch profile:", error);
    }
  } else {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: {
      profile,
    },
  };
}

export default ProfilePage;
