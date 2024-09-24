This project contains the following technologies:
- React 18
- TypeScript
- Next 14 (framework)
- Prisma 5 (ORM for DB)
- Clerk (Authentication and User Management)
- React TanStack Query (data fetching and state management)
- usehooks-ts (react hook library)
- Unsplash (photos)
- @hello-pangea/dnd (drag and drop)
- Tailwind CSS (stylization)
- shadcn/ui (stylization)
- Lucide React (stylization)
- Sonner (stylization)
- PostCSS (transforms CSS code to AST)
- Date-fns (date/time manipulation)
- Stripe (payment service provider)
- Zustand (state management)
- Zod (first schema validation)
- Lodash (library delivering modularity, performance & extras)
- Concurrently (all projects are running in tandem)


To run the client and server via concurrently:
terminal powershell -> npm run all

terminal powershell -> npx prisma migrate reset
terminal powershell -> npx prisma db push
terminal powershell -> npx prisma generate

terminal CommandPrompt -> stripe login
terminal CommandPrompt -> stripe listen --forward-to localhost:3000/api/webhook