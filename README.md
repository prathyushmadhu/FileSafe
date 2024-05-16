# FileSafe

FileSafe is a secure file storage application that allows users to upload, store, and manage files with end-to-end encryption.

## Features

- **Secure Storage**: All files are encrypted before storage, ensuring data privacy and security.
- **User Authentication**: Users can sign up, log in, and manage their accounts securely.
- **File Management**: Upload, download, update, and delete files with ease.
- **Access Control**: Each user has access only to their own files.

## Architecture Overview
FileSafe is a web application built using the client-server architecture model. It consists of a frontend, backend, and database components, each serving a specific role in the application.

![Screenshot_2024-05-16_14-54-32](https://github.com/prathyushmadhu/FileSafe/assets/99325314/55e5f27c-dd1a-499c-8c23-54fdc5cc3f82)


### Backend
The backend of FileSafe handles the business logic and data processing for the application. It is built using Node.js and Express.js framework. The backend communicates with the frontend to handle user requests, perform authentication, manage files, and interact with the database. It also ensures the security of the application by encrypting and decrypting files, hashing passwords, and generating JSON Web Tokens (JWT) for authentication.

### Database
The database component of FileSafe stores user information, file metadata, and encrypted file contents. It is implemented using MongoDB, a NoSQL database that provides flexibility and scalability for storing unstructured data. The database stores collections for users and files. MongoDB Atlas, a cloud-hosted database service, is used to ensure data availability and reliability.

### Encryption and Security
FileSafe prioritizes data security and privacy by employing encryption techniques at various levels of the application. AES encryption is used to encrypt file contents before storage, ensuring that only authorized users can access and view the files. Passwords are hashed using bcrypt before storing them in the database, protecting user accounts from unauthorized access. JSON Web Tokens (JWT) are used for user authentication, providing a secure mechanism for validating user identity and authorizing access to protected resources.

### Frontend
The frontend of FileSafe is responsible for the user interface and interaction with users. It is built using HTML, CSS, and JavaScript, along with frameworks like React.js or Vue.js. The frontend provides a user-friendly interface for users to interact with the application, including features such as user authentication, file management, and viewing file details. This phase is still under work and contributions are accepted.

### Deployment
FileSafe can be deployed using containerization technologies like Docker and container orchestration platforms like Kubernetes. Docker containers can encapsulate the application components, including the frontend, backend, and database, along with their dependencies, into portable and lightweight units that can be deployed across different environments. This phase is still under work and contributions are accepted.

## Technologies Used

- **Node.js**: Backend runtime environment.
- **Express.js**: Web application framework for Node.js.
- **MongoDB**: NoSQL database for storing user information and file metadata.
- **Mongoose**: MongoDB object modeling for Node.js.
- **Multer**: Middleware for handling file uploads.
- **bcrypt**: Library for hashing passwords.
- **jsonwebtoken (JWT)**: Library for generating and verifying JSON Web Tokens for user authentication.
- **crypto-js**: Library for cryptographic functions such as encryption and decryption.

## Encryption and Decryption

FileSafe uses AES encryption for securing file contents. When a file is uploaded, it is encrypted using an AES key before being stored in the database. When a user downloads a file, it is decrypted using the same AES key.

```javascript
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

```

## Hashing Passwords

Passwords are hashed using bcrypt before being stored in the database. This ensures that even if the database is compromised, the passwords remain secure.

```javascript
const bcrypt = require('bcrypt');

// Hash password
const hashPassword = async (password) => {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
};

// Compare hashed password with plain password
const comparePassword = async (plainPassword, hashedPassword) => {
    const match = await bcrypt.compare(plainPassword, hashedPassword);
    return match;
};
```

## Authentication with JWT

FileSafe uses JSON Web Tokens (JWT) for user authentication. When a user logs in, a JWT containing the user's information is generated and sent to the client. This token is then included in subsequent requests to authenticate the user.

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/prathyushmadhu/FileSafe.git
cd FileSafe
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:

Create a `.env` file in the root directory and add the following variables:

```
PORT=3000
MONGODB_URI=your-mongodb-uri
JWT_SECRET=your-jwt-secret
AES_KEY=your-aes-key
```

4. Start the server:

```bash
npm start
```

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue if you encounter any problems or have suggestions for improvements.
