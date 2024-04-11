import { getSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { Typography } from "@mui/material";

export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  try {
    const response = await fetch("/api/user/profile");
    if (!response.ok) {
      throw new Error("Failed to fetch profile data");
    }
    const profile = await response.json();
    return {
      props: {
        profile,
      },
    };
  } catch (error) {
    console.error("Error fetching profile data:", error);
    return {
      props: {
        profile: null,
      },
    };
  }
}

export default function Profile({ profile }) {
  if (!profile) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Container>
      <Typography
        variant="h4"
        component="div"
        gutterBottom
      >
        Profile Page
      </Typography>
      <Box sx={{ my: 2 }}>
        <Typography
          variant="h6"
          component="div"
        >
          Username: {profile.username}
        </Typography>
        <Typography
          variant="h6"
          component="div"
        >
          Email: {profile.email}
        </Typography>
        <Typography
          variant="h6"
          component="div"
        >
          Contact Number: {profile.contactNumber}
        </Typography>
      </Box>
    </Container>
  );
}
