const $ = require("jquery");

export default class AdvertisementService {

    constructor(url, token) {
        this.url = url;
    }

    // Obtener listado de advertisements
    list(queryString, successCallback, errorCallback) {
        const self = this;
        $.ajax({
            url: this.url+queryString,
            beforeSend: function(xhr){xhr.setRequestHeader('x-access-token', self.getToken());},
            success: successCallback,
            error: errorCallback
        });
    }

    // Crear o actualizar canción
    save(advertisement, successCallback, errorCallback) {
        if (advertisement.id) {
            this.update(advertisement, successCallback, errorCallback);
        } else {
            this.create(advertisement, successCallback, errorCallback);
        }
    }

    // Crear una cancion
    create(advertisement, successCallback, errorCallback) {
        $.ajax({
            url: this.url,
            method: "post",
            data: advertisement,
            success: successCallback,
            error: errorCallback
        })
    }

    // Obtener el detalle de canción
    getDetail(advertisementId, successCallback, errorCallback) {
        $.ajax({
            url: `${this.url}${advertisementId}`,
            success: successCallback,
            error: errorCallback
        })
    }

    // Actualizar una canción
    update(advertisement, successCallback, errorCallback) {
        $.ajax({
            url: `${this.url}${advertisement.id}`,
            method: "put",
            data: advertisement,
            success: successCallback,
            error: errorCallback
        })
    }

    // Borrar una canción (AdvertisementService.delete(4, response => {}, error => {}))
    delete(advertisementId, successCallback, errorCallback) {
        $.ajax({
            url: `${this.url}${advertisementId}`,
            method: 'delete', // método HTTP a utilizar
            success: successCallback,
            error: errorCallback
        })
    }

    getToken(){
        const token = localStorage.getItem('nodepopAvanzado');
        return token;
    }

}