var sqlite3 = require("sqlite3").verbose();

const DBSOURCE = "db.sqlite";

let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
        console.error(err.message);
        throw err;
    } else {
        console.log('Connected to the SQLite Database');
        db.run(
            `CREATE TABLE IF NOT EXISTS customer(
                customerId INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT,
                address TEXT,
                email TEXT,
                dateOfBirth TEXT,
                gender TEXT,
                age TEXT,
                cardHolderName TEXT,
                cardNumber TEXT,
                expiryDate TEXT,
                cvv TEXT,
                timeStamp TEXT
            )`, (err) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log('Table "customer" has been created or already exists.');
                var insert = 'INSERT INTO customer (name,address,email,dateOfBirth,gender,age,cardHolderName,cardNumber,expiryDate,cvv,timeStamp) VALUES (?,?,?,?,?,?,?,?,?,?,?)';
                db.run(insert, ["A.D. Lakith Dharmasiri", "No 324/A Re De Mel Road, Colombo", "lakith@gmail.com", "1991.02.25", "female", "28", "A.D. Dharmasiri", "102445217895", "12/2022", "246", "2022-12-31 23:59:59"]);
            }
        });
    }
});
