const socket = io();

// socket.on('countUpdated',(count) => {
//     console.log('Count has been updated:'+count);
// });

document.querySelector('#sendLocation').addEventListener('click',()=>{
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
        });
    });
});
socket.on('message',(message) => {
    const node = document.createElement("li");

    // Create a text node:
    const textnode = document.createTextNode(message);

    // Append the text node to the "li" node:
    node.appendChild(textnode);

    // Append the "li" node to the list:
    document.getElementById("messageList").appendChild(node);
});

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

