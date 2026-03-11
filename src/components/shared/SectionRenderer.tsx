import { type SectionType } from "@/core/config/schema";
import HeroAbout from "@/components/features/HeroAbout";
import ProjectsScroll from "@/components/features/ProjectsScroll";
import ExperienceScroll from "@/components/features/ExperienceScroll";
import ContactScroll from "@/components/features/ContactScroll";

interface SectionRendererProps {
  sections: SectionType[];
  socials?: { platform: string; url: string; label?: string }[];
}

export default function SectionRenderer({ sections, socials = [] }: SectionRendererProps) {
  const visible = sections.filter((s) => s.visible !== false);

  // Find hero and about for merging
  const hero = visible.find((s) => s.type === "hero") as
    | Extract<SectionType, { type: "hero" }>
    | undefined;
  const about = visible.find((s) => s.type === "about") as
    | Extract<SectionType, { type: "about" }>
    | undefined;
  const skillsSection = visible.find((s) => s.type === "skills") as
    | Extract<SectionType, { type: "skills" }>
    | undefined;

  return (
    <>
      {/* Merged hero + about + skills */}
      {hero && about && (
        <HeroAbout hero={hero} about={about} socials={socials} skills={skillsSection?.content.categories} />
      )}

      {/* Remaining sections */}
      {visible
        .filter((s) => s.type !== "hero" && s.type !== "about" && s.type !== "skills")
        .map((section, idx) => {
          const sectionLabel = String(idx + 2).padStart(2, "0");

          switch (section.type) {
            case "projects":
              return (
                <ProjectsScroll
                  key={section.id}
                  sectionId={section.id}
                  title={section.content.title}
                  subtitle={section.content.subtitle}
                  items={section.content.items}
                />
              );

            case "experience": {
              return (
                <ExperienceScroll
                  key={section.id}
                  title={section.content.title}
                  subtitle={section.content.subtitle}
                  sectionLabel={sectionLabel}
                  items={section.content.items}
                />
              );
            }

            case "contact":
              return (
                <ContactScroll
                  key={section.id}
                  title={section.content.title}
                  subtitle={section.content.subtitle}
                  email={section.content.email}
                  location={section.content.location}
                  phone={section.content.phone}
                />
              );

            default:
              return null;
          }
        })}
    </>
  );
}

