# AI ChatBot Backend

A Node.js Express server providing AI-powered chat functionality with session management, conversation history, and document-based knowledge integration. Supports both OpenAI and Google Generative AI models.

## Features

- 🤖 **AI Integration** - Support for OpenAI GPT and Google Generative AI
- 💬 **Session Management** - Persistent chat sessions with unique IDs
- 📚 **Document Knowledge** - Integrate custom knowledge base from `docs.json`
- 🔐 **Security** - CORS protection and rate limiting
- 📊 **SQLite Database** - Lightweight persistent storage for sessions and messages
- ⚡ **RESTful API** - Clean, intuitive API endpoints
- 🛡️ **Production Ready** - Environment-based configuration with dotenv

## Prerequisites

- **Node.js** (v14 or higher)
- **npm** (v6 or higher)
- **API Keys** (OpenAI or Google Generative AI - at least one required)

## Installation

1. Navigate to the backend directory:

```bash
cd backend
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the backend root directory:

```bash
touch .env
```

4. Add your API keys to `.env`:

```env
OPENAI_API_KEY=your_openai_api_key_here
GOOGLE_API_KEY=your_google_api_key_here
```

**Note:** You need at least one API key (OpenAI or Google). Both can be set for fallback capability.

## Project Structure

```
backend/
├── src/
│   ├── controllers/
│   │   └── chatController.js      # Chat logic and AI integration
│   ├── routes/
│   │   └── chat.js                # API route definitions
│   ├── middlewares/
│   │   └── rateLimiter.js         # Rate limiting middleware
│   ├── utils/
│   │   └── promptBuilder.js       # Prompt construction utilities
│   ├── db.js                      # SQLite database setup
│   └── server.js                  # Express app configuration
├── public/
│   └── [static files]
├── docs.json                      # Knowledge base documents
├── database.sqlite                # SQLite database (auto-created)
├── package.json                   # Dependencies and scripts
└── README.md                      # This file
```

## Running the Server

### Development

Start the server with automatic reload (requires nodemon):

```bash
npm start
```

The server will run on `http://localhost:5000`

### Production

Run the server directly:

```bash
node src/server.js
```

## API Endpoints

### 1. Send Chat Message

**Endpoint:** `POST /api/chat`

**Description:** Send a message and receive an AI response

**Request Body:**

```json
{
  "sessionId": "unique-session-id",
  "message": "Your message here"
}
```

**Response:**

```json
{
  "reply": "AI assistant response"
}
```

**Status Codes:**

- `200` - Success
- `400` - Missing sessionId or message
- `500` - Server error

### 2. Get Conversation History

**Endpoint:** `GET /api/conversations/:sessionId`

**Description:** Retrieve all messages in a session

**Response:**

```json
[
  {
    "role": "user",
    "content": "Hello",
    "created_at": "2026-02-24T10:30:00Z"
  },
  {
    "role": "assistant",
    "content": "Hi! How can I help?",
    "created_at": "2026-02-24T10:30:05Z"
  }
]
```

**Status Codes:**

- `200` - Success
- `500` - Server error

### 3. Get All Sessions

**Endpoint:** `GET /api/sessions`

**Description:** Retrieve all active sessions

**Response:**

```json
[
  {
    "id": "session-id-1",
    "created_at": "2026-02-24T10:00:00Z",
    "updated_at": "2026-02-24T10:30:00Z"
  }
]
```

**Status Codes:**

- `200` - Success
- `500` - Server error

## Database Schema

### Sessions Table

```sql
CREATE TABLE sessions (
  id TEXT PRIMARY KEY,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
)
```

### Messages Table

```sql
CREATE TABLE messages (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  session_id TEXT,
  role TEXT,
  content TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
)
```

**Note:** Both tables are auto-created on first run.

## Configuration

### Environment Variables

Create a `.env` file in the backend root with the following variables:

**API Keys (at least one required):**

```env
OPENAI_API_KEY=sk-...your-key...
GOOGLE_API_KEY=...your-key...
```

**Server Configuration (optional):**

```env
PORT=5000
NODE_ENV=development
```

### Rate Limiting

Rate limiting is configured in [src/middlewares/rateLimiter.js](src/middlewares/rateLimiter.js):

- **Window:** 15 minutes
- **Max Requests:** 100 requests per IP
- **Response:** Status 429 (Too Many Requests)

To modify limits, edit the middleware file.

### Custom Knowledge Base

Edit [docs.json](docs.json) to add custom documents:

```json
[
  {
    "title": "Topic Name",
    "content": "Detailed information about the topic"
  }
]
```

The AI will reference these documents when responding to relevant queries.

## AI Integration

The backend supports two AI providers:

### OpenAI GPT

- Set `OPENAI_API_KEY` environment variable
- Requires OpenAI API key from [https://platform.openai.com](https://platform.openai.com)

### Google Generative AI

- Set `GOOGLE_API_KEY` environment variable
- Requires Google API key from [Google AI Studio](https://makersuite.google.com/app/apikey)

**Fallback Logic:** If both are configured, the system attempts OpenAI first, then falls back to Google.

## Core Components

### ChatController

Handles:

- Message processing and validation
- Session creation and management
- Document matching and knowledge integration
- AI model invocation
- Message persistence

### Prompt Builder

Constructs AI prompts with:

- Conversation history
- Document context
- Custom system instructions

### Database Layer

Manages:

- Session storage
- Message history
- Query optimization
- Auto-table creation

## Development Tips

1. **Monitor Logs** - Check console output for SQL and API errors
2. **Database Inspection** - Use SQLite browser to inspect `database.sqlite`
3. **API Testing** - Use Postman or curl to test endpoints:
   ```bash
   curl -X POST http://localhost:5000/api/chat \
     -H "Content-Type: application/json" \
     -d '{"sessionId":"test-123","message":"Hello"}'
   ```
4. **Environment Check** - Verify API keys are loaded correctly
5. **Rate Limit Testing** - Send 101+ requests within 15 minutes to test limits

## Troubleshooting

### "Cannot find module" errors

```bash
npm install
```

### Missing API Key Error

- Ensure `.env` file exists in backend root
- Verify `OPENAI_API_KEY` or `GOOGLE_API_KEY` is set
- Restart the server after adding keys

### Database Locked Error

- Close any other processes accessing `database.sqlite`
- Delete `database.sqlite` and restart (will be recreated)

### CORS Errors

- Verify frontend and backend URLs are correctly configured
- Check that CORS middleware is enabled in [src/server.js](src/server.js)

### Rate Limit Being Hit

- Check client sending excessive requests (>100 per 15 min)
- Modify rate limit settings in [src/middlewares/rateLimiter.js](src/middlewares/rateLimiter.js)

### "Port 5000 already in use"

```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# macOS/Linux
lsof -i :5000
kill -9 <PID>
```

## Dependencies

```json
{
  "@google/genai": "^1.42.0", // Google Generative AI
  "cors": "^2.8.6", // Cross-Origin Resource Sharing
  "dotenv": "^17.3.1", // Environment variable loading
  "express": "^5.2.1", // Web framework
  "express-rate-limit": "^8.2.1", // Rate limiting
  "openai": "^6.22.0", // OpenAI API client
  "sqlite3": "^5.1.7", // SQLite database
  "uuid": "^13.0.0" // Unique ID generation
}
```

## API Usage Example

```javascript
// Example: Sending a message
const response = await fetch("http://localhost:5000/api/chat", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    sessionId: "user-session-123",
    message: "What is your refund policy?",
  }),
});

const { reply } = await response.json();
console.log(reply);
```

## Performance Considerations

- **Database**: SQLite is suitable for small to medium deployments. Consider PostgreSQL for production at scale
- **Message History**: Only last 10 messages are fetched per request for performance
- **Rate Limiting**: 100 requests per 15 minutes is conservative; adjust based on needs
- **API Costs**: Monitor OpenAI/Google Generative AI usage for billing implications

## Security Best Practices

1. ✅ Never commit `.env` file to version control
2. ✅ Use environment variables for all sensitive data
3. ✅ Keep API keys confidential and rotate regularly
4. ✅ Enable CORS only for trusted domains in production
5. ✅ Monitor rate limits to prevent abuse
6. ✅ Validate all incoming request data

## Deployment

### Heroku

```bash
heroku create your-app-name
heroku config:set OPENAI_API_KEY=your_key_here
git push heroku main
```

### Railway, Render, Others

Follow platform-specific guides and set environment variables through the dashboard.

## Logs and Debugging

All logs are printed to console:

- Database connection status
- HTTP request details
- Rate limiter blocks
- API errors

For production, consider integrating a logger like Winston or Pino.

## License

This project is part of the AI ChatBot application.

## Support

For issues or questions, please refer to the main project repository or contact the development team.

## Related Documentation

- [Frontend README](../frontend/README.md)
- [OpenAI API Docs](https://platform.openai.com/docs)
- [Google Generative AI Docs](https://ai.google.dev/docs)
- [Express.js Guide](https://expressjs.com)
- [SQLite Documentation](https://www.sqlite.org/docs.html)
