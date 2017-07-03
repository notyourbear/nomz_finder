import { maxSearchItems } from '../config.js'
import List from  '../list/list.js'
import Marker from '../map/marker.js'
import Dataflow from '../firebase/dataflow.js'

const getResults = (input, map) =>
  search(input, map).then(results => {
    results = limitSearchResults(results)
    return Promise.all(results.map((result, i) =>
      Dataflow.checkIfFavorited(result.place_id).then((favorited) => {
        const details = Marker.formatPlaceDetails(result)
        details.label = '' + (i + 1)
        details.favorited = favorited
        return details
      })))
  })

const limitSearchResults = results =>
  results.reduce((array, item, i) => {
    return i < maxSearchItems ? array.concat(item) : array
  }, [])

const search = (input, map) => {
  const service = new google.maps.places.PlacesService(map)
  const bounds = map.getBounds()

  return new Promise((resolve, reject) =>
    service.textSearch({
      bounds: bounds,
      query: input,
      type: 'restaurant',
    }, resolve))
}

export default { getResults }
