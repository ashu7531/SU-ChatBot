import React, { useContext, useState } from 'react';
import { MessageContext } from './MessageContext';
import './InputOutput.css'

function InputOutput() {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const { displayMessage } = useContext(MessageContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!input.trim()) {
            console.warn('Input is empty. No message sent.');
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/api/process', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ input }),
            });
            const data = await response.json();
            setOutput(data.output);
            displayMessage(input, 'user');

            setTimeout(() => displayMessage(data.output, 'bot'), 0);
            setInput('');
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="snd-msg">
            <div className="input-box">
                <input
                    className='input'
                    type="text"
                    placeholder="Ask your query..."
                    aria-label="User-Query"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />
            </div>
            <div className="input-btn">
                <button className='btn' onClick={handleSubmit}>Send</button>
            </div>
        </div>
    );
}

export default InputOutput;
