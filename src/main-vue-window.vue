<template>
  <div>
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

                      <div   v-if='$store.getters.mode == "courses"'  v-for='table in courses'>


                              <button-counter   v-bind:table="table"
                                                v-bind:bus='bus'>
                              </button-counter>
                      </div>



                    <div  v-if='$store.getters.mode == "questions"'>
                      <div  v-if='$store.getters.mode == "questions"'
                            v-for='questionRecord in questions'>

                            <div v-html="questionRecord.question"></div>
                            *
                            <div style="margin-left: 20px;" v-html="questionRecord.multiple_answer_1"></div>
                            <div style="margin-left: 40px;" v-html="questionRecord.text_answer_1"></div>
                            *
                            <div style="margin-left: 20px;" v-html="questionRecord.multiple_answer_2"></div>
                            <div style="margin-left: 40px;" v-html="questionRecord.text_answer_2"></div>
                            *
                            <div style="margin-left: 20px;" v-html="questionRecord.multiple_answer_3"></div>
                            <div style="margin-left: 40px;" v-html="questionRecord.text_answer_3"></div>
                            *
                            <div style="margin-left: 20px;" v-html="questionRecord.multiple_answer_4"></div>
                            <div style="margin-left: 40px;" v-html="questionRecord.text_answer_4"></div>

                        </div>
                    </div>



                      <div    v-if='$store.getters.mode == "home"'
                              id="components-demo">

                              <div   v-if='$store.getters.mode == "home"'  v-for='table in top_courses'>


                                      <button-counter v-bind:table="table"></button-counter>
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
import buttonCounter from "./button-counter.vue";

module.exports =
    {
        props: ["top_courses","courses","bus"]
        ,
        data: function() {
            return {
                message:    'Learno',
                questions:  []
            }
        }
        ,
        mounted: function() {
        }
        ,
        methods: {
        }
        ,
        components: {
            "button-counter": buttonCounter
        }
    }


</script>
