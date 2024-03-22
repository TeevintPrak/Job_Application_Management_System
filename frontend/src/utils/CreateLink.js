export default function CreateLink(endpoint) {
    if (process.env.REACT_APP_SERVER_ADDRESS != null) {
        return process.env.REACT_APP_SERVER_ADDRESS + endpoint;
    } else {
        console.log("Could not find URL for server in .env file. Setting default of http://localhost:3001");
        return "http://localhost:3001" + endpoint;
    }
}