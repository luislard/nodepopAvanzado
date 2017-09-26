const $ = require("jquery");

export default class TagService {

    constructor(url) {
        this.url = url;
    }

    // Obtener listado de tags
    list(queryString, successCallback, errorCallback) {
        $.ajax({
            url: this.url+queryString,
            success: successCallback,
            error: errorCallback
        });
    }

    // Crear o actualizar canción
    save(tag, successCallback, errorCallback) {
        if (tag.id) {
            this.update(tag, successCallback, errorCallback);
        } else {
            this.create(tag, successCallback, errorCallback);
        }
    }

    // Crear una cancion
    create(tag, successCallback, errorCallback) {
        $.ajax({
            url: this.url,
            method: "post",
            data: tag,
            success: successCallback,
            error: errorCallback
        })
    }

    // Obtener el detalle de canción
    getDetail(tagId, successCallback, errorCallback) {
        $.ajax({
            url: `${this.url}${tagId}`,
            success: successCallback,
            error: errorCallback
        })
    }

    // Actualizar una canción
    update(tag, successCallback, errorCallback) {
        $.ajax({
            url: `${this.url}${tag.id}`,
            method: "put",
            data: tag,
            success: successCallback,
            error: errorCallback
        })
    }

    // Borrar una canción (TagService.delete(4, response => {}, error => {}))
    delete(tagId, successCallback, errorCallback) {
        $.ajax({
            url: `${this.url}${tagId}`,
            method: 'delete', // método HTTP a utilizar
            success: successCallback,
            error: errorCallback
        })
    }

}