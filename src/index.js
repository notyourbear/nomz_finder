import mapData from './map/map.js'
import Marker from './map/marker.js'
import List from  './list/list.js'
import Dataflow from './firebase/dataflow.js'
import Loader from './loader/loader.js'
import OptionsBar from './optionsBar/options.js'
import Search from './search/search.js'

import { explainerText, noSavedText, noSearchResultsText } from './config.js'

const optionsBar = document.querySelector('.options-bar')
const searchbar = document.querySelector('form')
const input = document.querySelector('form > input[type="text"]')
const map = mapData.map

const data = {
  current: 'search',
  favorites: [],
  initSavedResults: false,
  markers: [],
  search: []
}

// List Item code
List.onClick((e) => {
  const index = e.target.getAttribute('data-index')
  const place_id = e.target.getAttribute('data-place_id')

  if (place_id !== null) {
    const location = data[data.current][index - 1]
    if (location.favorited) {
      Dataflow.unFavorite(location).then(() => {
        data.search = data.search.map((item, i) => {
          if (index - 1 === i) item.favorited = false
          return item
        })

        Dataflow.getFavorites().then((results) => {
          data.favorites = results
          List.paint(data[data.current], noSavedText)
        })
      })

    } else {
      Dataflow.favorite(location).then(() => {
        data.search = data.search.map((item, i) => {
          if (index - 1 === i) item.favorited = true
          return item
        })

        Dataflow.getFavorites().then((results) => {
          data.favorites = results
          List.paint(data.search, noSavedText)
        })
      })
    }
  } else if (index !== null) {
    const marker = data.markers[index - 1]
    Marker.centerOn(marker, map)
  }
})


// List Selection Code
optionsBar.addEventListener('click', (e) => {
  OptionsBar.toggleMapViews(e.target, (id) => {
    data.current = id
    Marker.clearMarkers(data.markers)
    data.markers = Marker.createMarkers(data[id], map)

    if (id === 'search') {
      List.paint(data[id], explainerText)
    } else {
      data.initSavedResults ? List.paint(data[id], noSavedText) : Loader.display()
    }
  })
})

// Search Code
searchbar.addEventListener('submit', (e) => {
  e.preventDefault()
  Marker.clearMarkers(data.markers)
  Loader.display()
  Search.getResults(input.value, map).then((results) => {
    data.current = 'search'
    data.search = results
    data.markers = Marker.createMarkers(data.search, map)
    List.paint(results, noSearchResultsText)
    OptionsBar.toggleSelectionButton(document.querySelector('#search'))
  })
})

// Init
Dataflow.getFavorites().then((results) => {
  data.favorites = results
  data.initSavedResults = true

  if (data.current === 'favorites') {
    data.markers = Marker.createMarkers(data['favorites'], map)
    List.paint(data['favorites'], noSavedText)
  }
})

List.paint([], explainerText)
