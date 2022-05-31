//add requirements
const Showdown = require("showdown");
const { convert } = require("html-to-text");
const updateUI = require('../js/View');
const Papa = require("papaparse");

//define the class "FileClass"
module.exports = class FileClass {
    fileName;
    fileType;
    file;

    //class constructor
    constructor(file) {
        this.file = file;
        this.fileName = file.name;
        this.fileType = file.type;
    }

    //setters and getters
    setName(newName) {
        this.fileName = newName;
    }

    getName() {
        return this.fileName;
    }

    getType() {
        return this.fileType;
    }

    //object cloning method to clone file for prototype usage
    clone() {
        return Object.create(this);
    }

    //function to convert html files to plain text files
    htmlToTxt(fileReader) {
        fileReader.readAsText(this.file, "UTF-8");
        fileReader.onload = function(evt) {
            let html = evt.target.result;
            let text = convert(html, { wordwrap: 130 });
            let blob = new Blob([text], {
                type: "text/plaintext;charset=utf-8",
            });

            updateUI.updateUI(blob, 'txt');
        }
    }

    //function to convert html files to markdown files
    htmlToMd(fileReader) {
        let converter = new Showdown.Converter();
        fileReader.readAsText(this.file, "UTF-8");
        fileReader.onload = function(evt) {
            let md = converter.makeMarkdown(evt.target.result);
            let blob = new Blob([md], {
                type: "text/markdown;charset=utf-8",
            });

            updateUI.updateUI(blob, 'md');
        }
    }

    //function to convert markdown files to html files
    mdToHtml(fileReader) {
        let converter = new Showdown.Converter();
        fileReader.readAsText(this.file, "UTF-8");
        fileReader.onload = function(evt) {
            let html = converter.makeHtml(evt.target.result);
            let blob = new Blob([html], { type: "text/html;charset=utf-8" });

            updateUI.updateUI(blob, 'html');
        }
    }

    //function to convert json files to csv files
    jsonToCsv(fileReader) {
        let res = JSON.stringify(this.file);
        let array =
            typeof res != "object" ? JSON.parse(res) : res;
        let str = "";

        for (let i = 0; i < array.length; i++) {
            let line = "";
            for (let index in array[i]) {
                if (line != "") line += ",";

                line += array[i][index];
            }

            str += line + "\r\n";
        }

        let blob = new Blob([res], { type: "text/csv;charset=utf-8" });
        updateUI.updateUI(blob, 'csv');
    }

    //function to convert csv files to json files
    csvToJson() {
        Papa.parse(this.file, {
            complete: function(res) {
                let blob = new Blob([JSON.stringify(res.data)], { type: "application/json;charset=utf-8" })
                updateUI.updateUI(blob, 'json');
            },
        });
    }
}