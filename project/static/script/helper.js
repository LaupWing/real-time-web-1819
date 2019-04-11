
// const socket = io();
function removeElements(container){
    while(container.firstChild){
        container.removeChild(container.firstChild)
    }
}

function sendValuetoSocket(el, socketobj, callbackobj){
    document.querySelector(el)
        .addEventListener('submit', (e)=>{
            console.log('event triggerd')
            e.preventDefault()
            socketobj.socket.emit(socketobj.customEvent, document.querySelector('input').value)
            document.querySelector('input').value = ''
            if(typeof callbackobj !== 'undefined'){
                console.log('Callbackobj is defined')
                callbackobj.callbackFunction(callbackobj.callbackParameter)
            }
        })
}

export {removeElements, sendValuetoSocket}