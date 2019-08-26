import { request }          from "graphql-request";
import   Vue                from "vue";



var app = new Vue({
    el: '#app',
    data: {
        message:        'Learno',
        courses:         [],
        top_courses:     [],
        questions:       [],
        mode:           "courses"
    }
    ,
    mounted: function() {
    }
    ,
    methods: {
        getQuestions: async function(courseId) {
        }
    }
})

export {app as MainVueApp }
