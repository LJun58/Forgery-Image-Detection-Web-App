import React from "react";
import { getSession } from "next-auth/react";
import axios from "axios";

function ProfilePage({ profile }) {
  return (
    <div>
      {profile ? (
        <div>
          <h1>{profile.username}</h1>
          <p>Email: {profile.email}</p>
          <p>Contact: {profile.contact}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
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
