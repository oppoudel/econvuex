<template>
  <div id="projectChart">
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import * as d3 from 'd3'
import d3Tip from './d3tip'
export default {
  data() {
    return {
      margin: { top: 80, right: 25, bottom: 80, left: 35 },
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
      var tip = d3Tip()
        .attr('class', 'd3-tip')
        .html(function (d) { return '<span>' + d.name + '</span>' })
        .offset([-12, 0])
      d3.select("#SVG_ID").remove();
      const data = [...proData].sort((a, b) => (b.cost - a.cost)).splice(0, 5)

      var width = this.width - this.margin.left - this.margin.right,
        height = this.height - this.margin.top - this.margin.bottom;

      var x = d3.scaleBand().rangeRound([0, width]).padding(0.1),
        y = d3.scaleLinear().rangeRound([height, 0]);

      var svg = d3.select(this.$el)
        .append("svg")
        .attr("id", "SVG_ID")
        .attr("width", this.width)
        .attr("height", this.height)

      var g = svg.append("g")
        .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")")
        .call(tip)

      g.append("text")
        .attr("class", "title")
        .attr("x", (this.width / 3))
        .attr("y", 0 - (this.margin.top / 2))
        .attr("text-anchor", "middle")
        .text("Top 5 Projects");

      x.domain(data.map(function (d) { return d.name; }));
      y.domain([0, d3.max(data, function (d) { return d.cost; })]);

      g.append("g")
        .attr("class", "axis axis--x")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))
        .selectAll('text')
        .call(this.wrap, x.bandwidth())

      g.append("g")
        .attr("class", "axis axis--y")
        .call(d3.axisLeft(y).ticks(5, '$').tickFormat(d3.format(".2s")))
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
        .on('mouseover', tip.show)
        .on('mouseout', tip.hide)
        .on('click', (d => console.log(this.$store)))
    },
    wrap(text, width) {
      text.each(function () {
        var text = d3.select(this),
          words = text.text().split(/\s+/).reverse(),
          word,
          line = [],
          lineNumber = 0,
          lineHeight = 1.1, // ems
          y = text.attr("y"),
          dy = parseFloat(text.attr("dy")),
          tspan = text.text(null).append("tspan").attr("x", 0).attr("y", y).attr("dy", dy + "em");
        while (word = words.pop()) {
          line.push(word);
          tspan.text(line.join(" "));
          if (tspan.node().getComputedTextLength() > width) {
            line.pop();
            tspan.text(line.join(" "));
            line = [word];
            tspan = text.append("tspan").attr("x", 0).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
          }
        }
      });
    }
  },
}
</script>
<style>
#projectChart {
  box-sizing: border-box;
  position: relative;
  padding: 1em;
}

#chart {
  width: 300px;
  height: 300px;
}

.title {
  font-size: 20px;
  font-weight: bold;
}

.bar {
  fill: goldenrod;
}

.bar:hover {
  fill: brown;
}

.axis--x path {
  display: none;
}

.d3-tip span {
  color: orangered;
}
</style>

