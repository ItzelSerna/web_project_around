//Popup editar perfil
const profileNameElement = document.querySelector(".profile__name");
const profileAboutElement = document.querySelector(".profile__about");

const profileName = profileNameElement.textContent;
const profileAbout = profileAboutElement.textContent;

const profileEditButton = document.querySelector(".profile__edit-button");
const editPopupElement = document.querySelector(".popup");

const formElement = document.querySelector(".popup__form");
const nameInput = document.querySelector(".popup__input_name");
const aboutInput = document.querySelector(".popup__input_about");
const closeButtonPopup = document.querySelector(".popup__close-button");

//Popup agregar imagenes
const profileAddButton = document.querySelector(".profile__add-button");
const addImagePopupElement = document.querySelector("#add-image-popup");
const titleInput = document.querySelector("#input-title-popup");
const imageInput = document.querySelector("#input-image-popup");

//Template cards
const templateCard = document.querySelector(".template-card");
const cardArea = document.querySelector(".cards");
const formCard = document.querySelector("#add-image-popup__form");
const initialCards = [
  {
    name: "Valle de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lake-louise.jpg",
  },
  {
    name: "Montañas Calvas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/latemar.jpg",
  },
  {
    name: "Parque Nacional de la Vanoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lago.jpg",
  },
];
const showImage = document.querySelector("#popup-show-image");
const popupCloseImage = document.querySelector("#popup-close-image");
const popupImageClose = document.querySelector(".popup__image-close");

//Popup imagenes
const popupImageOpen = document.querySelector("#popup_image-open");
const closeImage = document.querySelector(".popup__close-button-image");
const popupImageTitle = document.querySelector(".popup__image-title");
const popupImage = document.querySelector(".popup__image");

let initialProfileName = profileName;
let initialProfileAbout = profileAbout;

//Popup editar perfil
function setPopupInput() {
  nameInput.value = initialProfileName;
  aboutInput.value = initialProfileAbout;
}

function openPopup() {
  editPopupElement.classList.add("popup_opened");
}

function handlePopupClick(event) {
  setPopupInput();
  openPopup();
}

function closePopup() {
  editPopupElement.classList.remove("popup_opened");
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileNameElement.textContent = nameInput.value;
  profileAboutElement.textContent = aboutInput.value;
  initialProfileName = nameInput.value;
  initialProfileAbout = aboutInput.value;
  closePopup();
}

//Popup agregar imagenes
function openAddImagePopup() {
  addImagePopupElement.classList.add("popup_opened");
}

function handleAddImageClick(event) {
  openAddImagePopup();
}

function closeAddImagePopup() {
  addImagePopupElement.classList.remove("popup_opened");
}

function handleAddImageFormSubmit(evt) {
  evt.preventDefault();
  const newImageTitle = titleInput.value;
  const newImageUrl = imageInput.value;
  closeAddImagePopup();
}

//Template cards
function cardGenerator(title, link) {
  const card = templateCard.cloneNode(true).content.querySelector(".card");
  const cardImage = card.querySelector(".card__photo");
  const cardTitle = card.querySelector(".card__info-name");
  const likeButton = card.querySelector(".card__like-button");
  const deleteButton = card.querySelector(".card__delete-button");
  cardImage.src = link;
  cardTitle.textContent = title;
  likeButton.addEventListener("click", function () {
    likeButton.classList.toggle("card__like-button_active");
  });
  deleteButton.addEventListener("click", function () {
    card.remove();
  });
  cardImage.addEventListener("click", function () {
    handleOpenImage(title, link);
  });
  return card;
}

initialCards.forEach(function (element) {
  const newCard = cardGenerator(element.name, element.link);
  cardArea.append(newCard);
});

function handleAddCardSubmit(evt) {
  evt.preventDefault();
  const newCard = cardGenerator(titleInput.value, imageInput.value);
  cardArea.prepend(newCard);
  closeAddImagePopup();
}

//Popup imagenes
function handleOpenImage(title, link) {
  popupImage.src = link;
  popupImageTitle.textContent = title;
  popupImageOpen.classList.add("popup_opened");
}

function handleCloseImage() {
  popupImageOpen.classList.remove("popup_opened");
}

//Eventos abrir y cerrar
profileEditButton.addEventListener("click", handlePopupClick);
closeButtonPopup.addEventListener("click", closePopup);
formElement.addEventListener("submit", handleProfileFormSubmit);

profileAddButton.addEventListener("click", handleAddImageClick);
formCard.addEventListener("submit", handleAddCardSubmit);
closeImage.addEventListener("click", handleCloseImage);

addImagePopupElement
  .querySelector(".popup__close-button")
  .addEventListener("click", closeAddImagePopup);
addImagePopupElement
  .querySelector("#add-image-popup__form")
  .addEventListener("submit", handleAddImageFormSubmit);
