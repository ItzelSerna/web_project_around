import { api } from "../utils/Api.js";

export default class Card {
  constructor(
    cardData,
    templateSelector,
    handleOpenImage,
    currentUser,
    handleCardDelete
  ) {
    this._title = cardData.name;
    this._link = cardData.link;
    this._likes = cardData.likes || [];
    this._cardId = cardData._id;
    this._templateSelector = templateSelector;
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector(".card__photo");
    this._cardTitle = this._element.querySelector(".card__info-name");
    this._likeButton = this._element.querySelector(".card__like-button");
    this._counterLikes = this._element.querySelector(".card__likes");
    this._bindListeners();
    this._handleOpenImage = handleOpenImage;
    this._currentUser = currentUser;
    this._ownerId = "39689808-444a-43ae-b51c-8f177d6060a9";
    this._updateLikeStatus();
    this._handleCardDelete = handleCardDelete;
  }

  _getTemplate() {
    const cardTemplate = document
      .querySelector(this._templateSelector)
      .content.querySelector(".card");
    return cardTemplate.cloneNode(true);
  }

  _bindListeners() {
    this._likeButton.addEventListener("click", () => this._handleLike());
    this._cardImage.addEventListener("click", () => this._handleImageClick());
    if (this._currentUser === this._ownerId) {
      const deleteButton = this._element.querySelector(".card__delete-button");
      deleteButton.addEventListener("click", () => this._handleDelete());
    }
  }

  _handleLike() {
    const isLiked = this._likes.some((like) => like._id === this._currentUser);
    const likeStatus = !isLiked;
    this._toggleLike(likeStatus);
  }

  _toggleLike(likeStatus) {
    api
      .likeCard(this._cardId, likeStatus)
      .then((data) => {
        this._likes = data.likes;
        this._updateLikeStatus();
      })
      .catch((error) =>
        console.error("Error: no se puede enviar el me gusta", error)
      );
  }

  _handleDelete() {
    api
      .deleteCard(this._cardId)
      .then(() => {
        this._element.remove();
      })
      .catch((error) => console.error("Error:", error));
  }

  _handleImageClick() {
    const popupImageOpen = document.querySelector("#popup_image-open");
    const closeImage = document.querySelector("#popup__close-image");
    const popupImageTitle = document.querySelector(".popup__image-title");
    const popupImage = document.querySelector(".popup__image");
    const overlayImage = document.querySelector("#popup-overlay-image");
    popupImage.src = this._link;
    popupImageTitle.textContent = this._title;
    popupImage.alt = this._title;
    popupImageOpen.classList.add("popup_opened");
    closeImage.addEventListener("click", () => {
      popupImageOpen.classList.remove("popup_opened");
      overlayImage.removeEventListener("click", this._handleOverlayClick);
    });
    overlayImage.addEventListener("click", () => {
      popupImageOpen.classList.remove("popup_opened");
      overlayImage.removeEventListener("click", this._handleOverlayClick);
    });
  }

  _updateLikeStatus() {
    const isLiked = this._likes.some((like) => like._id === this._currentUser);
    this._likeButton.classList.toggle("card__like-button_active", isLiked);
    this._counterLikes.textContent = this._likes.length;
  }

  generateCard() {
    this._cardTitle.textContent = this._title;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._title;
    this._updateLikeStatus();
    if (this._currentUser === this._ownerId) {
      const trashIcon = document.createElement("div");
      trashIcon.classList.add(".card__delete-button");
      this._element.insertAdjacentElement("afterbegin", trashIcon);
    }
    return this._element;
  }
}
