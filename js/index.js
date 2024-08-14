resetUI();
createComponentMain('main');
createComponentJoistick('main');
createComponentCameraControl('main');
createComponentElevatorControl('main');
/*listeners*/
document.querySelector('.menu-main__close').addEventListener("click", () => closeModal())
/*end listeners*/

const changeElementBackgroundColor = (elem, color) => {
  const x = document.querySelectorAll(elem);
  for(const element of x) element.style.backgroundColor = color;
}
const changeElementOpacity = (elem, value) => {
  const x= document.querySelectorAll(elem);
  for (const element of x) element.style.opacity = value/100;
}
const addModalContent = () => {
  const menu = [
    {
      "tag": "input",
      "type": "button",
      "value": "Editar HUD",
      "action": `onclick= "editHud()"`,
    },
    {
      "tag": "input",
      "type": "range",
      "min": 0,
      "max": 100,
      "display_text": "Editar Opacidad del Joistick",
      "value": 75,
      "action": `oninput= "changeElementOpacity('.joistick', this.value)"`,
    },
    {
      "tag": "input",
      "type": "range",
      "min": 0,
      "max": 100,
      "display_text": "Editar Opacidad del Camera Control",
      "value": 75,
      "action": `oninput= "changeElementOpacity('.camera-control', this.value)"`,
    },
    {
      "tag": "input",
      "type": "range",
      "min": 0,
      "max": 100,
      "display_text": "Editar Opacidad del Control Brazo",
      "value": 75,
      "action": `oninput= "changeElementOpacity('.elevator-control', this.value)"`,
    },
    {
      "tag": "input",
      "type": "range",
      "min": 0,
      "max": 100,
      "display_text": "Editar Opacidad All",
      "value": 48,
      "action": `oninput= "changeElementOpacity('main > *', this.value)"`,
    },
    {
      "tag": "input",
      "type": "color",
      "display_text": "Elegir Color de fondo",
      "value": "#f1f1f1",
      "action": `oninput= "changeElementBackgroundColor('main > *', this.value)"`,
    }
  ]

  let template = "";

  menu.map((item) => {
    let extra = '';
    if (item.min != undefined) extra += `min="${item.min}"`;
    if (item.max != undefined) extra += `max="${item.max}"`;
    template += `${item.display_text ? item.display_text : ""}<${item.tag} type='${item.type}' value='${item.value}' class='content__${item.tag}' ${extra} ${item.action}></${item.tag}>`; //template string
  });

  document.querySelector('.menu-main__content').innerHTML = template;
}
addModalContent();
