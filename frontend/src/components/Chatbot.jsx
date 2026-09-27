import { useState } from "react";

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([
        {
            sender: "bot",
            text: "Hi! 👋 I'm your Job Portal Assistant. How can I help you today?"
        }
    ]);
    const [loading, setLoading] = useState(false);

    const sendMessage = async () => {

        if (!message.trim() || loading) {
            return;
        }

        const userMessage = message.trim();

        // Add user's message
        setMessages((prev) => [
            ...prev,
            {
                sender: "user",
                text: userMessage
            }
        ]);

        setMessage("");
        setLoading(true);

        try {

            const token = localStorage.getItem("token");

            const response = await fetch(
                "http://localhost:8080/api/chatbot/message",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        message: userMessage
                    })
                }
            );

            if (!response.ok) {
                throw new Error("Failed to get chatbot response");
            }

            const botResponse = await response.text();

            setMessages((prev) => [
                ...prev,
                {
                    sender: "bot",
                    text: botResponse
                }
            ]);

        } catch (error) {

            console.error("Chatbot error:", error);

            setMessages((prev) => [
                ...prev,
                {
                    sender: "bot",
                    text: "Sorry, I couldn't connect to the Job Portal Assistant. Please try again."
                }
            ]);

        } finally {
            setLoading(false);
        }
    };

    const handleKeyDown = (event) => {

        if (event.key === "Enter") {
            event.preventDefault();
            sendMessage();
        }
    };

    return (
        <>
            {/* Floating Chat Button */}
            <button
                className="chatbot-floating-button"
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Open Job Assistant"
            >
                {isOpen ? "×" : "🤖"}
            </button>

            {/* Chat Window */}
            {isOpen && (
                <div className="chatbot-window">

                    {/* Header */}
                    <div className="chatbot-header">

                        <div className="chatbot-header-info">
                            <div className="chatbot-avatar">
                                🤖
                            </div>

                            <div>
                                <h3>Job Assistant</h3>
                                <span>
                                    ● Online
                                </span>
                            </div>
                        </div>

                        <button
                            className="chatbot-close"
                            onClick={() => setIsOpen(false)}
                        >
                            ×
                        </button>

                    </div>

                    {/* Messages */}
                    <div className="chatbot-messages">

                        {messages.map((msg, index) => (
                            <div
                                key={index}
                                className={`chatbot-message ${
                                    msg.sender === "user"
                                        ? "user-message"
                                        : "bot-message"
                                }`}
                            >
                                {msg.sender === "bot" && (
                                    <div className="message-avatar">
                                        🤖
                                    </div>
                                )}

                                <div className="message-bubble">
                                    {msg.text}
                                </div>
                            </div>
                        ))}

                        {/* Loading */}
                        {loading && (
                            <div className="chatbot-message bot-message">

                                <div className="message-avatar">
                                    🤖
                                </div>

                                <div className="message-bubble chatbot-typing">
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </div>

                            </div>
                        )}

                    </div>

                    {/* Input */}
                    <div className="chatbot-input-area">

                        <input
                            type="text"
                            placeholder="Ask about jobs..."
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            onKeyDown={handleKeyDown}
                            disabled={loading}
                        />

                        <button
                            onClick={sendMessage}
                            disabled={!message.trim() || loading}
                        >
                            ➤
                        </button>

                    </div>

                </div>
            )}
        </>
    );
};

export default Chatbot;