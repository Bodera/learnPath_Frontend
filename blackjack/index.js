let player = {
    name: String,
    chips: Number
}

let cards = []
let sum = 0
let hasBlackJack = false
let isAlive = false
let message = ""
let messageEl = document.getElementById("message-el")
let sumEl = document.getElementById("sum-el")
let cardsEl = document.getElementById("cards-el")
let playerEl = document.getElementById("player-el")

/**
 * Returns a random card value between 1 and 11.
 * - If the random number is 1, it returns 11 (Ace).
 * - If the random number is 11, 12, or 13, it returns 10 (Jack, Queen, King).
 * - Otherwise, it returns the random number itself (2-10).
 */
function getRandomCard() {
    let randomNumber = Math.floor( Math.random()*13 ) + 1
    if (randomNumber > 10) {
        return 10
    } else if (randomNumber === 1) {
        return 11
    } else {
        return randomNumber
    }
}


/**
 * Starts a new game of Blackjack by prompting the user for their name,
 * setting the player's starting chip count to 200, resetting the game state,
 * shuffling the deck, and drawing two cards.
 */
function newGame() {
    let player_name = prompt("What's your name?")
    if (!player_name) return

    player.name = player_name
    player.chips = 200

    sum = 0
    cards = []

    shuffleDeck()
    isAlive = true
}


/**
 * Updates the UI to reflect the current game state:
 * - It renders the current cards and their sum.
 * - It determines the player's status (alive or dead) based on the sum.
 * - It renders an appropriate message for the player.
 * - It updates the player's chip count accordingly.
 * - It calls renderPlayer to update the player's UI.
 */
function renderGame() {

    cardsEl.textContent = "Cards: "
    for (let i = 0; i < cards.length; i++) {
        cardsEl.textContent += cards[i] + " "
    }
    
    sumEl.textContent = "Sum: " + sum
    if (sum <= 20) {
        message = "Do you want to draw a new card?"
    } else if (sum === 21) {
        message = "You've got Blackjack!"
        hasBlackJack = true
        isAlive = false
        player.chips += 100
    } else {
        message = "You're out of the game!"
        isAlive = false
        player.chips -= 50
    }
    messageEl.textContent = message
    renderPlayer()
}


/**
 * Draws a new card from the deck and adds it to the current hand.
 * It also updates the UI to reflect the new game state.
 * If the player has Blackjack, it will not draw a new card.
 * If the player is out of the game, it will not draw a new card.
 */
function newCard() {
    if (isAlive && !hasBlackJack) {
        let card = getRandomCard()
        sum += card
        cards.push(card)
        renderGame()
    }
}


/**
 * Updates the player's UI to reflect their current chip count.
 * If the player's chip count is less than or equal to 0, it sets the chip count to 0.
 */
function renderPlayer() {
    if (player.chips <= 0) {
        player.chips = 0
    }
    playerEl.textContent = player.name + ": $" + player.chips
}


/**
 * Shuffles the deck and deals two new cards to the player.
 * It only runs if the player is not currently in a game and has a positive chip count.
 * It resets the game state and updates the UI to reflect the new game state.
 */
function shuffleDeck() {
    if (!isAlive && player.chips > 0) {
        let firstCard = getRandomCard()
        let secondCard = getRandomCard()
        cards = [firstCard, secondCard]
        sum = firstCard + secondCard
        isAlive = true
        hasBlackJack = false
    
        renderGame()
        renderPlayer()
    }
}