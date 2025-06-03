# This project contains the following technologies

Animation and Interaction:
- @hello-pangea/dnd (drag and drop)

Authentication and User Management:
- Clerk (Authentication and User Management)

Core Technologies:
- React 19
- TypeScript
- Next 15 (framework)

Data Fetching and State Management:
- Prisma 6 (ORM for DB)
- React Query (TanStack Query) (data fetching and state management)
- Zustand (state management)

Form and Validation:
- Zod (first schema validation)

Image Handling and Optimization:
- Unsplash (photos)

Middleware and Server Utilities:
- Concurrently (all projects are running in tandem)

Payment:
- Stripe (payment service provider)

Styling and UI Frameworks:
- Lucide React (stylization)
- shadcn/ui (stylization)
- Tailwind CSS (stylization)
- Sonner (stylization)

Utilities and Libraries:
- Date-fns (date/time manipulation)
- Knip (code analyzer and declutter)
- Lodash (library delivering modularity, performance & extras)
- PostCSS (transforms CSS code to AST)


# Project setup commands:
terminal powershell -> `npm i` (install dependencies)
terminal powershell -> `npm run all`
terminal powershell -> `npm run lint` (loading ESLint checker)
terminal powershell -> `npm run knip`

# Database commands:
terminal powershell -> `npx prisma generate`
terminal powershell -> `npx prisma db push`
terminal powershell -> `npx prisma migrate reset`

terminal powershell -> `npx prisma db seed` (loading test DB)

# GitHub commands:
terminal powershell -> `git pull origin master` (get latest changes)

terminal powershell -> `git add .` (add all changes)
terminal powershell -> `git commit -m "commit message"` (commit changes)
terminal powershell -> `git checkout -b <branch-name>` (create new branch)

terminal powershell -> `git push origin master` (push changes to master)
terminal powershell -> `git push origin <branch-name>` (push changes to branch)

# Stripe commands:
terminal CommandPrompt -> `stripe login`
terminal CommandPrompt -> `stripe listen --forward-to localhost:3000/api/webhook`