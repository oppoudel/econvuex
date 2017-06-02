<template>
  <div id="app">
    <app-filter-projects></app-filter-projects>
    <app-project-stats></app-project-stats>
    <app-map></app-map>
  </div>
</template>

<script>
import appMap from './components/Map'
import appFilterProjects from './components/FilterProjects'
import appProjectStats from './components/ProjectStats'
export default {
  name: 'app',
  components: {
    appMap,
    appFilterProjects,
    appProjectStats
  },
  created() {
    this.$store.dispatch('loadIconsTypes')
    this.$store.dispatch('loadFeatures')
  }
}
</script>

<style>

</style>
