// ----------------------------------------------------------------------
//
// ----------------------------------------------------------------------
const   express                 = require('express')
const   fs                      = require('fs')
const   compression             = require('compression')
const   postgresdb              = require('pg')
var     http                    = require('http')
var     https                   = require('https');
const { VoyagerServer, gql }    = require('@aerogear/voyager-server')
var     ip                      = require('ip');






// ----------------------------------------------------------------------
//
// ----------------------------------------------------------------------
const app               =  express();
var socket              =  null
var io                  =  null;
var serverwebsockets    = [];
var httpServer          =  http.createServer(app)







// ----------------------------------------------------------------------
//
// ----------------------------------------------------------------------
app.use(compression())
app.use(express.static('dist'))







// ----------------------------------------------------------------------
//
// ----------------------------------------------------------------------
app.get('/', (req, res) => {
  res.send(fs.readFileSync("public/index.html").toString())
});







// ----------------------------------------------------------------------
//
// ----------------------------------------------------------------------
app.get('/gqljs', (req, res) => {
  res.send(fs.readFileSync("makeGraphQLjsLib/dist/index.js").toString())
});








// ----------------------------------------------------------------------
//
// ----------------------------------------------------------------------
app.get('/2', (req, res) => {
  res.send(fs.readFileSync("dist/index3.html").toString())
});







// ----------------------------------------------------------------------
//
// ----------------------------------------------------------------------
app.get('/course_ids/*', (req, res) => {
    var qwer = fs.readFileSync("public/index.html").toString()

  console.log("req.url: " + req.url)
  var queryData = req.url;
  var courseNumber = parseInt(queryData.substring(queryData.lastIndexOf("/") + 1))
  console.log("Course number: " + courseNumber)

  /*SETUP*/
  scriptCode = "app.mode = 'questions';"
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
            useSql = " select id, question, multiple_answer_1, text_answer_1,multiple_answer_2,text_answer_2,multiple_answer_3,text_answer_3,multiple_answer_4,text_answer_4 from learno_questions where fk_exam_id = " + courseNumber + "                 ;"
        dbconnection.query(useSql, [], function (err, result) {
          if (err) {
              console.log({failed: '' + err});
          } else {
              console.log("row count: " + result.rows.length); // outputs: { name: 'brianc' }
              scriptCode += "app.questions = " + JSON.stringify(result.rows,null,2)
              var pos = qwer.indexOf("/*SETUP*/")
              var newStaticFileContent = qwer.slice(0, pos)  + scriptCode + qwer.slice( pos)

              res.send(newStaticFileContent)
                    };
        })

    }
  });

});


function sendOverWebSockets(data) {
    var ll = serverwebsockets.length;
    //console.log('send to sockets Count: ' + JSON.stringify(serverwebsockets.length));
    for (var i =0 ; i < ll; i++ ) {
        var sock = serverwebsockets[i];
        sock.emit(data.type,data);
        //console.log('                    sock ' + i + ': ' + JSON.stringify(sock.readyState));
    }
}
var pgglobal = {
  user:              "postgres",
  database:          "learno",
  password:          "postgres",
  host:              "127.0.0.1",
  port:              5432
};
var dbb = new postgresdb.Client(pgglobal);

dbb.connect(function (err) {
console.log("Connected: " + err)
})

const typeDefs = gql`
  type Question {
      id:Int
      question: String
      category: String

  }
  type Test {
      id:Int
      name: String
      description: String
      questions: [Question]
      rating: Int

  }
  type User {
      id: Int
      user_name: String
  }
  type Query {
    getQuestions: [Question]
    getTests: [Test]
    getTest(id: Int): Test
    getUsers: [User]
    getTopCourses: [Test]
  }
`

//Create the resolvers for your schema
const resolvers = {
  Query: {
    getQuestions: (obj, args, context, info) => {
        return new Promise((resolve, reject) => {
            //return `Hello world ${args.name}`
            console.log(123);
            dbb.query("select id, question,category from learno_questions;", [], function (err, result) {
              if (err) {
                  console.log({failed: '' + err});
                  reject(err)
              } else {
                  console.log("row count: " + result.rows.length); // outputs: { name: 'brianc' }
                  console.log(JSON.stringify(result.rows,null,2))
                  resolve(result.rows)
              };
            })
        })
    },
    getTests: (obj, args, context, info) => {
        return new Promise((resolve, reject) => {
            //return `Hello world ${args.name}`
            console.log(123);
            dbb.query("select id,name, description from learno_tests;", [], function (err, result) {
              if (err) {
                  console.log({failed: '' + err});
                  reject(err)
              } else {
                  console.log("row count: " + result.rows.length); // outputs: { name: 'brianc' }
                  console.log(JSON.stringify(result.rows,null,2))
                  resolve(result.rows)
              };
            })
        })
    },
    getTopCourses: (obj, args, context, info) => {
        return new Promise((resolve, reject) => {
            dbb.query("select id,name, description, rating from learno_tests where publish='Y' and type='TEST' and rating > 0 and parent_test_id=121 order by rating desc limit 10;",
            [],
            function (err, result) {
              if (err) {
                  console.log({failed: '' + err});
                  reject(err)
              } else {
                  console.log("row count: " + result.rows.length); // outputs: { name: 'brianc' }
                  console.log(JSON.stringify(result.rows,null,2))
                  resolve(result.rows)
              };
            })
        })
    },
    getTest: (obj, args, context, info) => {
        return new Promise((resolve, reject) => {
            //return `Hello world ${args.name}`
            console.log(123);
            dbb.query("select id,name,description from learno_tests where id = " + args.id, [], function (err, result) {
              if (err) {
                  console.log({failed: '' + err});
                  reject(err)
              } else {
                  console.log("row count: " + result.rows.length); // outputs: { name: 'brianc' }
                  console.log(JSON.stringify(result.rows,null,2))
                  resolve(result.rows[0])
              };
            })
        })
    },
    getUsers: (obj, args, context, info) => {
        return new Promise((resolve, reject) => {
            //return `Hello world ${args.name}`
            console.log(123);
            dbb.query("select id,user_name from yazz_login_details" , [], function (err, result) {
              if (err) {
                  console.log({failed: '' + err});
                  reject(err)
              } else {
                  console.log("row count: " + result.rows.length); // outputs: { name: 'brianc' }
                  console.log(JSON.stringify(result.rows,null,2))
                  resolve(result.rows)
              };
            })
        })
    }
},
Test: {
    questions: (obj, args, context, info) => {
        return new Promise((resolve, reject) => {
            //return `Hello world ${args.name}`
            console.log(123);
            dbb.query("select id, question,category from learno_questions where fk_exam_id = " + obj.id, [], function (err, result) {
              if (err) {
                  console.log({failed: '' + err});
                  reject(err)
              } else {
                  console.log("row count: " + result.rows.length); // outputs: { name: 'brianc' }
                  console.log(JSON.stringify(result.rows,null,2))
                  resolve(result.rows)
              };
            })
        })
    }
}

}

//Initialize the library with your Graphql information
const apolloserver = VoyagerServer({
  typeDefs,
  resolvers
})


apolloserver.applyMiddleware({ app })
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
              useSql = "SELECT id, name, description,rating FROM learno_tests;"
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
              useSql = " select id, question,multiple_answer_1,text_answer_1,multiple_answer_2,text_answer_2,multiple_answer_3,text_answer_3,multiple_answer_4,text_answer_4 from learno_questions where fk_exam_id = " + courseNumber + "                 ;"
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
