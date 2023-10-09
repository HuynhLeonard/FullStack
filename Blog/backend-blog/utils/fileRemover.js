import fs from "fs";
import path from "path";

const fileRemover = (fileName) => {
    fs.unlink(path.join(__dirname, "../uploads", fileName), function(err) {
        if(err && err.code == "ENOENT") {
            console.log('File does not exist');
        } else if(err) {
            console.log(err.message);
            console.log("Error occured while trying to remove file.");
        } else {
            console.log("Removed File!");
        }
    });
};

export {fileRemover};