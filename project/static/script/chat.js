import {removeElements, sendValuetoSocket} from './helper.js';

const socket = io();

// Vraagje aan wooter als je een callback meegeeft als parameter met daarin al een parameter dan word die geactiveerd.. hoe anders te fixen?

const init = () =>{
    // document.querySelector('#intro form')
    //     .addEventListener('submit',(e)=>{
    //         e.preventDefault();
    //         socket.emit('set name', document.querySelector('input').value);
    //         document.querySelector('input').value = '';
    //         removeElements(document.body)
    //     })
    // const emitSocket = socket.emit('set name', document.querySelector('input').value); 
    sendValuetoSocket(
        '#intro form',
        {
            socket              :   socket,
            customEvent         :   'set name'
        },
        {
            callbackFunction    :   removeElements,
            callbackParameter   :   document.body
        })
}
init()
const offset = Math.floor(Math.random() * (126 - 32 + 1)) + 32;
// const offset = Math.floor(Math.random() * 20);
console.log(offset)
socket.on('chat message', function(chatobj){
    const node = document.createElement('li')
    const textNode = document.createTextNode(`${chatobj.user} saids: ${encode(chatobj.msg, offset)}`)
    node.appendChild(textNode)
    document.querySelector('#messages').appendChild(node)
})
function encode (toEncode, offset) {
    return [...toEncode].map(letter => {
        return letter.charCodeAt(0) + offset;
    }).map(charcode => {
        return String.fromCharCode(charcode);
    }).join("");
}


socket.on('set name', function(name){
    console.log('check')
    const element = `<ul id="messages"></ul><form id="chat" action=""><h2>${name}</h2><input id="m" autocomplete="off" /><button>Send</button></form>`
    document.body.insertAdjacentHTML('beforeend', element)
    nameDefined()
})

socket.on('users', function(name){
})


function nameDefined(){
    // document.querySelector('#chat')
    //     .addEventListener('submit', (e)=>{
    //         e.preventDefault()
    //         socket.emit('chat message', document.querySelector('input').value)
    //         document.querySelector('input').value = ''
    //     })
    sendValuetoSocket(
        '#chat',
        {
            socket              :   socket,
            customEvent         :   'chat message'
        })
}