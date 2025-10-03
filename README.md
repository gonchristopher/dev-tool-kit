# Developer Utilities 🛠️

A fast, privacy-friendly collection of common developer tools that runs entirely in your browser. No server required, no data leaves your machine.

## ✨ Features

- **🔒 Privacy First**: All processing happens locally in your browser
- **⚡ Lightning Fast**: Built with Vite, React, and TypeScript
- **🎨 Beautiful UI**: Modern design with dark/light theme support
- **⌨️ Keyboard Friendly**: Full keyboard navigation and shortcuts
- **📱 Responsive**: Works great on desktop, tablet, and mobile
- **🔧 Extensible**: Plugin architecture for adding new tools
- **🌐 PWA Ready**: Install as a desktop/mobile app

## 🛠️ Available Tools

### ✅ Implemented
- **JSON Formatter/Validator**: Pretty print, minify, and validate JSON with syntax highlighting
- **UUID Generator**: Generate v4 UUIDs with bulk generation and multiple output formats

### 🚧 Coming Soon
- **Base64 Encoder/Decoder**: Encode/decode text and files
- **URL Encoder/Decoder**: Safely encode URLs and parse query parameters
- **Hash Generator**: MD5, SHA-256, SHA-512 for text and files
- **Timestamp Converter**: Unix timestamps ↔ human-readable dates
- **JWT Decoder**: Decode JWT tokens (headers and payloads only)
- **Regex Tester**: Test regex patterns with live matching
- **Text Diff**: Compare text with side-by-side highlighting
- **CSV ↔ JSON Converter**: Convert between CSV and JSON formats

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/gonchristopher/dev-tool-kit.git
cd dev-tool-kit

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🏗️ Tech Stack

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite 7
- **Styling**: Tailwind CSS 3
- **UI Components**: Headless UI + Custom components
- **Icons**: Heroicons + Lucide React  
- **Routing**: React Router 6
- **Testing**: Vitest + React Testing Library
- **Performance**: Web Workers for heavy processing
- **PWA**: Vite PWA plugin with Workbox

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/my-tool`
3. Make your changes
4. Add tests for new functionality
5. Ensure all tests pass: `npm test`
6. Submit a pull request

## 📋 Development Roadmap

- [x] Core infrastructure and plugin system
- [x] JSON formatter and UUID generator
- [ ] Complete remaining MVP tools
- [ ] Advanced tool features (file upload, export options)
- [ ] Plugin marketplace/sharing system
- [ ] Mobile app optimizations
- [ ] Advanced PWA features (background sync, etc.)

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Icons by [Heroicons](https://heroicons.com/) and [Lucide](https://lucide.dev/)
- UI inspiration from various developer tool sites
- Built with love for the developer community ❤️
