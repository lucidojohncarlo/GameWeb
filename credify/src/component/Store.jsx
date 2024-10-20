import React, { useContext } from 'react';
import Card from '../component/Card';
import axios from 'axios';
import { AuthContext } from '../component/AuthContext';

const items = [
    { image: '/images/GPU.png', amount: 10 },
    { image: '/images/Jersey.png', amount: 20 },
    { image: '/images/Keyboard.png', amount: 30 },
    { image: '/images/Laptop.png', amount: 40 },
    { image: '/images/Monitor.png', amount: 50 },
    { image: '/images/Mouse.png', amount: 60 },
];

const Store = () => {
    const { user, setUser } = useContext(AuthContext);

    const handleBuy = async (amount) => {
        if (user.points < amount) {
            alert('Insufficient points');
            return;
        }

        try {
            const response = await axios.post('http://localhost:5003/api/points/update', {
                email: user.email,
                points: -amount
            });

            if (response.data.success) {
                setUser({ ...user, points: user.points - amount });
                alert(`You bought an item for ${amount} points!`);
            } else {
                alert('Failed to update points');
            }
        } catch (error) {
            console.error('Error updating points:', error);
            alert('Failed to update points');
        }
    };

    return (
        <div className="store-page p-8 bg-dark text-white rounded-lg shadow-lg mt-16">
            <h2 className="text-3xl font-bold mb-6">Store</h2>
            <p>Welcome to the store! Here you can purchase various items.</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {items.map((item, index) => (
                    <Card
                        key={index}
                        image={item.image}
                        amount={item.amount}
                        onBuy={() => handleBuy(item.amount)}
                    />
                ))}
            </div>
        </div>
    );
};

export default Store;