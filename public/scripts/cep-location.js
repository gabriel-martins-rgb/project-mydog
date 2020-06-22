function searchCep() {

    const cep = document.querySelector("input[name=cep]")
    const address = document.querySelector("input[name=address]")
    const city = document.querySelector("input[name=city]")
    const uf = document.querySelector("input[name=uf]")
    const neighborhood = document.querySelector("input[name=neighborhood]")


    const cepValue = cep.value.replace(/\D/g, '')


    if (cepValue.length !== 8 || cepValue === "" || cepValue === "/^[0-9]{8}$/") {
        alert("Cep Inválido, preencha corretamente denovo")
        cep.value = ""
        address.value = ""
        city.value = ""
        uf.value = ""
        neighborhood.value = ""

    }
    else {

        fetch(`https://viacep.com.br/ws/${cepValue}/json/`)
            .then(res => res.json())
            .then(cities => {

                address.value = `${cities.logradouro}`
                city.value = `${cities.localidade}`
                uf.value = `${cities.uf}`
                neighborhood.value = `${cities.bairro}`

            })
        address.disabled = false
        city.disabled = false
        uf.disabled = false
        neighborhood.disabled = false
    }
}
document.querySelector("input[name=cep]").addEventListener("change", searchCep)




document.querySelector("#description").addEventListener("keyup", () => {
    const max = document.querySelector("#maxNumber")
    const description = document.querySelector("#description")
    const descriptionValue = description.value.length

    if (descriptionValue <= 300) {
        max.innerHTML = descriptionValue + "/" + 300
    }

})



