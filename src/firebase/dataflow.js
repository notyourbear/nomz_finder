const checkIfFavorited = id => new Promise((resolve, reject) =>
  firebase.database().ref(`favorites/${id}`).once('value', snapshot => resolve(snapshot.exists())))

const getFavorites = () => new Promise((resolve, reject) =>
  firebase.database().ref('favorites')
  .once('value', (snapshot) => {
    results = snapshot.val()
    //firebase will return null value if empty
    const info = results === null ? [] : Object.values(results)

    return resolve(info.map((result, i) => {
      result.label = '' + (i + 1)
      return result
    }))
  }))


const favorite = selection => new Promise((resolve, reject) =>
  resolve(firebase.database()
    .ref(`favorites/${selection.place_id}`)
    .set({
      place_id: selection.place_id,
      lat: selection.lat,
      lng: selection.lng,
      name: selection.name,
      price_level: selection.price_level,
      rating: selection.rating,
      address: selection.address,
      favorited: true,
    })))


const unFavorite = selection => new Promise((resolve, reject) =>
  resolve(firebase.database()
  .ref(`favorites/${selection.place_id}`)
  .set(null)))

export default { checkIfFavorited, getFavorites, favorite, unFavorite }
