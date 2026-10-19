# AI_LOG.md
**Project:** Chrema - Org Group 1I (Kraken)

Log every use of an AI tool in this project. Add a new row per use - do not edit or delete past entries.

## Template

| Date | Group Member | Tool (name & version) | Used For | Outcome |
|---|---|---|---|---|
| YYYY-MM-DD | Name | Tool vX | Short description of task | One-line result |

---

## Log

| Date | Group Member | Tool (name & version) | Used For | Outcome |

|---|---|---|---|---|

| 2026-09-10 | Eric | Claude Sonnet 4.5 | Help understand React code implementation for panels | Guidance on where to implement specific jsx to create panels and what the panels require |
| 2026-09-28 | Eric | Co-Pilot Student | Help understand how to implement express and setup SQLite with better-sqlite3 + insert dummy data from states | Guidance on where and how to implement express with side panels first and sqlite for data retrieval from database + insert dummy data to test if it works |
| 2026-09-29 | Ben | ChatGPT (GPT-5.6 Luna) | Explained Express.js backend routes and GET/POST server behavior for the Chrema application | Clarification on how the front end of react communicated to the Express backend |
| 2026-10-1 | Eric | Gemeni Flash 3.6 | Verify schema.sql according to our vision for the app | Identified errors and helped understand current errors regarding my inserts to test. |
| 2026-10-2 | Eric | Copilot student | Help fix onClose not working | Identified I need to add it to a button -I was tired at this point :( |
| 2026-10-3 | Eric | Copilot student | Debug added css with tailwind to understand how to match it with wireframes | Identified and explained missing elements from classNames |
| 2026-10-4 | Eric | Gemini Pro | Format wording of process writeup on whatsapp to a more clear structure | Formated our existing process write up to a bullet point type format |
| 2026-10-4 | Eric | Copilot Student | Explain how axios whould work for current code structure and show example of how to implement it with .then() | Explained its auto reject and parse capability and showed exmaple to help me understand how to implement it. |
| 2026-10-4 | Eric | Copilot Student | Explain possible errors or what needs revision since using axios and .then in API calls | Identified error in .catch and extra .then |
| 2026-10-04 | Ben | ChatGPT (GPT-5.6 Luna) | Reviewed the Chrema backend and teammate's work to determine what had already been implemented and what was needed to work on | Identified the existing backend/database structure and mapped out the next development tasks |
| 2026-10-5 | Eric | Copilot Student | Identify the best and scalable solution to implement different screens on one seperate main card and how to setup error page accordingly | Explained to use one state that manages which screen is showing on main card/use overlay for other and correct structure for ReportError.jsx |
| 2026-10-5 | Eric | Copilot Student | Suggest approach and explain what I need to get current Error page closer to wireframe | Explained css required and logic still needed for form to work correcly |
| 2026-10-06 | Ben | ChatGPT (GPT-5.6 Luna) | Worked through the migration to PGlite/PostgreSQL and discussed 'const db = new PGlite()' and database connection setup | Improved understanding of the new database setup and how it connects to the backend |
| 2026-10-7 | Eric | Copilot Student | Create component boilerplate for Account add and delete | Created the boilerplate code ready to implement logic and elements |
| 2026-10-7 | Eric | Copilot Student | Help identify gaps in SQL translation from old schema to new PGlite | Identified lacking columns in transaciton table and its connecting variable's uses in code logic |
| 2026-10-8 | Eric | Gemini Pro 3.1 | Help understand current server code from exmaple done in class with PGLite and how to continue to implement to for our app | Explain what works and whats missing currently and what is still needed for app. |
| 2026-10-08 | Ben | ChatGPT (GPT-5.6 Luna) | Styled the TransactionForm, including the Save and Cancel buttons and transaction layout after errors with visual consistency | Improved the visual consistency and usability of the transaction form |
| 2026-10-9 | Eric | Copilot Student | Help reformat existing code to seperate logic from API routes, to improve code structure | Showed an example of how to split it |
| 2026-10-9 | Eric | Copilot Student | Idenitfy and explain why Delete Backend logic is not working | Explained to test with new account because of possible foreign key error's for account references to savings or budgets |
| 2026-10-10 | Eric | Copilot Student | Explain possible improvements for group members (budgets CRUD) code before implement same logic for savings and explain coding logic for backend + help debug Addsaving error | Showed minor improvements for now and future and explained in relation to accounts backend logic whats required, ID'ed missing handle call and state |
| 2026-10-13 | Ben | ChatGPT (GPT-5.6 Luna) | Worked through the Chrema frontend/backend development, including the react components, transaction functionality, API/database behaviour and debugging | Resolved implementation issues and continued integrating the frontend with the backend |
| 2026-10-14 | Ben | ChatGPT (GPT-5.6 Luna) | Worked through the development and implementation issues of the backend project code | Received step guidance for resolving code issues |
| 2026-10-17 | Ben | ChatGPT (GPT-5.6 Luna) | Implemented and debugged the transcation persistence, transaction routes, PGlite database handling, account balance updates in accordance to transaction categories | Transactions successfully persisted after page reload and account/budget functionality was connected to the transaction system |
| 2026-10-17 | Ben | ChatGPT (GPT-5.6 Luna) | Refined the Chrema transaction and budget UI, including the category icon clash, and the distinction between transaction categories and budget categories | Altered and refined the interface so the transactions use the required categories |