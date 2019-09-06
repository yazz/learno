<template>
    <div    class="card"
            style="margin-bottom: 40px;">

      <header class="card-header">

          <p   class="card-header-title"
               v-on:click='$store.commit("setQuestions", table.id);$store.commit("setMode", "questions");'>

              {{table.name}} - Rating: {{table.rating}}
          </p>

          <a href="#" class="card-header-icon" aria-   label="more options">
              <span class="icon">
                  <i class="fas fa-angle-down" aria-hidden="true"></i>
              </span>
          </a>

      </header>


      <div class="card-content">
          <div class="content" v-html="table.description">
          </div>
      </div>

      <footer class="card-footer">
          <a href="#" class="card-footer-item">Start</a>
          <a href="#" class="card-footer-item">Similar</a>
          <a href="#" class="card-footer-item">Continue</a>
      </footer>

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
