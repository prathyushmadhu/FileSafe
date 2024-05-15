const {encryptFile, decryptFile} = require('../utils/crypto');
const File = require('../models/file.model');


const uploadFile = async (req, res) => {
    try {
        if(!req.file) {
            return res.status(400).json({error: "No file uploaded"});
        }

        const encryptedData = encryptFile(req.file.buffer, process.env.AES_KEY);
        const userId = req.userId;
        const file = new File({
            filename: req.file.originalname,
            size: req.file.size,
            type: req.file.mimetype,
            owner: userId,
            data: encryptedData
        });

        await file.save();

        res.status(200).json({message: 'File uploaded successfully'});
    } catch (error) {
        console.error('Error in uploadFile: ',error);
        res.status(500).json({error: 'Internal Server error'});
    }
};

// To list the files.
const listFiles = async (req, res) => {
    try {
        const files = await File.find({owner: req.userId});
        res.status(200).json(files);
    } catch (error) {
        console.error('Error in listFiles: ',error);
        res.status(500).json({error: 'Internal server error'});
    }
};

// To download the files.
const fetchFile = async (req, res) => {
    try {
        const file = await File.findOne({_id: req.params.id, owner: req.userId});
        if (!file) {
            return res.status(404).json({error: 'File not found'});
        }
        const decryptedData = decryptFile(file.data, process.env.AES_KEY);
        res.status(200).send(decryptedData);
    } catch (error) {
        console.error('Error in downloadFile: ',error);
        res.status(500).json({error: 'Internal server error'});
    }
};

// To update the files
const updateFile = async (req, res) => {
    try {
        const updatedFile = await File.findOneAndUpdate({ _id: req.params.id, owner: req.userId }, req.body, { new: true });
        if(!updatedFile) {
            return res.status(404).json({error: 'File not found or unauthorised access'});
        }
        const decryptedData = decryptFile(updatedFile.data, process.env.AES_KEY);
        res.status(200).json({updatedFile, decryptedData});
    } catch (error) {
        console.error('Error in updateFile: ',error);
        req.status(500).json({error: 'Internal server error'});
    }
};

module.exports = {uploadFile, listFiles, fetchFile, updateFile};