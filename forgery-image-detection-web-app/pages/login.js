import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Button, TextField, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import PersonIcon from "@mui/icons-material/Person";
import { signIn, useSession } from "next-auth/react";

const LoginPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const { data: session } = useSession(); // Get session status

  useEffect(() => {
    if (session) {
      router.push("/");
    }
  }, [session]);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email.trim()) {
      setEmailError("Please enter your email.");
      return;
    }

    if (!password.trim()) {
      setPasswordError("Please enter your password.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address.");
      return;
    }

    setIsSubmitting(true);

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (!result.error) {
      console.log("Login successful");
      router.push("/");
    } else {
      console.error("Login failed");
      alert("Login failed. Please check your credentials and try again.");
    }

    setIsSubmitting(false);
  };

  // const handleRegisterClick = () => {
  //   router.push("/signup");
  // };

  const handleCancelClick = () => {
    router.push("/");
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        // alignItems: "center",
        // height: "100vh",
        marginBottom: "5%",
      }}
    >
      <form onSubmit={handleLogin}>
        <Box
          id="login-box"
          sx={{
            width: "30em",
            height: "30em",
            border: "2px solid #aaa",
            borderRadius: "8px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "20px",
            marginTop: "5%",
          }}
        >
          <Typography variant="h4">Login</Typography>
          <PersonIcon style={{ fontSize: "5rem" }} />
          <TextField
            label="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={!!emailError}
            helperText={emailError}
            disabled={isSubmitting}
            required
            sx={{
              width: "100%",
              margin: "1em",
            }}
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={!!passwordError}
            helperText={passwordError}
            disabled={isSubmitting}
            required
            sx={{
              width: "100%",
              margin: "1em",
            }}
          />
          <Button
            variant="contained"
            type="submit"
            disabled={isSubmitting}
            sx={{
              width: "100%",
              margin: "1em",
            }}
          >
            {isSubmitting ? "Logging in..." : "Log in"}
          </Button>

          <Button
            variant="text"
            onClick={handleCancelClick}
            disabled={isSubmitting}
            color="cancelButton"
            sx={{
              width: "100%",
              margin: "1em",
            }}
          >
            Cancel
          </Button>
          <spam
            onClick={(e) => router.push("/signup")}
            style={{ cursor: "pointer", textDecoration: "underline" }}
          >
            New user? Click here to register!
          </spam>
        </Box>
      </form>
    </div>
  );
};

export default LoginPage;
