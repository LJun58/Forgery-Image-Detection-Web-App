import React, { useState } from "react";
import { useRouter } from "next/router";
import { Button, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import PersonIcon from "@mui/icons-material/Person";

const LoginPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const userInfo = {
      email: email,
      password: password,
    };

    const response = await fetch("/api/user-crud", {
      method: "POST",
      body: JSON.stringify(userInfo),
    });

    if (response.ok) {
      // alert("User registered successfully");
      router.push("/");
    } else {
      const errCode = response.status;
      const errMessage = await response.json();
      alert(
        `${response.status} - ${response.statusText} : ${errMessage.message}\nPlease try again.`
      );

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
    setIsSubmitting(false);
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
            disabled={isSubmitting}
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isSubmitting}
          />
          <Button
            variant="contained"
            onClick={handleLogin}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Logging in..." : "Log in"}
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
            disabled={isSubmitting}
          >
            Cancel
          </Button>
        </Box>
      </label>
    </div>
  );
};

export default LoginPage;
