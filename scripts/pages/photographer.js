//Mettre le code JavaScript lié à la page photographer.html
const photographerID = () =>
  new URLSearchParams(window.location.search).get("photographer");
// console.log("🚀 ~ file: photographer.js:3 ~ photographerID", photographerID())
const id = photographerID();

async function getAllData() {
  try {
    const getData = await fetch("../../data/photographers.json");
    const data = await getData.json();
    return data;
  } catch (error) {
    console.log("Error =>: ", error);
  }
}

// récupération des ID pour les photographers et les medias
async function photographersById() {
  const { photographers } = await getAllData();
  const photographerByID = photographers.find((elem) => id == elem.id);
  return photographerByID;
}

async function mediasById() {
  const { media } = await getAllData();
  const allMediaById = media.filter((elem) => id == elem.photographerId);
  return allMediaById;
}

/*****************************************************/

async function displayProfilHeader(photographer) {
  const header = document.querySelector(".photograph-header");
  const photographerModel = photographerFactory(photographer);
  const photographerHeaderById = photographerModel.headerPhotographerDOM();
  header.append(photographerHeaderById);
}

photographersById();
mediasById();
displayProfilHeader(getAllData());
