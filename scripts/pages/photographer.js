const photographerID = () =>
  new URLSearchParams(window.location.search).get("photographer");
const id = photographerID();
console.log("🚀 ~ file: photographer.js:4 ~ id", id);

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
  console.log("🚀 ~ file: photographer.js:72 ~ getMedias ~ media", media);
  return media.filter(({ photographerId }) => photographerId == id);
}

async function displayHeader(photographer) {
  const header = document.querySelector(".photograph-header");
  const headerDOM = photographerFactory(photographer).headerPhotographerDOM();
  header.append(headerDOM);
}

// ***************** TRI
const btnSelect = document.querySelector(".css-select");
window.cssSelect = (option) => {
  const parent = option.parentNode.parentNode;
  parent.querySelector("[data-css-select='hidden']").value =
    option.dataset.cssSelect;
  parent.querySelector("[data-css-select='selected']").value = option.innerHTML;
  document.activeElement.blur();
};

/* code filtrage a rajouter !!!!!!!!!!!!!!!!!!!!! */
btnSelect.addEventListener("mousedown", (event) => {
  const target = event.target;
  if (target.dataset.cssSelect === "Popularité") {
    console.log("00000000001:Popularité");
    return null;
  }
  if (target.dataset.cssSelect === "Date") {
    console.log("00000000001:Date");
    return null;
  }
  if (target.dataset.cssSelect === "Titre") {
    console.log("00000000001:Titre");
    return null;
  }
});
// ***************** FIN TRI

// ***************** DISPLAY MEDIA
async function displayMedia(medias) {
  const mediaSection = document.querySelector(".section_medias");

  medias.forEach((media) => {
    let modelMedia = mediaFactory(media);
    let photographerMedia = modelMedia.getMediaDOM();
    mediaSection.append(photographerMedia);

    // *********** GESTION des likes en passant par l'id unique qui lie le coeur et la photo correspondante
    //************ se referer à la function factory dans le dossier factories */
    const heart = document.querySelector(`#heart-${media.id}`);
    const mediaLikes = document.querySelector(`#likes-${media.id}`).textContent;
    // Ici je teste avec Json parse car le click me renvoie [object HTMLElement]
    let test = JSON.parse(mediaLikes)
    // console.log("mediaLikes & heart", mediaLikes, heart)
    heart.addEventListener("click", () => {
      console.log(`le coeur ${test} est cliqué`);// le click me renvoie [object HTMLElement]
      console.log(typeof test)


    });
  });

  // AJOUT pour l'accessibilité

  const profilsMedia = document.querySelectorAll(".media_profil");
  //   console.log("🚀 ~ file: photographer.js:73 ~ profilsMedia", profilsMedia);
  profilsMedia.forEach((media, index) => {
    media.setAttribute("tabindex", index);
  });
}

// ***************** FIN MEDIA

async function init() {
  const photographer = await getPhotographer();
  //   console.log(
  //     "🚀 ~ file: photographer.js:34 ~ init ~ photographer",
  //     photographer
  //   );
  const medias = await getMedias();
  //   console.log("🚀 ~ file: photographer.js:36 ~ init ~ medias", medias);

  //   console.log("Photographer:", photographer);
  //   console.log("Medias:", medias);

  displayHeader(photographer);
  displayMedia(medias);
}

init();
