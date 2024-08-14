const openModal = () => document.querySelector('.menu-main').classList.add("menu-main--active");

const closeModal = () => document.querySelector('.menu-main').classList.remove("menu-main--active");
//TO-DO: prevent bubble on child event

const pointerMove = (element) => {
  
  document.querySelector(`.${element}`).addEventListener('mousemove', (event) => {
    const sizePointer = 100;
    //console.log(event.target);
    if (event.target.parentElement == document.querySelector('main')) {
      const offsetX = event.offsetX;
      const offsetY = event.offsetY;
      const offsetEditX = offsetX - (sizePointer / 2);
      const offsetEditY = offsetY - (sizePointer / 2);
      document.querySelector(`.${element}__pointer`).style.top = offsetEditY + 'px';
      document.querySelector(`.${element}__pointer`).style.left = offsetEditX + 'px';

    }
    else {
      const offsetX = event.target.offsetParent.offsetLeft;
      const offsetY = event.target.offsetParent.offsetTop;
      const offsetEditX = offsetX - (sizePointer / 2);
      const offsetEditY = offsetY - (sizePointer / 2);
      document.querySelector(`.${element}__pointer`).style.top = offsetEditY + 'px';
      document.querySelector(`.${element}__pointer`).style.left = offsetEditX + 'px';
    }
  });
};

const resetPointers = (elements) => {
  elements.map((element) => {
    document.querySelector(`.${element}__pointer`).style.top = 'calc(50% - 50px)';
    document.querySelector(`.${element}__pointer`).style.left = 'calc(50% - 50px)';
  })
};

const resetInput = (elements, defaultValues = []) => {
  elements.map((element, i) => {
    document.querySelector(`.${element}__input`).value = defaultValues[i] || 0;
  })
};

const reset = () => {
  resetPointers(['joistick', 'camera-control']);
  resetInput(['elevator-control'], [50]);
};

const editHud = () => {
  const parent = () => {
    const createParent = (classname, parentPath = "main") => {
      let parentDiv = document.createElement('div');
      parentDiv.className = classname;
      document.querySelector(parentPath).appendChild(parentDiv); 
    };
    resetUI();

    createParent('.parent-main');
    createComponentMain('.parent-main');
    
    createParent('.parent-joistick');
    createComponentJoistick('.parent-joistick');
    
    createParent('.parent-camera-control');
    createComponentCameraControl('.parent-camera-control');

    createParent('.parent-elevator-control');
    createComponentElevatorControl('.parent-elevator-control');
  };
  closeModal();
  parent();
};

const createComponentMain = (parent) => {
  let template = `
    <div class="main">
        <button class="main__button" id = "reset">RESET</button>
        <button class="main__button" id="openHud">HUD</button>
    </div>`;
    document.querySelector(parent).innerHTML += template;
    document.querySelector(`#reset`).addEventListener ("click", () => reset());
    document.querySelector('#openHud').addEventListener("click", () => openModal())

};
const createComponentJoistick = (parent) => {
  let template = `
    <div class="joistick">
        <div class="joistick__pointer"></div>
    </div>`;
    document.querySelector(parent).innerHTML += template;
    pointerMove('joistick');
    document.querySelector('.joistick__pointer').addEventListener('mouseout', (ev) => {
      if (ev.target.parentElement != document.querySelector('main') || ev.target.parentElement != document.querySelector('.joistick')) {
        resetPointers(['joistick'])
      }
    });
};
const createComponentCameraControl = (parent) => {
  let template = `
    <div class="camera-control">
        <div class="camera-control__pointer"></div>
    </div>`;
    document.querySelector(parent).innerHTML += template;
    pointerMove('camera-control');
};
const createComponentElevatorControl = (parent) => {
  let template = `
    <div class="elevator-control">
        <input type="range" class="elevator-control__input" id="elevator-control" min="0" max="100">
    </div>`;
    document.querySelector(parent).innerHTML += template;
};

const resetUI = () => document.querySelector('main').innerHTML='';