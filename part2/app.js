// async function getCard() {
//     const res = await axios.get('https://deckofcardsapi.com/api/deck/new/')
//     deckId = res.data.deck_id
//     console.log(res.data)
//     const resp = await axios.get(`https://deckofcardsapi.com/api/deck/${deckId}/shuffle/`)
//     console.log(resp.data)
//     const response1 = await axios.get(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`)
//     console.log(response1.data)
//     console.log(`${response1.data.cards[0].value} of ${response1.data.cards[0].suit}`)
//     const response2 = await axios.get(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`)
//     console.log(response2.data)
//     console.log(`${response2.data.cards[0].value} of ${response2.data.cards[0].suit}`)
// }

// getCard()

// improved version of first two step

// async function getCard() {
//     try {
//         //create new deck
//         const res = await axios.get('https://deckofcardsapi.com/api/deck/new/');
//         const deckId = res.data.deck_id;

//         // shuffle the deck
//         const resp = await axios.get(`https://deckofcardsapi.com/api/deck/${deckId}/shuffle/`);

//         //Draw the first card
//         response1 = await axios.get(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`);
//         const card1 = response1.data.cards[0];
//         console.log(`First card: ${card1.value} of ${card1.suit}`);

//         //Draw the second card
//         response2 = await axios.get(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`);
//         const card2 = response2.data.cards[0];
//         console.log(`Second card: ${card2.value} of ${card2.suit}`);

//     } catch (e) {
//         console.log("Error fetching data from the Deck of Cards API:", e);
//     }
// }
// getCard();

document.addEventListener("DOMContentLoaded", function () {
    let deckId = null;
    let cardRemaining = 0;

    async function initializeDeck() {
        try {
            const res = await axios.get('https://deckofcardsapi.com/api/deck/new/');
            deckId = res.data.deck_id
            cardRemaining = res.data.remaining
            await axios.get(`https://deckofcardsapi.com/api/deck/${deckId}/shuffle/`);
        } catch (e) {
            console.log("Error creating the deck :", e)
        }
    }
    async function drawCard() {
        if (cardRemaining <= 0) {
            alert("No cards left in the deck!")
            return;
        }
        try {
            const res = await axios.get(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`);
            const card = res.data.cards[0]
            cardRemaining = res.data.remaining;

            displayCard(card);

            if (cardRemaining <= 0) {
                document.getElementById('draw-button').disabled = true;
            }
        } catch (e) {
            console.log("Error drawing a card:", e);
        }
    }

    function displayCard(card) {
        const cardDisplay = document.getElementById('card-container');
        const cardElement = document.createElement('div')
        cardElement.className = 'card';
        cardElement.innerHTML = `<img src="${card.image}" alt="${card.value} of ${card.suit}">`;


        const rotation = Math.random() * 30 - 15;
        const offsetX = Math.random() * 10;
        const offsetY = Math.random() * 10;

        cardElement.style.transform = `rotate(${rotation}deg) translate(${offsetX}px, ${offsetY}px)`;




        cardDisplay.appendChild(cardElement);

    }

    document.getElementById('draw-card').addEventListener('click', drawCard);


    initializeDeck();

});