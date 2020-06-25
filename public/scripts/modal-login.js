const button = document.querySelector(".content header #modalbutton")
const LoginM = document.querySelector("#modalLogin")
const cLogin = document.querySelector("#modalLogin .content .header a")

button.addEventListener("click", () => {
    
    LoginM.classList.remove("hide")
})

cLogin.addEventListener("click", () => {
    LoginM.classList.add("hide")
})

/*document.querySelector("#modalLogin .content #form2").addEventListener("submit", (event)=>{
var valueModal = document.querySelector("#modalLogin .content form .field input[name=code]").value

valueModal = valueModal



console.log(valueModal)
event.preventDefault();

})
*/