const express       = require('express')
const fs            = require('fs')
const compression   = require('compression')
const postgresdb    = require('pg')

const app = express();
app.use(compression())

app.get('/', (req, res) => {
  res.send(fs.readFileSync("public/index.html").toString())
});

app.listen(80, () => {
  console.log('Example app listening on port 80!')
});

app.get('/learno', (req, res) => {
    var config = {
      user:              "postgres",
      database:          "learno",
      password:          "postgres",
      host:              "127.0.0.1",
      port:              5432
    };
    var dbconnection = new postgresdb.Client(config);
    dbconnection.connect(function (err) {
      if (err) {
          console.log({error: '' + err});
      } else {
              useSql = "SELECT tablename as name FROM pg_catalog.pg_tables where schemaname = 'public';"
          dbconnection.query(useSql, [], function (err, result) {
            if (err) {
                console.log({failed: '' + err});
            } else {
                console.log("row count: " + result.rows.length); // outputs: { name: 'brianc' }
                res.writeHead(200, {'Content-Type': 'application/json'});
                res.end(JSON.stringify(
                    result.rows
                ));
            };
          })

      }
    });


});







app.get('/get_courses', (req, res) => {
    var config = {
      user:              "postgres",
      database:          "learno",
      password:          "postgres",
      host:              "127.0.0.1",
      port:              5432
    };
    var dbconnection = new postgresdb.Client(config);
    dbconnection.connect(function (err) {
      if (err) {
          console.log({error: '' + err});
      } else {
              useSql = "SELECT id, name FROM learno_tests;"
          dbconnection.query(useSql, [], function (err, result) {
            if (err) {
                console.log({failed: '' + err});
            } else {
                console.log("row count: " + result.rows.length); // outputs: { name: 'brianc' }
                res.writeHead(200, {'Content-Type': 'application/json'});
                res.end(JSON.stringify(
                    result.rows
                ));
            };
          })

      }
    });


});



app.get('/get_questions/*', (req, res) => {
    console.log("req.url: " + req.url)
    var queryData = req.url;
    var courseNumber = parseInt(queryData.substring(queryData.lastIndexOf("/") + 1))
    console.log("Course number: " + courseNumber)


    var config = {
      user:              "postgres",
      database:          "learno",
      password:          "postgres",
      host:              "127.0.0.1",
      port:              5432
    };
    var dbconnection = new postgresdb.Client(config);
    dbconnection.connect(function (err) {
      if (err) {
          console.log({error: '' + err});
      } else {
              useSql = " select id, question from learno_questions where fk_exam_id = " + courseNumber + "                 ;"
          dbconnection.query(useSql, [], function (err, result) {
            if (err) {
                console.log({failed: '' + err});
            } else {
                console.log("row count: " + result.rows.length); // outputs: { name: 'brianc' }
                res.writeHead(200, {'Content-Type': 'application/json'});
                res.end(JSON.stringify(
                    result.rows
                ));
            };
          })

      }
    });


});
