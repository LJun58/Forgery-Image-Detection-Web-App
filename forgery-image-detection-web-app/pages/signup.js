import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Button, TextField, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import PersonIcon from "@mui/icons-material/Person";
import { useSession } from "next-auth/react";
import { SuccessfulModal } from "@/components/modal/successfulRegisteredModal";

const SignupPage = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); // New state for confirmation password
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isShowSuccessfulModal, setIsShowSuccessfulModal] = useState(false);
  const [contactError, setContactError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState(""); // New state for confirmation password error

  const { data: session } = useSession(); // Get session status

  useEffect(() => {
    if (session) {
      router.push("/");
    }
  }, [session]);

  const handleRegister = async (e) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address.");
      return;
    }

    const contactRegex = /^\d+$/;
    if (!contactRegex.test(contact)) {
      setContactError("Please enter a valid contact number.");
      return;
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match.");
      return;
    }

    setIsSubmitting(true);

    const userInfo = {
      username: username,
      email: email,
      contact: contact,
      password: password,
    };

    const response = await fetch("/api/auth/signup-endpoint", {
      method: "POST",
      body: JSON.stringify(userInfo),
    });

    if (response.ok) {
      setIsShowSuccessfulModal(true);
    } else {
      const data = await response.json();
      if (response.status === 400 && data.message.includes("Email existed")) {
        alert(data.message);
      } else {
        const errCode = response.status;
        alert(
          `${response.status} - ${response.statusText} : ${data.message}\nPlease try again.`
        );

        switch (errCode) {
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
    }
    setIsSubmitting(false);
  };

  const handleCancelClick = () => {
    router.push("/");
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        marginBottom: "5%",
      }}
    >
      <form onSubmit={handleRegister}>
        <Box
          id="signup-box"
          sx={{
            width: "30em",
            height: "43em",
            border: "2px solid #aaa",
            borderRadius: "8px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "20px",
            marginTop: "5%",
          }}
        >
          <Typography variant="h4">Register</Typography>
          <PersonIcon style={{ fontSize: "5rem" }} />

          <TextField
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            disabled={isSubmitting}
            required
            sx={{
              width: "100%",
              margin: "1em",
            }}
          />
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
            label="Contact Number"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            error={!!contactError}
            helperText={contactError}
            disabled={isSubmitting}
            required
            inputProps={{ inputMode: "numeric" }}
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
            disabled={isSubmitting}
            required
            sx={{
              width: "100%",
              margin: "1em",
            }}
          />
          <TextField
            label="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            error={!!confirmPasswordError}
            helperText={confirmPasswordError}
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
            {isSubmitting ? "Registering..." : "Register"}
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
          <span
            onClick={(e) => router.push("/login")}
            style={{ cursor: "pointer", textDecoration: "underline" }}
          >
            Have an account? Click here to login!
          </span>
        </Box>

        <SuccessfulModal
          open={isShowSuccessfulModal}
          onClose={() => setIsShowSuccessfulModal(false)}
        />
      </form>
    </div>
  );
};

export default SignupPage;
