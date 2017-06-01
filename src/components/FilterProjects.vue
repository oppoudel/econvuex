<template>
  <div id="query">
    <label>Project Types</label>
    <select v-model='selection'>
      <option v-for='type in projectTypes'>{{type}}</option>
    </select>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: "filterProject",
  data() {
    return {
      selection: ''
    }
  },
  computed: {
    ...mapGetters({
      projectTypes: 'getProjectTypes',
    })
  },
  watch: {
    selection(value) {
      this.$store.commit('UPDATE_LAYERS', value)
    }
  }
}
</script>
<style>
#query {
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 1000;
  background: white;
  padding: 1em;
}
</style>

