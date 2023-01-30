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
