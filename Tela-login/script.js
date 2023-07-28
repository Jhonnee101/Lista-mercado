function logar(){

var login = document.getElementById('email').value;
var senha = document.getElementById('password').value;
if (login == "joaobreno@gmail.com" && senha == "admin"){
    alert('Sucesso');
    location.href = "lista-mercado/lista-mercado.html";
}else{
    alert('Usuario ou senha incorretos')
}
 






}