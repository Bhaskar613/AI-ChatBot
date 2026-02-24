# AI ChatBot Frontend

A modern React-based chat interface for interacting with an AI assistant. Built with React 19, Tailwind CSS, and Axios for seamless communication with the backend API.

## Features

- 💬 **Real-time Chat Interface** - Send and receive messages from the AI assistant
- 📱 **Responsive Design** - Beautiful UI that works on desktop and mobile devices
- 💾 **Session Management** - Persistent conversation history across sessions
- ⚡ **Fast & Lightweight** - Optimized performance with React and Tailwind CSS
- 🎨 **Modern Styling** - Clean, intuitive UI with smooth animations
- 🔄 **Auto-scroll** - Chat window automatically scrolls to the latest messages
- ⏱️ **Message Timestamps** - Display when each message was sent

## Prerequisites

- **Node.js** (v14 or higher)
- **npm** (v6 or higher)

## Installation

1. Navigate to the frontend directory:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

## Project Structure

```
frontend/
├── public/
│   ├── index.html          # Main HTML file
│   ├── manifest.json       # PWA manifest
│   └── robots.txt
├── src/
│   ├── components/         # React components
│   │   ├── ChatWindow.js   # Main chat display area
│   │   ├── InputBox.js     # Message input field
│   │   └── Message.js      # Individual message component
│   ├── services/
│   │   └── api.js          # API communication
│   ├── utils/
│   │   └── session.js      # Session management utilities
│   ├── App.js              # Main app component
│   ├── App.css             # App styles
│   ├── index.js            # React entry point
│   └── index.css           # Global styles
├── package.json            # Dependencies and scripts
├── tailwind.config.js      # Tailwind CSS configuration
└── README.md               # This file
```

## Available Scripts

### Development

Start the development server with hot reload:

```bash
npm start
```

The app will open automatically at [http://localhost:3000](http://localhost:3000)

### Build

Create an optimized production build:

```bash
npm run build
```

Output is placed in the `build/` directory, ready for deployment.

### Testing

Run tests in watch mode:

```bash
npm test
```

### Eject (Advanced)

⚠️ **Warning**: This is a one-way operation. Only run if you need full control over webpack configuration:

```bash
npm run eject
```

## Component Overview

### ChatWindow

Displays the conversation history with automatic scrolling to the latest message. Shows a loading indicator while waiting for replies.

**Props:**

- `messages` - Array of message objects
- `loading` - Boolean indicating if a response is being fetched

### InputBox

Input field for composing and sending messages to the assistant.

**Props:**

- `value` - Current input text
- `onChange` - Callback when text changes
- `onSend` - Callback when send button is clicked

### Message

Individual message bubble component with role styling and timestamp.

**Props:**

- `role` - "user" or "assistant"
- `content` - Message text
- `time` - Message timestamp

## API Integration

The frontend communicates with the backend via two main API endpoints:

### Send Message

```
POST /api/chat/send
Body: { sessionId, message }
Response: { reply }
```

### Fetch Conversation

```
GET /api/chat/history/:sessionId
Response: Array of messages
```

See [services/api.js](src/services/api.js) for implementation details.

## Session Management

Sessions are automatically created and stored in the browser's localStorage. Each session maintains a unique ID that persists across page refreshes, allowing users to continue conversations.

## Configuration

### Backend URL

Update the API base URL in [services/api.js](src/services/api.js) if your backend runs on a different host/port.

### Tailwind CSS

Customize styling by editing [tailwind.config.js](tailwind.config.js)

## Development Tips

- Use React DevTools browser extension for debugging
- Check the browser console for API errors
- Session IDs are stored in `localStorage` under the key `chatSessionId`
- Messages are stored in component state; refresh will reset the UI (backend maintains persistence)

## Troubleshooting

### Port Already in Use

If port 3000 is already in use, you can specify a different port:

```bash
PORT=3001 npm start
```

### API Connection Issues

- Ensure the backend is running and accessible
- Check that the backend URL in [services/api.js](src/services/api.js) is correct
- Verify CORS settings on the backend

### Dependencies Not Installing

Clear npm cache and reinstall:

```bash
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)

## Technologies Used

- **React 19** - UI library
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client for API requests
- **UUID** - Unique identifier generation
- **React Scripts** - Build tools and configuration

## Key Dependencies

- `react` (^19.2.4) - Core React library
- `react-dom` (^19.2.4) - React DOM rendering
- `axios` (^1.13.5) - HTTP client for API requests
- `tailwindcss` (^3.4.19) - CSS framework
- `uuid` (^13.0.0) - Unique ID generation

## Learn More

- [React Documentation](https://react.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com)
- [Create React App Documentation](https://create-react-app.dev)
- [Axios Documentation](https://axios-http.com)

## License

This project is part of the AI ChatBot application.

## Support

For issues or questions, please refer to the main project repository or contact the development team.
