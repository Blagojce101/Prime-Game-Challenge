# Prime - Casino Games Lobby

A simple casino games lobby built with **React** and **TypeScript**, users can browse, search, filter, and favorite casino games in a clean, responsive UI.

---

## Local Development

To run the project locally:

```bash
# Clone the repository
git clone https://github.com/Blagojce101/Prime-Game-Challenge

# Navigate into the project
cd Prime-Game-Challenge

# Install dependencies
npm install
# or
pnpm install
# or
yarn install

# Start development server
npm run dev
# or
pnpm dev
# or
yarn dev
```

Open http://localhost:5173 in your browser.

---

## Live Demo


---

## Tech Stack

- **React 19**
- **TypeScript**
- **Material UI (MUI)** – UI components & layout
- **Notistack** – notifications/snackbars
- **Font Awesome & MUI Icons**
- **Context API** – state management
- **LocalStorage** – persist favorites & recently viewed games

> Note: I did not use Next.js or React Router since the app does not require multiple pages. Instead, I used a modal-based flow for game details, which keeps the UX simple and focused.

---

## Features

### Game Display
- Responsive grid of game cards
- Each game shows:
  - Image
  - Name
  - Provider
  - Category
  - Favorite button
  - Play button
- Optimized for **mobile and desktop**

### Search & Filters
- Search games by name or provider
- Filter by category:
  - Slots
  - Table Games
  - Live Games
- Filter by provider
- Clear filters functionality
- Friendly empty state when no results match

### Favorites
- Add/remove games to favorites
- "Show only favorites" toggle
- Favorites persist across refresh using **localStorage**

### Recently Viewed
- Games you interact with are tracked
- Displayed inside the game details modal

### Game Details Modal
- Clicking a game opens a single reusable modal
- Clean layout with:
  - Large game image
  - Provider & category
  - Favorite toggle
  - “Start Game” button
- Only one modal instance exists at a time (managed via context)

### Dark Mode
- Light / dark theme toggle

---

## State Management

- **GameContext**
  - Filters
  - Favorites
  - Recently viewed games
- **ModalContext**
  - Single global modal instance
  - Dynamic content (game, size, etc.)
- **ThemeContext**
  - Light/Dark theme management

State is kept simple and readable using React Context and hooks.

---

## Mock Data

The app uses **mock game data** (15–20 games), each following this structure:

```ts
interface Game {
  id: string;
  name: string;
  provider: string;
  image: string;
  category: "slots" | "table" | "live";
}
```
## Project Structure

```
├── src/
│   ├── components/
│   │   ├── filters/
│   │   │   ├── CategoryFilter.tsx
│   │   │   ├── ExpandableFilters.tsx
│   │   │   ├── Filters.tsx
│   │   │   ├── ProviderFilters.tsx
│   │   │   └── SearchBar.tsx 
│   │   ├── games/
│   │   │   ├── GameCard.tsx
│   │   │   ├── GameDetailsModal.tsx
│   │   │   ├── GamesGrid.tsx
│   │   │   └── RecentlyViewed.tsx
│   │   ├── layout/
│   │   │   └── Header.tsx
│   │   └── CasinoLobby.tsx
│   ├── contexts/
│   │   ├── GameContext/
│   │   │   └── GameContext.tsx
│   │   ├── ModalContext/
│   │   │   └── ModalContext.tsx
│   │   └── ThemeContext/
│   │       ├── themeConfig.ts
│   │       └── ThemeContext.tsx
│   ├── data/
│   │   └── db.json
│   ├── hooks/
│   │   ├── useDebounce.ts
│   │   └── useLocalStorage.ts
│   ├── types/
│   │   └── types.ts
│   ├── utils/
│   │   ├── gameFilters.ts
│   │   └── localStorage.ts
│   ├── App.tsx
│   └── main.tsx
├── index.html
├── README.md 
└── vite.config.ts
```
## License

MIT © Blagoja

## Author

Built with React, TypeScript, and Material-UI demonstrating modern frontend development practices.

## Contributing

Feel free to open issues or pull requests for bug fixes, enhancements, or new features.