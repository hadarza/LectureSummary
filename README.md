# Lecturesummay Project

This is a README file for the Lecturesummay project, which is built using React, Node.js, MongoDB, and Multer. The project allows users to register, log in, and view summary lessons. Users can also filter lessons based on date, writer, and other criteria. Additionally, managers have the ability to upload their own summaries. In the future, users will be able to upload summaries directly into the app, which will automatically upload them to a drive and send a message to their supervisor.

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Installation](#installation)
- [Usage](#usage)
- [Future Enhancements](#future-enhancements)
- [Contributing](#contributing)
- [License](#license)

## Features

- User Registration: Users can create new accounts by providing their details such as name, email, and password.
- User Login: Registered users can log in using their email and password.
- Summary Lessons: Users can view summary lessons created by themselves or other users.
- Lesson Filtering: Users can filter lessons based on criteria such as date and writer.
- Lesson Download: Users can download summary lessons to their local device.
- Manager Uploads: Managers have the ability to upload their own summary lessons.
- Automatic Upload to Drive: In the future, users will be able to upload lessons, which will automatically be uploaded to a drive.
- Automatic Message to Supervisor: Once a lesson is uploaded, the supervisor will receive an automatic message.

## Technologies

The Lecturesummay project is built using the following technologies:

- React: A JavaScript library for building user interfaces.
- Node.js: A JavaScript runtime for server-side development.
- MongoDB: A NoSQL database for storing application data.
- Multer: A middleware for handling multipart/form-data, used for file uploads.

## Installation

To run the Lecturesummay project locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/lecturesummay-project.git
   ```

2. Install the dependencies for the frontend:

   ```bash
   cd lecturesummay-project/client
   npm install
   ```

3. Install the dependencies for the backend:

   ```bash
   cd ../server
   npm install
   ```

4. Set up the MongoDB database:
   
   - Install MongoDB: Follow the instructions in the MongoDB documentation to install MongoDB on your machine.
   - Create a new MongoDB database.
   - Update the MongoDB connection details in the backend configuration file (`server/config/index.js`).

5. Start the backend server:

   ```bash
   cd server
   npm start
   ```

6. Start the frontend development server:

   ```bash
   cd ../client
   npm start
   ```

7. Open your web browser and navigate to `http://localhost:3000` to access the application.

## Usage

1. Register an account:
   
   - Click on the "Register" link on the homepage.
   - Fill in the required information and click "Register" to create a new account.

2. Log in:
   
   - On the homepage, click on the "Log In" link.
   - Enter your registered email and password, then click "Log In" to access your account.

3. View summary lessons:

   - Once logged in, you will be redirected to the dashboard.
   - The dashboard displays summary lessons based on your preferences and filters.
   - Use the available filters to refine the list of lessons.

4. Download a summary lesson:
   
   - In the lesson list, click on the "Download" button next to
