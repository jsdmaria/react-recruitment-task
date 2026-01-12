# Pokedex - React Recruitment Task

React application for displaying data from PokeAPI v2.

## Technologies

-   **Vite** - build tool
-   **React 18** - UI library
-   **TypeScript** - type safety
-   **Redux Toolkit** - state management
-   **React Router** - routing
-   **Tailwind CSS** - styling
-   **Vitest + React Testing Library** - testing
-   **react-toastify** - notifications

## Installation

```bash
npm install
```

## Running

```bash
# Development
npm start

# Build
npm run build

# Tests
npm test
```

## Project Structure

```
src/
├── api/              # API services
├── components/       # Reusable components
├── constants/        # Constants
├── containers/       # Containers and pages with not shared components
├── router/          # Routing configuration
├── store/           # Redux store and slices
├── test/            # Test setup
├── types/           # TypeScript types
└── utils/           # Utilities
```

## Features

-   Display list of Pokemon (1-151, first generation)
-   Pagination (20 Pokemon per page)
-   Responsive design:
    -   Mobile: 1 column
    -   md: 2 columns
    -   lg: 4 columns
    -   xl+: 5 columns
-   Routing: `/home` and `/pokemon/:id`
-   Error handling via Error Boundary and react-toastify

## Requirements

-   Node.js 18+
-   npm or yarn
