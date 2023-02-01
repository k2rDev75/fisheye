function sortMedias(medias, event) {
  const sortOrder = {
    Popularité: (a, b) => b.likes - a.likes,
    Date: (a, b) => new Date(b.date) - new Date(a.date),
    Titre: (a, b) => a.title.toLowerCase().localeCompare(b.title.toLowerCase()),
  };

//   const sortCriteria = select.innerHTML;

const sortCriteria = event.currentTarget.value

  console.log(
    "🚀 ~ file: photographer.js:178 ~ sortMedias ~ sortCriteria",
    sortCriteria
  );

  return medias.sort(sortOrder[sortCriteria] || (() => 0));
}
