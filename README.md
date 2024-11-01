# RFID-Automation

This project is an RFID-based automation system using the **NodeMCU** microcontroller with integrated WiFi. The backend logic is built with **Express.js**, and **EJS** is used as the templating engine for the frontend. This system allows efficient management and tracking of RFID card interactions for various use cases, such as attendance, payments, and library management.

## Features
- **RFID Scanning**: Real-time RFID reading using NodeMCU and the MFRC522 RFID module.
- **Express.js Backend**: Manages RFID data interactions, including attendance, payments, and library records.
- **EJS Frontend**: Dynamically renders user interfaces for viewing and processing RFID-based actions.
- **WiFi Communication**: Seamless data transfer between NodeMCU and the backend server.

## Technology Stack
- **NodeMCU**: Microcontroller with built-in WiFi, used to read RFID tags and send data to the backend.
- **Express.js**: Handles server-side routes, processes RFID requests, and manages database interactions.
- **EJS**: Templating engine for rendering dynamic HTML pages based on RFID data.

## Project Structure
- **server/**: Contains Express.js routes for processing attendance, payments, and library operations.
- **public/**: Holds frontend assets, including stylesheets and JavaScript files.
- **views/**: EJS templates used to render HTML pages based on RFID data.
- **models/**: Database schemas to store and manage records like attendance, payments, and library history.

## Setup Instructions
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/RFID-Automation.git

2. **Install Dependencies:**:
   ```bash
   cd RFID-Automation
   npm install

3. **Configure NodeMCU:**:
   Set up NodeMCU to read RFID tags using the MFRC522 module.
   Connect NodeMCU to WiFi and configure it to communicate with the server.

4. **Start the Server:**:
   ```bash
   npm start

5. **Open the Application:**:
   Navigate to http://localhost:3000 in your browser to start using the system.

## Usage
    - Scan an RFID tag.
    - View responses in the browser, indicating successful actions like marking attendance, processing payments, or updating library records.

