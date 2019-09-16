<template>
  <div v-bind:refresh="$store.getters.refresh">
      <div class="modal.open">
          <div class="modal__header">
              <div class="container">
                  <div>Learno</div>

                  <div v-bind:class='"button is-medium " + (($store.getters.mode == "home")?"is-dark":"is-light")'
                       v-on:click='$store.commit("setMode", "home");'>Home</div>

                  <div    v-on:click='$store.commit("setMode", "courses");'
                          v-bind:class='"button is-medium " + (($store.getters.mode == "courses")?"is-dark":"is-light")'>Courses</div>

                  <div    v-on:click='$store.commit("setMode", "questions");'
                          v-bind:class='"button is-medium " + (($store.getters.mode == "questions")?"is-dark":"is-light")'>Questions</div>
              </div>
          </div>

          <div class="modal__content is-momentumScrollable" style="overflow-x: hidden;">



              <section  class="section">
                  <div class="container">

                      <div   v-if='$store.getters.mode == "courses"'
                             v-for='table in $store.getters.courses'>


                              <course-card   v-bind:table="$store.getters.records.courses[table.id]">
                              </course-card>
                      </div>



                    <div  v-if='$store.getters.mode == "questions"'>
                      <div  v-if='$store.getters.mode == "questions"'
                            v-for='question in $store.getters.questions'>

                            <div v-if='$store.getters.records.questions[question.id]'>

                                <div v-html="$store.getters.records.questions[question.id].question"></div>
                                *
                                <div style="margin-left: 20px;" v-html="$store.getters.records.questions[question.id].multiple_answer_1"></div>
                                <div style="margin-left: 40px;" v-html="$store.getters.records.questions[question.id].text_answer_1"></div>
                                *
                                <div style="margin-left: 20px;" v-html="$store.getters.records.questions[question.id].multiple_answer_2"></div>
                                <div style="margin-left: 40px;" v-html="$store.getters.records.questions[question.id].text_answer_2"></div>
                                *
                                <div style="margin-left: 20px;" v-html="$store.getters.records.questions[question.id].multiple_answer_3"></div>
                                <div style="margin-left: 40px;" v-html="$store.getters.records.questions[question.id].text_answer_3"></div>
                                *
                                <div style="margin-left: 20px;" v-html="$store.getters.records.questions[question.id].multiple_answer_4"></div>
                                <div style="margin-left: 40px;" v-html="$store.getters.records.questions[question.id].text_answer_4"></div>

                            </div>
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
import buttonCounter from "./course-card.vue";

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
            "course-card": buttonCounter
        }
    }


</script>
