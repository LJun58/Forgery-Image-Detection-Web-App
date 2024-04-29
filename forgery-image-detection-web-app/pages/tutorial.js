import React, { useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import carousel styles
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const tutorialSteps = [
  {
    image: "/tutorial-steps/step1.png", // Replace with your image paths
    description: "Step 1: Getting Started",
  },
  {
    image: "/tutorial-steps/step2.png", // Replace with your image paths
    description: "Step 2a: Login before uploading an image",
  },
  {
    image: "/tutorial-steps/step2b.png", // Replace with your image paths
    description: "Step 2b: Register if you don't have an account yet",
  },
  {
    image: "/tutorial-steps/step3.png", // Replace with your image paths
    description: "Step 3: You can upload an image here",
  },
  {
    image: "/tutorial-steps/step4a.png", // Replace with your image paths
    description: "Step 4a: You can click and browse your image here",
  },
  {
    image: "/tutorial-steps/step4b.png", // Replace with your image paths
    description: "Step 4b: Or you can drag and drop your image here",
  },
  {
    image: "/tutorial-steps/step5.png", // Replace with your image paths
    description:
      "Step 5: Your images have been selected and click 'Upload' button to proceed",
  },
  {
    image: "/tutorial-steps/step6.png", // Replace with your image paths
    description:
      "Step 6: Your images have been uplaoded and pop up the result of detection.",
  },
  {
    image: "/tutorial-steps/step7.png", // Replace with your image paths
    description: "Step 7: You can view yuor uploaded images in History page.",
  },
  {
    image: "/tutorial-steps/step8.png", // Replace with your image paths
    description:
      "Step 8: You can view your profile and edit your profile in Profile page.",
  },
];

export default function TutorialPage() {
  const [currentStep, setCurrentStep] = useState(0);

  const handleStepChange = (newIndex) => {
    setCurrentStep(newIndex);
  };

  return (
    <div className="tutorial-page">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "1%",
          borderBottom: "2px solid #ccc",
          paddingBottom: "1%",
        }}
      >
        <Typography
          variant="h5"
          sx={{
            textDecoration: "underline",
            fontSize: "2rem",
            fontWeight: "bold",
          }}
        >
          Tutorial
        </Typography>{" "}
        <Typography variant="h4">
          Here is the tutorial to use our AuthenticScan application.
        </Typography>
      </Box>
      <Box
        sx={{
          maxWidth: "80%",
          margin: "0 auto", // Center the box horizontally
          display: "flex",
          flexDirection: "column",
          gap: 2,
          justifyContent: "center",
        }}
      >
        <Typography
          variant="h4"
          sx={{ alignSelf: "center" }}
        >
          {tutorialSteps[currentStep].description}
        </Typography>
        <Carousel
          showArrows={true}
          onChange={handleStepChange}
          infiniteLoop={true}
          autoPlay={true}
        >
          {tutorialSteps.map((step, index) => (
            <div key={index}>
              <img
                src={step.image}
                alt={step.description}
                style={{ border: "2px solid #ccc", borderRadius: "5px" }}
              />
            </div>
          ))}
        </Carousel>
      </Box>
    </div>
  );
}
