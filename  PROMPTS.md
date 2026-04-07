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