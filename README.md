# 🐾 Virtual Pet Frontend

<br/>
<br/>
A responsive web application that provides a user-friendly interface for creating, managing, and interacting with virtual pets. This frontend application enables users to interact with the Virtual Pet API for pet management and user authentication.

<br/>

### 📄 Project Overview

The Virtual Pet Frontend allows users to log in, view their pets, create new pets, and perform actions such as feeding or petting them. This application connects to the Virtual Pet API for backend functionality, utilizing secure tokens for user authentication.

<br/>

### 💻 Technologies Used

- React
- React Router (for page navigation)
- Axios (for API requests)
- CSS Modules (for styling components)
- JavaScript (ES6+)
- Webpack (for module bundling)

<br/>

### 📋 Requirements

- Node.js 16 or higher
- npm 7.20 or higher (comes with Node.js)
- Internet connection for downloading dependencies

<br/>

### 🛠️ Installation

##### 1. Clone this repository:

`git clone https://github.com/yourusername/virtual-pet-frontend.git`

##### 2. Navigate to the project directory:

`cd virtual-pet-frontend`

##### 3. Install dependencies using npm:

`npm install`

##### 4. Configure the application:
        
Update the API endpoint in `config.js` (or equivalent file) to match the backend server URL.

<br/>

### ▶️ Execution

##### 1. Start the application:

`npm start`

The application will be available at `http://localhost:3000` by default.

##### 2. Make sure the backend (API) server is running and accessible at the configured URL.

<br/>

### 🌐 Deployment

- Prepare the production build using the following command:

`npm run build`

- Deploy the contents of the `build` directory to a production server.

- Ensure the server is configured to handle the frontend routes properly.

<br/>

### 🐱 User Features

- **Login**: Users can log in using their credentials, which are validated by the backend.
- **View Pets**: Users can view a list of their virtual pets, each with detailed information.
- **Create Pet**: Users can add new pets by selecting attributes such as name, type, and color.
- **Feed Pet**: Users can feed their pets, affecting the pet's hunger state.
- **Pet Pet**: Users can interact with their pets, affecting the pet’s happiness.
- **Delete Pet**: Users can delete pets, removing them from the list.
- **Logout**: Users can securely log out, removing their authentication token.

<br/>

### 🔐 Authentication

This frontend manages user authentication using JWT tokens stored in `localStorage`. Upon successful login, tokens are stored and included in headers for subsequent API requests. Tokens are removed upon logout.

<br/>

### 🤝 Contributions

Contributions are welcome! Follow these steps to contribute:

##### 1. Fork the repository.
##### 2. Create a new branch for your feature:

`git checkout -b feature/NewFeature`

##### 3. Make your changes and commit:

`git commit -m 'Add New Feature'`

##### 4. Push your changes:

`git push origin feature/NewFeature`

##### 5. Create a pull request for review.

<br/>

### 📄 Frontend Components

- **Login**: Handles user login and saves authentication tokens.
- **Signup**: Allows new users to create accounts.
- **MyPets**: Displays a list of the user's pets and options for interaction.
- **PetCard**: A card component that shows pet details and actions such as feed, pet, or delete.
- **CreatePet**: Provides a form for creating new pets.
- **LogoutButton**: Logs out the user and clears authentication data.

Each component is designed to interact with the Virtual Pet API, handling both success and error responses to provide real-time feedback to the user.

---

For API-specific actions and further backend functionality, please refer to the backend documentation.
