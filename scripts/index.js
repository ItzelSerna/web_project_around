//Contiene controladores de eventos y la función que abre/cierra las ventanas modales
//abrir modales o abrir popups
//setpopupinput, openpopup

import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import {
  openPopup,
  closePopup,
  openAddImagePopup,
  closeAddImagePopup,
} from "./utils.js";

const profileNameElement = document.querySelector(".profile__name");
const profileAboutElement = document.querySelector(".profile__about");
const profileEditButton = document.querySelector(".profile__edit-button");
const editPopupElement = document.querySelector(".popup");
const formElement = document.querySelector(".popup__form");
const formElementCard = document.querySelector("#form-cards");
const nameInput = document.querySelector(".popup__input_name");
const aboutInput = document.querySelector(".popup__input_about");

const profileAddButton = document.querySelector(".profile__add-button");
const addImagePopupElement = document.querySelector("#add-image-popup");
const titleInput = document.querySelector(".popup__input_title");
const imageInput = document.querySelector("#popup__input_image");

const cardArea = document.querySelector(".cards");
const groupImage = document.getElementById("add-image-popup");
const formCard = groupImage.querySelector(".popup__form");

const initialCards = [
  {
    name: "Montañas Rocosas",
    link: "https://images.unsplash.com/photo-1595134816826-c569cbb602b2?q=80&w=1436&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Lago di Braies",
    link: "https://images.unsplash.com/photo-1581520734619-86fbd0a3d083?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Yosemite",
    link: "https://images.unsplash.com/photo-1607400371388-14ea99d7d096?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Everglades",
    link: "https://images.unsplash.com/photo-1592947419095-4a2b4bde9161?q=80&w=1462&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Hawái",
    link: "https://images.unsplash.com/photo-1542309174-d33b34ce6ea7?q=80&w=1376&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Lago Michigan",
    link: "https://images.unsplash.com/photo-1562878344-85f7b6243c5f?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

const popupImageOpen = document.querySelector("#popup_image-open");

const overlayEdit = document.querySelector("#popup-overlay-edit");
const overlayAdd = document.querySelector("#popup-overlay-add");
const overlayImage = document.querySelector("#popup-overlay-image");

let initialProfileName = profileNameElement.textContent;
let initialProfileAbout = profileAboutElement.textContent;

function setPopupInput() {
  nameInput.value = initialProfileName;
  aboutInput.value = initialProfileAbout;
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileNameElement.textContent = nameInput.value;
  profileAboutElement.textContent = aboutInput.value;
  initialProfileName = nameInput.value;
  initialProfileAbout = aboutInput.value;
  closePopup(editPopupElement, overlayEdit);
}

function handleAddImageFormSubmit(evt) {
  evt.preventDefault();
  closeAddImagePopup(addImagePopupElement, overlayAdd);
}

initialCards.forEach((cardData) => {
  const card = new Card(cardData, ".template-card");
  const cardElement = card.generateCard();
  cardArea.append(cardElement);
});

function handleAddCardSubmit(evt) {
  evt.preventDefault();
  if (evt.submitter.classList.contains("popup__save-button")) {
    const card = new Card(
      { name: titleInput.value, link: imageInput.value },
      ".template-card"
    );
    const newCardElement = card.generateCard();
    cardArea.prepend(newCardElement);
  }
  closeAddImagePopup(addImagePopupElement, overlayAdd);
}

function handleCloseImage() {
  popupImageOpen.classList.remove("popup_opened");
  overlayImage.removeEventListener("click", handleOverlayClick);
}

function handleOverlayClick(event) {
  if (event.target.classList.contains("popup__overlay")) {
    closePopup(editPopupElement, overlayEdit);
    closeAddImagePopup(addImagePopupElement, overlayAdd);
    handleCloseImage();
  }
}

function closeWithEsc(event) {
  if (event.key === "Escape") {
    closePopup(editPopupElement, overlayEdit);
    closeAddImagePopup(addImagePopupElement, overlayAdd);
    handleCloseImage();
    document.removeEventListener("keydown", closeWithEsc);
  }
}

profileEditButton.addEventListener("click", () =>
  openPopup(editPopupElement, overlayEdit, setPopupInput)
);

formElement.addEventListener("submit", handleProfileFormSubmit);

profileAddButton.addEventListener("click", () =>
  openAddImagePopup(addImagePopupElement, overlayAdd)
);

formCard.addEventListener("submit", handleAddCardSubmit);

addImagePopupElement
  .querySelector(".popup__close-button")
  .addEventListener("click", () =>
    closeAddImagePopup(addImagePopupElement, overlayAdd)
  );
addImagePopupElement
  .querySelector(".popup__form")
  .addEventListener("submit", handleAddImageFormSubmit);

overlayEdit.addEventListener("click", handleOverlayClick);
overlayAdd.addEventListener("click", handleOverlayClick);
overlayImage.addEventListener("click", handleOverlayClick);

document.addEventListener("keydown", (event) =>
  closeWithEsc(
    event,
    editPopupElement,
    overlayEdit,
    addImagePopupElement,
    overlayAdd
  )
);

const settings = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__save-button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

const validateFormProfile = new FormValidator(formElement, settings);
validateFormProfile._setEventListeners();
const validateFormCard = new FormValidator(formElementCard, settings);
validateFormCard._setEventListeners();
