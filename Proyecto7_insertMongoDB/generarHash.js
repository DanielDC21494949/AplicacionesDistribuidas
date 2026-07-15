const SHA256 = require("crypto-js/sha256");

const passwords = [
    "123456",
    "ana123",
    "carlos456",
    "fer789",
    "luis321",
    "mari654"
];

passwords.forEach(password => {
    console.log(password, "=>", SHA256(password).toString());
});