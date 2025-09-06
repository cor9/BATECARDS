class CardGame {
    constructor() {
        this.deck = this.createDeck();
        this.drawnCount = 0;
        this.instructions = this.createInstructions();
        this.gameMode = null; // 'group' or 'solo'
        this.initializeElements();
        this.bindEvents();
    }

    getCardImageName(value, suitName) {
        // Only return image names for cards we have (A, K, J)
        if (!['A', 'K', 'J'].includes(value)) {
            return null; // No image available
        }
        
        // Convert suit name to letter
        const suitLetter = {
            'hearts': 'h',
            'diamonds': 'd', 
            'spades': 's',
            'clubs': 'c'
        }[suitName];
        
        // Convert value to letter  
        const valueLetter = value.toLowerCase();
        
        return `${valueLetter}${suitLetter}.jpg`;
    }

    showTextCard(card) {
        // Fallback to original text display
        this.cardElement.innerHTML = `
            <div class="card-value">${card.value}</div>
            <div class="card-suit">${card.suit}</div>
        `;
    }

    createDeck() {
        const suits = ['♠', '♥', '♦', '♣'];
        const values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
        const suitNames = ['spades', 'hearts', 'diamonds', 'clubs'];
        
        let deck = [];
        // Create two complete decks (104 cards total)
        for (let deckNum = 0; deckNum < 2; deckNum++) {
            suits.forEach((suit, suitIndex) => {
                values.forEach(value => {
                    deck.push({
                        value: value,
                        suit: suit,
                        suitName: suitNames[suitIndex]
                    });
                });
            });
        }
        
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
        // Mode selection elements
        this.modeSelection = document.getElementById('modeSelection');
        this.gameScreen = document.getElementById('gameScreen');
        this.groupModeBtn = document.getElementById('groupMode');
        this.soloModeBtn = document.getElementById('soloMode');
        this.backToModeBtn = document.getElementById('backToMode');
        
        // Regular game elements
        this.cardElement = document.getElementById('card');
        this.cardValue = document.getElementById('cardValue');
        this.cardSuit = document.getElementById('cardSuit');
        this.instruction = document.getElementById('instruction');
        this.drawBtn = document.getElementById('drawBtn');
        this.cardCount = document.getElementById('cardCount');
        this.deckCount = document.getElementById('deckCount');
        
        // Overview elements
        this.gameOverview = document.getElementById('gameOverview');
        this.overviewTitle = document.getElementById('overviewTitle');
        this.overviewText = document.getElementById('overviewText');
        this.closeOverview = document.getElementById('closeOverview');
    }

    bindEvents() {
        // Mode selection events
        this.groupModeBtn.addEventListener('click', () => this.selectMode('group'));
        this.soloModeBtn.addEventListener('click', () => this.selectMode('solo'));
        this.backToModeBtn.addEventListener('click', () => this.backToModeSelection());
        
        // Regular game events
        this.drawBtn.addEventListener('click', () => this.drawCard());
        
        // Overview events
        this.closeOverview.addEventListener('click', () => this.closeGameOverview());
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
            // Update card display with image
            const cardImage = document.createElement('img');
            cardImage.src = `cards/${card.value.toLowerCase()}_${card.suitName}.png`;
            cardImage.alt = `${card.value} of ${card.suitName}`;
            cardImage.className = 'card-image';
            
            // Clear previous content and add image
            this.cardElement.innerHTML = '';
            this.cardElement.appendChild(cardImage);
            this.cardElement.className = `card ${card.suitName}`;
            this.cardElement.style.display = 'flex';

            // Get instruction for this card value based on game mode
            const instructions = this.instructions[card.value];
            let selectedInstruction;
            
            if (this.gameMode === 'group') {
                selectedInstruction = instructions[0]; // Group instruction
            } else if (this.gameMode === 'solo') {
                selectedInstruction = instructions[1]; // Solo instruction  
            }
            
            // Show instruction with delay
            setTimeout(() => {
                this.instruction.textContent = selectedInstruction;
                this.instruction.classList.remove('hidden');
                this.instruction.classList.add('visible');
            }, 200);

            // Update stats
            this.cardCount.textContent = this.drawnCount;
            this.deckCount.textContent = this.deck.length;

        }, 300);
    }

    selectMode(mode) {
        this.gameMode = mode;
        
        // Hide mode selection
        this.modeSelection.classList.add('hidden');
        
        // Show regular game screen
        this.gameScreen.classList.remove('hidden');
        this.gameScreen.classList.add('visible');
        
        // Apply theme class
        this.gameScreen.className = 'game-screen visible';
        if (mode === 'group') {
            this.gameScreen.classList.add('group-theme');
        } else if (mode === 'solo') {
            this.gameScreen.classList.add('solo-theme');
        }
        
        // Show appropriate overview
        this.showGameOverview(mode);
        
        // Update instruction text based on mode
        const modeText = mode === 'group' ? 'group' : 'solo';
        this.instruction.textContent = `Click "Draw Card" to get your first ${modeText} command!`;
    }

    backToModeSelection() {
        // Hide game screen and show mode selection
        this.gameScreen.classList.add('hidden');
        this.gameScreen.classList.remove('visible');
        this.modeSelection.classList.remove('hidden');
        
        // Reset game state
        this.deck = this.createDeck();
        this.drawnCount = 0;
        this.cardElement.style.display = 'none';
        this.cardCount.textContent = '0';
        this.deckCount.textContent = '104';
        this.gameMode = null;
    }

    // Overview Methods
    showGameOverview(mode) {
        this.overviewTitle.textContent = mode === 'group' ? 'Group Game Overview' : 'Solo Game Overview';
        
        // Apply theme class to overview
        this.gameOverview.className = 'game-overview';
        if (mode === 'group') {
            this.gameOverview.classList.add('group-theme');
        } else if (mode === 'solo') {
            this.gameOverview.classList.add('solo-theme');
        }
        
        // Apply theme class to header
        this.gameOverview.querySelector('.overview-header').className = 'overview-header';
        if (mode === 'group') {
            this.gameOverview.querySelector('.overview-header').classList.add('group-theme');
        } else if (mode === 'solo') {
            this.gameOverview.querySelector('.overview-header').classList.add('solo-theme');
        }
        
        // Overview content
        this.overviewText.innerHTML = `
            <p><strong>Game Mode:</strong> ${mode === 'group' ? 'Group' : 'Solo'}</p>
            <p><strong>How to Play:</strong></p>
            <ul>
                <li>Draw cards to get random commands</li>
                <li>Follow the instructions shown</li>
                <li>Have fun with friends or by yourself!</li>
            </ul>
            <p><strong>Instructions:</strong> Each card has a unique activity to keep things interesting!</p>
        `;
        
        this.gameOverview.style.display = 'block';
    }

    closeGameOverview() {
        this.gameOverview.style.display = 'none';
    }
}

// Initialize the game when page loads
document.addEventListener('DOMContentLoaded', () => {
    new CardGame();
});
