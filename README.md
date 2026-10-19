### Aqeel (28630661@sun.ac.za) UX Lead
### Benno (27218481@sun.ac.za) Business Analyst
### Eric (28183339@sun.ac.za) Lead Developer

# Chrema

Chrema is a personal finance dashboard built with React, Vite, Express, and
PGlite.

## Prerequisites

- Node.js 20 or newer
- npm

## Install from a clean checkout

Clone the repository and install the project dependencies:

```bash
git clone <repository-url>
cd Chrema_Phase_2
npm install
```

## Seed the database and run the application

The database is an in-memory PGlite database. There is no separate seed file
or database migration command: starting the API server creates the tables and
inserts the sample data automatically.

Open two terminals in the project directory.

In the first terminal, start the API server:

```bash
npm run server
```

The API listens on `http://localhost:3001`. Keep this terminal running.

In the second terminal, start the Vite development server:

```bash
npm run dev
```

Open the localhost URL printed by Vite, normally
`http://localhost:5173`.

The Vite server forwards `/api` requests to the API server on port 3001.

## Seed data

On each API server start, the app is populated with:

- Accounts: `FNB Account` and `Capitec Account`
- Categories: `Home`, `Groceries`, `Car`, `Food`, and `Other`
- A `Groceries` expense transaction
- A `Groceries` budget for `FNB Account`
- A `Vacation` savings goal for `FNB Account`

Because the database is currently in memory, data added during a session is
lost when the API server stops or restarts. The sample data is recreated on the
next `npm run server`.

## Useful commands

```bash
npm run build  # Create a production build
npm run lint   # Check the source files with ESLint
```
