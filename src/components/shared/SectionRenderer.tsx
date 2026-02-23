import { type SectionType } from "@/core/config/schema";
import Hero from "@/components/features/Hero";
import About from "@/components/features/About";
import Projects from "@/components/features/Projects";
import Experience from "@/components/features/Experience";
import Skills from "@/components/features/Skills";
import Contact from "@/components/features/Contact";

interface SectionRendererProps {
  sections: SectionType[];
  socials?: { platform: string; url: string; label?: string }[];
}

export default function SectionRenderer({ sections, socials = [] }: SectionRendererProps) {
  return (
    <>
      {sections
        .filter((s) => s.visible !== false)
        .map((section) => {
          switch (section.type) {
            case "hero":
              return <Hero key={section.id} data={section} />;

            case "about":
              return (
                <div key={section.id} id={section.id}>
                  <About data={section} socials={socials} />
                </div>
              );

            case "projects":
              return (
                <div key={section.id} id={section.id}>
                  <Projects
                    title={section.content.title}
                    subtitle={section.content.subtitle}
                    items={section.content.items}
                  />
                </div>
              );

            case "experience":
              return (
                <div key={section.id} id={section.id}>
                  <Experience
                    title={section.content.title}
                    subtitle={section.content.subtitle}
                    items={section.content.items}
                  />
                </div>
              );

            case "skills":
              return (
                <div key={section.id} id={section.id}>
                  <Skills
                    title={section.content.title}
                    subtitle={section.content.subtitle}
                    categories={section.content.categories}
                  />
                </div>
              );

            case "contact":
              return (
                <div key={section.id} id={section.id}>
                  <Contact
                    title={section.content.title}
                    subtitle={section.content.subtitle}
                    email={section.content.email}
                    location={section.content.location}
                    phone={section.content.phone}
                  />
                </div>
              );

            default:
              return null;
          }
        })}
    </>
  );
}

