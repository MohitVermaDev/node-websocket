const socket = io();



document.querySelector('#sendLocation').addEventListener('click',(e)=>{
    e.preventDefault();
    document.querySelector('#sendLocation').setAttribute('disabled','disabled')
    if(!navigator.geolocation){
        return alert('geolocation is not supported by your browser');
    }
    navigator.geolocation.getCurrentPosition((position)=>{
        let latitude = position.coords.latitude;
        let longitude = position.coords.longitude;
        
        socket.emit('sendLocation',{
            latitude : latitude,
            longitude: longitude
        },() => {
            console.log('location shared');
            document.querySelector('#sendLocation').removeAttribute('disabled')
        });
    });
});
socket.on('message',(message) => {
    const node = document.querySelector("#message-template").innerHTML;
    const html = Mustache.render(node,{
        message
    });
    document.getElementById("messageList").insertAdjacentHTML('beforeend',html);
    // Create a text node:
    // const textnode = document.createTextNode(message);

    // // Append the text node to the "li" node:
    // node.appendChild(textnode);

    // // Append the "li" node to the list:
    // document.getElementById("messageList").appendChild(node);
});
socket.on('locationMessage',(url)=>{
    const node = document.querySelector("#location-template").innerHTML;
    const html = Mustache.render(node,{
        url
    });
    document.getElementById("messageList").insertAdjacentHTML('beforeend',html);
})
document.querySelector('#sendMessage').addEventListener('submit',(e)=>{
    e.preventDefault();
    let message = document.querySelector('#message').value;
    document.querySelector('#message').value = '';
    socket.emit('sendMessage',message,(error)=>{
        if(error){
            alert(error);
            return;
        }
    });
});

