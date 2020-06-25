const buttonSearch = document.querySelector(".content main #btn")
const modal = document.querySelector("#modal")
const close = document.querySelector("#modal .content .header a")

buttonSearch.addEventListener("click", () => {
    modal.classList.remove("hide")
})

close.addEventListener("click", () => {
    modal.classList.add("hide")
})
