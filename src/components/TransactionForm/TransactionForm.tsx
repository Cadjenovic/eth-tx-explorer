import React, { useState } from "react";
import "./TransactionForm.css";

interface TransactionFormProps {
    onSubmit: (hash: string) => void;
}

const TransactionForm = ({ onSubmit }: TransactionFormProps) => {
    const [hash, setHash] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!hash) {
            alert("Please enter a valid Ethereum transaction hash.");
            return;
        }

        onSubmit(hash.trim());
    };

    return (
        <form className='tx-form' onSubmit={handleSubmit}>
            <label htmlFor='tx-hash'>Transaction Hash:</label>
            <input
                id='tx-hash'
                type='text'
                placeholder='0x...'
                value={hash}
                onChange={(e) => setHash(e.target.value)}
            />
            <button type='submit'>Explore</button>
        </form>
    );
};

export default TransactionForm;
