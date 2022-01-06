import { galleryItems } from './gallery-items.js';
// Change code below this line

console.log(galleryItems);

const galleryEl = document.querySelector("div.gallery");

const listEl = galleryItems
  .map(
    ({ preview, original, description }) => `<div class="gallery__item">
  <a class="gallery__link" href="${original}">
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</div>`
  )
  .join("");

galleryEl.insertAdjacentHTML("afterbegin", listEl);

galleryEl.addEventListener("click", replacementLinkImg);


function replacementLinkImg(event) {
  event.preventDefault();
  
  if (!event.target.classList.contains("gallery__image")) {
    return;
  }

  const currentImageUrl = event.target.dataset.source;
  onOpenModal(currentImageUrl);
}

function onOpenModal(currentImageUrl) {
  const createModal = basicLightbox.create(
    `
      <img
      class="modal__image"
      src="${currentImageUrl}"
          />
`
  );
  createModal.show();
  window.addEventListener("keydown", escKeyCloseModal);

  const modal = document.querySelector("div.basicLightbox");
  modal.addEventListener("click", remoweClickModalListner);
}

function escKeyCloseModal(event) {
  const modal = document.querySelector("div.basicLightbox");

  if (event.code === "Escape") {
    modal.remove();
    window.removeEventListener("keydown", escKeyCloseModal);
  }
}

function remoweClickModalListner() {
  window.removeEventListener("click", remoweClickModalListner);
  window.removeEventListener("keydown", escKeyCloseModal);
}
