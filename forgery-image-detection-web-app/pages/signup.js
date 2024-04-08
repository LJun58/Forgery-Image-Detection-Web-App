import React, { useState } from "react";
import { useRouter } from "next/router";
import { Button, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import PersonIcon from "@mui/icons-material/Person";

const LoginPage = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleRigister = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const userInfo = {
      username: username,
      email: email,
      contact: contact,
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
            disabled={isSubmitting}
          />
          <TextField
            label="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isSubmitting}
          />
          <TextField
            label="Contact Number"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
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
            onClick={handleRigister}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Registering..." : "Register"}
          </Button>
          <Button
            variant="contained"
            onClick={handleCancelClick}
            disabled={isSubmitting}
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
