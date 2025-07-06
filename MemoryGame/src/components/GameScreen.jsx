import React, { useEffect, useState } from 'react';
import Card from './card';
function GameScreen({ difficulty, onRestart }) {
    const [clicks, setClicks] = useState(0);
    const [score, setScore] = useState(0);
    const [cards, setCards] = useState([]);
    const [firstCard, setFirstCard] = useState(null);
    const [secondCard, setSecondCard] = useState(null);
    const [isBusy, setIsBusy] = useState(false);

    useEffect(() => {
        const totalCards = difficulty === 'easy' ? 8 : difficulty === 'medium' ? 16 : 32;
        const pairs = totalCards / 2;
        let newCards = [];
        for (let i = 1; i <= pairs; i++) {
            newCards.push({ id: `${i}a`, value: i, flipped: false, matched: false });
            newCards.push({ id: `${i}b`, value: i, flipped: false, matched: false });
        }
        newCards.sort(() => Math.random() - 0.5);
        setCards(newCards);
        setClicks(0);
        setScore(0);
        setFirstCard(null);
        setSecondCard(null);
        setIsBusy(false);
    }, [difficulty]);
        
    useEffect(() => {
        if (!firstCard || !secondCard) return;

        setIsBusy(true);
        setClicks(prev => prev + 1);

        const timeout = setTimeout(() => {
            if (firstCard.value === secondCard.value) {
                setCards(prev =>
                    prev.map(c =>
                        c.value === firstCard.value ? { ...c, matched: true } : c
                    )
                );
                setScore(prev => prev + 1);
            } else {
                setCards(prev =>
                    prev.map(c =>
                        c.id === firstCard.id || c.id === secondCard.id
                            ? { ...c, flipped: false }
                            : c
                    )
                );
            }

            setFirstCard(null);
            setSecondCard(null);
            setIsBusy(false);
        }, 500 );

        return () => clearTimeout(timeout);
    }, [secondCard]);

    const handleCardClicked = (card) => {
        if (card.flipped || card.matched || isBusy) return;

        setCards(prev =>
            prev.map(c =>
                c.id === card.id ? { ...c, flipped: true } : c
            )
        );

        if (!firstCard) {
            setFirstCard(card);
        } else {
            setSecondCard(card);
        }
    };

    const gridCols = cards.length === 32 ? "grid-cols-8" : "grid-cols-4";

    return (
        <div className="w-full max-w-6xl mx-auto p-4 text-white">
            <div className="flex justify-between items-center mb-6">
                <button
                    onClick={onRestart}
                    className="bg-red-600 hover:bg-red-700 px-5 py-2 rounded-lg font-semibold shadow"
                >
                    Restart
                </button>
                <p className="text-lg font-medium">
                    Clicks: <span className="text-yellow-300">{clicks}</span> | Score: <span className="text-green-400">{score}</span>
                </p>
            </div>

            <div className={`grid ${gridCols} gap-4`}>
                {cards.map(card => (
                    <Card key={card.id} card={card}  onClick={handleCardClicked}/>
                ))}
            </div>
        </div>
    );
}

export default GameScreen;
