const alertMessages = []
alertMessages.push("I think you should take a closer look Mr. Wayne.")
alertMessages.push("Oh... so what you're saying is that Gotham is safe now?")
alertMessages.push("Don't silly me. You know where to find them. You're the Batman!")
alertMessages.push("Laaaaame... Laaaaame...")
alertMessages.push("Wait, look up there, is that a Bat-signal?")

let saveEl = document.getElementById("save-el")
let countEl = document.getElementById("count-el")
let count = 0
let timeTracker = 0

function increment() {
    updateCountEl(count + 1)
}

function save() {
    if (count === 0) {
        clearTimeout(timeTracker)
        showAlert()
        return
    }

    let countStr = count + " - "
    saveEl.textContent += countStr
    updateCountEl(0)
    hideAlert()
}

function updateCountEl(newCount) {
    count = newCount
    countEl.textContent = count
}

function showAlert(){
    var myAlert = document.getElementById("myAlert");
    var myAlertText = document.getElementById("myAlertText");

    myAlert.className = "show";

    var message = alertMessages[Math.floor(Math.random() * alertMessages.length)];
    console.log("line 41: " + message)
    myAlertText.textContent = message;

    timeTracker = setTimeout(function(){hideAlert(); }, 3000);
}
  
function hideAlert(){
    myAlert.className = myAlert.className.replace("show", "");
    clearTimeout(timeTracker)
}