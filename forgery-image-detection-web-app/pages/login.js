import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Button, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import PersonIcon from "@mui/icons-material/Person";
import { signIn, useSession } from "next-auth/react";

const LoginPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { data: session } = useSession(); // Get session status

  useEffect(() => {
    if (session) {
      router.push("/");
    }
  }, [session]);

  const handleLogin = async (e) => {
    e.preventDefault();
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

  const handleRegisterClick = () => {
    router.push("/signup");
  };

  const handleCancelClick = () => {
    router.push("/");
  };

  return (
    <div>
      <h1>Login Page</h1>

      <form onSubmit={handleLogin}>
        <Box
          id="login-box"
          sx={{
            width: "30em",
            height: "50em",
            border: "2px solid #aaa",
            borderRadius: "8px",
            display: "flex",
            flexDirection: "column", // Align children vertically
            alignItems: "center",
            cursor: "pointer",
            padding: "20px",
          }}
        >
          <PersonIcon style={{ fontSize: "5rem" }} />
          <TextField
            label="Username/Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isSubmitting}
            required
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isSubmitting}
            required
          />
          <Button
            variant="contained"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Logging in..." : "Log in"}
          </Button>
          <Button
            variant="contained"
            onClick={handleRegisterClick}
            disabled={isSubmitting}
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
      </form>
    </div>
  );
};

export default LoginPage;
