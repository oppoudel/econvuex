<template>
  <div id="app">
    <app-filter-projects></app-filter-projects>
    <app-map></app-map>
  </div>
</template>

<script>
import appMap from './components/Map'
import appFilterProjects from './components/FilterProjects'
export default {
  name: 'app',
  components: {
    appMap,
    appFilterProjects
  },
  created() {
    this.$store.dispatch('loadIconsTypes')
    this.$store.dispatch('loadFeatures')
  }
}
</script>

<style>

</style>
