const openModal = () => document.querySelector('.menu-main').classList.add("menu-main--active");

const closeModal = () => document.querySelector('.menu-main').classList.remove("menu-main--active");

const moveJoistic = () => document.querySelector('.joistick__pointer').classList.modify();

//TO-DO: prevent bubble on child event
document.querySelector('.joistick').addEventListener('mousemove', (event) => {
    const sizePointer = 100;
    //console.log(event.target);
    if(event.target.parentElement == document.querySelector('main')){
        const offsetX = event.offsetX;
        const offsetY = event.offsetY;
        const offsetEditX = offsetX -(sizePointer / 2);
        const offsetEditY = offsetY -(sizePointer / 2);
        document.querySelector('.joistick__pointer').style.top = offsetEditY + 'px';
        document.querySelector('.joistick__pointer').style.left = offsetEditX + 'px';
    
    }
    else{
        const offsetX = event.target.offsetParent.offsetLeft;
        const offsetY = event.target.offsetParent.offsetTop;
        const offsetEditX = offsetX -(sizePointer / 2);
        const offsetEditY = offsetY -(sizePointer / 2);
        document.querySelector('.joistick__pointer').style.top = offsetEditY + 'px';
        document.querySelector('.joistick__pointer').style.left = offsetEditX + 'px';
    }
});

document.querySelector('.joistick__pointer').addEventListener('mouseout',(ev) => {
    if(ev.target.parentElement != document.querySelector('main') || ev.target.parentElement != document.querySelector('.joistick') ){
        resetPointers(['joistick'])
    }
});

const resetPointers = (elements) => { 
    elements.map((element)=>{
        document.querySelector(`.${element}__pointer`).style.top = 'calc(50% - 50px)';
        document.querySelector(`.${element}__pointer`).style.left = 'calc(50% - 50px)';
    })
};

const resetInput = (elements, defaultValues = []) => {
    elements.map((element,i)=>{
        document.querySelector(`.${element}__input`).value = defaultValues[i] || 0; 
    })
}; 

const reset = () =>{
    resetPointers(['joistick','camera-control']);
    resetInput(['elevator-control'],[50]);
};