const photographerID = () =>
  new URLSearchParams(window.location.search).get("photographer");
const id = photographerID();

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

async function init() {
  const photographer = await getPhotographer();
  const medias = await getMedias();

  console.log("Photographer:", photographer);
  console.log("Medias:", medias);

  displayHeader(photographer);
}

init();
