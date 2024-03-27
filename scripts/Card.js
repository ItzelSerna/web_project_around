export default class Card {
  constructor(cardData, templateSelector) {
    this._title = cardData.name;
    this._link = cardData.link;
    this._templateSelector = templateSelector;
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector(".card__photo");
    this._cardTitle = this._element.querySelector(".card__info-name");
    this._likeButton = this._element.querySelector(".card__like-button");
    this._deleteButton = this._element.querySelector(".card__delete-button");

    this._bindListeners();
  }

  _getTemplate() {
    const cardTemplate = document
      .querySelector(this._templateSelector)
      .content.querySelector(".card");
    return cardTemplate.cloneNode(true);
  }

  _bindListeners() {
    this._likeButton.addEventListener("click", () => this._handleLike());
    this._deleteButton.addEventListener("click", () => this._handleDelete());
    this._cardImage.addEventListener("click", () => this._handleImageClick());
  }

  _handleLike() {
    this._likeButton.classList.toggle("card__like-button_active");
  }

  _handleDelete() {
    this._element.remove();
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

  generateCard() {
    this._cardTitle.textContent = this._title;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._title;
    return this._element;
  }
}
