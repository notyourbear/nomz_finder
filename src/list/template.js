const itemTemplate = details => {
  let favoritedClasses = 'favorite ml-auto pointer'
  if (details.favorited) favoritedClasses += ' favorited'

  return `<li>
    <div class='flex location-info'>
      <div class='flex item'>
        <h1> ${details.label}. </h1>
        <h1> ${details.name} </h1>
        <span class='pointer' data-index='${details.label}'>◉</span>
      </div>
      <div class='flex location-details item'>
        <div>${details.rating}</div>
        <div class='ml-auto pointer'>${details.price_level}</div>
      </div>
      <div class='flex location-details item'>
        <p>${details.address}</p>
        <div class="${favoritedClasses}" data-index='${details.label}' data-place_id='${details.place_id}'>
          ${ details.favorited ? '♥' : '♡'}
        </div>
      </div>
    </div>
  </li>`
}


export default itemTemplate
