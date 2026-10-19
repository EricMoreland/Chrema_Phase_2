Process Write Up has been discussed in class meetings on monday's, written and completed on whatsapp with an agile scrum methodology to date 04-10-2026

## Timeline of Main Activites:

 - 10–13 September 2026: The initial project environment was established, a new repository was created, and the foundational base code for the application was coded and committed to allow advantages starting point after A1's.

 - 28 September 2026: The team held a setup session to establish the GitHub workflow and formally assigned component responsibilities. Eric managed the Express server and home page, Benno was assigned the Add/Edit Transaction pages, and Aqeel was assigned the Add/Edit Budgets pages. Main coding logic already setup by Eric including initial setup of transactions logic.

 - 29 September – 1 October 2026: Branching workflows were finalized, and initial income and expense logic was added to the repository.

 - 2–3 October 2026: The development plan was structured into phases, focusing first on individual account state management and home screen compilation, followed by a semi complete integration and use of Tailwind CSS into the main branch.

 - 4-5 October 2026: Ben and Aqeel started with their assigned pages, Eric continued with Error page. Meeting held to sync all members on where we are and communicate whats to be done by 11 Oct. (Activities to follow...)

 - 10-12 October 2026: Merge all current working code into Main and reset to new code "checkpoint". Requirements: Aqeel & Benno implement required css and understand new backend. Eric continue backend implementation. Everyone, finalise code and implement last pieces of dupilcate logic for savings.

 - 15 Oct: Account, Savings, Budgets -CRUD backend complete. Benno to finish transactions logic and backend

 - 19 Oct: Implmenent last functionalities, Use app and try to find possible errors as team and discuss how to execute the presentation

## Key Decisions Take:

  - A strict branching strategy was enforced, where team members were required to pull from the main branch, push code to their individual branches, and submit pull requests.

 - To maintain code integrity and prevent versioning conflicts, all merges to the main branch were strictly handled by the project coordinator after review.

 - Repository Reset: A new Git repository was explicitly created for this phase to prevent version control complications from carrying over from Phase 1.

 - Styling Framework: The team standardized on Tailwind CSS for all frontend UI styling.

 - Development Phasing: It was mentioned that frontend components would be built using hardcoded states first, with server integration added only after the frontend logic was finalized.

 - State Management Architecture: The team determined that savings goals and budgets would apply globally across different accounts, requiring logic to be based on money spent within a period regardless of individual account balances.

 - Documentation Updates: As the codebase grew more complex and intertwined, extensive in-code comments were continuously added to ensure all members could understand and effectively build upon the base logic.

 - Switch to PGlite implementation

 - Discuss and Implement React router for main card to break up long conditional render code + browser control: Decide to stick with working code since Router has marginal benefits for small application.

