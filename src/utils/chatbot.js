// ignore, using bot press chat bot

import React, { useState } from 'react';


const Chatbot = () => {

    const [message, setMessage] = useState([{ sender: "Pandao-ai", message: "hello! how can i help you" }]);
    const [chatOpen, setChatOpen] = useState(false);
    const [userInput, setUserInput] = useState('')


    const handleInputChange = (event) => {
        setUserInput(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (userInput.trim()) {
            const newMessage = [...message, { sender: 'user', message: userInput }]
            setMessage(newMessage)
            setUserInput('')
        }


    }

    const toggleChat = () => {
        setChatOpen(!chatOpen)
    }


    return (
        <>
           
        </>
    )
};

export default Chatbot;