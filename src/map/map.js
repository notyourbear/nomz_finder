import { defaultLocation, defaultZoom } from '../config.js'

const initMap = () => {
  const map = new google.maps.Map(document.getElementById('map'), {
    center: defaultLocation,
    zoom: defaultZoom
  })

  return { map }
}

const mapData = initMap()

export default mapData
