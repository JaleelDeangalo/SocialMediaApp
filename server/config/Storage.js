const Multer = require("multer");
const fs = require("fs");

module.exports = {
    diskStorageOptions: Multer.diskStorage({
        destination: (req, file, callback) => {
            if (!fs.existsSync('./storage/tmp/')) {
                fs.mkdirSync('./storage/tmp/', {recursive:true});
            }

            // Create file name folder if it doesn't exist
            if (!fs.existsSync('./storage/tmp/' + file.fieldname)) {
                fs.mkdirSync('./storage/tmp/' + file.fieldname);
            }

            callback(null, './storage/tmp/');
        },
        filename: (req, file, callback) => {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
            const extension = file.originalname.split('.').pop();
            callback(null, file.fieldname + '/' + uniqueSuffix + '.' + extension);
        }
    }),

    upload: file => {
        return new Promise(function(resolve, reject) {

        });
    },
    download: file => {
        return new Promise(function(resolve, reject) {

        });
    },
    remove: file => {
        return new Promise(function(resolve, reject) {

        });
    },
    url: file => {
        return `${process.env.AWS_URL}/${file}`;
    }
}
