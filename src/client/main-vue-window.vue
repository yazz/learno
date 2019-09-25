<template>
  <div v-bind:refresh="$store.getters.refresh">
      <div class="modal.open">
          <div class="modal__header">
              <div>Learno</div>
              <div class="btn-group" role="group" aria-label="Basic example">
                  <button type="button"
                          v-bind:class='"btn " + (($store.getters.mode == "home")?"btn-primary":"btn-secondary")'
                          v-on:click='$store.commit("setMode", "home");'>
                          Home
                  </button>
                  <button type="button"
                          v-bind:class='"btn " + (($store.getters.mode == "courses")?"btn-primary":"btn-secondary")'
                          v-on:click='$store.commit("setMode", "courses");'>
                          Courses
                  </button>
                  <button type="button"
                          v-bind:class='"btn " + (($store.getters.mode == "questions")?"btn-primary":"btn-secondary")'
                          v-on:click='$store.commit("setMode", "questions");'>
                          Questions
                  </button>
                </div>
          </div>

          <div class="modal__content is-momentumScrollable" style="overflow-x: hidden;">



              <section  class="section">
                  <div class="container" style="margin-left:0px;">

                      <div   v-if='$store.getters.mode == "courses"'
                             v-for='table in $store.getters.courses'>


                              <course-card   v-bind:table="$store.getters.records.courses[table.id]">
                              </course-card>
                      </div>


                    <div  v-if='$store.getters.mode == "questions"'>
                      <div  v-if='$store.getters.mode == "questions"'>

                          <course-details-card>
                          </course-details-card>


                        </div>
                    </div>



                      <div    v-if='$store.getters.mode == "home"'
                              v-bind:refresh="$store.getters.refresh"
                              id="components-demo">


                              <div      v-if='$store.getters.mode == "home"'
                                        v-for='table in $store.getters.topCourses'>

                                      <course-card v-bind:table="$store.getters.records.courses[table.id]"></course-card>
                              </div>

                      </div>


                  </div>
              </section>


          </div>
      </div>

  </div>
</template>


<script>

import Vue from "vue";
import courseCard from "./course-card.vue";
import courseDetailsCard from "./course-details-card.vue";

module.exports =
    {
        props: []
        ,
        mounted: function() {
        }
        ,
        methods: {
        }
        ,
        components: {
            "course-card": courseCard,
            "course-details-card": courseDetailsCard
        }
    }


</script>
