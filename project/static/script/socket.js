const socket = io();
(function(){
    document.querySelector('#intro form')
        .addEventListener('submit', (e)=>{
            e.preventDefault();
            socket.emit('set name', document.querySelector('input').value);
            document.querySelector('input').value = ''
            removeElements(document.body)
        })
}())
    
socket.on('chat message', function(msg){
    const node = document.createElement('li')
    const textNode = document.createTextNode(msg)
    node.appendChild(textNode)
    document.querySelector('#messages').appendChild(node)
})

socket.on('set name', function(name){
const element = `<ul id="messages"></ul><form id="chat" action=""><h2>${name}</h2><input id="m" autocomplete="off" /><button>Send</button></form>`
    document.body.insertAdjacentHTML('beforeend', element)
    nameDefined()
})


function removeElements(container){
    while(container.firstChild){
        container.removeChild(container.firstChild)
    }
}

function nameDefined(){
    document.querySelector('#chat')
        .addEventListener('submit', (e)=>{
            e.preventDefault()
            socket.emit('chat message', document.querySelector('input').value)
            document.querySelector('input').value = ''
        })
}