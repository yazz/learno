<template>
    <div    class="card"
            style="margin-bottom: 40px;">


      <div class="card-body">

        <h5 class="card-title"
            v-if='course'
            v-on:click='$store.commit("setQuestions", course.id);'>{{course.name}} - Rating: {{course.rating}}</h5>

        <p class="card-text" v-html="course.description"></p>

        <button  class="btn btn-primary"
                 v-on:click='$store.commit("setQuestions", course.id);'>Take course</button>
      </div>




    </div>
</template>


<script>

import Vue from "vue";

module.exports =
    {
        props:["course"]
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
