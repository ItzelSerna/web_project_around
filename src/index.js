import "./styles/index.css";
import Card from "./scripts/Card.js";
import FormValidator from "./scripts/FormValidator.js";
import Section from "./scripts/Section.js";
import Popup from "./scripts/Popup.js";
import PopupWithAvatar from "./scripts/PopupWithAvatar.js";
import PopupWithForm from "./scripts/PopupWithForm.js";
import PopupWithImage from "./scripts/PopupWithImage.js";
import { api } from "./utils/Api.js";

const imageProfile = document.querySelector(".profile__avatar");
const profileNameElement = document.querySelector(".profile__name");
const profileAboutElement = document.querySelector(".profile__about");
const profileEditButton = document.querySelector(".profile__edit-button");

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
const profileAvatarButton = document.querySelector(".profile__edit-icon");
const formElementAvatar = document.querySelector("#popup-avatar__form");
const buttonSaveAvatar = document.querySelector("#popup-avatar__button");
const buttonSaveProfile = document.querySelector("#popup-profile__button");
const buttonSaveCard = document.querySelector("#popup-card__button");

let currentUser;

api.getUserInfo().then((userData) => {
  profileNameElement.textContent = userData?.name;
  profileAboutElement.textContent = userData?.about;
  imageProfile.src = userData?.avatar;
  currentUser = userData?._id;

  api.getInitialCards().then((cards) => {
    const section = new Section(
      {
        items: cards,
        renderer: (item) => {
          const card = new Card(
            item,
            ".template-card",
            currentUser,
            likeCard,
            handleCardDelete
          );
          const cardElement = card.generateCard();
          section.addItem(cardElement);
        },
      },
      cardArea
    );

    section.render();
  });
});

function setUserInfo() {
  api.getUserInfo().then((userData) => {
    nameInput.value = userData?.name;
    aboutInput.value = userData?.about;
  });
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  const newName = nameInput.value;
  const newAbout = aboutInput.value;
  buttonSaveProfile.textContent = "Saving...";
  api
    .modifyUsersInfo(newName, newAbout)
    .then((data) => {
      profileNameElement.textContent = data?.name;
      profileAboutElement.textContent = data?.about;
      editProfilePopup.close();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      buttonSaveProfile.textContent = "Save";
    });
}

const editPopup = new Popup(".popup");

const addImagePopup = new PopupWithForm(
  "#add-image-popup",
  handleAddImageFormSubmit
);

const editProfilePopup = new PopupWithForm(".popup", handleProfileFormSubmit);

const imagePopup = new PopupWithImage("#popup_image-open");

const editAvatarPopup = new PopupWithAvatar("#popup-avatar", {
  handleFormAvatar: handleAvatarFormSubmit,
});

const overlayEdit = document.querySelector("#popup-overlay-edit");
const overlayAdd = document.querySelector("#popup-overlay-add");
const overlayImage = document.querySelector("#popup-overlay-image");
const overlayAvatar = document.querySelector("#popup-overlay-avatar");

function handleAddImageFormSubmit(evt) {
  evt.preventDefault();
  addImagePopup.close();
}

function handleAddCardSubmit(evt) {
  evt.preventDefault();
  buttonSaveCard.textContent = "Saving...";
  if (titleInput.value && imageInput.value) {
    api.getNewCard(titleInput.value, imageInput.value).then((newCard) => {
      const card = new Card(
        newCard,
        ".template-card",
        currentUser,
        likeCard,
        handleCardDelete
      );
      const newCardElement = card.generateCard();
      cardArea.prepend(newCardElement);
      titleInput.value = "";
      imageInput.value = "";
      addImagePopup.close();
      buttonSaveCard.textContent = "Save";
    });
  }
}

function handleAvatarFormSubmit(evt) {
  evt.preventDefault();
  const newAvatarUrl = formElementAvatar.querySelector(".popup__input").value;
  buttonSaveAvatar.textContent = "Saving...";
  api.resetAvatar(newAvatarUrl).then((data) => {
    imageProfile.src = data?.avatar;
    editAvatarPopup.close();
    buttonSaveAvatar.textContent = "Save";
  });
}

function likeCard(cardId, isLiked) {
  return api
    .likeCard(cardId, isLiked)
    .then((updatedCard) => {
      return updatedCard;
    })
    .catch((err) => {
      throw err;
    });
}

function handleCardDelete(cardId) {
  api.deleteCard(cardId).then(() => {
    const cardElement = document.getElementById(cardId);
    cardElement.remove();
  });
}

function handleOverlayClick(event) {
  if (event.target.classList.contains("popup__overlay")) {
    editPopup.close();
    addImagePopup.close();
    imagePopup.close();
    editAvatarPopup.close();
  }
}

function closePopups() {
  editPopup.close();
  addImagePopup.close();
  imagePopup.close();
  editAvatarPopup.close();
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
profileAvatarButton.addEventListener("click", () => editAvatarPopup.open());
formElementAvatar.addEventListener("submit", handleAvatarFormSubmit);

addImagePopup.setEventListeners();

overlayEdit.addEventListener("click", handleOverlayClick);
overlayAdd.addEventListener("click", handleOverlayClick);
overlayImage.addEventListener("click", handleOverlayClick);
overlayAvatar.addEventListener("click", handleOverlayClick);

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
const validateFormAvatar = new FormValidator(formElementAvatar, settings);
validateFormAvatar._setEventListeners();
