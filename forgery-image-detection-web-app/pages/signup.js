import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Button, TextField, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import PersonIcon from "@mui/icons-material/Person";
import { useSession } from "next-auth/react";
import { SuccessfulModal } from "@/components/modal/successfulRegisteredModal";

const LoginPage = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isShowSuccessfulModal, setIsShowSuccessfulModal] = useState(false);

  const { data: session } = useSession(); // Get session status

  useEffect(() => {
    if (session) {
      router.push("/");
    }
  }, [session]);

  const handleRigister = async (e) => {
    e.preventDefault();
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
      // alert("User registered successfully");
      // router.push("/login");
      setIsShowSuccessfulModal(true);
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
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        // alignItems: "center",
        // height: "100vh",
        marginBottom: "5%",
      }}
    >
      <form onSubmit={handleRigister}>
        <Box
          id="signup-box"
          sx={{
            width: "30em",
            height: "37em",
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
          <spam
            onClick={(e) => router.push("/login")}
            style={{ cursor: "pointer", textDecoration: "underline" }}
          >
            Have an account? Click here to login!
          </spam>
        </Box>

        <SuccessfulModal
          open={isShowSuccessfulModal}
          onClose={() => setIsShowSuccessfulModal(false)}
        />
      </form>
    </div>
  );
};

export default LoginPage;
