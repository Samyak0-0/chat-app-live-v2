
# Messaging App

A real time messaging app with user authentication made using the MERN Stack along with json web tokens(JWT), Web Sockets and Typescript.

> [!NOTE]
> The server will slow down with inactivity, which can delay requests by 50 seconds or more.
> For (username, password) use:  (a,a) , (b.b), (test1,test1) ...

## Project Overview

- **Frontend**: React with TypeScript
- **Backend**: Node.js with Express
- **Database**: Mongo DB
- **Deployment**: Render



## Live App

[Visit App](https://chat-app-live-v2.onrender.com)


## Features

- **Real-time Messaging**: Instant updates across users using Web Sockets.
- **Password Encyption**: All the passwords are safely encrypted using bycrypt js and stored in database.
- **Custom Avatars**: Each user is given a custom doodle avatar.
- **Responsive Design**: Optimized for mobile and desktop.

## Run Locally

### Prerequisites

- Node.js (v14+ recommended)
- npm or yarn

### Steps

Clone the project

```bash
  git clone https://github.com/Samyak0-0/chat-app-live-v2.git
```

Build the Application

```bash
  npm install && npm install --prefix ./chat-app && npm run build --prefix ./chat-app
```

Run the server

```bash
  cd api
  node index.js
```

Open [localhost:4000](http://localhost:4000) to view the application in the browser.


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`MONGO_URL`
`JWT_SECRET`
`CLIENT_URL`


## License

Distributed under the [MIT](https://choosealicense.com/licenses/mit/) License. 
