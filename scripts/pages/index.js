async function getPhotographers() {
  try {
    const getdata = await fetch("../../data/photographers.json");
    const data = await getdata.json();
    return data;
  } catch (error) {
    console.log("Error =>: ", error);
  }
}

async function displayData(photographers) {
  const photographersSection = document.querySelector(".photographer_section");

  photographers.forEach((photographer) => {
    const photographerModel = photographerFactory(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();
    photographersSection.append(userCardDOM);
  });
}

async function init() {
  // Récupère les datas des photographes
  const { photographers } = await getPhotographers();
  displayData(photographers);
}

init();
