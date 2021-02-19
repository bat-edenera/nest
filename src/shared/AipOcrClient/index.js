const AipOcrClient = require("../aip-node-sdk").ocr;

const APP_ID = "23316260";
const API_KEY = "MM2Iit2GFlLjux8XP8dpXE5b";
const SECRET_KEY = "HctqrK7wFZYBHbfzpwLXt7y1AF3Q6dLh";
const client = new AipOcrClient(APP_ID, API_KEY, SECRET_KEY);
module.exports = client;

