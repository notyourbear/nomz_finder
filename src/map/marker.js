import { listItemHeight } from '../config.js'

const centerOn = (marker, map) => map.panTo(marker.getPosition())

const clear = marker => marker.setMap(null)

const clearMarkers = list => {
  list.forEach(marker => clear(marker))
  list.length = 0
}

const create = (place, map) => {
  const marker = new google.maps.Marker({
    map,
    position: {lat: place.lat, lng: place.lng},
    title: place.name,
    label: place.label
  })

  marker.addListener('click', scrollTo.bind(null, place.label))

  return marker
}

const createMarkers = (list, map) => list.map(place => create(place, map))

const formatPlaceDetails = location => {
  let price_level = ''
  for (let i = 0; i < location.price_level; i++) {
    price_level += '$'
  }

  let rating = ''
  let max = Math.floor(location.rating)
  for (let i = 0; i < max; i++) {
    rating += '★'
  }

  return Object.assign({}, {
    price_level,
    rating,
    lat: location.geometry.location.lat(),
    lng: location.geometry.location.lng(),
    address: location.formatted_address,
    name: location.name,
    place_id: location.place_id,
    favorited: false
  })
}

const scrollTo = index => {
  const top = (parseInt(index) - 1) * listItemHeight
  document.querySelector('.list-container').scrollTop = top
}

export default { centerOn, clearMarkers, createMarkers, formatPlaceDetails, scrollTo }
