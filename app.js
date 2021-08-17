const express = require('express');
const {Client} = require('pg');

function getClient1() {
    const client1 = new Client({
        user: 'rootuser1',
        host: 'postgres-db-1',
        database: 'databasename1',
        password: 'rootpassword1',
        port: 5432,
    });
    client1.connect();
    return client1;
}

function getClient2() {
    const client2 = new Client({
        user: 'rootuser2',
        host: 'postgres-db-2',
        database: 'databasename2',
        password: 'rootpassword2',
        port: 5432,
    });
    client2.connect();
    return client2;
}

var app = express();
var port = process.env.PORT || 4000
app.set('port', port);

app.get('/', function (req, res) {
    res.status(200).send("Hello World");
});

app.get('/db1', function (req, res) {
    var client = getClient1();
    client.query('SELECT * FROM Employee where id = $1', [1], function (err, result) {
        if (err) {
            console.log(err);
            res.status(400).send(err);
        }
        res.status(200).send(result.rows);
        client.end();
    });
});

app.get('/db2', function (req, res) {
    var client = getClient2();
    client.query('SELECT * FROM Employee where id = $1', [1], function (err, result) {
        if (err) {
            console.log(err);
            res.status(400).send(err);
        }
        res.status(200).send(result.rows);
        client.end();
    });
});

app.get('/compare', function (req, res) {
    var client1 = getClient1();
    client1.query('SELECT * FROM Employee where id = $1', [1], function (err1, result1) {
        if (err1) {
            console.log(err1);
            res.status(400).send(err1);
            client1.end();
        } else {
            var client2 = getClient2();
            client2.query('SELECT * FROM Employee where id = $1', [1], function (err2, result2) {
                if (err2) {
                    console.log(err2);
                    res.status(400).send(err2);
                } else {
                    var result1Row1 = result1.rows[0];
                    var result2Row1 = result2.rows[0];

                    var msg;
                    if (result1Row1.id !== result2Row1.id) {
                        msg = "Id: " + result1Row1.id + " does not equal " + result2Row1.id;
                    } else if(result1Row1.rollnumber !== result2Row1.rollnumber) {
                        msg = "Rollnumber: " + result1Row1.rollnumber + " does not equal " + result2Row1.rollnumber;
                    } else if(result1Row1.name !== result2Row1.name) {
                        msg = "Name: " + result1Row1.name + " does not equal " + result2Row1.name;
                    } else {
                        msg = "Row: " + result1Row1 + " is equal to " + result2Row1;
                    }
                    res.status(200).send(msg);
                }
                client1.end();
                client2.end();
            });
        }
    });
});

app.listen(4000, function () {
    console.log('Server is running.. on Port ' + port);
});