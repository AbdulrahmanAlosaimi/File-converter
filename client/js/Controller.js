//require the model file
const FileClass = require("../js/Model");

//selecting all required elements
const dropArea = document.querySelector(".drag-area"),
    dragText = dropArea.querySelector("header"),
    button = dropArea.querySelector("button"),
    input = dropArea.querySelector("input");
let originalFile; //this is a global variable and we'll use it inside multiple functions
let fileClone; //initialize the file clone which will be used to implement the prototype design pattern

button.onclick = () => {
    input.click(); //if user click on the button then the input also clicked
};

input.addEventListener("change", function() {
    //getting user select file and [0] this means if user select multiple files then we'll select only the first one
    originalFile = new FileClass(this.files[0]);
    // Cloning the original file received to edit it
    fileClone = originalFile.clone();
    dropArea.classList.add("active");
    displayOptions(); //calling function
});

//If user Drag File Over DropArea
dropArea.addEventListener("dragover", (event) => {
    event.preventDefault(); //preventing from default behaviour
    dropArea.classList.add("active");
    dragText.textContent = "Release to Upload File";
});

//If user leave dragged File from DropArea
dropArea.addEventListener("dragleave", () => {
    dropArea.classList.remove("active");
    dragText.textContent = "Drag & Drop to Upload .csv, .html, .json, or .md File";
});

//If user drop File on DropArea
dropArea.addEventListener("drop", (event) => {
    event.preventDefault(); //preventing from default behaviour
    //getting user select file and [0] this means if user select multiple files then we'll select only the first one
    file = event.dataTransfer.files[0];
    displayOptions(); //calling function
});

/*
In the displayOptions() function, the uploaded file's type will be identified, then the file will be handled accordingly
*/
function displayOptions() {
    //identify file type to check for markdown files specifically (other types will be handled differently)
    let fileType =
        fileClone.file.name.split(".").pop() == "md" ?
        "text/markdown" :
        fileClone.file.type; //getting selected file type
    //adding some valid extensions in array
    let validExtensions = [
        "text/markdown",
        "text/csv",
        "text/html",
        "application/json",
    ];
    //check if the passed file has a type that our converter supports
    if (validExtensions.includes(fileType)) {
        let fileReader = new FileReader(); //creating new FileReader object
        fileReader.onload = () => {
            //create a switch to handle each type respectively
            switch (fileType) {
                case "application/json":
                    //reset body and add conversion options
                    document.getElementById("body").innerHTML =
                        "<h2>Choose a file type to convert to:</h2>" +
                        '    <div class="container">' +
                        '        <div class="box" id="json-csv">' +
                        '            <div class="content">' +
                        '                <img src="../media/csv.png">' +
                        "                <p>CSV" +
                        "                </p>" +
                        "            </div>" +
                        "        </div>" +
                        "    </div>" +
                        "";
                    //listen to clicks on the passed button
                    document.getElementById("json-csv").addEventListener("click", () => {
                        //if the button is clicked, call the method that'll handle the conversion from the Model.js class
                        fileClone.jsonToCsv(fileReader);
                    });
                    break;
                case "text/markdown":
                    //reset body and add conversion options
                    document.getElementById("body").innerHTML =
                        "<h2>Choose a file type to convert to:</h2>" +
                        '    <div class="container">' +
                        '        <div class="box" id="md-html">' +
                        '            <div class="content">' +
                        '                <img src="../media/html.png">' +
                        "                <p>HTML" +
                        "                </p>" +
                        "            </div>" +
                        "        </div>" +
                        "    </div>" +
                        "";
                    //listen to clicks on the passed button
                    document.getElementById("md-html").addEventListener("click", () => {
                        //if the button is clicked, call the method that'll handle the conversion from the Model.js class
                        fileClone.mdToHtml(fileReader);
                    });

                    break;
                case "text/html":
                    //reset body and add conversion options
                    document.getElementById("body").innerHTML =
                        "<h2>Choose a file type to convert to:</h2>" +
                        '    <div class="container">' +
                        '        <div class="box" id="html-md">' +
                        '            <div class="content">' +
                        '                <img src="../media/md.png">' +
                        "                <p>Markdown" +
                        "                </p>" +
                        "            </div>" +
                        "        </div>" +
                        '<div class="box" id="html-txt">' +
                        '            <div class="content">' +
                        '                <img src="../media/txt.png">' +
                        "                <p>Plain Text" +
                        "                </p>" +
                        "            </div>" +
                        "        </div>";
                    "    </div>" + "";
                    //listen to clicks on the passed button
                    document.getElementById("html-md").addEventListener("click", () => {
                        //if the button is clicked, call the method that'll handle the conversion from the Model.js class
                        fileClone.htmlToMd(fileReader);
                    });
                    document.getElementById("html-txt").addEventListener("click", () => {
                        //if the button is clicked, call the method that'll handle the conversion from the Model.js class
                        fileClone.htmlToTxt(fileReader);
                    });
                    break;
                case "text/csv":
                    //reset body and add conversion options
                    document.getElementById("body").innerHTML =
                        "<h2>Choose a file type to convert to:</h2>" +
                        '    <div class="container">' +
                        '        <div class="box" id="csv-json">' +
                        '            <div class="content">' +
                        '                <img src="../media/json.png">' +
                        "                <p>JSON" +
                        "                </p>" +
                        "            </div>" +
                        "        </div>" +
                        "    </div>" +
                        "";
                    //listen to clicks on the passed button
                    document.getElementById("csv-json").addEventListener("click", () => {
                        //if the button is clicked, call the method that'll handle the conversion from the Model.js class
                        fileClone.csvToJson();
                    });
                    break;
            }
        };
        //read the file reader as a data url by passing the blob to be downloaded (used to download)
        fileReader.readAsDataURL(fileClone.file);
    } else {
        //if the uploaded file is not of a supported format, alert the users and reset the file upload form
        alert(
            "This is not a supported file type.\nKindly upload a file of the following formats: .csv, .html, .json., .md"
        );
        dropArea.classList.remove("active");
        dragText.textContent = "Drag & Drop to Upload .csv, .html, .json, or .md File";
    }
}