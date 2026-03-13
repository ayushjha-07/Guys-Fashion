// src/components/common/Chatbot.js
import React, { useState, useRef, useEffect } from 'react';
import './Chatbot.css';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      text: "Namaste! 🙏 Welcome to Guys Fashion!\n\nI'm your personal shopping assistant. I can help you with:\n\n• 👗 Browse Women's & Men's Collections\n• 📦 Track Your Orders\n• 💳 Payment Options (UPI, COD, Cards)\n• 🔄 Returns & Exchange Policy\n• 📏 Size Guide & Fitting Help\n• 💰 Current Offers & Discounts\n\nHow can I assist you today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [hasUnreadMessages, setHasUnreadMessages] = useState(true);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const quickReplies = [
    { text: '📦 Track Order', value: 'track_order' },
    { text: '👗 Women\'s Collection', value: 'women' },
    { text: '👔 Men\'s Collection', value: 'men' },
    { text: '💳 Payment & COD', value: 'payment' },
    { text: '🔄 Returns & Exchange', value: 'returns' },
    { text: '📏 Size Guide', value: 'size_guide' }
  ];

  const botResponses = {
    track_order: "You can track your order by visiting 'My Orders' in your profile. You'll receive tracking details via SMS and email once your order is shipped. Need help with a specific order?",
    women: "Explore our stunning Women's Collection! 👗\n• Ethnic Wear (Sarees, Kurtis, Anarkalis)\n• Western Wear (Jeans, Tops, Dresses)\n• Accessories & Jewelry\n\nPrices starting from ₹599! Visit /women to browse. What are you looking for?",
    men: "Check out our Men's Collection! 👔\n• Formal Wear (Shirts, Blazers, Trousers)\n• Casual Wear (T-shirts, Jeans, Polos)\n• Ethnic & Festive Wear\n\nPrices starting from ₹699! Visit /men to explore. Need any specific style?",
    payment: "We accept multiple payment options:\n• UPI (Google Pay, PhonePe, Paytm)\n• Credit/Debit Cards\n• Net Banking\n• Cash on Delivery (COD) - Available!\n• Wallets (Paytm, Amazon Pay)\n\nAll transactions are 100% secure with SSL encryption. Any payment questions?",
    returns: "Easy Returns & Exchange Policy:\n• 7-day return/exchange for unworn items with tags\n• Free pickup from your doorstep\n• Instant refund to original payment method\n• Exchange for different size/color available\n\nGo to 'My Orders' to initiate return. Need help?",
    size_guide: "Finding the perfect fit! 📏\n• Check our Size Guide page for detailed measurements\n• Each product has specific size charts\n• Indian standard sizing (S, M, L, XL, XXL)\n• For ethnic wear: Bust, Waist, Hip measurements\n\nWhat item are you looking for?",
    support: "Guys Fashion Customer Support:\n📧 Email: support@guysfashion.com\n📱 WhatsApp: +91 98765 43210\n📞 Call: 1800-123-4567 (Toll Free)\n⏰ Hours: Mon-Sat, 10AM-7PM IST\n\nYou can also use our Contact page. How can we assist you?",
    greeting: "Hello! Welcome to Guys Fashion! 👋 I'm here to help you discover amazing fashion at great prices. Ask me about our collections, offers, or anything else!",
    thanks: "You're most welcome! Happy to help! 😊 Is there anything else you'd like to know?",
    default: "I'm your Guys Fashion assistant! I can help with:\n• 👗 Women's & Men's Collections\n• 📦 Order Tracking\n• 💳 Payment Options (UPI, COD, Cards)\n• 🔄 Returns & Exchange\n• 📏 Size Guide\n• 💰 Current Offers\n\nWhat would you like to know?"
  };

  const getBotResponse = (userMessage) => {
    const message = userMessage.toLowerCase();
    
    if (message.includes('track') || message.includes('order') || message.includes('shipping')) {
      return botResponses.track_order;
    } else if (message.includes('new') || message.includes('arrival') || message.includes('latest')) {
      return botResponses.new_arrivals;
    } else if (message.includes('payment') || message.includes('pay') || message.includes('card')) {
      return botResponses.payment;
    } else if (message.includes('return') || message.includes('refund') || message.includes('exchange')) {
      return botResponses.returns;
    } else if (message.includes('size') || message.includes('fit') || message.includes('measurement')) {
      return botResponses.size_guide;
    } else if (message.includes('contact') || message.includes('support') || message.includes('help')) {
      return botResponses.support;
    } else if (message.includes('hi') || message.includes('hello') || message.includes('hey')) {
      return botResponses.greeting;
    } else if (message.includes('thank') || message.includes('thanks')) {
      return botResponses.thanks;
    } else if (message.includes('women') || message.includes('ladies') || message.includes('saree') || message.includes('kurti')) {
      return botResponses.women;
    } else if (message.includes('men') || message.includes('gents') || message.includes('shirt') || message.includes('formal')) {
      return botResponses.men;
    } else if (message.includes('price') || message.includes('cost') || message.includes('discount') || message.includes('offer')) {
      return "Amazing Deals & Offers! 🎉\n• Flat 50% OFF on select items\n• Buy 2 Get 1 Free on ethnic wear\n• Extra 10% OFF on prepaid orders\n• Free shipping on orders above ₹999\n\nSubscribe to our newsletter for exclusive offers! Looking for something specific?";
    } else if (message.includes('delivery') || message.includes('ship') || message.includes('cod')) {
      return "Delivery Options:\n• Standard Delivery: 5-7 business days (Free above ₹999)\n• Express Delivery: 2-3 business days (₹99)\n• Cash on Delivery (COD): Available (₹50 extra)\n• Free Returns & Exchange\n\nWe deliver pan-India! Where are you located?";
    } else if (message.includes('rupee') || message.includes('₹') || message.includes('inr')) {
      return "All our prices are in Indian Rupees (₹). We offer:\n• Products starting from ₹599\n• Easy EMI options available\n• Secure payment gateway\n• Multiple payment methods\n\nWhat's your budget? I can help you find the best options!";
    } else {
      return botResponses.default;
    }
  };

  const handleSendMessage = (messageText = null) => {
    const textToSend = messageText || inputMessage.trim();
    
    if (!textToSend) return;

    // Add user message
    const userMessage = {
      text: textToSend,
      sender: 'user',
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');

    // Show typing indicator
    setIsTyping(true);

    // Simulate bot thinking time
    setTimeout(() => {
      const botMessage = {
        text: getBotResponse(textToSend),
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleQuickReply = (value) => {
    const replyText = quickReplies.find(r => r.value === value)?.text || value;
    handleSendMessage(replyText);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      // Mark messages as read when opening chat
      setHasUnreadMessages(false);
    }
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  };

  return (
    <>
      {/* Chat Button */}
      <button 
        className={`chatbot-toggle ${isOpen ? 'open' : ''}`}
        onClick={toggleChat}
        aria-label="Toggle chat"
      >
        {isOpen ? (
          <i className="fas fa-times"></i>
        ) : (
          <>
            <i className="fas fa-comments"></i>
            {hasUnreadMessages && <span className="chat-badge">New</span>}
          </>
        )}
      </button>

      {/* Chat Window */}
      <div className={`chatbot-window ${isOpen ? 'open' : ''}`}>
        {/* Chat Header */}
        <div className="chatbot-header">
          <div className="chatbot-header-content">
            <div className="bot-avatar">
              <i className="fas fa-robot"></i>
            </div>
            <div className="bot-info">
              <h3>Guys Fashion Assistant</h3>
              <span className="bot-status">
                <span className="status-dot"></span>
                Always Here to Help!
              </span>
            </div>
          </div>
          <button className="minimize-btn" onClick={toggleChat}>
            <i className="fas fa-minus"></i>
          </button>
        </div>

        {/* Chat Messages */}
        <div className="chatbot-messages">
          {messages.map((message, index) => (
            <div 
              key={index} 
              className={`message ${message.sender}`}
            >
              {message.sender === 'bot' && (
                <div className="message-avatar">
                  <i className="fas fa-robot"></i>
                </div>
              )}
              <div className="message-content">
                <div className="message-bubble">
                  {message.text}
                </div>
                <span className="message-time">
                  {formatTime(message.timestamp)}
                </span>
              </div>
              {message.sender === 'user' && (
                <div className="message-avatar user">
                  <i className="fas fa-user"></i>
                </div>
              )}
            </div>
          ))}
          
          {isTyping && (
            <div className="message bot">
              <div className="message-avatar">
                <i className="fas fa-robot"></i>
              </div>
              <div className="message-content">
                <div className="message-bubble typing">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Replies */}
        {messages.length <= 2 && (
          <div className="quick-replies">
            <p className="quick-replies-label">Quick Actions:</p>
            <div className="quick-replies-grid">
              {quickReplies.map((reply, index) => (
                <button
                  key={index}
                  className="quick-reply-btn"
                  onClick={() => handleQuickReply(reply.value)}
                >
                  {reply.text}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Chat Input */}
        <div className="chatbot-input">
          <input
            type="text"
            placeholder="Type your message..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <button 
            className="send-btn"
            onClick={() => handleSendMessage()}
            disabled={!inputMessage.trim()}
          >
            <i className="fas fa-paper-plane"></i>
          </button>
        </div>

        {/* Powered By */}
        <div className="chatbot-footer">
          <span>Powered by Guys Fashion AI ✨</span>
        </div>
      </div>
    </>
  );
};

export default Chatbot;
