// These are the reserved keywords that will return in an exception if passed in to the sanitization too
const checks = [
    ";",
    "(",
    ")",
    "SELECT",
    "FROM",
    "WHERE",
    "DROP",
    "UPDATE",
    "INSERT",
    "DELETE"
]

const referenceString = "sanitization";

function sanitize(input) {
    // Our sanitization method checks to ensure that no malicious code is being passed through
    // First we check that no special inputs exist in any inputs to the methods
    if (Array.isArray(input)) {
        console.log("this an array sanitized");
        input.map((inputString) => {
            checks.map((check) => {
                if (inputString.toUpperCase().includes(check.toUpperCase())) {
                    throw new Error(referenceString);
                } 
            });
        });
    } else {
        checks.map((check) => {
            console.log("string is sanitized")
            if (input.toUpperCase().includes(check.toUpperCase())) {
                throw new Error(referenceString);
            } 
        });
    }

    return input;
}

module.exports = sanitize;