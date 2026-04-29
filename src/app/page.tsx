import {
  Code,
  Database,
  Layout,
  Monitor,
  Rocket,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

const skills = [
  {
    name: "Next.js",
    description: "Building modern React applications with App Router and server components.",
    icon: Rocket,
  },
  {
    name: "Tailwind CSS",
    description: "Crafting responsive layouts and utility-first UI with Tailwind.",
    icon: Sparkles,
  },
  {
    name: "TypeScript",
    description: "Writing type-safe code for predictable frontend behavior.",
    icon: Code,
  },
  {
    name: "React",
    description: "Composing reusable UI components and managing state effectively.",
    icon: Layout,
  },
  {
    name: "Web Development",
    description: "Building accessible, responsive user experiences for the web.",
    icon: Monitor,
  },
  {
    name: "Databases",
    description: "Connecting apps to data with SQL and modern backend services.",
    icon: Database,
  },
];

export default function HomePage() {
  return (
    <div className="space-y-10">
      <section className="space-y-4 rounded-3xl border border-border bg-card p-8 shadow-sm">
        <div className="space-y-2">
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-primary">
            Developer Profile
          </p>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Bruno Bustos
          </h1>
          <p className="max-w-3xl text-base leading-7 text-muted-foreground sm:text-lg">
            This is my last class before I finish my associates, I am looking forward to working in the field.
          </p>
        </div>
      </section>

      <section className="space-y-5">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">Skills</h2>
            <p className="text-sm text-muted-foreground">
              A selection of strengths and technologies I enjoy working with.
            </p>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {skills.map(({ name, description, icon: Icon }) => (
            <article
              key={name}
              className="rounded-3xl border border-border bg-background p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-muted text-primary">
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold">{name}</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{description}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
