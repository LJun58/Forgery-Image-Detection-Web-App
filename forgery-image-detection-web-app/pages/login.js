import React, { useState } from "react";
import { useRouter } from "next/router";
import { Button, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import PersonIcon from "@mui/icons-material/Person";

const LoginPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // Perform login logic here
    // You can use the email and password state variables to send a login request to your backend

    // Redirect to the dashboard page after successful login
    router.push("/dashboard");
  };

  const handleRegisterClick = () => {
    router.push("/signup");
  };

  const handleCancelClick = () => {
    router.push("/");
  };

  return (
    <div>
      <h1>Login Page</h1>

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
            cursor: "pointer",
          }}
        >
          <PersonIcon style={{ fontSize: "5rem" }} />
          <TextField
            label="Username/Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            Login
          </Button>
          <Button
            variant="contained"
            onClick={handleRegisterClick}
          >
            Register New Account
          </Button>
          <Button
            variant="contained"
            onClick={handleCancelClick}
          >
            Cancel
          </Button>
        </Box>
      </label>
    </div>
  );
};

export default LoginPage;
