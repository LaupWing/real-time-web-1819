(function(){
    const socket = io();
    document.querySelector('form')
        .addEventListener('submit', (e)=>{
            e.preventDefault();
            console.log(document.querySelector('#m').value)
            socket.emit('chat message', document.querySelector('#m').value);
            document.querySelector('#m').value = ''
        })
    socket.on('chat message', function(msg){
        const node = document.createElement('li')
        const textNode = document.createTextNode(msg)
        node.appendChild(textNode)
        document.querySelector('#messages').appendChild(node)
    })
}())