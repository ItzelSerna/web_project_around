export default class Popup {
  constructor(popupSelector) {
    this.popupSelector = document.querySelector(popupSelector);
    this.popupCloseButton = this.popupSelector.querySelector(
      ".popup__close-button"
    );
  }

  open() {
    this.popupSelector.classList.add("popup_opened");
    document.addEventListener("keydown", this._handleEscClose.bind(this));
  }

  close() {
    this.popupSelector.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._handleEscClose.bind(this));
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  _handleOverlayClick(evt) {
    return evt.target.classList.contains("popup_opened");
  }

  setEventListeners() {
    this.popupCloseButton.addEventListener("click", () => {
      this.close();
    });

    this.popupSelector.addEventListener("click", (evt) => {
      if (evt.target === this.popupSelector) {
        this.close();
      }
    });
  }
}
