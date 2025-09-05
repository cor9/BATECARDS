class CardGame {
    constructor() {
        this.deck = this.createDeck();
        this.drawnCount = 0;
        this.instructions = this.createInstructions();
        this.initializeElements();
        this.bindEvents();
    }

    createDeck() {
        const suits = ['♠', '♥', '♦', '♣'];
        const values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
        const suitNames = ['spades', 'hearts', 'diamonds', 'clubs'];
        
        let deck = [];
        suits.forEach((suit, suitIndex) => {
            values.forEach(value => {
                deck.push({
                    value: value,
                    suit: suit,
                    suitName: suitNames[suitIndex]
                });
            });
        });
        
        return this.shuffleDeck(deck);
    }

    shuffleDeck(deck) {
        for (let i = deck.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [deck[i], deck[j]] = [deck[j], deck[i]];
        }
        return deck;
    }

    createInstructions() {
        return {
            'A': [
                "Circle jerk race - grab the cock of your bud on your left. Everyone has to jerk off. Person who drew the card is the first one to stop, then the next person on his left. The next person can’t stop until the guy before has stopped, and you have to go as fast as the first person jerking off.",
                "Cum now or pass  (only 3 passes allowed)"
            ],
            '2': [
                "Choose two buds to jerk each other off for 20 seconds",
                "Jerk fast for 30 seconds"
            ],
            '3': [
                "Jerk the guy to the right slow and steady for 30 seconds",
                "Jerk slow and steady for 30 seconds"
               
            ],
            '4': [
                "Choose another to edge with you and focus on cockhead for 20 seconds",
                "Edge your cockhead for 20 seconds"
            ],
            '5': [
                "Everyone jerks FAST and HARD for 20 seconds",
                "Jerk your dick fast and hard for 15 seconds"
            ],
            '6': [
                "Truth - choose someone to answer a truth of your choosing",
                "Wiggle penis, slap against hand 9 times"
            ],
            '7': [
                "Dare - choose someone to do a dare of your choosing",
                "On all fours, slap ass and jerk for 35 seconds medium pace"
            ],
            '8': [
                "Bate - start jerking and you can’t stop until the next 8 comes out",
                "Edge, Eat Precum"
            ],
            '9': [
                "Post a selfie - take a pic of your dick and upload it somewhere online",
                "Make a 30 second wank video"
            ],
            '10': [
                "Be a fitness instructor and give a command for two sets of ten (jumping jacks, situps, etc)",
                "10 jumping jacks and 2 edges"
            ],
            'J': [
                "Jerk off bud - whenever you have to jerk, your bud as too as well. Lasts until the next J is chosen.",
                "Corkscrew jerk for 20 seconds"
            ],
            'Q': [
                "Jerk off bitch - whenever you get chosen to jerk off your bitch has to do it instead. Lasts until the next Q is chosen",
                "Feather touch, slow movemenets of arousal"
            ],
            'K': [
                "Everyone except you has to jerk off for 10 seconds",
                "Your favorite stroke for 45 seconds"
            ]
        };
    }

    initializeElements() {
        this.cardElement = document.getElementById('card');
        this.cardValue = document.getElementById('cardValue');
        this.cardSuit = document.getElementById('cardSuit');
        this.instruction = document.getElementById('instruction');
        this.drawBtn = document.getElementById('drawBtn');
        this.cardCount = document.getElementById('cardCount');
        this.deckCount = document.getElementById('deckCount');
    }

    bindEvents() {
        this.drawBtn.addEventListener('click', () => this.drawCard());
    }

    drawCard() {
        if (this.deck.length === 0) {
            this.instruction.textContent = "🎉 Deck complete! Refresh to start over!";
            this.drawBtn.textContent = "Refresh Game";
            this.drawBtn.onclick = () => location.reload();
            return;
        }

        // Hide instruction temporarily
        this.instruction.classList.add('hidden');

        // Draw card
        const card = this.deck.pop();
        this.drawnCount++;

        // Animate card flip
        this.cardElement.classList.add('flip-animation');
        
        setTimeout(() => {
            // Update card display
            this.cardValue.textContent = card.value;
            this.cardSuit.textContent = card.suit;
            this.cardElement.className = `card ${card.suitName}`;
            this.cardElement.style.display = 'flex';

            // Get random instruction for this card value
            const possibleInstructions = this.instructions[card.value];
            const randomInstruction = possibleInstructions[Math.floor(Math.random() * possibleInstructions.length)];
            
            // Show instruction with delay
            setTimeout(() => {
                this.instruction.textContent = randomInstruction;
                this.instruction.classList.remove('hidden');
                this.instruction.classList.add('visible');
            }, 200);

            // Update stats
            this.cardCount.textContent = this.drawnCount;
            this.deckCount.textContent = this.deck.length;

        }, 300);
    }
}

// Initialize the game when page loads
document.addEventListener('DOMContentLoaded', () => {
    new CardGame();
});


