import Popup from "./Popup";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this.handleFormSubmit = handleFormSubmit;
    this.form = this.popupSelector.querySelector(".popup__form");
  }

  _getInputValues() {
    return {
      name: this.popupSelector.querySelector(".popup__input_title").value,
      link: this.popupSelector.querySelector("#popup__input_image").value,
    };
  }

  setEventListeners() {
    super.setEventListeners();
    this.form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this.handleFormSubmit(evt);
    });
  }

  close() {
    super.close();
    this.form.reset();
  }
}
