
function spinner(idContentButton, spinnerTime) {
    document.getElementById(`${idContentButton}`).style.display = 'none'

    document.getElementById('spinner').style.display = 'block'
    
    setTimeout(() => { 
        document.getElementById('spinner').style.display = 'none'
        document.getElementById(`${idContentButton}`).style.display = 'block'
    }, spinnerTime);
}
