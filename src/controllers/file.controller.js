const multer = require('multer');
const path = require('path');
const {encryptFile} = require('../utils/crypto')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
});

const upload = multer({ storage: storage});

const uploadFile = async (req, res) => {
    try {
        if(!req.file) {
            return res.status(400).json({error: "No file uploaded"});
        }

        const AES_KEY = process.env.AES_KEY;
        const encryptedData = encryptFile(req.file.buffer, 'encryptionKey')
        res.status(200).json({message: 'File uploaded successfully'});
    } catch (error) {
        console.error('Error in uploadFile: ',error);
        res.status(500).json({error: 'Internal Server error'});
    }
};

// To list the files.
const listFiles = async (req, res) => {
    try {
        const files = await File.find();
        res.status(200).json(files);
    } catch (error) {
        console.error('Error in listFiles: ',error);
        res.status(500).json({error: 'Internal server error'});
    }
};

// To download the files.
const downloadFile = async (req, res) => {
    try {
        const file = await File.findById(req.params.id);
        res.status(200).sendFile(file.path);
    } catch (error) {
        console.error('Error in downloadFile: ',error);
        res.status(500).json({error: 'Internal server error'});
    }
};

// To update the files
const updateFile = async (req, res) => {
    try {
        const updatedFile = await File.findByIdAndUpdate(req.params.id, req.body, {new: true});
        res.status(200).json(updatedFile);
    } catch (error) {
        console.error('Error in updateFile: ',error);
        req.status(500).json({error: 'Internal server error'});
    }
};