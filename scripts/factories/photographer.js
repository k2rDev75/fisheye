function photographerFactory(data) {
  const { name, id, city, country, tagline, price, portrait } = data;
  console.log(name, id, city, country, tagline, price, portrait);
  const picture = `assets/photographersId/${portrait}`;

  function getUserCardDOM() {
    let article = document.createElement("article");
    article.classList.add("card");
    article.innerHTML = `
            <a href="photographer.html?photographer=${id}", aria-label="Page de ${name}"/>
                <img src=${picture} alt="Photo de profil du photographe ${name}">
                <h2>${name}</h2>
            </a>
            <p class="location">${city}, ${country}</p>
            <p class="tagline">${tagline}</p>
            <p class="price">${price}€/jour</p>
        `;
    return article;
  }

  function headerPhotographerDOM() {
    let article = document.createElement("article");
    article.classList.add("header_profil");
    article.innerHTML = `
            <div id="photographer-details">
                <h1>${name}</h1>
                <p id="location">${city}, ${country}</p>
                <p id="tagline">${tagline}</p>
            </div>
            <button class="contact_button" onclick="displayModal()">Contactez-moi</button>
            <img src=${picture} alt="Photo de profil du photographe ${name}">
            `;
    return article;
  }

  return { getUserCardDOM, headerPhotographerDOM };
}

function mediaFactory(data) {
  const { image, title, likes, photographerId, video, id } = data;


  function getMediaDOM() {
    let media;
    if (image !== undefined) {
      media = `<img src="assets/photographers/${photographerId}/${image}" id="lightbox-media" class="mediaRandom" alt="${title}" data-media-type="image">`;
    } else {
      media = `<video src="assets/photographers/${photographerId}/${video}" controls id="lightbox-media" class="mediaRandom" title="${title}" data-media-type="video"></video>`;
    }
    let article = document.createElement("article");
    article.classList.add("media_profil");
    article.innerHTML = `
      <div class="card_media">
        ${media}
      </div>
      <div class="card_description">
        <p class="titre_media">${title}</p>
        <div class="likes">
          <p class="media_likes" id="likes-${id}">${likes}</p>
          <i class="fa-solid fa-heart icon heart" id="heart-${id}"></i>
        </div>
      </div>
    `;
    return article;
  }

  return {
    getMediaDOM,
  };
}
