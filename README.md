# CPSC 304: Career Networking System

The Career Networking System aims to provide jobseekers with a holistic history and management system to keep track of applications and their related aspects (including resumes/cover letters, people, and reference letters), listings, and interviews. The idea is like how companies’ track applicants with various HR systems. Users can create a job posting, fill the attributes, location, and skill and experience requirements. They can paste document content such as resumes and cover letters for the corresponding job posting and see a version history of resumes and cover letters and the jobs associated. Users can add interviews conducted for the job postings, change the type/stage, and include the people involved and their employer.

## Credit

This project started as a CPSC 304 Database course project assignment that is being adapted into my personal project. I would like to thank my group project teammates Ryan and Antarip for their contributions.

## Development Setup and Details

The logic of this application is split into two parts the frontend (/frontend) and the backend (/backend). The frontend code will be written with React.js and the backend with Node.js. 

The following is a guide for running, testing, and building the frontend:

### Backend

First `cd` into the backend directory `/backend`. 

Run `node app.js`. This will start the server on the port `3001`.

Alternatively, if you are actively doing development work, running with `nodemon` (if installed) will allow for hot reloading. Run with `nodemon app.js`.

### Frontend

To run any of these commands, run `cd frontend` to enter the frontend directory if you are main first.

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
