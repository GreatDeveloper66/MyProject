const fs = require('fs');
const path = require('path');

const out = process.stdout;

const filePath = path.resolve(__dirname, 'resources','data-file.txt');
const filePath2 = path.resolve(__dirname, 'resources','data-file2.txt');
const filePath3 = path.resolve(__dirname, 'resources','data-file3.txt');

out.write("Enter the text to write to the file: ");

process.stdin.on('data', data => {
    const text = data.toString().trim();
    if (text === 'exit') {
        process.exit();
    }
    fs.writeFile(filePath, text, err => {
        if (err) {
            console.error(err);
            return;
        }
        //file written successfully
        console.log("File written successfully\n");
        out.write("Enter the text to write to the file: ");
    })
    fs.appendFile(filePath2, text, err => {
        if (err) {
            console.error(err);
            return;
        }
        //file written successfully
        console.log("File appended successfully\n");
        out.write("Enter the text to write to the file: ");
    })
    fs.appendFile(filePath3, text, err => {
        if (err) {
            console.error(err);
            return;
        }
        //file written successfully
        console.log("File appended successfully\n");
        out.write("Enter the text to write to the file: ");
    })
}