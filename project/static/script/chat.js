import {removeElements, sendValuetoSocket} from './helper.js';

const socket = io();

// Vraagje aan wooter als je een callback meegeeft als parameter met daarin al een parameter dan word die geactiveerd.. hoe anders te fixen?

const offset = ()=>{
    if(localStorage.getItem('offsetEncrypt')){
        return localStorage.getItem('offsetEncrypt')
    }else{
        let offsetVal = Math.floor(Math.random() * (126 - 32 + 1)) + 32;
        localStorage.setItem('offsetEncrypt', offsetVal)
        return localStorage.getItem('offsetEncrypt')
    }
} 
const init = () =>{
    sendValuetoSocket(
        '#intro form',
        {
            socket              :   socket,
            customEvent         :   'set name',
            offset              :   offset()
        },
        {
            callbackFunction    :   removeElements,
            callbackParameter   :   document.body
        })
}
init()

function addCheckboxEvents(){
    document.querySelectorAll('ul#users li input').forEach(input=>{
        input.addEventListener('change', function(){
            const userAcces = Array.from(document.querySelectorAll('ul#users li input'))
                .filter(input=>input.checked)
                .map(el=>el.id)
            console.log(userAcces)
            socket.emit('grant acces', {
                user: document.querySelector("form#chat h2").textContent,
                acces: userAcces
            })
        })
    })
}

socket.on('chat message', function(chatobj){
    const node = document.createElement('li')
    const textNode = document.createTextNode(`${chatobj.user} saids: ${chatobj.msg}`)
    node.appendChild(textNode)
    document.querySelector('#messages').appendChild(node)
})

socket.on('set name', function(name){
    const element = `<ul id="users"></ul><ul id="messages"></ul><form id="chat" action=""><h2>${name}</h2><input id="m" autocomplete="off" /><button>Send</button></form>`
    document.body.insertAdjacentHTML('beforeend', element)
    nameDefined()
})

socket.on('users', function(names){
    const ul = document.querySelector("ul#users");
    if(ul !== null){
        if(typeof ul.firstChild !== "undefined"){
            removeElements(ul);
        }
        names.forEach(name=>{
            const element = `<li><input value='${name}' id='${name}' type='checkbox'><label for='${name}'>${name}</label></li>`
            ul.insertAdjacentHTML('beforeend',element)
        });
        addCheckboxEvents();
    }
})

// The function sendValuetoSocket has these parameters because an instance of a socket will be made if i pass the whole socket line as a parameter
function nameDefined(){
    sendValuetoSocket(
        '#chat',
        {
            socket              :   socket,
            customEvent         :   'chat message',
            offset              :   offset()
        })
}
