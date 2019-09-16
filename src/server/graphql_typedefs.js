// ----------------------------------------------------------------------
//
// ----------------------------------------------------------------------

const { gql }    = require('@aerogear/voyager-server')






module.exports = gql`

  type Question {
      id:Int
      question: String
      category: String
      multiple_answer_1: String
      text_answer_1: String
      multiple_answer_2: String
      text_answer_2: String
      multiple_answer_3: String
      text_answer_3: String
      multiple_answer_4: String
      text_answer_4: String
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

    getQuestions(courseId: Int):  [Question]

    getTests:  [Test]

    getTest(id: Int):  Test

    getQuestion(id: Int):  Question

    getUsers:  [User]

    getTopCourses:  [Test]
  }
`
