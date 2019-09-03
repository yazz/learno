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
                                getQuestions(courseId: 341) {
                                    id
                                    question
                                }
                            }
                            `
                    )
                .then(
                        result => {
                            //console.log(result)
                            //alert(JSON.stringify(result,null,2))
                            store.commit("setQuestions", result.getQuestions)
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
