import { z } from "zod";

// ─── Theme ──────────────────────────────────────────
const ThemeSchema = z.object({
  colors: z.object({
    background: z.string(),
    foreground: z.string(),
    primary: z.string(),
    secondary: z.string(),
    accent: z.string(),
    surface: z.string(),
  }),
});

// ─── Social Link ────────────────────────────────────
const SocialLinkSchema = z.object({
  platform: z.enum([
    "github",
    "linkedin",
    "twitter",
    "email",
    "instagram",
    "other",
  ]),
  url: z.string(),
  label: z.string().optional(),
});

// ─── Navbar ─────────────────────────────────────────
const NavItemSchema = z.object({
  label: z.string(),
  href: z.string(),
});

// ─── Base Section ───────────────────────────────────
const BaseSectionSchema = z.object({
  id: z.string(),
  visible: z.boolean().default(true),
});

// ─── Hero ───────────────────────────────────────────
const HeroSectionSchema = BaseSectionSchema.extend({
  type: z.literal("hero"),
  content: z.object({
    greeting: z.string(),
    headline: z.string(),
    subheadline: z.string(),
    ctaText: z.string().optional(),
    ctaLink: z.string().optional(),
    secondaryCtaText: z.string().optional(),
    secondaryCtaLink: z.string().optional(),
  }),
});

// ─── Project ────────────────────────────────────────
const ProjectImageSchema = z.object({
  src: z.string(),
  type: z.enum(["desktop", "mobile"]),
  alt: z.string().optional(),
});

export const ProjectSchema = z.object({
  id: z.string(),
  title: z.string(),
  subtitle: z.string(),
  description: z.string(),
  gradient: z.string(),
  icon: z.string().optional(),
  image: z.string().optional(),
  images: z.array(ProjectImageSchema).optional(),
  techStack: z.array(z.string()),
  highlights: z.array(z.string()).optional(),
  responsibilities: z.array(z.string()).optional(),
  challenge: z.string().optional(),
  solution: z.string().optional(),
  sections: z
    .array(
      z.object({
        title: z.string(),
        body: z.string(),
        image: z.string().optional(),
        mobileImage: z.string().optional(),
      }),
    )
    .optional(),
  dateRange: z.string().optional(),
  company: z.string().optional(),
  client: z.string().optional(),
  demoUrl: z.string().optional(),
  repoUrl: z.string().optional(),
});

const ProjectsSectionSchema = BaseSectionSchema.extend({
  type: z.literal("projects"),
  content: z.object({
    title: z.string(),
    subtitle: z.string().optional(),
    items: z.array(ProjectSchema),
  }),
});

// ─── Skills ─────────────────────────────────────────
const SkillCategorySchema = z.object({
  name: z.string(),
  icon: z.string().optional(),
  items: z.array(z.string()),
});

const SkillsSectionSchema = BaseSectionSchema.extend({
  type: z.literal("skills"),
  content: z.object({
    title: z.string(),
    subtitle: z.string().optional(),
    categories: z.array(SkillCategorySchema),
  }),
});

// ─── Experience ─────────────────────────────────────
const ExperienceItemSchema = z.object({
  jobTitle: z.string(),
  company: z.string(),
  client: z.string().optional(),
  contractor: z.string().optional(),
  location: z.string(),
  dateRange: z.string(),
  type: z.string().optional(),
  highlights: z.array(z.string()).optional(),
  responsibilities: z.array(z.string()),
});

const ExperienceSectionSchema = BaseSectionSchema.extend({
  type: z.literal("experience"),
  content: z.object({
    title: z.string(),
    subtitle: z.string().optional(),
    items: z.array(ExperienceItemSchema),
  }),
});

// ─── Contact ────────────────────────────────────────
const ContactSectionSchema = BaseSectionSchema.extend({
  type: z.literal("contact"),
  content: z.object({
    title: z.string(),
    subtitle: z.string().optional(),
    email: z.string(),
    location: z.string().optional(),
    phone: z.string().optional(),
  }),
});

// ─── About ──────────────────────────────────────────
const AboutSectionSchema = BaseSectionSchema.extend({
  type: z.literal("about"),
  content: z.object({
    bio: z.string(),
    values: z.array(z.string()).optional(),
    availableForWork: z.boolean().optional(),
    resumeUrl: z.string().optional(),
  }),
});

// ─── Union ──────────────────────────────────────────
const SectionSchema = z.discriminatedUnion("type", [
  HeroSectionSchema,
  AboutSectionSchema,
  ProjectsSectionSchema,
  SkillsSectionSchema,
  ExperienceSectionSchema,
  ContactSectionSchema,
]);

// ─── Root ───────────────────────────────────────────
export const PortfolioConfigSchema = z.object({
  metadata: z.object({
    title: z.string(),
    description: z.string(),
    url: z.string(),
  }),
  personal: z.object({
    name: z.string(),
    role: z.string(),
    location: z.string().optional(),
    socials: z.array(SocialLinkSchema),
  }),
  nav: z.array(NavItemSchema).optional(),
  theme: ThemeSchema,
  sections: z.array(SectionSchema),
});

// ─── Types ──────────────────────────────────────────
export type PortfolioConfig = z.infer<typeof PortfolioConfigSchema>;
export type SectionType = z.infer<typeof SectionSchema>;
export type ProjectType = z.infer<typeof ProjectSchema>;
export type ProjectImageType = z.infer<typeof ProjectImageSchema>;
export type ExperienceItemType = z.infer<typeof ExperienceItemSchema>;
export type SkillCategoryType = z.infer<typeof SkillCategorySchema>;
