# AI ChatBot

A full-stack AI-powered chat application with a React frontend and Node.js backend. Chat with an AI assistant using OpenAI or Google Generative AI integration.

## Quick Start

### Prerequisites
- Node.js (v14+)
- npm (v6+)
- OpenAI or Google Generative AI API key

### Setup & Run

**1. Backend Setup**
```bash
cd backend
npm install

# Create .env file and add your API key
# OPENAI_API_KEY=your_key_here
# OR
# GOOGLE_API_KEY=your_key_here

npm start
# Server runs on http://localhost:5000
```

**2. Frontend Setup** (in a new terminal)
```bash
cd frontend
npm install
npm start
# App opens at http://localhost:3000
```

That's it! The chat interface should be ready to use.

---

## Project Structure

```
AI-ChatBot/
├── frontend/                  # React chat interface
│   ├── src/
│   │   ├── components/       # ChatWindow, InputBox, Message
│   │   ├── services/         # API communication
│   │   ├── utils/            # Session management
│   │   ├── App.js            # Main app
│   │   └── index.js
│   ├── public/
│   ├── package.json
│   └── README.md
│
├── backend/                   # Node.js server
│   ├── src/
│   │   ├── controllers/      # Chat logic & AI integration
│   │   ├── routes/           # API routes
│   │   ├── middlewares/      # Rate limiting
│   │   ├── utils/            # Prompt builder
│   │   ├── db.js             # SQLite database
│   │   └── server.js         # Express app
│   ├── docs.json             # Knowledge base
│   ├── database.sqlite       # Auto-created database
│   ├── package.json
│   └── README.md
│
└── README.md                 # This file
```

---

## Frontend Features

✅ Real-time chat interface  
✅ Session persistence across page refreshes  
✅ Auto-scrolling to latest messages  
✅ Loading indicators  
✅ Responsive Tailwind CSS design  
✅ UUID-based session tracking  

### Frontend Key Files

- **App.js** - Main component managing state and API calls
- **ChatWindow.js** - Displays messages with auto-scroll
- **InputBox.js** - Message input and send button
- **Message.js** - Individual message bubbles
- **services/api.js** - Backend API communication
- **utils/session.js** - Session ID generation & storage

### Frontend Stack

- React 19
- Tailwind CSS 3
- Axios (HTTP client)
- UUID (unique IDs)

---

## Backend Features

✅ OpenAI GPT & Google Generative AI support  
✅ Session-based conversations  
✅ SQLite message storage  
✅ Document-based knowledge base  
✅ Rate limiting (100 req/15min)  
✅ CORS enabled  
✅ Environment-based configuration  

### Backend API Endpoints

**POST /api/chat** - Send message and get AI response
```json
Request: { "sessionId": "xxx", "message": "Hello" }
Response: { "reply": "Hi! How can I help?" }
```

**GET /api/conversations/:sessionId** - Get conversation history
```json
Response: [
  { "role": "user", "content": "...", "created_at": "..." },
  { "role": "assistant", "content": "...", "created_at": "..." }
]
```

**GET /api/sessions** - Get all sessions
```json
Response: [{ "id": "...", "created_at": "...", "updated_at": "..." }]
```

### Backend Stack

- Express.js
- SQLite3
- OpenAI API
- Google Generative AI
- Rate Limiter
- CORS

---

## Configuration

### Environment Variables (.env in backend/)

**Required:**
```env
OPENAI_API_KEY=sk-...        # OR
GOOGLE_API_KEY=...
```

**Optional:**
```env
PORT=5000
NODE_ENV=development
```

### Custom Knowledge Base

Edit `backend/docs.json` to add custom documents:

```json
[
  {
    "title": "Refund Policy",
    "content": "Refunds are allowed within 7 days of purchase."
  }
]
```

The AI references these when answering relevant questions.

---

## Database

SQLite database auto-created at `backend/database.sqlite`

**Sessions table** - Stores chat sessions  
**Messages table** - Stores conversation messages  

Tables auto-created on first run.

---

## Available Commands

### Frontend
```bash
cd frontend
npm start          # Development server
npm run build      # Production build
npm test           # Run tests
```

### Backend
```bash
cd backend
npm start          # Start server
node src/server.js # Direct run
```

---

## Common Issues & Solutions

### Backend won't start
- Check `.env` file exists with API key
- Verify API key is valid
- Try different port: `PORT=5001 npm start`

### API Connection Errors
- Ensure backend is running on port 5000
- Check browser console for error details
- Verify `services/api.js` has correct backend URL

### Rate Limited
- API limits to 100 requests per 15 minutes
- Wait 15 minutes or increase limit in `src/middlewares/rateLimiter.js`

### Port Already in Use
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# macOS/Linux
lsof -i :5000
kill -9 <PID>
```

---

## Deployment

### Heroku (Backend)
```bash
heroku create your-app-name
heroku config:set OPENAI_API_KEY=your_key
git push heroku main
```

### Vercel (Frontend)
```bash
npm install -g vercel
vercel
```

### Other Platforms
Set environment variables through platform dashboard and deploy accordingly.

---

## How It Works

1. **User sends message** from React frontend
2. **Frontend calls** POST `/api/chat` with sessionId & message
3. **Backend receives** request and validates input
4. **Backend creates session** if new, saves user message
5. **Backend fetches** last 10 messages for context
6. **Backend checks** knowledge base (docs.json) for matching docs
7. **Backend calls** OpenAI/Google AI with:
   - Conversation history
   - Document context
   - User message
8. **AI returns** response
9. **Backend saves** AI message to database
10. **Backend returns** reply to frontend
11. **Frontend displays** message and auto-scrolls

---

## Technologies Used

**Frontend:**
- React 19
- Tailwind CSS
- Axios
- UUID

**Backend:**
- Node.js
- Express
- SQLite3
- OpenAI SDK
- Google Generative AI SDK

---

## Security Notes

✅ API keys stored in `.env` (never in code)  
✅ CORS enabled for frontend domain  
✅ Rate limiting to prevent abuse  
✅ Input validation on backend  
✅ Session IDs are UUIDs (unpredictable)  

**Production Tips:**
- Use environment variables for all secrets
- Enable HTTPS
- Set strict CORS origins
- Monitor API usage
- Implement user authentication

---

## File-by-File Guide

### Key Frontend Files

**src/App.js** - State management, API calls, message handling
**src/components/ChatWindow.js** - Message display with auto-scroll
**src/components/InputBox.js** - Input field and send button
**src/services/api.js** - Axios instance and API calls
**src/utils/session.js** - Session ID generation

### Key Backend Files

**src/server.js** - Express app setup, middleware, port
**src/db.js** - SQLite database initialization
**src/controllers/chatController.js** - Message processing, AI calls
**src/routes/chat.js** - Route definitions
**src/middlewares/rateLimiter.js** - Rate limiting config
**docs.json** - Knowledge base documents

---

## Customization

### Change AI Model
Edit `backend/src/controllers/chatController.js` to use different models from OpenAI or Google.

### Adjust Rate Limits
Edit `backend/src/middlewares/rateLimiter.js`:
```javascript
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,  // Time window
  max: 100,                   // Max requests
});
```

### Update UI Design
Edit Tailwind classes in React components or `tailwind.config.js`

### Add Features
- User authentication
- Message search
- Typing indicators
- Image support
- Voice input

---

## Testing

### Frontend
```bash
cd frontend
npm test
```

### Backend
Add test files and use Jest/Mocha:
```bash
cd backend
npm test
```

---

## Performance Tips

- Frontend caches session ID in localStorage
- Backend fetches only last 10 messages per request
- Tailwind CSS is tree-shaken in production
- SQLite is efficient for small datasets
- Rate limiting prevents server overload

---

## License

This project is open source and available under the ISC license.

---

## Next Steps

1. **Setup** - Follow Quick Start section above
2. **Customize** - Edit docs.json with your knowledge base
3. **Deploy** - Use Heroku, Vercel, or Railway
4. **Enable Auth** - Add user authentication if needed
5. **Monitor** - Track API usage and costs

---

## Support & Resources

- [React Documentation](https://react.dev)
- [Express Guide](https://expressjs.com)
- [OpenAI API](https://platform.openai.com/docs)
- [Google Generative AI](https://ai.google.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [SQLite Docs](https://www.sqlite.org)

---

**Version:** 1.0.0  
**Last Updated:** February 24, 2026  
**Status:** Production Ready ✅
