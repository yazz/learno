<template>
    <div    class="card"
            style="margin-bottom: 40px;">


      <div class="card-body">
        <h5 class="card-title" v-if='table'
       v-on:click='$store.commit("setQuestions", table.id);'>{{table.name}} - Rating: {{table.rating}}</h5>
        <p class="card-text" v-html="table.description"></p>
        <a href="#" class="btn btn-primary"
        v-on:click='$store.commit("setQuestions", table.id);'>Take course</a>
      </div>




    </div>
</template>


<script>

import Vue from "vue";

module.exports =
    {
        props:["table"]
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
