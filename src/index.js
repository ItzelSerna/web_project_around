import "./styles/index.css";
import stepsSrc from "./images/avatar.jpg";
import Card from "./scripts/Card.js";
import FormValidator from "./scripts/FormValidator.js";
import Section from "./scripts/Section.js";
import Popup from "./scripts/Popup.js";
import PopupWithForm from "./scripts/PopupWithForm.js";
import PopupWithImage from "./scripts/PopupWithImage.js";
import UserInfo from "./scripts/UserInfo.js";

const imageProfile = document.getElementById("profile-avatar");
imageProfile.src = stepsSrc;
const profileNameElement = document.querySelector(".profile__name");
const profileAboutElement = document.querySelector(".profile__about");
const profileEditButton = document.querySelector(".profile__edit-button");
const editPopupElement = document.querySelector(".popup");
const formElement = document.querySelector(".popup__form");
const formElementCard = document.querySelector("#form-cards");
const nameInput = document.querySelector(".popup__input_name");
const aboutInput = document.querySelector(".popup__input_about");

const profileAddButton = document.querySelector(".profile__add-button");
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

const userInfo = new UserInfo(
  {
    nameSelector: profileNameElement,
    jobSelector: profileAboutElement,
  },
  editPopupElement
);

function setUserInfo() {
  const { name, job } = userInfo.getUserInfo();
  nameInput.value = name;
  aboutInput.value = job;
}

const section = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const card = new Card(item, ".template-card");
      const cardElement = card.generateCard();
      section.addItem(cardElement);
    },
  },
  cardArea
);

section.render();

const editPopup = new Popup(".popup");

const addImagePopup = new PopupWithForm(
  "#add-image-popup",
  handleAddImageFormSubmit
);

const editProfilePopup = new PopupWithForm(".popup", handleProfileFormSubmit);

const imagePopup = new PopupWithImage("#popup_image-open");

const overlayEdit = document.querySelector("#popup-overlay-edit");
const overlayAdd = document.querySelector("#popup-overlay-add");
const overlayImage = document.querySelector("#popup-overlay-image");

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  userInfo.setUserInfo();
  editProfilePopup.close();
}

function handleAddImageFormSubmit(evt) {
  evt.preventDefault();
  addImagePopup.close();
}

function handleAddCardSubmit(evt) {
  evt.preventDefault();
  if (titleInput.value && imageInput.value) {
    const card = new Card(
      { name: titleInput.value, link: imageInput.value },
      ".template-card"
    );
    const newCardElement = card.generateCard();
    cardArea.prepend(newCardElement);
    titleInput.value = "";
    imageInput.value = "";
    addImagePopup.close();
  }
}

function handleOverlayClick(event) {
  if (event.target.classList.contains("popup__overlay")) {
    editPopup.close();
    addImagePopup.close();
    imagePopup.close();
  }
}

function closePopups() {
  editPopup.close();
  addImagePopup.close();
  imagePopup.close();
  document.removeEventListener("keydown", closeWithEsc);
}

function closeWithEsc(event) {
  if (event.key === "Escape") {
    closePopups();
  }
}

profileEditButton.addEventListener("click", () => {
  editPopup.open();
  setUserInfo();
});

formElement.addEventListener("submit", handleProfileFormSubmit);

profileAddButton.addEventListener("click", () => addImagePopup.open());

formCard.addEventListener("submit", handleAddCardSubmit);

addImagePopup.setEventListeners();

overlayEdit.addEventListener("click", handleOverlayClick);
overlayAdd.addEventListener("click", handleOverlayClick);
overlayImage.addEventListener("click", handleOverlayClick);

document.addEventListener("keydown", (event) => closeWithEsc(event));

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
