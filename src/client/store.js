import   Vue                from "vue";
import   Vuex               from 'vuex';
import { request }          from "graphql-request";
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex);

function lsTest(){
    var test = 'test';
    try {
        localStorage.setItem(test, test);
        localStorage.removeItem(test);
        console.log("Browser local storage available")
        return false;
    } catch(e) {
        console.log("No browser local storage")
        return false;
    }
}


export const store = new Vuex.Store(
    {
        plugins: lsTest()?[createPersistedState()]:[]
        ,
        state: {
            refresh:         0
            ,
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
                var me = this
                request(
                            "/graphql"
                            ,
                            `query {
                                getTopCourses {
                                    id
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
                            me.commit('loadUnloadedData')

                        }

                    );
            }
            ,
            loadUnloadedData(state) {
                var me = this
                for (var i=0; i<state.data_to_load.length;i++) {
                    var thisRecord = state.data_to_load[i]
                    //alert(thisRecord.id)
                    if (thisRecord.type == "course") {

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
                                            //var newRecords = JSON.parse(JSON.stringify(state.records))
                                            //newRecords.courses[thisRecordId] = result.getTest
                                            //state.records = newRecords
                                            state.records.courses[thisRecordId] = result.getTest
                                            //alert(JSON.stringify( state.records.courses[thisRecord.id],null,2))
                                            me.commit('refresh')

                                        })
                            })(thisRecord.id)


                        }
                    } else if (thisRecord.type == "question") {

                        if (!state.records.questions[thisRecord.id]) {
                            (async function (thisRecordId) {
                                request(
                                            "/graphql"
                                            ,
                                            `query {
                                                getQuestion(id: ${thisRecordId}) {
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
                                                    text_answer_4                                                }
                                            }
                                            `
                                    )
                                .then(
                                        result => {
                                            debugger
                                            console.log("store::loadUnloadedData::"+ thisRecordId)
                                            //debugger
                                            //alert(JSON.stringify(result.getTest,null,2))
                                            //state.records.courses[thisRecordId] = result.getTest
                                            //var newRecords = JSON.parse(JSON.stringify(state.records))
                                            //newRecords.courses[thisRecordId] = result.getTest
                                            //state.records = newRecords
                                            state.records.questions[thisRecordId] = result.getQuestion
                                            //alert(JSON.stringify( state.records.courses[thisRecord.id],null,2))
                                            me.commit('refresh')

                                        })
                            })(thisRecord.id)


                        }
                    }

                }
                state.data_to_load=[]


            }





            ,
            refresh(state, newMode) {
                state.refresh ++
                console.log("Refresh: " + state.refresh)
            }




            ,
            setTests(state) {
                var me = this
                request(
                            "/graphql"
                            ,
                            `query {
                                getTests {
                                    id
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
                                    state.data_to_load.push({type: "course", id: thisCourse.id})
                                    //state.records.courses[thisCourse.id] = thisCourse
                                }
                                state.courses.push({id: result.getTests[i].id})
                            }
                            me.commit('loadUnloadedData')

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
                                    state.data_to_load.push({type: "question", id: thisQuestion.id})
                                    //state.records.questions[thisQuestion.id] = thisQuestion
                                }
                                state.questions.push({id: result.getQuestions[i].id})
                            }
                            this.commit("setMode", "questions");
                            this.commit('loadUnloadedData')
                        }
                    );
            }
        }
        ,








        getters: {
            refresh:    state => state.refresh,
            mode:       state => state.mode,
            topCourses: state => state.top_courses,
            courses:    state => state.courses,
            questions:  state => state.questions,
            records:    state => state.records
        },
        actions: {
        }
    }
)
