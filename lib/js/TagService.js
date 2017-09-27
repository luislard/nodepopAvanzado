const $ = require("jquery");

export default class TagService {

    constructor(url) {
        this.url = url;
    }

     // Obtener listado de tags
    list(successCallback, errorCallback) {
        $.ajax({
            url: this.url,
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

    // Crea un tag
    create(tag, successCallback, errorCallback) {
        $.ajax({
            url: this.url,
            method: "post",
            data: tag,
            success: successCallback,
            error: errorCallback
        })
    }

    // Obtener el detalle de tag
    getDetail(tagId, successCallback, errorCallback) {
        $.ajax({
            url: `${this.url}${tagId}`,
            success: successCallback,
            error: errorCallback
        })
    }

    // Actualizar una tag
    update(tag, successCallback, errorCallback) {
        $.ajax({
            url: `${this.url}${tag.id}`,
            method: "put",
            data: tag,
            success: successCallback,
            error: errorCallback
        })
    }

    // Borrar una tag (TagService.delete(4, response => {}, error => {}))
    delete(tagId, successCallback, errorCallback) {
        $.ajax({
            url: `${this.url}${tagId}`,
            method: 'delete', // método HTTP a utilizar
            success: successCallback,
            error: errorCallback
        })
    }

}