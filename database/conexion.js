const { MongoClient } = require("mongodb");

const uri = "mongodb://localhost:27017";

const client = new MongoClient(uri);

async function conectar() {
    await client.connect();
    return client.db("LoginDB");
}

module.exports = conectar;