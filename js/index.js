document.querySelector('#openHud').addEventListener("click", () => openModal())

document.querySelector('.menu-main__close').addEventListener("click", () => closeModal())

const addModalContent = () => {
  const template = '<button class="content__button">Editar HUD</button><input type="range" class="content__input-range">';
  document.querySelector ('.menu-main__content').innerHTML = template;
}
addModalContent();