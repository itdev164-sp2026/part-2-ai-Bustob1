# Prompting Log — ITDEV-164

## Activity 1: The AI-Native Launchpad

### Prompt 1
**What I asked:**
Look at the existing src/app/page.tsx and src/app/layout.tsx in this project.
Replace the current homepage content with a "Developer Profile" page for me.
It should include:
- My name: [Your Name]
- A short bio (1-2 sentences about being a web development student)
- A "Skills" section that displays at least 6 skills in a responsive
  Tailwind CSS grid (use cards with icons from lucide-react)

Keep the existing Header component and layout structure intact.
If you need to create new components, go ahead and create them in
the src/components/ folder.

**What happened:**
it updated the files and included a small bio

### Prompt 2
**What I asked:**
Using the shadcn sidebar components that are now in my src/components/ui/ folder,
create a professional, collapsible dashboard layout. It should include:

1. A sidebar (src/components/app-sidebar.tsx) with navigation links for:
   - Overview (use the Home icon from lucide-react)
   - Projects (use the FolderOpen icon)
   - Settings (use the Settings icon)

2. A top navigation area with breadcrumbs showing the current page.

3. A main content area that wraps the existing page content.

4. Update src/app/layout.tsx to use the new SidebarProvider and sidebar layout.

Important: Preserve the Developer Profile content from Activity 1 in
src/app/page.tsx — it should appear in the main content area of the new layout.
Keep the dark mode toggle working.
**What happened:**
it did everything perfectly!

### Reflection
> Write 2-3 sentences reflecting on the experience. How did it feel
> to direct an AI to build something for you? What surprised you?
> What would you do differently next time?