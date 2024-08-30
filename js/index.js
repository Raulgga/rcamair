/*listeners*/
document.querySelector('.menu-main__close').addEventListener("click", () => closeModal())
/*end listeners*/

const changeElementBackgroundColor = (elem, color) => {
  const x = document.querySelectorAll(elem);
  for (const element of x) element.style.backgroundColor = color;
}
const changeElementOpacity = (elem, value) => {
  const x = document.querySelectorAll(elem);
  for (const element of x) element.style.opacity = value / 100;
}

let appData;
if(localStorage.getItem("appData") == null){
  appData = {
    menu: [
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
    ],
    layout: [
      {
        'type': "main",
        'tag': "div",
        'class': "main",
        'position': {
          'ancla': ["top", "left"],
          'x': "300px",
          'y': "300px",
        },
        'action': "",
        'parent': "parent-main"
      },
      {
        'type': "joystick",
        'tag': "div",
        'class': "joistick",
        'position': {
          'ancla': ["bottom", "left"],
          'x': "300px",
          'y': "300px",
        },
        'action': "",
        'parent': "parent-joistick"
      },
      {
        'type': "joystick",
        'tag': "div",
        'class': "camera-control",
        'position': {
          'ancla': ["bottom", "right"],
          'x': "300px",
          'y': "600px",
        },
        'action': "",
        'parent': "parent-camera-control"
      },
      {
        'type': "elevatorController",
        'tag': "div",
        'class': "elevator-control",
        'position': {
          'ancla': ["bottom", "right"],
          'x': "50px",
          'y': "400px",
        },
        'action': "",
        "min": 0,
        "max": 100,
        'parent': "parent-elevator-control"
      }
    ],
  }
  localStorage.setItem('appData', JSON.stringify(appData));
}else{
 appData = JSON.parse(localStorage.getItem("appData"));
}
console.log(appData);
//this is to generate all layout is or not editable
const trueGenerateUI = (isEditable) => {
  let template = "";
  //this code if is editable you must generate parents and after put childs generated in 
  appData.menu.map((item) => {
    let extra = '';
    if (item.min != undefined) extra += `min="${item.min}"`;
    if (item.max != undefined) extra += `max="${item.max}"`;
    //if (item.type != "joystick");
    template += `${item.display_text ? item.display_text : ""}<${item.tag} type='${item.type}' value='${item.value}' class='content__${item.tag}' ${extra} ${item.action}></${item.tag}>`; //template string
  });
  document.querySelector('.menu-main__content').innerHTML = template;
  template = "";
  appData.layout.map((item) => {
    console.log(item.class);
    if (isEditable) {
      template += `<div class="parent-${item.class}">`
    };
    if (item.type == "main") {
      template += `<div class="${item.class}">`;
      template += `<button class="${item.class}__button" id = "reset">RESET</button>`;
      template += `<button class="${item.class}__button" id = "openHud">HUD</button>`;
      template += `</div>`;
    };
    if (item.type == "joystick") {
      template += `<div class="${item.class}">`;
      template += `<div class="${item.class}__pointer"></div>`;
      template += `</div>`;
    };
    if (item.type == "elevatorController") {
      template += `<div class="${item.class}">`;
      if(isEditable){
        template += `<input type="range" disabled class="${item.class}__input" id="${item.class}" min="${item.min}" max="${item.max}">`;
      }else{
        template += `<input type="range" class="${item.class}__input" id="${item.class}" min="${item.min}" max="${item.max}">`;
      }
      template += `</div>`;
    };
    if (isEditable) {
      template += `</div>`
    };
    document.querySelector('main').innerHTML = template;


    console.log(item.position);
    console.log(document.querySelector(`.${item.class}`));
    console.log(item.position.y , item.position.x);
    if(item.position.ancla[0] == "top"){
      document.querySelector(`.${item.class}`).style.top = item.position.y;
      console.log("1");
    };
    if(item.position.ancla[0] == "bottom"){
      document.querySelector(`.${item.class}`).style.bottom = item.position.y;
      console.log("2");
    };
    if(item.position.ancla[1] == "left"){
      document.querySelector(`.${item.class}`).style.left = item.position.x;
      console.log("3");
    };
    if(item.position.ancla[1] == "right"){
      document.querySelector(`.${item.class}`).style.right = item.position.x;
      console.log("4");
    };
    document.querySelector(`#reset`).addEventListener("click", () => reset());
    document.querySelector('#openHud').addEventListener("click", () => openModal())

    setTimeout(() => {
      if (!isEditable) {
        pointerMove('joistick');
        document.querySelector('.joistick__pointer').addEventListener('mouseout', (ev) => {
          if (ev.target.parentElement != document.querySelector('main') || ev.target.parentElement != document.querySelector('.joistick')) {
            resetPointers(['joistick'])
          }
        });
        
        pointerMove('camera-control');
      }else {
        const saveData = (mouseOffset,position) =>{
          let myAppdataFromlocalStorage = JSON.parse(localStorage.getItem('appData'));
          let index;
          for(i = 0; i < myAppdataFromlocalStorage.layout.length; i++) if(myAppdataFromlocalStorage.layout[i].class == currentTarget) index = i;
          console.log(index);//my index to edit
          myAppdataFromlocalStorage.layout[index].position = position;
          localStorage.setItem('appData', JSON.stringify(myAppdataFromlocalStorage));//save object in local storage
        };

        document.addEventListener("mousemove", (elem) => {
          setTimeout(() => {
            console.log(elem.offsetX, elem.offsetY);
            mouseOffset.x = elem.offsetX;
            mouseOffset.y = elem.offsetY;
            console.log(mouseOffset, currentTarget);
            if(currentTarget !=""){
              document.querySelector(`.${currentTarget}`).style.top=mouseOffset.y + "px";
              document.querySelector(`.${currentTarget}`).style.left=mouseOffset.x+ "px";
            };
            //setAnchors();
            saveData(mouseOffset, setAnchors());
          },500)
        });
      }
    }, 0);
  });
  return "done";
};
trueGenerateUI();

let mouseOffset = {x: 0, y: 0};

let currentTarget = "ev.target.className";
document.addEventListener("click", (ev) => currentTarget = ev.target.className);

document.addEventListener("mouseup",(ev) => currentTarget = "");

const setAnchors = () => {
  let pointX, pointY;
  if( mouseOffset.y < (window.innerHeight/2)){
    pointY = "top";
    console.log ("top");
  }else{
    pointY = "bottom";
    console.log ("bottom");
  };

  if(mouseOffset.x < (window.innerWidth/2)){
    pointX = "left";
    console.log ("left");
  }else{
    pointX = "right";
    console.log ("right");
  }
  //calculateCords es el resultado numerico; point x, y son el ancla
  console.log(calculateCords(pointX, pointY),pointX, pointY);
  return {ancla: [pointX, pointY],...calculateCords(pointX,pointY)};
};
const calculateCords = (pointX, pointY) => {
  if (pointX == "right" && pointY == "bottom"){
    return {x: window.innerWidth - mouseOffset.x, y: window.innerHeight - mouseOffset.y};
  };
  if (pointX == "right" && pointY == "top"){
    return {x: window.innerWidth - mouseOffset.x, y: mouseOffset.y};
  };
  if (pointX == "left" && pointY == "bottom"){
    return {x: mouseOffset.x, y: window.innerHeight - mouseOffset.y};
  };
  return {x:mouseOffset.x, y:mouseOffset.y};
};