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








// ----------------------------------------------------------------------
//
// ----------------------------------------------------------------------
var pgglobal = {
  user:              "postgres",
  database:          "learno",
  password:          "postgres",
  host:              "127.0.0.1",
  port:              5432
};





// ----------------------------------------------------------------------
//
// ----------------------------------------------------------------------
var dbb = new postgresdb.Client(pgglobal);
dbb.connect(function (err) {
    console.log("Connected: " + err)
})

var typeDefs     = require('./graphql_typedefs.js')




// ----------------------------------------------------------------------
// Create the resolvers for your schema
// ----------------------------------------------------------------------
module.exports = {
    Query: {
        //
        // get list of questions
        //
        getQuestions: (obj, args, context, info) => {
            return new Promise((resolve, reject) => {
                //return `Hello world ${args.name}`
                console.log(123);
                dbb.query("select id, question,multiple_answer_1,text_answer_1,multiple_answer_2,text_answer_2,multiple_answer_3,text_answer_3,multiple_answer_4,text_answer_4 from learno_questions where fk_exam_id = " + args.courseId, [], function (err, result) {
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




        //
        // get all the tests
        //
        getTests: (obj, args, context, info) => {
            return new Promise((resolve, reject) => {
                dbb.query("select id,name, description,rating from learno_tests limit 10;", [], function (err, result) {
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







        getQuestion: (obj, args, context, info) => {
            return new Promise((resolve, reject) => {
                //return `Hello world ${args.name}`
                console.log("GetQuestion: " + args.id);
                dbb.query("select id, question,multiple_answer_1,text_answer_1,multiple_answer_2,text_answer_2,multiple_answer_3,text_answer_3,multiple_answer_4,text_answer_4 from learno_questions where fk_exam_id = " + args.id, [], function (err, result) {
                  if (err) {
                      console.log({failed: '' + err});
                      reject(err)
                  } else {
                      console.log(JSON.stringify(result.rows[0],null,2));
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
