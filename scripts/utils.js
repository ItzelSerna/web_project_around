export function openPopup(editPopupElement, overlayEdit, setPopupInput) {
  editPopupElement.classList.add("popup_opened");
  overlayEdit.addEventListener("click", handleOverlayClick);
  setPopupInput();
}

export function closePopup(editPopupElement, overlayEdit) {
  editPopupElement.classList.remove("popup_opened");
  overlayEdit.removeEventListener("click", handleOverlayClick);
}

export function openAddImagePopup(addImagePopupElement, overlayAdd) {
  addImagePopupElement.classList.add("popup_opened");
  overlayAdd.addEventListener("click", handleOverlayClick);
}

export function closeAddImagePopup(addImagePopupElement, overlayAdd) {
  addImagePopupElement.classList.remove("popup_opened");
  overlayAdd.removeEventListener("click", handleOverlayClick);
}

export function handleOverlayClick(event) {
  if (event.target.classList.contains("popup__overlay")) {
    const editPopupElement = document.querySelector(".popup");
    const addImagePopupElement = document.querySelector("#add-image-popup");
    const overlayEdit = document.querySelector("#popup-overlay-edit");
    const overlayAdd = document.querySelector("#popup-overlay-add");
    closePopup(editPopupElement, overlayEdit);
    closeAddImagePopup(addImagePopupElement, overlayAdd);
  }
}

export function closeWithEsc(event) {
  if (event.key === "Escape") {
    const editPopupElement = document.querySelector(".popup");
    const addImagePopupElement = document.querySelector("#add-image-popup");
    const overlayEdit = document.querySelector("#popup-overlay-edit");
    const overlayAdd = document.querySelector("#popup-overlay-add");
    closePopup(editPopupElement, overlayEdit);
    closeAddImagePopup(addImagePopupElement, overlayAdd);
  }
}
