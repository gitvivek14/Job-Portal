const multer = require('multer');

// Configure storage to store files in memory
const storage = multer.memoryStorage();

// File filter function to only accept PDF files
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
        cb(null, true); // Accept the file
    } else {
        cb(new Error('Only PDF files are allowed'), false); // Reject the file
    }
};

// Create multer instance with storage and fileFilter configuration
const upload = multer({ storage, fileFilter });

module.exports = upload;
