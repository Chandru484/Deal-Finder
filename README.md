# Deal Finder AI

Deal Finder AI is an AI-powered React app that searches simulated e-commerce deals for any product you enter, highlighting the best prices and ratings across top Indian platforms.

## Features

- 🔍 Search for any product and get 5–7 realistic deals
- 🏆 Highlights the absolute best deal
- 🛒 Filter by platform (Flipkart, Amazon.in, Tata Cliq, etc.)
- 📊 Sort by price or rating
- ⚡ Fast, modern UI with Tailwind CSS
- 🤖 Powered by Gemini API

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or newer recommended)
- A Gemini API key ([get one here](https://aistudio.google.com/app/apikey))

### Installation

1. **Clone the repository:**
   ```sh
   git clone <your-repo-url>
   cd Deal-finder
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **Set up your API key:**
   - Copy your Gemini API key into a file named `.env.local` in the project root:
     ```
     GEMINI_API_KEY=your-gemini-api-key-here
     ```

### Running the App

Start the development server:

```sh
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) (or the URL shown in your terminal) in your browser.

## Project Structure

- [`App.tsx`](App.tsx): Main application logic and state
- [`components/`](components/): UI components (search bar, results, filters, etc.)
- [`services/geminiService.ts`](services/geminiService.ts): Handles Gemini API calls
- [`types.ts`](types.ts): TypeScript interfaces

## Deployment

To build for production:

```sh
npm run build
```

To preview the production build locally:

```sh
npm run preview
```

## License

This project is for educational/demo purposes.

---
