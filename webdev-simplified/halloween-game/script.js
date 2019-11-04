class AudioController {
    constructor() {
        //A constructor is called onde we created an instance of an object.
        this.bgMusic = new Audio('Assets/Audios/creepy.mp3');
        this.victorySound = new Audio('Assets/Audios/victory.wav');
        this.gameOverSound = new Audio('Assets/Audios/gameOver.wav');
        this.flipSound = new Audio('Assets/Audios/flip.wav');
        this.matchSound = new Audio('Assets/Audios/match.wav');
        this.bgMusic.volume = 0.4;
        this.bgMusic.loop = true;
    }
    startMusic() {
        this.bgMusic.play();
    }
    stopMusic() {
        this.bgMusic.pause();
        this.bgMusic.currentTime = 0; //Now will play the music from the beginning
    }
    flip() {
        this.flipSound.play();
    }
    match() {
        this.matchSound.play();
    }
    victory() {
        this.stopMusic();
        this.victorySound.play();
    }
    gameOver() {
        this.stopMusic();
        this.gameOverSound.play();
    }
}

class MixOrMatch {
    constructor(totalTime, cards) {
        this.cardsArray = cards;
        this.totalTime = totalTime;
        this.timeRemaining = totalTime;
        this.timer = document.getElementById('time-remaining');
        this.ticker = document.getElementById('flips');
        this.audioController = new AudioController();
    }
    startGame() {
        this.cardToCheck = null; //The card which you try to match. If you miss then this back to null.
        this.totalClicks = 0;
        this.timeRemaining = this.totalTime;
        this.matchedCards = []; //That array will be used to check if all cards was matched
        this.busy = true; //A abstraction for some animation occurring or something like that

        setTimeout(() => {
            this.audioController.startMusic();
            this.shuffleCards(this.cardsArray);
            this.countDown = this.startCountDown();
            this.busy = false;
        }, 500);

        this.hideCards();
        this.timer.innerText = this.timeRemaining;
        this.ticker.innerText = this.totalClicks;
    }
    hideCards() {
        this.cardsArray.forEach(card => {
            card.classList.remove('visible');
            card.classList.remove('matched');
        });
    }
    flipCard(card) {
        if(this.canFlipCard(card)) {
            this.audioController.flip();
            this.totalClicks++;
            this.ticker.innerText = this.totalClicks;
            card.classList.add('visible');

            if(this.cardToCheck)
                this.checkForCardMatch(card);
            else
                this.cardToCheck = card;
        }
    }
    checkForCardMatch(card) {
        if(this.getCardType(card) === this.getCardType(this.cardToCheck))
            this.cardMatch(card, this.cardToCheck);
        else
            this.cardMisMatch(card, this.cardToCheck);
        
        this.cardToCheck = null;
    }
    cardMatch(card1, card2) {
        this.matchedCards.push(card1);
        this.matchedCards.push(card2);
        card1.classList.add('matched');
        card2.classList.add('matched');
        this.audioController.match();
        
        if(this.matchedCards.length === this.cardsArray.length)
            this.victory();
    }
    cardMisMatch(card1, card2) {
        this.busy = true;
        setTimeout(() => {
            card1.classList.remove('visible');
            card2.classList.remove('visible');
            this.busy = false;
        }, 1000);
    }
    getCardType(card) {
        return card.getElementsByClassName('card-value')[0].src;
    }
    startCountDown() {
        return setInterval(() => {
            this.timeRemaining--;
            this.timer.innerText = this.timeRemaining;
            if(this.timeRemaining === 0)
                this.gameOver();
        }, 1000);
    }
    gameOver() {
        clearInterval(this.countDown);
        this.audioController.gameOver();
        document.getElementById('game-over-text').classList.add('visible');
    }
    victory() {
        clearInterval(this.countDown);
        this.audioController.victory();
        document.getElementById('victory-text').classList.add('visible');
    }
    shuffleCards() { //We gonna be using the modern Fisher–Yates shuffle algorithm for that :)
        for(let i= this.cardsArray.length-1; i>0; i--) {
            let randIndex = Math.floor(Math.random() * (i+1));
            //Now lets play with CSS grid order property to shuffle the cars :)
            this.cardsArray[randIndex].style.order = i;
            this.cardsArray[i].style.order - randIndex;
        }
    }
    canFlipCard(card) {
        //When this.busy == True you can't flip a card
        //When you have flipped a card you can't flip it again
        //When you successful matches a pair you can't flip then till the game ends.
        
        return (!this.busy && !this.matchedCards.includes(card) && card !== this.cardToCheck);
    }
}

function main() {
    //Because HTML does not provide arrays, it provides collections.
    let overlays = Array.from(document.getElementsByClassName('overlay-text'));
    let cards = Array.from(document.getElementsByClassName('card'));
    let game = new MixOrMatch(120, cards);
    
    overlays.forEach(overlay => {
        overlay.addEventListener('click', () => {
            overlay.classList.remove('visible');
            game.startGame();
        })
    });
    cards.forEach(card => {
        card.addEventListener('click', () => {
            game.flipCard(card);
        })
    })
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', main());
}
else
{
    main();
}