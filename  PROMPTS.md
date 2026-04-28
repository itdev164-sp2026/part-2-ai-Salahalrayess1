# Prompting Log — ITDEV-164

## Activity 1: The AI-Native Launchpad

### Prompt 1
**What I asked:**
> Look at my project structure and tell me:
What framework and version am I using?
What styling solution is configured?
What components exist so far?
Then add a small “Setup verified ✓” badge to the bottom of the home page.

**What happened:**
> The agent understood the request immediately. It inspected package.json and the app folder, identified Next.js 15.3.0 and Tailwind CSS, and listed existing components like Header, ModeToggle, and ThemeProvider. It correctly modified page.tsx and added the badge without breaking anything. No errors occurred.

### Prompt 2
**What I asked:**
> Look at src/app/page.tsx and layout.tsx. Replace the homepage with a Developer Profile page. Include my name, a short bio, and a responsive skills grid with at least 6 skills using Tailwind. Keep the existing layout and header. Also update the grid to use sm:grid-cols-2 lg:grid-cols-3.

**What happened:**
> The agent followed the instructions and replaced the homepage with a structured profile page. It created a reusable SkillCard component and used it in a responsive grid. I had to give a follow up to adjust the grid breakpoints, which it fixed correctly. This showed that precise constraints improve output quality.

### Reflection
> Directing the AI felt efficient and fast. It handled most of the setup and structure without issues. Next time I would include exact requirements earlier to reduce follow up corrections.

## Activity 2: Building the Dashboard Shell

### Prompt 1
What I asked:
> Using the shadcn sidebar components...

What happened:
> The Agent created app-sidebar.tsx and updated layout.tsx. It handled multiple files and preserved page.tsx content.

### Prompt 2
What I asked:
> (mobile fix or any adjustment)

What happened:
> The Agent fixed the issue successfully.

### Reflection
> The Agent preserved my Activity 1 work. I reviewed changes before accepting. No major issues.

## Activity 3: Server-Side Data with Supabase

### Prompt 1

**What I asked:**

> Using the Supabase client at src/lib/supabase.ts, create a new Server Component
at src/app/projects/page.tsx that:

1. Fetches all records from the "projects" table in Supabase
2. Displays them in a professional layout using shadcn/ui Card components
   (run `npx shadcn@latest add card` if needed)
3. Each card should show the project title, description, and a status badge
4. The status badge should be color-coded:
   - "active" = green
   - "completed" = blue
   - "archived" = gray

Use @workspace context to match the styling of our existing Dashboard.
This must be a React Server Component (async function, no "use client").
Do NOT use useEffect or useState for data fetching.

**What happened:**

> (Did the Agent create a Server Component or a Client Component?
> Did it use async/await or useEffect? Did you have to correct it?)

the agent did everthing as it it supposed too

### Prompt 2

**What I asked:**

> The breadcrumb in src/app/layout.tsx always shows "Overview" because the page
name is hardcoded. Extract the breadcrumb into its own client component at
src/components/breadcrumb-nav.tsx that uses usePathname() from next/navigation
to display the correct page name. Map "/" to "Overview", "/projects" to
"Projects", and "/settings" to "Settings". Keep "ITDEV-164" as the first
breadcrumb segment. Then update layout.tsx to use the new component.



**What happened:**

> it ran perfectly as it was intended to

### Reflection

> How does fetching data on the server feel different from the useEffect
> pattern you used in Web Programming 1? What are the advantages you
> noticed? Did anything surprise you about how simple server-side
> data fetching is in the App Router?

Server-side fetching is simpler than useEffect. You fetch once with await and render immediately.
The page loads with data, no loading state. This improves speed and user experience.
Security is better because the request runs on the server and hides API keys.
The code is shorter and easier to maintain.