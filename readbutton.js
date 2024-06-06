const readbutton = document.querySelector(".readbutton")
const fullarticle = document.querySelector(".fullarticle")
const buttonclose = document.querySelector(".fullarticle button")

readbutton.onclick = function () {
    fullarticle.showModal()
}


buttonclose.onclick = function () {
    fullarticle.close()
}