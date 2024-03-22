# CPSC 304 Project

## Brief Summary Of Our Project

Our project aims to provide jobseekers with a holistic history and management software to keep track of applications and their related aspects (including resumes/cover letters, people, and reference letters), listings, and interviews. The idea is like how companies’ track applicants with various HR systems. Users can create a job posting, fill the attributes, location, and skill and experience requirements. They can paste document content such as resumes and cover letters for the corresponding job posting and see a version history of resumes and cover letters and the jobs associated. Users can add interviews conducted for the job postings, change the type/stage, and include the people involved and their employer.


## Timeline and task breakdown

We plan to separate our project into three separate parts and cycle between them as we develop our application. This includes the frontend design, the backend design (which will be connected via APIs and Express.js endpoints) and the common Oracle DB connection. 

#### Frontend and Backend:
- Main page -> connects buttons and routing the UI for access to every other page
- List views written in React -> List APIs written in Express and Node.js
- Add entities written in React -> Add APIs written in Express and Node.js
- Update written in React -> Update APIs written in Express and Node.js
- Delete written in React -> Delete APIs written in Express and Node.js

This is how we will interface the React Layer with the Node and Express.js backend layer. 
Within the backend specifically, we will interface to the database with the npm oracledb package. Each API endpoint will specifically run a query to the database with the connection package. 

#### Timeline: 
*We're planning to have everyone to work on every task so we learn the full development process, but the names listed here are the people who are leading the development for that task.*

- November 1 - React main page completed *(Ryan, Teevint)*
- November 4 - Oracle SQL connection to the backend *(Ryan, Antarip)*
- November 9 - Endpoints for listing APIs *(Antarip, Teevint)*
- November 17 - List views and miscellaneous in React *(Teevint, Ryan, Anatarip)*
  - *This includes the following:*
    - List components
    - Companies
    - Job Posting
      - Skills
      - Location
      - Experience
      - Cover Letter
    - Interview
    - People
- November 23 - Add, update, delete APIs *(Teevint, Ryan, Anatarip)*
  - For every entity within the database in our ER Diagram
- November 28 - Pages for add update delete in React *(Teevint, Ryan, Anatarip)*
  - For every entity within the database in our ER Diagram

Goal date to finish by: *November 28th*. 

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
