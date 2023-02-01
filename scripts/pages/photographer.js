const photographerID = () =>
  new URLSearchParams(window.location.search).get("photographer");
const id = photographerID();
// console.log("🚀 ~ file: photographer.js:4 ~ id", id);
let photographerName = "";

async function getData() {
  try {
    const response = await fetch("../../data/photographers.json");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

async function getPhotographer() {
  const { photographers } = await getData();
  return photographers.find(({ id: photographerId }) => photographerId == id);
}

async function getMedias() {
  const { media } = await getData();
  return media.filter(({ photographerId }) => photographerId == id);
}

async function displayHeader(photographer) {
  const header = document.querySelector(".photograph-header");
  const headerDOM = photographerFactory(photographer).headerPhotographerDOM();
  header.append(headerDOM);
  // ici nous affichons le prix journalier
  let price = document.querySelector(".price");
  price.textContent = `${photographer.price}€ / jour`;
  // console.log(price)
}

// ***************** TRI
// const btnSelect = document.querySelector(".css-select");
// window.cssSelect = (option) => {
//   const parent = option.parentNode.parentNode;
//   parent.querySelector("[data-css-select='hidden']").value =
//     option.dataset.cssSelect;
//   parent.querySelector("[data-css-select='selected']").value = option.innerHTML;
//   document.activeElement.blur();
// };

// /* code filtrage a rajouter !!!!!!!!!!!!!!!!!!!!! */
// btnSelect.addEventListener("mousedown", (event) => {
//   const target = event.target;
//   if (target.dataset.cssSelect === "Popularité") {
//     console.log("00000000001:Popularité");
//     return null;
//   }
//   if (target.dataset.cssSelect === "Date") {
//     console.log("00000000001:Date");
//     return null;
//   }
//   if (target.dataset.cssSelect === "Titre") {
//     console.log("00000000001:Titre");
//     return null;
//   }
// });

// ***************** FIN TRI

// ***************** DISPLAY MEDIA
async function displayMedia(medias) {

  // ************************
  const select = document.querySelector(".select");
  const optionBox = document.querySelector(".options");
  const options = [...document.querySelectorAll(".options .item")];
  console.log("🚀 ~ file: photographer.js:73 ~ displayMedia ~ options", options)
  let activeOption = 0;

  select.addEventListener("click", (e) => {
    select.classList.toggle("active");
    optionBox.classList.toggle("active");
    select.setAttribute("aria-expanded", select.classList.contains("active"));
  });

  const setValue = () => {
    select.innerHTML = select.value = options[activeOption].innerHTML;
  };

  options.forEach((item, i) => {
    item.addEventListener("click", () => {
      options[activeOption].classList.remove("active");
      options[activeOption].setAttribute("aria-selected", false);
      options[i].classList.add("active");
      options[i].setAttribute("aria-selected", true);
      select.setAttribute("aria-expanded", false);
      select.focus();
      activeOption = i;
      setValue();
    });
  });

  function sortMedias(medias) {
    const sortOrder = {
      Popularité: (a, b) => b.likes - a.likes,
      Date: (a, b) => new Date(b.date) - new Date(a.date),
      Titre: (a, b) =>
        a.title.toLowerCase().localeCompare(b.title.toLowerCase()),
    };

    const sortCriteria = select.innerHTML;
    console.log("🚀 ~ file: photographer.js:178 ~ sortMedias ~ sortCriteria", sortCriteria)

    return medias.sort(sortOrder[sortCriteria] || (() => 0));
  }

  setValue();
  // sortMedias(medias);

  // ************************

  const mediaSection = document.querySelector(".section_medias");
  let totalLikes = medias
    .map((el) => el.likes)
    .reduce((curr, acc) => curr + acc, 0);
  let likesElement = document.querySelector(".total-likes");
  likesElement.textContent = `${totalLikes}`;

  medias.forEach((media) => {
    let modelMedia = mediaFactory(media);
    let photographerMedia = modelMedia.getMediaDOM();
    mediaSection.append(photographerMedia);

    // *********** GESTION des likes en passant par l'id unique qui lie le coeur et la photo correspondante
    //************ se referer à la function factory dans le dossier factories */
    const heart = document.querySelector(`#heart-${media.id}`);
    let mediaLikes = document.querySelector(`#likes-${media.id}`);
    heart.addEventListener("click", likesIncDec);
    // ********* ici le total des likes

    function likesIncDec() {
      let likeContent = parseInt(mediaLikes?.textContent);
      if (likeContent === media.likes) {
        mediaLikes.textContent = likeContent + 1;
        likesElement.textContent++;
        heart.classList.add("add-heart");
        mediaLikes.classList.add("media_likes-add");
      } else {
        mediaLikes.textContent = likeContent - 1;
        likesElement.textContent--;
        heart.classList.remove("add-heart");
        mediaLikes.classList.remove("media_likes-add");
      }
    }
  });

  // AJOUT pour l'accessibilité

  const profilsMedia = document.querySelectorAll(".media_profil");
  profilsMedia.forEach((media, index) => {
    media.setAttribute("tabindex", index);
  });
}


// ***************** FIN MEDIA

// ***************** SORT MEDIA

async function init() {
  const photographer = await getPhotographer();
  const medias = await getMedias();
  displayHeader(photographer);
  displayMedia(medias);

  photographerName = photographer.name;
}

init();

// Set initial option

// ------------Sort Algo----------------------
