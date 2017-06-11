<template>
  <div id="app">
    <div class="sidebar">
      <app-filter-projects></app-filter-projects>
      <hr>
      <app-project-chart width="400" height="400"></app-project-chart>
    </div>
    <div class="column is-10">
      <app-map></app-map>
    </div>
  </div>
</template>

<script>
import appMap from './components/Map'
import appFilterProjects from './components/FilterProjects'
import appProjectChart from './components/ProjectChart'
export default {
  name: 'app',
  components: {
    appMap,
    appFilterProjects,
    appProjectChart
  },
  created() {
    this.$store.dispatch('loadIconsTypes')
  }
}
</script>

<style>
#app {
  margin: 0;
  padding: 0;
  display: flex;
  height: 90%;
  width: 100%;
}

.sidebar {
  width: 400px;
  background: #f8f8f8;
  display: flex;
  flex: 1;
  flex-direction: column;
}

.column {
  padding: 0;
}
</style>
