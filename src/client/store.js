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
            ,
            data_to_load: []
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
                            state.top_courses = []
                            for (var i=0; i<result.getTopCourses.length;i++) {
                                var thisCourse = result.getTopCourses[i]
                                if (!state.records.courses[thisCourse.id]) {
                                    state.data_to_load.push({type: "course", id: thisCourse.id})
                                    //state.records.courses[thisCourse.id] = thisCourse
                                }
                                state.top_courses.push({id: result.getTopCourses[i].id})
                            }
                            console.log("Store::setTopCourses::state.data_to_load.length: " + state.data_to_load.length)

                        }
                    );
            }
            ,
            loadUnloadedData(state) {
                //alert(state.data_to_load.length)
                for (var i=0; i<state.data_to_load.length;i++) {
                    var thisRecord = state.data_to_load[i]
                    //alert(thisRecord.id)
                    if (!state.records.courses[thisRecord.id]) {
                        (async function (thisRecordId) {
                            request(
                                        "/graphql"
                                        ,
                                        `query {
                                            getTest(id: ${thisRecordId}) {
                                                id
                                                name
                                                description
                                            }
                                        }
                                        `
                                )
                            .then(
                                    result => {
                                        console.log("store::loadUnloadedData::"+ thisRecordId)
                                        //debugger
                                        //alert(JSON.stringify(result.getTest,null,2))
                                        //state.records.courses[thisRecordId] = result.getTest
                                        var newRecords = JSON.parse(JSON.stringify(state.records))
                                        newRecords.courses[thisRecordId] = result.getTest
                                        state.records = newRecords
                                        //alert(JSON.stringify( state.records.courses[thisRecord.id],null,2))
                                    })
                        })(thisRecord.id)


                    }

                }

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
                            state.courses = []
                            for (var i=0; i<result.getTests.length;i++) {
                                var thisCourse = result.getTests[i]
                                if (!state.records.courses[thisCourse.id]) {
                                    state.records.courses[thisCourse.id] = thisCourse
                                }
                                state.courses.push({id: result.getTests[i].id})
                            }
                            //state.courses = result.getTests




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
                            this.commit("setMode", "questions");
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
        },
        actions: {
            actionSetTopCourses: ({commit}) => {
              commit('setTopCourses')
              setTimeout(
                    () => commit('loadUnloadedData'),
                    1000
              )

            }
        }
    }
)
