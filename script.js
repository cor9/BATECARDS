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
                "Take a deep breath and do 10 jumping jacks! 🏃‍♀️",
                "Share your favorite memory from this week! 💭",
                "Do your best impression of your favorite animal! 🐾",
                "Name 5 things you're grateful for right now! 🙏"
            ],
            '2': [
                "Find someone and give them a genuine compliment! 💝",
                "Do 5 push-ups (or modified push-ups)! 💪",
                "Text someone you haven't talked to in a while! 📱",
                "Share an interesting fact you know! 🧠"
            ],
            '3': [
                "Dance for 30 seconds to your favorite song! 💃",
                "Write down 3 goals for tomorrow! ✍️",
                "Do a 1-minute plank (or as long as you can)! 🏋️‍♀️",
                "Tell everyone your favorite joke! 😂"
            ],
            '4': [
                "Do 10 squats while humming your favorite tune! 🎵",
                "Draw a quick doodle of how you're feeling! 🎨",
                "Share what superpower you'd want and why! 🦸‍♀️",
                "Organize one small area around you! 🧹"
            ],
            '5': [
                "Take 5 deep breaths and stretch your arms up high! 🧘‍♀️",
                "List 5 countries you'd love to visit! 🌍",
                "Do lunges for 30 seconds! 🏃‍♂️",
                "Share your dream job from when you were a kid! 👶"
            ],
            '6': [
                "Do 6 burpees (or modify as needed)! 💥",
                "Name your top 3 favorite movies and why! 🎬",
                "Practice balancing on one foot for 30 seconds! ⚖️",
                "Share the best advice you've ever received! 💡"
            ],
            '7': [
                "Do 7 different yoga poses (or stretches)! 🧘",
                "Share 7 words that describe you perfectly! 🏷️",
                "Do jumping jacks for 45 seconds! 🤸‍♀️",
                "Tell everyone about your favorite book or podcast! 📚"
            ],
            '8': [
                "Do mountain climbers for 30 seconds! 🏔️",
                "Share what you'd do with $1 million! 💰",
                "Practice your best dance move 8 times! 🕺",
                "Name 8 things that make you happy! 😊"
            ],
            '9': [
                "Do 9 sit-ups or crunches! 💪",
                "Share your most embarrassing but funny moment! 😅",
                "Hold a wall sit for 30 seconds! 🧱",
                "Describe your perfect day in detail! ☀️"
            ],
            '10': [
                "Do 10 high knees in place! 🦵",
                "Share 10 things on your bucket list! 📝",
                "Do arm circles for 30 seconds each direction! 🔄",
                "Tell everyone about your hidden talent! ⭐"
            ],
            'J': [
                "Be the DJ! Pick the next song everyone listens to! 🎧",
                "Lead everyone in a 2-minute meditation! 🧘‍♂️",
                "Teach someone something new you know! 👨‍🏫",
                "Do your best celebrity impression! 🌟"
            ],
            'Q': [
                "You're the Queen/King! Give everyone else a fun task! 👑",
                "Share your most valuable life lesson! 💎",
                "Lead a group exercise for 2 minutes! 👥",
                "Tell the story of your greatest achievement! 🏆"
            ],
            'K': [
                "You rule the kingdom! Create a new rule for the next 5 minutes! 🏰",
                "Share what advice you'd give your younger self! 🔮",
                "Lead everyone in your favorite warm-up routine! 🔥",
                "Describe what makes you feel most confident! 💪"
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


