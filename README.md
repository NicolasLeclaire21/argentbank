# Argent Bank

Argent Bank is a bank service allowing customers to login on their website and to manage their bank accounts and their profile.

**Goal of this project**: API integration in a React app, use of Redux for global state management, and creation of future endpoints with Swagger.

## Load specifications

### Website designs

Static HTML and CSS were provided [here](https://github.com/OpenClassrooms-Student-Center/Project-10-Bank-API/tree/master/designs).

![Design for the home page](./src/assets/design/homepage.png "Design for the home page")

## Features

-   Users are able to navigate to the home page (`/`).
-   Users can go to the login page (`/login`), fill out credentials, login to the back-end API with JWT tokens for authentication, and then successfully navigate to their profile page (`/profile`).
-   Users can see their username and the logout button in header when they're logged in. If they click on the logout button, they go back to the home page (`/`).
-   After succesfully logging in, users can see their profile page with their username, and see placeholder bank account information.
-   Users can be able to edit their profile (first name and last name not editable. Only username can be changed). This data should be persisted to the database.

### Technical constraints

-   Application creation with React (from static HTML and CSS).
-   Use of React Router.
-   Implementation of Redux to manage application global state (with actions to send information and fetch from API, reducer to handle application state changes, store to manage all data).
-   Creation of future API endpoints (with HTTP methods, routes, description, parameters, and types of responses) for future features with Swagger (in `swagger.yaml`):
    -   See all transactions for the current month.
    -   See transaction details in a new view.
    -   Add, remove or update informations on a given transaction.

## Prerequisites

-   [NodeJS](https://nodejs.org/en/)
-   [MongoDB Community Server](https://www.mongodb.com/try/download/community)
-   [npm](https://www.npmjs.com/)
-   [Yarn](https://yarnpkg.com/)
-   [React](https://fr.reactjs.org/)
-   [React Router](https://reactrouter.com/)
-   [React Redux](https://react-redux.js.org/)
-   [Redux](https://redux.js.org/)
-   [Redux Persist](https://www.npmjs.com/package/redux-persist)
-   [Redux Toolkit](https://redux-toolkit.js.org/)

## Installation

### Back-end

#### Back-end repository

The back-end repository using NodeJS is available on [this link](https://github.com/OpenClassrooms-Student-Center/ArgentBank-website).

1. Clone the repository

2. Install the dependencies

```sh
npm install
```

3. Start the local development server

```sh
npm run dev:server
```

4. Populate MongoDB database

```sh
npm run populate-db
```

#### Populated users

There are now two users in the MongoDB database:

1. Tony Stark

-   First Name: `Tony`
-   Last Name: `Stark`
-   Email: `tony@stark.com`
-   Password: `password123`

2. Steve Rogers

-   First Name: `Steve`
-   Last Name: `Rogers`
-   Email: `steve@rogers.com`
-   Password: `password456`
