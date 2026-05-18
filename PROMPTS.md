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

## Activity 3: Server-Side Data with Supabase

### Prompt 1

**What I asked:**
Using the Supabase client at src/lib/supabase.ts, create a new Server Component
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
it connected to supbase and uploaded the rows we created.


### Prompt 2

**What I asked:**
The breadcrumb in src/app/layout.tsx always shows "Overview" because the page
name is hardcoded. Extract the breadcrumb into its own client component at
src/components/breadcrumb-nav.tsx that uses usePathname() from next/navigation
to display the correct page name. Map "/" to "Overview", "/projects" to
"Projects", and "/settings" to "Settings". Keep "ITDEV-164" as the first
breadcrumb segment. Then update layout.tsx to use the new component.


**What happened:**
fixed the navigation on the page and made it usuable


### Reflection

> How does fetching data on the server feel different from the useEffect
> pattern you used in Web Programming 1? What are the advantages you
> noticed? Did anything surprise you about how simple server-side
> data fetching is in the App Router?
I think its incredibly impressive, It feels so fast and efficient.

## Activity 4: AI-Driven Forms & Validation

### Prompt 1

**What I asked:**
Create a Zod validation schema in a new file src/lib/schemas.ts for a "Project" with fields: title (min 3 chars with custom error), description (min 10 chars with custom error), and status enum (active, completed, archived). Export both the schema and inferred TypeScript type using z.infer.

**What happened:**
The Ai created the Zod schema with all required fields and validation rules. It included custom error messages for both title and description. It also exported TypeScript type using z.infer<typeof projectSchema>, which makes sure the type stays in sync with the schema automatically.

### Prompt 2

**What I asked:**
Using the Zod schema from src/lib/schemas.ts, create a project form using react-hook-form with zodResolver, shadcn/ui Field components, and a Server Action that validates input again with Zod before inserting into the Supabase projects table. Also create a new page for the form and add a "New Project" button on the projects page.
**What happened:**
The Ai generated multiple files correctly, including the form component, server action, and new page route. The form was connected to react-hook-form with zodResolver, and validation errors displayed under each field. The Server Action included "use server" and re-validated the data using the same Zod schema before inserting into Supabase. The "New Project" button correctly linked to /projects/new.

### Prompt 3 (if applicable)

**What I asked:**
Fix any issues with form submission, ensure Sonner toast notifications appear on success, and verify that server-side validation is working correctly in the Server Action.
**What happened:**
The Agent adjusted the form submission flow so that successful submissions triggered a Sonner toast notification. It also ensured the Server Action returned proper success/error responses and confirmed that server-side validation with Zod runs before any database insert. Any missing imports or component wiring issues were corrected.

### Reflection
Schema-first with Zod lets you define the rules once and use them everywhere. That way both the form and the server agree on what’s valid, so bad data doesn’t go into the datbase, very effiencet.

This way feels much cleaner than before!
