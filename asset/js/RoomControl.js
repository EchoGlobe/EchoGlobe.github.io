
import {createRoom , checkRoom} from "./firebase.js";
const name = document.getElementById("name");
const roomID = document.getElementById("roomID");
// Used for confirmation, to closing the window 

function showNotification(notify,message, success) {
  var notification = notify === 1?document.getElementById('notification1'):document.getElementById('notification');
  notification.innerHTML = message;
  notification.classList.remove('d-none');
  if (success === true) {
    notification.classList.remove('alert-danger');
    notification.classList.add('alert-info');
  } else {
    notification.classList.remove('alert-info');
    notification.classList.add('alert-danger');
  }
  setTimeout(function () {
    notification.classList.add('d-none');
  }, 2000);
}

const checkValue = () => {
return name.value !== "" && roomID.value !== "";
}

document.getElementById("createbtn").addEventListener("click",async ()=>{
    if (checkValue()) {
       const result = await createRoom(name.value,roomID.value);
       if (result === true){
        showNotification(0, "Done", true);
        location.href = `/Room/?type=create&name=${name.value}&roomid=${roomID.value}`;
       }else{
        showNotification(0, "Room not create", false);
       }
    } else {
    showNotification(0, "Name and RoomID Required", false);
    }
});

document.getElementById("joinbtm").addEventListener("click",async ()=>{
    if (checkValue()) {
        const result = await checkRoom(roomID.value);
       if (result === true){
        showNotification(0, "Done", true);
        location.href = `/Room/?type=join&name=${name.value}&roomid=${roomID.value}`;
       }else{
        showNotification(0, "Room not Avaiable", false);
       }
    } else {
    showNotification(0, "Name and RoomID Required", false);
    }
});





