document.querySelector(".submit-button").onclick = function () { submitForm() };

const submitForm = () => {

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;

    const allFilled = name && email;

    if (allFilled) {
        console.log("tudo fillado")
        popoverMessage.style.opacity = '0';
        document.getElementById("name").value = ""
        document.getElementById("email").value = ""
        return
    }
    popoverMessage.style.opacity = '100';
}