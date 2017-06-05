<template>
  <div id="projectStats">
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import * as d3 from 'd3'
import wordwrap from 'd3-jetpack'
export default {
  data() {
    return {
      margin: { top: 20, right: 20, bottom: 60, left: 90 },
    }
  },
  props: ['width', 'height'],
  computed: {
    ...mapGetters({
      projectData: 'getProjectData',
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
      d3.select("#SVG_ID").remove();
      const data = [...proData].sort((a, b) => (b.cost - a.cost)).splice(0, 5)

      var width = this.width - this.margin.left - this.margin.right,
        height = this.height - this.margin.top - this.margin.bottom;

      var x = d3.scaleBand().rangeRound([0, width]).padding(0.1),
        y = d3.scaleLinear().rangeRound([height, 0]);

      var g = d3.select(this.$el)
        .append("svg")
        .attr("id", "SVG_ID")
        .attr("width", this.width)
        .attr("height", this.height)
        .append("g")
        .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")")


      x.domain(data.map(function (d) { return d.name; }));
      y.domain([0, d3.max(data, function (d) { return d.cost; })]);

      g.append("g")
        .attr("class", "axis axis--x")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))


      g.append("g")
        .attr("class", "axis axis--y")
        .call(d3.axisLeft(y).ticks(10))
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", "0.71em")
        .attr("text-anchor", "end")
        .text("cost");

      var bars = g.selectAll(".bar")
        .data(data)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", function (d) { return x(d.name); })
        .attr("y", function (d) { return y(d.cost); })
        .attr("width", x.bandwidth())
        .attr("height", function (d) { return height - y(d.cost); })
    }
  },
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

