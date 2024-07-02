# Forgery-Image-Detection-Web-App
This is my Final Year Project, a forgery image detection web app. The users can upload their images to check the images' authenticity. 
The logic used for the backend in the project combines the Discrete Cosine Transform (DCT) and pre-trained CNN model (ResNet-50).
The NextJS framework is used in this project for the front-end development.
MySQL and Firebase are used for data storage.

## System Architecture Design
![image](https://github.com/LJun58/Forgery-Image-Detection-Web-App/assets/73697221/74bc4e8a-a27d-4f55-97e0-a2ac1e94d8c9)


## Prerequisites
This project requires NodeJS, NPM and Pytorch. Please ensure your machine has installed the required package before running the project.

## How to Run
### 1. Run and build the web app
Go and locate the **Forgery-Image-Detection-Web-App/forgery-image-detection-web-app/** directory and build the project
```
npm run build
```
After the building is successful, start the service
```
npm start
```

### 2. Run the Flask backend service
Go and locate the **Forgery-Image-Detection-Web-App/backend/** directory and build the project
```
py forgery-image-detection.py
```

