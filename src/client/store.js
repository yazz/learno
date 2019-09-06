import   Vue                from "vue";
import   Vuex               from 'vuex';
import { request }          from "graphql-request";

Vue.use(Vuex);



export const store = new Vuex.Store(
    {
        state: {
            mode:           "home"
            ,
            top_courses:    []
            ,
            courses:        []
            ,
            questions:      []
            ,
            records: {
                questions: {

                }
                ,
                courses: {

                }
            }
        }
        ,





        mutations: {
            setMode(state, newMode) {
                state.mode = newMode
                if (newMode == "home") {
                    window.history.pushState("object or string", "Title", "/");
                } else if (newMode == "courses") {
                    window.history.pushState("object or string", "Title", "/");
                }
            }
            ,





            setTopCourses(state) {
                request(
                            "/graphql"
                            ,
                            `query {
                                getTopCourses {
                                    id
                                    name
                                    description
                                }
                            }
                            `
                    )
                .then(
                        result => {
                            //console.log(result)
                            //alert(JSON.stringify(result,null,2))
                            state.top_courses =  result.getTopCourses
                        }
                    );
            }
            ,
            setTests(state, newMode) {
                request(
                            "/graphql"
                            ,
                            `query {
                                getTests {
                                    id
                                    name
                                    description
                                }
                            }
                            `
                    )
                .then(
                        result => {
                            //console.log(result)
                            //alert(JSON.stringify(result,null,2))
                            state.courses = result.getTests
                        }
                    );
            }
            ,
            setQuestions(state, newMode) {

                request(
                            "/graphql"
                            ,
                            `query {
                                getQuestions(courseId: ${newMode}) {
                                    id
                                    question
                                    category
                                    multiple_answer_1
                                    text_answer_1
                                    multiple_answer_2
                                    text_answer_2
                                    multiple_answer_3
                                    text_answer_3
                                    multiple_answer_4
                                    text_answer_4
                                }
                            }
                            `
                    )
                .then(
                        result => {
                            window.history.pushState("object or string", "Title", "/course_ids/" + newMode);
                            //console.log(result)
                            //alert(JSON.stringify(result,null,2))
                            state.questions = []
                            for (var i=0; i<result.getQuestions.length;i++) {
                                var thisQuestion = result.getQuestions[i]
                                if (!state.records.questions[thisQuestion.id]) {
                                    state.records.questions[thisQuestion.id] = thisQuestion
                                }
                                state.questions.push({id: result.getQuestions[i].id})
                            }
                        }
                    );
            }
        }
        ,





        getters: {
            mode: state => state.mode,
            topCourses: state => state.top_courses,
            courses: state => state.courses,
            questions: state => state.questions,
            records: state => state.records
        }
    }
)
