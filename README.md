# 🐾 Virtual Pet Frontend
<br/>
<br/>
A responsive React-based frontend for managing virtual pets, allowing users to interact with their pets, monitor their states, and perform actions such as feeding and petting. This frontend integrates with a Spring Boot backend and communicates through a REST API. 
<br/>
<br/>
###📄 Project Overview

The Virtual Pet Frontend offers users an engaging interface to create and manage their virtual pets. Key features include user authentication, pet management, and interactive pet actions. All actions are reflected in real time with backend synchronization, using a combination of React state management and API calls.
<br/>
<br/>
###💻 Technologies Used

    React
    JavaScript (ES6+)
    HTML/CSS
    React Router
    Fetch API for REST API communication
    JSON Web Token (JWT) for secure requests
    npm for package management

<br/>
<br/>
###📋 Requirements

    Node.js v14+
    npm v6+
    Access to the backend API (Virtual Pet API) running on localhost:8080

<br/>
<br/>
###🛠️ Installation
#####1. Clone this repository:

`git clone https://github.com/yourusername/virtual-pet-frontend.git`

#####2. Navigate to the project directory:

`cd virtual-pet-frontend`

#####3. Install dependencies:

`npm install`

#####4. Configure the frontend application:

Ensure the backend API URL (http://localhost:8080) is accessible and update any API base paths in src/config.js if required.

<br/>
<br/>
###▶️ Execution
#####1. Start the frontend application:

`npm start`

#####2. Access the application in your browser:

http://localhost:3000

<br/>
<br/>
###🌐 Frontend Features

    User Authentication: Login and registration functionality integrated with backend JWT authentication.
    Pet Management: Create, update, and delete pets.
    Interactive Pet Actions: Users can feed and pet their pets, with the pet’s mood and hunger status reflected in real time.
    Responsive UI: Optimized for various screen sizes and devices.

<br/>
<br/>
###📚 Key Components and Structure

    Login.js: Manages user login, sending credentials to the backend and storing JWTs in local storage for secure sessions.
    MyPets.js: The main component displaying the user’s pets, with options for interactive actions.
    CreatePet.js: Allows users to create a new pet, specifying name, type, and color.
    PetCard.js: Displays individual pet information and status, handling actions like feeding and petting.
    App.js: The main application file that organizes routing and component structure.

<br/>
<br/>
###🌐 API Integration

The frontend interacts with the backend API through secure HTTP requests, using JWT for authentication and authorization. Some key API requests include:

    Login: POST /virtualpet/auth/login
    Register: POST /virtualpet/auth/register
    Fetch Pets: GET /virtualpet/pet/mypets
    Create Pet: POST /virtualpet/pet/new
    Feed Pet: POST /virtualpet/pet/feed/{petId}
    Pet a Pet: POST /virtualpet/pet/pet/{petId}

All requests require a valid JWT token, which is included in the headers (Authorization: Bearer <token>).
<br/>
<br/>

###🌐 Deployment

    Build the project for production:

    npm run build

    Deploy the build folder to your preferred hosting environment.

    Ensure the production environment is configured to connect to the backend API and manage secure token handling.

<br/>
<br/>

###🤝 Contributions

Contributions are welcome! Follow these steps to contribute:
#####1. Fork the repository.

#####2. Create a new branch for your feature:

`git checkout -b feature/NewFeature`

#####3. Make your changes and commit:

`git commit -m 'Add New Feature'`

#####4. Push your changes:

`git push origin feature/NewFeature`

#####5. Create a pull request for review.