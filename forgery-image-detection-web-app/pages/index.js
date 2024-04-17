import React, { useState, useRef } from "react";
import Head from "next/head";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { ResultModal } from "@/components/modal/resultModal";

export default function DragDropImageUploader() {
  const [images, setImages] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [open, setOpen] = useState(false);
  const [results, setResults] = useState([]);

  const fileInputRef = useRef(null);

  const selectFiles = () => {
    fileInputRef.current.click();
  };

  const onFileSelect = (e) => {
    const files = e.target.files;
    if (files.length === 0) return;
    for (let i = 0; i < files.length; i++) {
      if (files[i].type.split("/")[0] !== "image") continue;
      if (!images.some((e) => e.name === files[i].name)) {
        setImages((prevImages) => [
          ...prevImages,
          {
            name: files[i].name,
            file: files[i], // Store the file object
            url: URL.createObjectURL(files[i]),
          },
        ]);
      }
    }
  };

  const deleteImage = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i != index));
  };

  const onDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
    e.dataTransfer.dropEffect = "copy";
  };

  const onDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const onDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    for (let i = 0; i < files.length; i++) {
      if (files[i].type.split("/")[0] !== "image") continue;
      if (!images.some((e) => e.name === files[i].name)) {
        setImages((prevImages) => [
          ...prevImages,
          {
            name: files[i].name,
            file: files[i], // Store the file object
            url: URL.createObjectURL(files[i]),
          },
        ]);
      }
    }
  };

  const uploadImages = async () => {
    console.log(images);
    const formData = new FormData();
    // images.forEach((image) => {
    //   formData.append("file", image.file); // Append each file to FormData
    // });
    for (const image of images) {
      formData.append("file", image.file);
    }

    try {
      const response = await fetch("http://127.0.0.1:5000/api/detectForgery", {
        method: "POST",
        body: formData,
      });

      const entries = formData.entries();
      for (const pair of entries) {
        console.log(pair[0] + ", " + pair[1]);
      }

      if (response.ok) {
        const data = await response.json();
        const resultsWithImages = images.map((image, index) => ({
          image: image.name,
          url: image.url,
          result: data[index].result,
        }));
        console.log(resultsWithImages);
        setResults(resultsWithImages);
        setOpen(true);
      } else {
        console.error("Failed to detect forgery");
      }
    } catch (error) {
      console.error("Error detecting forgery:", error);
    }
  };

  return (
    <Box className="upload-box">
      <div className="top">
        <p>Drag & Drop Image Uploading</p>
      </div>
      <ResultModal
        open={open}
        onClose={() => setOpen(false)}
        results={results}
      />
      <Box
        className="drag-area"
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        sx={{
          cursor: "pointer",
        }}
        onClick={selectFiles}
      >
        <div>
          <InsertPhotoIcon style={{ fontSize: "10rem" }} />
        </div>

        {isDragging ? (
          <div className="select">Drop Images Here</div>
        ) : (
          <>
            Drag & Drop Image here
            <span>or</span>
            <span
              className="select"
              role="button"
              onClick={(e) => {
                e.stopPropagation();
                selectFiles();
              }}
              style={{ display: "flex", alignItems: "center" }}
            >
              Click Here to Browse{" "}
              <FileUploadIcon style={{ fontSize: "2rem" }} />
            </span>
          </>
        )}

        <input
          name="file"
          type="file"
          className="file"
          accept="image/*"
          multiple
          ref={fileInputRef}
          onChange={onFileSelect}
        />
      </Box>
      <Box className="container">
        {images.map((image, index) => (
          <div
            className="image"
            key={index}
          >
            <span
              className="delete"
              onClick={() => deleteImage(index)}
            >
              &times;
            </span>
            <img
              src={image.url}
              alt={image.name}
            />
          </div>
        ))}
      </Box>
      <Button
        variant="contained"
        onClick={uploadImages}
      >
        Upload
      </Button>
    </Box>
  );
}
