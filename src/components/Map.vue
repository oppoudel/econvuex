<template>
  <div id="map">
    {{msg}}
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'map',
  data() {
    return {
      msg: 'Loading...'
    }
  },
  mounted() {
    this.createMap()
  },
  computed: {
    ...mapGetters({
      econProjects: 'getEconProjects',
      icons: 'getIcons',
      projectTypes: 'getProjectTypes',
      layers: 'getLayers'
    })
  },
  methods: {
    createMap() {
      let map
      if (!this.$store.state.map) {
        map = L.map('map').setView([39.3062, -76.6138], 12)
      } else {
        map = this.$store.state.map
      }
      this.$store.state.map = map
      const mbAttr = 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
        '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
        'Imagery © <a href="http://mapbox.com">Mapbox</a>'
      const mbUrl = 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1Ijoib3Bwb3VkZWwiLCJhIjoiY2l4bHh1Zjk4MDBiNTJ3bGU2d2J4czhibCJ9.fPd6d_roJ2oaXBore0IwfQ';
      L.tileLayer(mbUrl, { id: 'mapbox.streets', attribution: mbAttr }).addTo(map);
    }
  }
}
</script>


<style>
@import url('https://unpkg.com/leaflet@1.0.3/dist/leaflet.css');

body {
  margin: 0;
  padding: 0;
}

#map {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
}
</style>
