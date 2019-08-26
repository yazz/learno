<template>
  <div>
    Hello2 {{bundler}}
  </div>
</template>


<script>

import Vue from "vue";

export default Vue.extend({
  data() {
    return {
      bundler: "Parcel2"
    };
  }
});

</script>
