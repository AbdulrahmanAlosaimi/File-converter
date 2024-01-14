/*
The updateUI function takes a file blob and its extension, clears the body, and presents
the user with a download button, from which he/she can download the file
*/
function updateUI(blob, extension) {
    //reset body and add file download button
    document.getElementById("body").innerHTML =
        "<h2>Your File is Ready!</h2>" +
        '        <button class="btn"><a id="download">Download</a></button>';
    ("");
    //set the href attribute of the button to an object url that the user can click to download
    document
        .getElementById("download")
        .setAttribute("href", URL.createObjectURL(blob));
    //set the download attribute to "output.xxx" where xxx is the extension of the file that the user will download
    document
        .getElementById("download")
        .setAttribute("download", `output.${extension}`);
}

module.exports = {
    updateUI: updateUI
}