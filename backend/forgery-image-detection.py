from flask import Flask, request, jsonify
import os
import cv2
import numpy as np
import torch
from torchvision.models import resnet50
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Initialize CORS for all routes

# Define device to GPU
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")


# Define the path to the directory containing the model file
MODEL_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'models')

# Define the path to the model file
MODEL_FILENAME = 'fine-tuned_resnet_model_batch_0.pt'
MODEL_PATH = os.path.join(MODEL_DIR, MODEL_FILENAME)

# Function to load the fine-tuned model
def load_model(model_path):
    model = resnet50(pretrained=False)
    num_ftrs = model.fc.in_features
    num_classes = 3  # Assuming three classes: authentic, forged, manipulated
    model.fc = torch.nn.Linear(num_ftrs, num_classes)
    model.load_state_dict(torch.load(model_path))
    model.to(device)
    model.eval()
    return model

# Load the fine-tuned model
# model_path = 'fine-tuned_resnet_model_batch_0.pt'  # Change this to the actual path
model = load_model(MODEL_PATH)

# Function to authenticate image using the fine-tuned model
def authenticate_image(image_path, model, threshold=0.8):
    features = preprocess_image(image_path)
    input_tensor = torch.tensor(features, dtype=torch.float32)
    input_tensor = input_tensor.unsqueeze(0).repeat(1, 3, 1, 1).to(device)  # Replicate single channel into three channels
    with torch.no_grad():
        output = model(input_tensor)
    # Check if probability for the forged class exceeds the threshold
    forged_prob = torch.softmax(output, dim=1)[0][1].item()  # Probability for forged class
    if forged_prob > threshold:
        return 1  # Forgery detected
    else:
        return 0  # No forgery detected

# Function to extract DCT features from image block
def extract_features_from_block(block):
    blocksize = 8
    overlap = 4

    dct_coefficients = cv2.dct(block.astype(np.float32))
    std_dev = np.std(dct_coefficients)
    if std_dev == 0 or np.isnan(std_dev):
        features = np.zeros_like(dct_coefficients.flatten())
    else:
        features = (dct_coefficients.flatten() - np.mean(dct_coefficients)) / std_dev
    return features

# Function to preprocess input images (extract DCT features)
def preprocess_image(image_path):
    img = cv2.imread(image_path)
    grayscale_image = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    resized_image = cv2.resize(grayscale_image, (224, 224))
    blocksize = 8
    overlap = 4
    all_features = []

    for j in range(0, 224 - blocksize + 1, overlap):
        for i in range(0, 224 - blocksize + 1, overlap):
            block = resized_image[i:i + blocksize, j:j + blocksize]
            features = extract_features_from_block(block)
            all_features.append(features)

    return all_features

# Define the endpoint for forgery detection
# @app.route('/api/detectForgery', methods=['POST'])
# def detect_forgery():
#     print("processing...")
#     if 'file' not in request.files:
#         return jsonify({'result': 'No file uploaded'}), 400
    
#     # file = request.files['file']
#     # if file.filename == '':
#     #     return jsonify({'result': 'No selected file'}), 400
    
#     # # Save the uploaded file temporarily
#     # filename = 'temp_image.jpg'
#     # file.save(filename)

#     # # Authenticate the image
#     # authentication_result = authenticate_image(filename, model)

#     # # Delete the temporary file
#     # os.remove(filename)
#     # print("Done...")

#     # # Return the result
#     # if authentication_result == 1:
#     #     return jsonify({'result': 'Forgery detected in the image.'})
#     # else:
#     #     return jsonify({'result': 'The image is authentic.'})

#     files = request.files.getlist('file')
    
#     results = []
    
#     # for file in files:
#     #     filename = f'temp_image_{files.filename}'
#     #     file.save(filename)
        
#     #     authentication_result = authenticate_image(filename, model)
        
#     #     os.remove(filename)
        
#     #     results.append({
#     #         'filename': file.filename,
#     #         'result': 'Forgery detected in the image.' if authentication_result == 1 else 'The image is authentic.'
#     #     })
    
#     for idx, file in enumerate(files):
#         filename = f'temp_image_{idx}_{files.filename}'
#         file.save(filename)
        
#         authentication_result = authenticate_image(filename, model)
        
#         os.remove(filename)
        
#         results.append({
#             'filename': file.filename,
#             'result': 'Forgery detected in the image.' if authentication_result == 1 else 'The image is authentic.'
#         })
        
        
#     print("Done...")
#     return jsonify({'results': results})  # Return list of results
    
@app.route('/api/detectForgery', methods=['POST'])
def detect_forgery():
    print("processing...")
    if 'file' not in request.files:
        return jsonify({'result': 'No file uploaded'}), 400
    
    files = request.files.getlist('file')  # Get all uploaded files
    results = []

    for file in files:
        if file.filename == '':
            results.append({'result': 'No selected file'})
            continue

        # Save the uploaded file temporarily
        filename = 'temp_image.jpg'
        file.save(filename)

        # Authenticate the image
        authentication_result = authenticate_image(filename, model)

        # Delete the temporary file
        os.remove(filename)

        # Append the result for this image
        if authentication_result == 1:
            results.append({'result': 'Forgery detected in the image.'})
        else:
            results.append({'result': 'The image is authentic.'})

    print("Done...")
    return jsonify(results)




if __name__ == '__main__':
    app.run(debug=True)