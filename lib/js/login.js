window.$ = window.jQuery = require("jquery"); // Hace jQuery accesible públicamente


const submitButton = $('#submit-button');
const email = $('#exampleInputEmail1');
const password = $('#exampleInputPassword1');

function saveTokenInLocalStorage(token){
    localStorage.setItem('nodepopAvanzado', token);
}

submitButton.on('click', function(e){
    e.preventDefault();
    var user = {    
        email: email[0].value,
        password: password[0].value
    };
    console.log('holaaaa has pinchado el submit');
    console.log('enviamos esta info', user);
    $.ajax({
            url: '/api/authenticate',
            method: "post",
            data: user,
            success: res => {
                console.log('success',res)
                if(res.ok === true){
                    saveTokenInLocalStorage(res.token);
                    window.location.href = '/';
                }else if(res.ok === false){
                    window.alert('Invalid Credentials');
                }
            },
            error: res => {console.log('error',res)}
        })
});

