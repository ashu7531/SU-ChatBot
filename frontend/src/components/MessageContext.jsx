import React, { createContext, useState } from 'react'
export const MessageContext = createContext();
export const MessageProvider = ({children}) => {
    const [messageList, setMessageList] = useState([]);
    const displayMessage = (message, sender) => {
        setMessageList((prevMessages) => [...prevMessages, {message, sender}]);
    };
    return (
        <MessageContext.Provider value = {{messageList, displayMessage}}>
            {children}
        </MessageContext.Provider>
    );
};
