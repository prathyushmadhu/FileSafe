const CryptoJS = require('crypto-js');

// Encrypts using AES encryption.
const encryptFile = (fileData, encryptionKey) => {
    try {
        const wordArray = CryptoJS.lib.WordArray.create(fileData);
        const encryptedData = CryptoJS.AES.encrypt(wordArray, encryptionKey).toString();
        return encryptedData;
    } catch (error) {
        console.error('Error in encryption: ',error);
    }
};

const decryptFile = (encryptedData, encryptionKey) => {
    try {
        const decryptedData = CryptoJS.AES.decrypt(encryptedData, encryptionKey)
        const decryptedString = decryptedData.toString(CryptoJS.enc.Utf8);
        return decryptedString;
    } catch (error) {
        console.error('Error in decryption: ',error);
        throw error;
    }
};

module.exports = { encryptFile, decryptFile};