import React from "react";
import { Typography, Container } from "@mui/material";

const About = () => {
  return (
    <Container sx={{ textAlign: "center", marginTop: "5px" }}>
      <Typography
        variant="h5"
        sx={{
          textDecoration: "underline",
          fontSize: "2rem",
          fontWeight: "bold",
        }}
      >
        <u>
          <b>About Us</b>
        </u>
      </Typography>
      <Typography variant="body1">
        This web app allows users to upload their images for forgery image
        detection.
      </Typography>
      <br />
      <Typography variant="body1">
        The detection technique is using the combination of the DCT features
        extraction and ResNet-50 CNN model.
      </Typography>
      <br />
      <div
        style={{ border: "2px dotted red", padding: "10px", margin: "10px" }}
      >
        <Typography variant="body1">
          <b>Notes:</b>
          <br /> This web app is for educational purposes only. <br />
          The model is not intended for production use. <br />
          The accuracy of the model is not guaranteed.
        </Typography>
      </div>
      <br />
      <Typography variant="body1">
        This web app is created by <b>{"LAU HWAI JUN"}</b> as part of the final
        year project. <br />
        The source code is available on <br />
        <a href="https://github.com/LJun58/Forgery-Image-Detection-Web-App.git">
          https://github.com/LJun58/Forgery-Image-Detection-Web-App.git
        </a>
        .
      </Typography>
    </Container>
  );
};

export default About;
