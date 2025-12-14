# Financial Filing Evidence Selection Demo

A pure HTML/CSS/JavaScript single-page application for visualizing the step-by-step process of evidence selection from financial filing documents.

## Features

- **Chunk Overview**: Grid view of all document chunks with ID, snippet, and word count
- **Relevance Highlighting**: Visual indication of chunk relevance to a question (qrel=0/1/2)
- **Card View Toggle**: Switch between raw text view and structured card view
- **Side-by-Side Comparison**: Compare original chunks with extracted structured cards
- **Interactive Details**: Click any chunk to see full details in a modal panel

## Setup

**No installation required!** This is a pure HTML/CSS/JavaScript application.

1. **Ensure data files are accessible:**
   - The HTML file expects JSON files in `data_overview/` directory relative to the HTML file
   - Files needed:
     - `data_overview/chunk_special_transformed.json`
     - `data_overview/cards.json`

2. **Open the application:**
   - Simply open `index.html` in a web browser
   - Or use a local web server (recommended for loading JSON files):
     ```bash
     # Python 3
     python3 -m http.server 8000
     
     # Python 2
     python -m SimpleHTTPServer 8000
     
     # Node.js (if you have it)
     npx http-server
     ```
   - Then open `http://localhost:8000` in your browser

## Usage Flow

1. **View Chunks**: The home screen displays all chunks in a grid
2. **Ask Question**: Click "Ask the Question" to show the question and highlight relevant chunks
3. **Toggle View**: Use "Card View" toggle to switch between text and structured card views
4. **View Details**: Click any chunk tile to see full details
5. **Compare**: In Card View, clicking a chunk shows side-by-side comparison of original vs. extracted card

## File Structure

```
front_end/
├── index.html              # Single-file application (all HTML/CSS/JS)
└── data_overview/          # JSON data files (should be accessible)
    ├── chunk_special_transformed.json
    └── cards.json
```

## Technologies

- Pure HTML5
- CSS3 (no frameworks)
- Vanilla JavaScript (no libraries)
- No build tools or dependencies required

## Notes

- All UI text is in English
- Responsive design for desktop and tablet
- Clean, minimal interface suitable for research demos
- Works offline once data is loaded (if using a local server)

## Troubleshooting

If you see "Error loading data":
- Make sure the JSON files are in the correct location (`data_overview/` relative to HTML file)
- Use a local web server instead of opening the file directly (file:// protocol has CORS restrictions)
- Check browser console for detailed error messages
