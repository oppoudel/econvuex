import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import L from 'leaflet'
import { template } from './popupTemplate'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    map: null,
    econProjects: [],
    projectData: [],
    icons: {},
    layers: {},
    projectTypes: [],
    loaded: false
  },
  getters: {
    getMap: state => state.map,
    getEconProjects: state => state.econProjects,
    getProjectData: state => state.projectData,
    getIcons: state => state.icons,
    getLayers: state => state.layers,
    getProjectTypes: state => state.projectTypes,
    getLoaded : state => state.loaded
  },
  actions: {
    loadFeatures({ commit }) {
      axios
        .get(
          'https://maps.baltimorecity.gov/egis/rest/services/EconView/Econ_Projects/MapServer/0/query?where=1%3D1&outFields=*&f=geojson'
        )
        .then(response => {
          const features = response.data.features
          commit('ADD_FEATURES', features)
        })
        .catch(error => console.log(error))
    },
    loadIconsTypes({ commit }) {
      const econIcon = L.Icon.extend({
        options: {
          iconSize: [20, 24]
        }
      })
      axios
        .get(
          'https://maps.baltimorecity.gov/egis/rest/services/EconView/Econ_Projects/MapServer/legend?f=pjson'
        )
        .then(response => response.data.layers[0].legend)
        .then(results => {
          const projectTypes = [], icons = {}
          results.forEach(item => {
            if (item.label === 'Park & Recreation') {
              item.label = 'Park & Open Space'
            }
            projectTypes.push(item.label)
            icons[item.label] = new econIcon({
              iconUrl: 'https://gis.baltimorecity.gov/egis/rest/services/EconView/Econ_Projects/MapServer/0/images/' +
                item.url
            })
          })
          commit('ADD_PROJECT_TYPES', projectTypes)
          commit('ADD_ICONS', icons)
        })
    }
  },
  mutations: {
    ADD_FEATURES(state, features) {
      state.econProjects = [...features]
      state.projectData = state.econProjects.map(item => {
        return {
          name: item.properties.Pro_Name,
          id: item.id,
          cost: item.properties.Pro_Cost
        }
      })
      state.loaded = true
      state.projectTypes.map(project => {
        state.layers[project] = L.geoJSON(state.econProjects, {
          filter(feature) {
            if (feature.properties.Pro_type === project) {
              return true
            }
          },
          pointToLayer(feature, latlng) {
            let marker = L.marker(latlng, {
              icon: state.icons[feature.properties.Pro_type]
            })
            marker.bindPopup(layer => L.Util.template(template, layer.feature.properties))
            return marker
          }
        })
      })
      for (let prop in state.layers) {
        state.layers[prop].addTo(state.map)
      }
    },
    ADD_PROJECT_TYPES(state, projectTypes) {
      state.projectTypes = ['All', ...projectTypes]
    },
    ADD_ICONS(state, icons) {
      state.icons = { ...icons }
    },
    UPDATE_LAYERS(state, value) {
      for (let prop in state.layers) {
        state.map.removeLayer(state.layers[prop])
      }
      if (value === 'All') {
        state.projectData = state.econProjects.map(item => {
          return {
            name: item.properties.Pro_Name,
            id: item.id,
            cost: item.properties.Pro_Cost
          }
        })
        for (let prop in state.layers) {
          state.map.addLayer(state.layers[prop])
        }
      } else {
        state.projectData = state.econProjects
          .filter(item => {
            return item.properties.Pro_type === value
          })
          .map(item => {
            return {
              name: item.properties.Pro_Name,
              id: item.id,
              cost: item.properties.Pro_Cost
            }
          })
        state.map.addLayer(state.layers[value])
        state.map.fitBounds(state.layers[value].getBounds(), {
          padding: [50, 50]
        })
      }
    }
  }
})
