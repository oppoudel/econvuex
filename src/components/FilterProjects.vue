<template>
  <div id="query" class="field">
    <span class="label">Project Types</span>
    <span class="select">
      <select v-model='selection'>
        <option v-for='type in projectTypes'>{{type}}</option>
      </select>
    </span>
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
  display: flex;
  z-index: 1000;
  padding: 1em;
  margin: 5em 0;
  align-content: center;
}

#query .select {
  box-sizing: border-box;
  padding-left: 20px;
}
</style>

