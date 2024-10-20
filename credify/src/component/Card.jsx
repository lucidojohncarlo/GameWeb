import React from 'react';
import '../css/card.css';
const Card = ({ image, amount, onBuy }) => {
    return (
        <div className="card bg-light text-white p-4 rounded-lg shadow-lg">
            <div className="image-container w-full h-32 flex items-center justify-center">
                <img src={image} alt="Item" className="image w-full h-full object-cover rounded" />
            </div>
            <div className="mt-4">
                <p className="text-lg font-bold">Amount: {amount}</p>
                <button onClick={onBuy} className="mt-2 px-4 py-2 bg-blue-500 text-white rounded">Buy</button>
            </div>
        </div>
    );
};

export default Card;