function displayModal() {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "block";
  nameContact.textContent = photographerName;
  nameContact.style.fontSize = "22px"
}

function closeModal() {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "none";
}

const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const closeMod = document.querySelector(".close");
const form = document.querySelector("#contactForm");
const submit = document.querySelector(".button");
let nameContact = document.querySelector('.contact_name')

// selection input
const prenom = document.querySelector("#first");
const nom = document.querySelector("#last");
const email = document.querySelector("#email");
const message = document.querySelector("#message");

// regex
const emailRegex =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+\.([a-zA-Z0-9-])+$/;

// form.addEventListener("submit", (e) => {
//   e.preventDefault();
// });

// gestion des erreurs
const errors = {
  prenom: {
    error: false,
    message: "Veuillez entrer au moins 2 caractères",
  },
  nom: {
    error: false,
    message: "Veuillez entrer au moins 2 caractères",
  },
  email: {
    error: false,
    message: "Veuillez entrer un email valide.",
  },
  message: {
    error: false,
    message: "Veuillez entrer un message plus long",
  },
};
// error capture and display function
const setError = (key, error, htmlElement) => {
  htmlElement.innerHTML = error ? errors[key].message : "";
  errors[key].error = error;
};

function validate() {
  let error1 = document.querySelector("#error1");
  if (prenom.value == "" || prenom.value.length < 2) {
    setError("prenom", true, error1);
  } else {
    setError("prenom", false, error1);
  }

  let error2 = document.querySelector("#error2");
  if (nom.value == "" || nom.value.length < 2) {
    setError("nom", true, error2);
  } else {
    setError("nom", false, error2);
  }

  let error3 = document.querySelector("#error3");
  if (!emailRegex.test(email.value)) {
    setError("email", true, error3);
  } else {
    setError("email", false, error3);
  }

  let error4 = document.querySelector("#error4");
  if (message.value == "" || message.value.length < 10) {
    setError("message", true, error4);
  } else {
    setError("message", false, error4);
  }

  let error = false;

  for (let key in errors) {
    if (errors[key].error) error = true;
  }

  if (!error) {
    form.style.display = "none";
    // setInterval(() => form.submit(), 3000);
    window.addEventListener("click", () => form.submit());
  }
  return false;
}
