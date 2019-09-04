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
  res.send(fs.readFileSync("dist/index.html").toString())
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







var resolvers     = require('./graphql_resolvers.js')



var typeDefs     = require('./graphql_typedefs.js')

//Initialize the library with your Graphql information
const apolloserver = VoyagerServer({
  typeDefs,
  resolvers
})


apolloserver.applyMiddleware({ app })
app.listen(80, () => {
  console.log('Example app listening on port 80!')
});
