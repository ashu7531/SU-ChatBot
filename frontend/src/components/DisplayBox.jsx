import React, { useContext, useEffect, useRef } from 'react';
import { MessageContext } from './MessageContext';
import './DisplayBox.css'

function DisplayBox() {
    const { messageList } = useContext(MessageContext);
    const messageEndRef = useRef(null); 

    
    useEffect(() => {
        messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messageList]);

    return (
        <div className='message-box'>
            {messageList.map((message, index) => (
                <div key={index} className={`message ${message.sender === 'user' ? 'user-message' : 'bot-message'}`}>
                    <p>{message.message}</p>
                </div>
            ))}
            <div ref={messageEndRef} />
        </div>
    );
}

export default DisplayBox;
