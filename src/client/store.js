import   Vue                from "vue";
import   Vuex               from 'vuex';
import { request }          from "graphql-request";

Vue.use(Vuex);



export const store = new Vuex.Store(
    {
        state: {
            mode:           "home"
            ,
            top_courses:   []
            ,
            courses:   []
            ,
            questions:   []
        }
        ,





        mutations: {
            setMode(state, newMode) {
                state.mode = newMode
            }
            ,
            setTopCourses(state, newMode) {
                state.top_courses = newMode
            }
            ,
            setTests(state, newMode) {
                state.courses = newMode
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
                            state.questions= result.getQuestions
                        }
                    );
            }
        }
        ,





        getters: {
            mode: state => state.mode,
            topCourses: state => state.top_courses,
            courses: state => state.courses,
            questions: state => state.questions
        }
    }
)
