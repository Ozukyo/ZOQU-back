const Pool = require("pg").Pool;

const pool = new Pool({
    user: "nrmvwjiwabgshh",
    password: "0d26b887f3b3f69052bc744bfa48bb9d420818c95df4f07f86fe3e382e2be903",
    database: "d4qa4te1hcs2ce",
    host: "ec2-63-34-97-163.eu-west-1.compute.amazonaws.com",
    port: 5432,
    ssl: {
        rejectUnauthorized: false
    }
});

module.exports = pool;
