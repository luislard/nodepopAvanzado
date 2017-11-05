window.$ = window.jQuery = require("jquery"); // Hace jQuery accesible públicamente

import AdvertisementService from "./AdvertisementService";
import TagService from "./TagService";
import TagListManager from "./TagListManager";

const urlAnuncios = "/api/anuncios/";
// const authenticationService = new AuthenticationService("/api/authenticate");
const advertisementService = new AdvertisementService(urlAnuncios);
const tagService = new TagService("/apiv1/tags/");

const tagListManager = new TagListManager(".tags-list", tagService);
tagListManager.init();

$(document).ready(function(){

    const createButton = $('#create-button');
    const form = document.getElementById('form');

    createButton.on('click', ()=>{

        console.log(form);
        let formData = new FormData();
        console.log('recien creado',formData);
        formData.append('name', $('#name').val());
        formData.append('price', $('#price').val());
        formData.append('tags', $('#tags').val());
        formData.append('photo', $('#photo')[0].files[0]);
        formData.append('isSale', $('input[name="isSale"]:checked').val());
        console.log('despues de appends');
        // Display the key/value pairs
        for (var pair of formData.entries()) {
            console.log(pair); 
        }
        $.ajax({
            url: urlAnuncios,
            data: formData,
            type: 'POST',
            contentType: false, // NEEDED, DON'T OMIT THIS (requires jQuery 1.6+)
            processData: false, // NEEDED, DON'T OMIT THIS
            beforeSend: function(xhr){xhr.setRequestHeader('x-access-token', getToken());},
            success: res => {console.log(res)},
            error: res => {console.log('error',res)}

        });
    });

});

function getToken(){
    const token = localStorage.getItem('nodepopAvanzado');
    return token;
}

