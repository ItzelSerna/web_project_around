export default class Card {
  constructor(title, link, template) {
    this._title = title;
    this._link = link;
    this._template = template;
  }

  _getTemplate() {
    this._templateCard = document
      .querySelector(this._template)
      .content.querySelector(".card")
      .cloneNode(true);
    return this._templateCard;
  }

  generateCard(obj) {
    this._card = this._getTemplate();
    this._card.querySelector(".card__photo").src = this._link;
    this._card.querySelector(".card__photo").alt = this._title;
    this._card.querySelector(".card__info-name").textContent = this._title;
    this._setEventListeners(obj);
    return this._card;
  }

  _openPopupHandler(obj) {
    obj.popupImage.querySelector(".popup__image").src = this._link;
    obj.popupImage.querySelector(".popup__image").alt = this._title;
    obj.popupImage.querySelector(".popup__image-title").textContent =
      this._title;
    document.addEventListener("keydown", closeWithEsc);
  }

  closePopupHandler(obj) {
    obj.popupImage.remove();
  }

  _setEventListeners(obj) {
    this._card.querySelector(".card__photo").addEventListener("click", () => {
      this._openPopupHandler(obj);
    });

    obj.buttonClose.addEventListener("click", () => {
      this.closePopupHandler(obj);
    });

    obj.imgPopup.addEventListener("click", () => {
      this.closePopupHandler(obj);
    });
  }
}
