if (document.querySelector('.carousel')) {
    setTimeout(() => {
        swal.fire({
            title: 'No haz encontrado lo que buscas??',
            text: '!Pidenos un tour personalizado!',
            showCloseButton: 'true',
            confirmButtonText: '<a class="btnConfirm" href="pages/tourPersonalizado.html" target="_blank">Vamos!</a>'
        })
    }, 30000);
} else {
    setTimeout(() => {
        swal.fire({
            title: 'No haz encontrado lo que buscas??',
            text: '!Pidenos un tour personalizado!',
            showCloseButton: 'true',
            confirmButtonText: '<a class="btnConfirm" href="../pages/tourPersonalizado.html" target="_blank">Vamos!</a>'
        })
    }, 30000);
}