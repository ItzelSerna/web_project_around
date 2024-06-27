import Popup from "./Popup";

export default class PopupWithConfirmation extends Popup {
  constructor(
    popupSelector,
    handleDeleteConfirmation,
    { card, element, removeCard }
  ) {
    super(popupSelector);
    this.handleDeleteConfirmation = handleDeleteConfirmation;
    this._card = card;
    this._element = element;
    this._removeCard = removeCard;
    this.confirmButton = this.popupSelector.querySelector(
      "#popup__confirm-button"
    );
  }

  open() {
    super.open();
    this._setEventListeners();
  }

  _deleteCard() {
    this._removeCard(this._card)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
      })
      .then(() => {
        this._element.remove();
        super.close();
        this._handleDelete();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  _setEventListeners() {
    super.setEventListeners();
    this.confirmButton.addEventListener("click", () => {
      this.handleDeleteConfirmation();
      this._deleteCard();
    });
  }
}
