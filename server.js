var express = require("express");
var app = express();
var db = require("./database.js");
const sqlite3 = require("sqlite3");
var bodyParser = require("body-parser");
const { request, response } = require("express");
app.use(bodyParser.json());

let HTTP_PORT = 8060;

app.listen(HTTP_PORT, () => {
    console.log("Server is running on %PORT%".replace("%PORT%", HTTP_PORT))
});

app.post("/api/customer", (req, res, next) => {
    try {
        if (!req.body) {
            res.status(400).json({ "error": "Missing request body" });
            return;
        }

        const {
            name,
            address,
            email,
            dateOfBirth,
            gender,
            age,
            cardHolderName,
            cardNumber,
            expiryDate,
            cvv,
            timeStamp
        } = req.body;

        var sql = 'INSERT INTO customer (name,address,email,dateOfBirth,gender,age,cardHolderName,cardNumber,expiryDate,cvv,timeStamp) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
        var params = [name, address, email, dateOfBirth, gender, age, cardHolderName, cardNumber, expiryDate, cvv, timeStamp];

        db.run(sql, params, function (err, result) {
            if (err) {
                res.status(400).json({ "error": err.message });
                return;
            } else {
                res.json({
                    "message": "customer A.D. Lakith Sharmasiri has registered",
                    "data": req.body,
                    "customerId": this.lastID
                });
            }
        });
    } catch (E) {
        res.status(400).send(E);
    }
});

app.get("/api/customer", (req, res, next) => {
    try {
        var sql = "select * from customer"
        var params = []
        db.all(sql, params, (err, rows) => {
            if (err) {
                res.status(400).json({ "error": err.message });
                return;
            }
            res.json({
                "message": "customer A.D. Lakith Sharmasiri has registered",
                "data": rows
            })
        });
    } catch (E) {
        res.status(400).send(E);
    }
});

app.put("/api/customer", (req, res, next) => {
    const {
        name,
        address,
        email,
        dateOfBirth,
        gender,
        age,
        cardHolderName,
        cardNumber,
        expiryDate,
        cvv,
        timeStamp
    } = req.body;

    db.run(`UPDATE customer set productName = ?,description = ?,category = ?,brand = ?,expiredDate = ?,manufactureDate = ?,batchNumber = ?,unitPrice = ?,quantity = ?,createDate = ? WHERE customerId = ?`,
        [productName, description, category, brand, expiredDate, manufacturedDate, batchNumber, unitPrice, quantity, createDate],
        function (err, result) {
            if (err) {
                res.status(400).json({ "error": res.message })
                return;
            }
            res.status(200).json({ updated: this.changes })
        });
});

app.delete("/api/products/delete/:customerId", (req, res, next) => {
    try {
        db.run('DELETE FROM customer WHERE customerId = ?',
            re.params.customerId,
            function (err, result) {
                if (err) {
                    res.status(400).json({ "error": res.message })
                    return;
                }
                re.json({ "message": "delete", rows: this.changes })
            });
    } catch (E) {
        res.status(400).setDefaultEncoding(E)
    }
});
