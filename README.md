# Chrema - Team Setup Guide
One-time setup (each person, each new computer)

# 1. Set up the dev environment (per assignment PDF Task A)

Download dev-env.zip, extract to a new folder on C: (e.g. workspace_yourstudentnum)
Double-click launch.cmd, click Run through the security warnings, press R for "run once" if prompted
First time only: enter your name/email when asked (sets up git)

# 2. Get the project code - do NOT run yarn create vite, that only applies to starting a brand new project. You're joining an existing one:

- git clone <https://github.com/EricMoreland/Chrema_Phase_2>
- cd <Chrema_Phase_2>

# 3. Open VS Code and install dependencies

- code .

Then in the VS Code terminal:

- yarn

(If the Node.js security prompt appears, click Cancel - per the PDF.)

# 4. Run it

- yarn dev

Click the localhost link it gives you.

# Every session after that (no re-cloning needed)
cd <Chrema_Phase_2>
git pull
yarn
yarn dev

git pull gets everyone else's latest changes. Running yarn again is a safety habit in case someone added a new package.

# While working
Make your changes, save files
Commit and push through VS Code's Source Control panel (or terminal: git add ., git commit -m "message", git push)
Pull before you push if it's been a while - avoids conflicts

# What NOT to do
Don't run yarn create vite - that creates a new project, not what you want
Don't work outside the dev-env terminal/VS Code setup
Don't forget: lab PCs wipe files periodically - back up by copying your projects folder out after each session
