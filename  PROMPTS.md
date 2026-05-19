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


## Activity 4: AI-Driven Forms & Validation

### Prompt 1
**What I asked:**
> Create a Zod validation schema in a new file src/lib/schemas.ts for a "Project"
> with the following fields:
> - title: string, minimum 3 characters, with a custom error message "Title must be at least 3 characters"
> - description: string, minimum 10 characters, with a custom error message "Description must be at least 10 characters"
> - status: enum with values "active", "completed", "archived"
> Export the schema and also export the inferred TypeScript type using z.infer.

**What happened:**
> The Agent created the schema correctly with all three fields, custom error messages,
> and exported both the schema and the inferred Project type using z.infer.

### Prompt 2
**What I asked:**
> Using the Zod schema from src/lib/schemas.ts, create a form component at
> src/components/project-form.tsx, a Server Action at src/app/actions.ts,
> a new page at src/app/projects/new/page.tsx, and add a New Project button
> to src/app/projects/page.tsx.

**What happened:**
> The Agent created all four files correctly. The form used react-hook-form with
> zodResolver, the Server Action had "use server" and validated with safeParse()
> before inserting into Supabase. The form showed inline errors and a toast on success.

### Reflection
> The Schema-First approach with Zod changes how I think about forms completely.
> Instead of scattering validation checks across the form, the API route, and the database,
> I define the rules once in a schema and both the client and server enforce the same rules.
> This prevents junk data from reaching the database because even if someone bypasses
> the client-side validation, the Server Action runs safeParse() again on the server before
> any insert happens. In previous courses I used if/else checks and required attributes
> separately in different places. With Zod, one change to the schema updates validation
> everywhere automatically.

## Activity 5: Securing the App with Supabase Auth

### Prompt 1

**What I asked:**

> Implement a complete email/password authentication flow using @supabase/ssr with middleware, login/signup, sign out, and protected project routes.

**What happened:**

> Copilot created the authentication system, middleware protection, login page, sign out button, and updated the project queries to use authenticated users.

### Prompt 2

**What I asked:**

> The middleware is using supabase.auth.getSession() to check authentication. This is insecure because it trusts the local cookie without server verification. Replace it with supabase.auth.getUser(), which re-validates the user token with the Supabase Auth server on every request.

**What happened:**

> The middleware was updated to use getUser() instead of getSession() for secure authentication validation.

### Reflection

> The Agent modified many files automatically to support authentication. Middleware-based auth protects routes before pages and database queries load.

## Activity 6: Deployment, Webhooks, & AI-Testing

### Prompt 1
**What I asked:**
> I have a Next.js app with Supabase Auth. Using @workspace context to understand the app structure, write an End-to-End (E2E) test file at tests/auth.spec.ts using Playwright. The tests should verify: 1. LOGIN PAGE VISIBLE, 2. REDIRECT AFTER LOGIN, 3. SIDEBAR NAVIGATION. Requirements: Use role-based locators, clear test descriptions, proper Playwright waiting strategies, read credentials from process.env.

**What happened:**
> The Agent used role-based locators and understood the auth flow from workspace context. Tests did not pass on the first run — the sidebar test failed due to strict mode violation where "Overview" resolved to 2 elements. Required 2 fix iterations to scope locators correctly.

### Prompt 2
**What I asked:**
> This Playwright test is failing with the following error: strict mode violation: getByRole('link', { name: 'Overview' }) resolved to 2 elements. Look at the actual component code in @workspace and fix the test to match the real UI. Use role-based locators.

**What happened:**
> After 2 rounds of iteration, switched from role-based link locators to getByText().first() to avoid the breadcrumb conflict. All 3 tests passed.

### Reflection
> Having AI write and run tests increased confidence before deploying. The iterative fix cycle — paste error, get fix, rerun — was fast and effective. The Agent caught the strict mode violation that manual browser testing would have missed entirely.

### Course Reflection
> In Activity 1, my prompts were vague and required multiple follow-ups to get
> the right output. By Activity 6, I learned to front-load every prompt with
> file paths, exact requirements, and constraints, which cut the number of
> correction rounds significantly. The biggest shift was learning to treat the
> AI as a junior developer — I review every change, catch mistakes, and make
> the architectural decisions myself. The most important thing I learned is that
> the quality of the output is directly tied to the quality of the prompt, and
> that being the Architect means you never accept generated code without
> understanding what it does.