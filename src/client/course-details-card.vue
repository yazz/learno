<template>
    <div v-bind:refresh="$store.getters.refresh">
        <div v-if='Object.keys($store.getters.records.questions).length>0'>
            <div v-if='$store.getters.records.questions[$store.getters.questions[$store.getters.currentQuestionIndex].id]'>

            Question {{($store.getters.currentQuestionIndex + 1)}}

            <div v-html="$store.getters.records.questions[$store.getters.questions[$store.getters.currentQuestionIndex].id].question"></div>
            *
            <div style="margin-left: 20px;" v-html="$store.getters.records.questions[$store.getters.questions[$store.getters.currentQuestionIndex].id].multiple_answer_1"></div>
            <div style="margin-left: 40px;" v-html="$store.getters.records.questions[$store.getters.questions[$store.getters.currentQuestionIndex].id].text_answer_1"></div>
            *
            <div style="margin-left: 20px;" v-html="$store.getters.records.questions[$store.getters.questions[$store.getters.currentQuestionIndex].id].multiple_answer_2"></div>
            <div style="margin-left: 40px;" v-html="$store.getters.records.questions[$store.getters.questions[$store.getters.currentQuestionIndex].id].text_answer_2"></div>
            *
            <div style="margin-left: 20px;" v-html="$store.getters.records.questions[$store.getters.questions[$store.getters.currentQuestionIndex].id].multiple_answer_3"></div>
            <div style="margin-left: 40px;" v-html="$store.getters.records.questions[$store.getters.questions[$store.getters.currentQuestionIndex].id].text_answer_3"></div>
            *
            <div style="margin-left: 20px;" v-html="$store.getters.records.questions[$store.getters.questions[$store.getters.currentQuestionIndex].id].multiple_answer_4"></div>
            <div style="margin-left: 40px;" v-html="$store.getters.records.questions[$store.getters.questions[$store.getters.currentQuestionIndex].id].text_answer_4"></div>

        </div>

        <button type="button"
                v-bind:class='"btn " + (($store.getters.mode == "home")?"btn-primary":"btn-secondary")'
                v-on:click='$store.commit("lastQuestion");'>
                Last
        </button>
        <button type="button"
                v-bind:class='"btn " + (($store.getters.mode == "courses")?"btn-primary":"btn-secondary")'
                v-on:click='$store.commit("nextQuestion");'>
                Next
        </button>
    </div>
</div>
</template>


<script>

import Vue from "vue";

module.exports =
    {
        props:["table","refresh"]
        ,
        data: function() {
            return {
                count: 0
            }
        }
        ,
        mounted: function() {
        }
        ,
        methods: {
        }
    }


</script>
