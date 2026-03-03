import { type SectionType } from "@/core/config/schema";
import HeroAbout from "@/components/features/HeroAbout";
import ProjectsScroll from "@/components/features/ProjectsScroll";
import ExperienceScroll from "@/components/features/ExperienceScroll";
import SkillsScroll from "@/components/features/SkillsScroll";
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

  return (
    <>
      {/* Merged hero + about */}
      {hero && about && (
        <HeroAbout hero={hero} about={about} socials={socials} />
      )}

      {/* Remaining sections */}
      {visible
        .filter((s) => s.type !== "hero" && s.type !== "about")
        .map((section) => {
          switch (section.type) {
            case "projects":
              return (
                <ProjectsScroll
                  key={section.id}
                  title={section.content.title}
                  subtitle={section.content.subtitle}
                  items={section.content.items}
                />
              );

            case "experience": {
              const experienceSections = visible.filter((s) => s.type === "experience");
              const expIdx = experienceSections.indexOf(section);
              const hasMultiple = experienceSections.length > 1;
              const sectionLabel = hasMultiple ? `03.${expIdx + 1}` : "03";
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

            case "skills":
              return (
                <SkillsScroll
                  key={section.id}
                  title={section.content.title}
                  subtitle={section.content.subtitle}
                  categories={section.content.categories}
                />
              );

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

