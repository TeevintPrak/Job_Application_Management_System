export default function ErrorDialog(error) {
    if (error.response.data.startsWith("Error:")) {
        alert(error.response.data);
    } else {
        alert('Something went wrong');
    }
    console.log(error);
}