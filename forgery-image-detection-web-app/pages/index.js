import Head from "next/head";
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import FileUploadIcon from "@mui/icons-material/FileUpload";

export default function Home() {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageClear = () => {
    setSelectedImage(null);
  };

  const handleImageSubmit = () => {
    // Add image submission logic (e.g., send to server for forgery detection)
    alert("Image submitted for forgery detection!");
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const preventDefault = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <Head>
        <title>Forgery Image Detection</title>
      </Head>

      <h1>Forgery Image Detection</h1>
      <label htmlFor="upload-input">
        <Box
          id="upload-box"
          sx={{
            width: "40em",
            height: "20em",
            border: "2px dashed #aaa",
            borderRadius: "8px",
            display: "flex",
            flexDirection: "column", // Align children vertically
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
          }}
          onDrop={handleDrop}
          onDragOver={preventDefault}
        >
          <InsertPhotoIcon style={{ fontSize: "10rem" }} />
          <div style={{ marginTop: "auto", textAlign: "center" }}>
            <h2>
              Drag & Drop image here <br />
              or <br />
              click to upload <FileUploadIcon style={{ fontSize: "3rem" }} />
            </h2>
          </div>
        </Box>
      </label>
      <input
        id="upload-input"
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={handleImageUpload}
      />

      {selectedImage && (
        <div>
          <img
            src={selectedImage}
            alt="Selected"
            style={{ maxWidth: "100%", marginTop: "20px" }}
          />
          <Button
            variant="outlined"
            onClick={handleImageClear}
            style={{ marginTop: "20px" }}
          >
            Clear Image
          </Button>
        </div>
      )}

      <div style={{ marginTop: "20px" }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleImageSubmit}
          disabled={!selectedImage}
        >
          Submit for Forgery Detection
        </Button>
      </div>
    </div>
  );
}
