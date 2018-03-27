$(document).ready(()=>{
    modal();
});

function modal(){
    var modal = document.getElementById('mymodal');
    var close = document.getElementById('close');
    var connect = document.getElementById('connect-btn');
    modal.style.display = "block";
    connect.onclick = () => setUsername(modal,($("#username").val()));
    close.onclick = () => modal.style.display = "none";
    window.onclick = (e) => {
        if(e.target == modal){
            modal.style.display = "none";
        }
    }
}
