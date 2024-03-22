function errorHandler(error) {
    //All error strings must start with Error:
    // Checks first if the error is to do with sanitization and immediately output that error
    if (error.message == "sanitization") {
        return "Error: There was a problem with your input. Please check the formatting";
    } else if (error == "delete") {
        // Problem arised during deletion
        return "Error: Deletion was not successful";
    } else if (error == "update") {
        // Problem arised during update
        return "Error: Update was not successful";
    } else if (error == "insert") {
        // Problem arised during insert
        return "Error: Insertion was not successful";
    } else if (error.errorNum == 4054) {
        return "Error: Please double check your input is formatted correcly";
    } else if (error.errorNum == 920) {
        return "Error: This equivalence operation is not supported; please ensure that the input is correct";
    } else if (error.errorNum == 904) {
        return "Error: Your input does not match existing values.";
    } else if (error.errorNum == 936) {
        return "Error: Operation could not be found. Please ensure you have typed a correct operation"; 
    } else if (error.errorNum == 1400) {
        return "Error: Missing required field(s)"; 
    } else if (error.errorNum == 1) {
        return "Error: Item already exists for one or more field(s)"; 
    } else if (error.errorNum == 1772) {
        return "Error: Invalid data type in one or more field(s)"; 
    } else {
        return "Something went wrong. Please contact your database administrator";
    }
}

module.exports = errorHandler;