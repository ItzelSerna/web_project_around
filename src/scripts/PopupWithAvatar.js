import Popup from "./Popup";

export default class PopupWithAvatar extends Popup {
  constructor(popupSelector, { handleFormAvatar }) {
    super(popupSelector);
    this.handleFormAvatar = handleFormAvatar;
    this._buttonAvatar = this.popupSelector.querySelector(
      "#popup-avatar__close"
    );
    this._spanError = this.popupSelector.querySelector(
      "#popup__input_avatar-error"
    );
    this.formAvatar = this.popupSelector.querySelector("#popup-avatar__form");
    this.buttonSaveAvatar = this.popupSelector.querySelector(
      "#popup-avatar__button"
    );
  }

  open() {
    super.open();
    this.setEventListeners();
  }

  setEventListeners() {
    super.setEventListeners();
    this._buttonAvatar.addEventListener("click", (evt) => {
      evt.preventDefault();
    });
  }

  close() {
    super.close();
    this.formAvatar.reset();
  }
}
