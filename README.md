# Trello with MERN Stack (nDyu Dev)

A Trello-inspired project management tool built with the MERN Stack (MongoDB, Express, React, and Node.js). This application provides a responsive, user-friendly interface for managing boards, lists, and cards, enabling teams to stay organized and productive.

## Features

- **User Authentication**: Secure login and signup functionality with JSON Web Tokens (JWT).
- **Board Management**: Create and customize multiple boards for different projects.
- **Task Lists & Cards**: Add lists to boards, and create draggable cards within each list for task management.
- **Real-Time Collaboration**: Instant updates across multiple users using web sockets.
- **Search & Filter**: Quickly find boards, lists, or specific tasks.
- **Activity Tracking**: View detailed logs of changes to track task progress.
- **Responsive Design**: Optimized for both desktop and mobile views.

## Tech Stack

- **Frontend**: React, Vite, and CSS modules for styling, using [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) for fast refresh with SWC.
- **Backend**: Node.js and Express for REST API development.
- **Database**: MongoDB to store user, board, and task data.
- **Real-Time Communication**: Socket.io for instant updates and real-time collaboration.
- **Authentication**: JWT (JSON Web Token) for secure user sessions.

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) v14 or above
- [MongoDB](https://www.mongodb.com/try/download/community) (or MongoDB Atlas for a cloud-hosted database)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/ndyudev/trello-web.git
   cd trello-clone-mern



Install dependencies for both client and server:

bash
Sao chép mã
# Install client dependencies
cd client
npm install

# Install server dependencies
cd ../server
npm install
Environment Variables
Create a .env file in the server folder with the following variables:

plaintext
Sao chép mã
MONGO_URI=<your_mongodb_uri>
JWT_SECRET=<your_jwt_secret>
PORT=5000
Start the application:

Backend:
bash
Sao chép mã
cd server
npm start
Frontend:
bash
Sao chép mã
cd client
npm run dev
Access the application: Visit http://localhost:3000 to view the app.

Usage
Sign up and log in to create a new workspace.
Start creating boards, add lists to them, and populate these lists with cards.
Drag and drop cards to reorder tasks within and across lists.
Collaborate in real-time by inviting others to your boards.
Screenshots
<!-- Add screenshots or GIFs of your application here -->
Contributing
Contributions are welcome! Please fork the repository and open a pull request to suggest changes.

License
This project is open-source and available under the MIT License.
