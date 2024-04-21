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
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import Stack from "@mui/material/Stack";

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
    if (!session) {
      // Handle the case where the user is not authenticated (redirect, etc.)
      console.error("User is not authenticated");
      return;
    }

    const sessionToken = session?.accessToken;

    try {
      await axios.put("/api/saveProfile", {
        editedProfile,
      });

      // After successfully saving, update the originalProfile state
      setOriginalProfile(editedProfile);
      // Disable edit mode
      setEditMode(false);
    } catch (error) {
      // console.error("Failed to save profile:", error);
      // Handle error saving profile
    }
  };

  const handleCancel = () => {
    setEditedProfile(originalProfile);
    setEditMode(false);
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
              {...stringAvatar(profile.username)}
              sx={{ width: 70, height: 70 }}
            />
            <Typography
              variant="h6"
              sx={{ marginBottom: 2, color: "#333", fontWeight: "bold" }}
            >
              {profile.username}
            </Typography>
          </Box>

          <Typography
            variant="h4"
            sx={{ color: "#666", marginBottom: 1, fontWeight: "bold" }}
          >
            Username:
          </Typography>
          <TextField
            name="username"
            value={editMode ? editedProfile.username : profile.username}
            onChange={handleInputChange}
            variant="outlined"
            fullWidth
            InputProps={{
              readOnly: !editMode,
              sx: { mb: 2 },
            }}
          />

          <Typography
            variant="h4"
            sx={{ color: "#666", marginBottom: 1, fontWeight: "bold" }}
          >
            Email:
          </Typography>
          <TextField
            name="email"
            value={editMode ? editedProfile.email : profile.email}
            onChange={handleInputChange}
            variant="outlined"
            fullWidth
            InputProps={{
              readOnly: !editMode,
              sx: { mb: 2 },
            }}
          />
          <Typography
            variant="h4"
            sx={{ color: "#666", marginBottom: 1, fontWeight: "bold" }}
          >
            Contact:
          </Typography>
          <TextField
            name="contact"
            value={editMode ? editedProfile.contact : profile.contact}
            onChange={handleInputChange}
            variant="outlined"
            fullWidth
            InputProps={{
              readOnly: !editMode,
              sx: { mb: 2 },
            }}
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
  console.log("header in getServerSideProps: ", context.req.headers.cookie);
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
