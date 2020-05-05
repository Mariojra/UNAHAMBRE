document.addEventListener("DOMContentLoaded",()=>{
        if(sessionStorage.getItem('token') != undefined){
            document.getElementById('icon').style.display='none';
        }
    }
);