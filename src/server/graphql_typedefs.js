// ----------------------------------------------------------------------
//
// ----------------------------------------------------------------------

const { gql }    = require('@aerogear/voyager-server')






module.exports = gql`

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
    getQuestions:       [Question]

    getTests:           [Test]

    getTest(id: Int):    Test

    getUsers:           [User]
    
    getTopCourses:      [Test]
  }
`
