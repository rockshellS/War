
let deckId
let computerScore = 0
let myScore = 0
const computerScoreEl = document.querySelector(".computer-score")
const myScoreEl = document.querySelector(".my-score")
const winner = document.querySelector(".winner")

const handleClick = () => {
    fetch("https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/")
        .then(res => res.json())
        .then(cards => {
            deckId = cards.deck_id
            document.querySelector(".number-cards").textContent = `New Deck ${cards.remaining}`
            console.log(cards)
        })
}
document.querySelector(".new-deck-btn").addEventListener("click", handleClick)
document.querySelector(".draw-btn").addEventListener("click", () => {
    fetch(`https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`)
        .then(res => res.json())
        .then(card => {
            console.log(card)
            document.querySelector(".card-image").children[0].innerHTML = `
                <img src=${card.cards[0].image} class="card" />
                
            `
            document.querySelector(".card-image").children[1].innerHTML = `
                <img src=${card.cards[1].image} class="card" />
                
            `
            const winnerText = determineCardWinner(card.cards[0], card.cards[1])
            winner.innerHTML = winnerText
            document.querySelector(".number-cards").innerHTML = `Cards Remaining: ${card.remaining}`
            
            if (card.remaining === 0 ) {
                document.querySelector(".draw-btn").disabled = true
                if(computerScore > myScore) {
                    winner.textContent = "Computer won the game!!"
                }else if (myScore > computerScore) {
                    winner.textContent = " I won the game!!"
                }else {
                    winner.textContent = " It's a tie!!"
                }
            }
            
        })
})


const determineCardWinner = (card1,card2) => {
    const valueOptions = ["2", "3", "4", "5", "6", "7", "8", "9", 
    "10", "JACK", "QUEEN", "KING", "ACE"]
    const card1ValueIndex = valueOptions.indexOf(card1.value) // this will pick the index of the card so we then can compare the indexes 
    const card2ValueIndex = valueOptions.indexOf(card2.value)

        if(card1ValueIndex > card2ValueIndex) {
            computerScore++
            computerScoreEl.textContent = ` Computer Score: ${computerScore}`
            return "Computer wins!"
        }else if (card1ValueIndex < card2ValueIndex) {
            myScore++
            myScoreEl.textContent = ` My Score: ${myScore}`
            return "I Win!"
        }else{
            return "WAR!!"
        }
    }
     

const card1Obj = {
    value: "ACE"
}
const card2Obj = {
    value: "ACE"
}

determineCardWinner(card1Obj, card2Obj)