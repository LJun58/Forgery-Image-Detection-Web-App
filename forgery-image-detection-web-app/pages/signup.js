import React, { useState } from "react";
import { useRouter } from "next/router";
import { Button, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import PersonIcon from "@mui/icons-material/Person";

const LoginPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [contact, setContact] = useState("");

  const handleLogin = () => {
    // Perform login logic here
    // You can use the email and password state variables to send a login request to your backend

    // Redirect to the dashboard page after successful login
    router.push("/dashboard");
  };

  const handleCancelClick = () => {
    router.push("/");
  };

  return (
    <div>
      <h1>Signup Page</h1>

      <label htmlFor="login">
        <Box
          id="login-box"
          sx={{
            width: "30em",
            height: "50em",
            border: "2px solid #aaa",
            borderRadius: "8px",
            display: "flex",
            flexDirection: "column", // Align children vertically
            //justifyContent: "center",
            alignItems: "center",
          }}
        >
          <PersonIcon style={{ fontSize: "5rem" }} />
          <TextField
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            label="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Contact Number"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            variant="contained"
            onClick={handleLogin}
          >
            Register
          </Button>
          <Button
            variant="contained"
            onClick={handleCancelClick}
          >
            Cancel
          </Button>
          <p>Have an account? click here to login!</p>
        </Box>
      </label>
    </div>
  );
};

export default LoginPage;
