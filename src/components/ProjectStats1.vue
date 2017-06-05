<template>
  <div id="projectStats">
    <bar-chart v-if="loaded" :chart-data="costs" :chart-labels="labels"></bar-chart>
  </div>
</template>
<script>
import BarChart from './BarChart'
import { mapGetters } from 'vuex'
export default {
  components: {
    BarChart
  },
  data() {
    return {
      margin: { top: 20, right: 20, bottom: 60, left: 90 },
      labels: [],
      costs: []
    }
  },
  props: ['width', 'height'],
  computed: {
    ...mapGetters({
      projectData: 'getProjectData',
      loaded: 'getLoaded'
    })
  },
  mounted() {
    if (this.projectData.length > 0) {
      this.drawChart(this.projectDaa)
    }
  },
  watch: {
    projectData(newdata) {
      this.drawChart(newdata)
    }
  },
  methods: {
    drawChart(proData) {
      const data = [...proData].sort((a, b) => (b.cost - a.cost)).splice(0, 5)
      this.labels = data.map(item => item.name)
      this.costs = data.map(item => item.cost)
      //console.log(labels, costs)
    }
  }
}
</script>
<style>
#projectStats {
  position: absolute;
  top: 100px;
  right: 10px;
  z-index: 1000;
  background: white;
  padding: 1em;
}

#chart {
  width: 300px;
  height: 300px;
}

.bar {
  fill: steelblue;
}

.bar:hover {
  fill: brown;
}

.axis--x path {
  display: none;
}
</style>

