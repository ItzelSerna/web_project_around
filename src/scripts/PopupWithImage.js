import Popup from "./Popup";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this.image = this.popupSelector.querySelector(".popup__image");
    this.title = this.popupSelector.querySelector(".popup__image-title");
  }

  open(imageSrc, titleText) {
    super.open();
    this.image.src = imageSrc;
    this.title.textContent = titleText;
  }
}
