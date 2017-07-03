import { mapLargeHeight, mapBaseHeight, mapRefreshTime } from '../config.js'

const map = document.querySelector('#map')
const mapContainer = document.querySelector('.map-container')

const buttonData = {
  typeButtons: ['favorites', 'search'],
  typeSelected: 'search',
  mapButton: 'fullscreenMap',
  largeMapView: false,
}

const toggleMapViews = (el, cb) => {
  if (buttonData.typeButtons.includes(el.id)) {
    toggleSelectionButton(el, 'typeSelected')
    cb.call(null, el.id)
  } else if (el.id === buttonData.mapButton) {
    buttonData.largeMapView ? closeMapDisplay() : openMapDisplay()
  }
}

const closeMapDisplay = () => {
  if (buttonData.largeMapView) {
    mapContainer.style['height'] = mapBaseHeight
    buttonData.largeMapView = false

    setTimeout(() => {
      map.style['height'] = mapBaseHeight
      google.maps.event.trigger(map, "resize")
    }, mapRefreshTime)
  }
}

const openMapDisplay = () => {
  if (!buttonData.largeMapView) {
    map.style['height'] = mapLargeHeight
    mapContainer.style['height'] = mapLargeHeight
    buttonData.largeMapView = true

    setTimeout(() => {
      google.maps.event.trigger(map, "resize")
    }, mapRefreshTime)
  }
}

const toggleSelectionButton = el => {
  el.classList.toggle('selected')
  document.querySelector(`#${buttonData['typeSelected']}`).classList.toggle('selected')
  buttonData['typeSelected'] = el.id
}

export default { toggleMapViews, toggleSelectionButton }
