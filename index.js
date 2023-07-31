require("dotenv").config();
const server = require('./api/server');

// const PORT= 5000;
const LOCAL_PORT = process.env.PORT;

server.listen(process.env.PORT, () => {
    console.log(`\nListening on Port: ${LOCAL_PORT}\n`);
});