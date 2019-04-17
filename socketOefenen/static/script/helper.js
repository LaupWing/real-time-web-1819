
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
            socketobj.socket.emit(socketobj.customEvent, {
                offset  :   socketobj.offset,
                value   :   document.querySelector('input#m').value 
            })
            document.querySelector('input#m').value = ''
            if(typeof callbackobj !== 'undefined'){
                callbackobj.callbackFunction(callbackobj.callbackParameter)
            }
        })
}

export {removeElements, sendValuetoSocket}