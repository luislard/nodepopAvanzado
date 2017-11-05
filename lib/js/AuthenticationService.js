const $ = require("jquery");

export default class AuthenticationService {

    constructor(url, apiUser) {
        this.url = url;
    }

    // Actualizar una canción
    // login(successCallback, errorCallback) {
    //     $.ajax({
    //         url: this.url,
    //         method: "post",
    //         data: {email: this.apiUser.email, password: this.apiUser.password},
    //         success: successCallback,
    //         error: errorCallback
    //     })
    // }
}