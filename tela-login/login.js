function logar(){

var login = document.getElementById('email').value;
var senha = document.getElementById('password').value;
if (login == "joaobreno@gmail.com" && senha == "12345"){
    alert('Sucesso');
    location.href ="/../mercado/lista.html";
}else{
    alert('Usuario ou senha incorretos')
}
 






}