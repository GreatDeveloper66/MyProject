const fs = require('fs');

const path = require('path');
const express = require('express');
const app = express();
fs.readFile(path.resolve(__dirname, 'resources','data-file.txt'), 'utf8', (err, data) => {
    if (err) {
        console.error(err)
        return
    }
    fs.writeFile(path.resolve(__dirname, 'resources','data-file2.txt'), data, (err) => {
        if (err) {
            console.error(err)
            return
        }
        //file written successfully
        console.log("File written successfully\n");
    })

    fs.appendFile(path.resolve(__dirname, 'resources','data-file3.txt'), data, (err) => {
        if (err) {
            console.error(err)
            return
        }
        //file written successfully
        console.log("File appended successfully\n");
    })
})