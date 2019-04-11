
function removeElements(container){
    while(container.firstChild){
        container.removeChild(container.firstChild)
    }
}

function sendValuetoSocket(el, customEvent, callbackobj){
    const socket = io();
    document.querySelector(el)
        .addEventListener('submit', (e)=>{
            e.preventDefault()
            socket.emit(customEvent, document.querySelector('input').value)
            document.querySelector('input').value = ''
            if(typeof callbackobj !== undefined){
                callbackobj.callbackFunction(callbackobj.callbackParameter)
            }
        })
}

export {removeElements, sendValuetoSocket}