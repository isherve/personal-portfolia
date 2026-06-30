import { projectAssets } from "@/data/projectAssets";
import { en } from "./en";
import { fr } from "./fr";
import type { Locale, PortfolioContent } from "./types";

const catalogs: Record<Locale, PortfolioContent> = { en, fr };

export function getContent(locale: Locale): PortfolioContent {
  return catalogs[locale];
}

export type MergedProject = PortfolioContent["projects"][number] &
  (typeof projectAssets)[number];

export function getMergedProjects(locale: Locale): MergedProject[] {
  const content = getContent(locale);
  return content.projects.map((project) => {
    const assets = projectAssets.find((a) => a.repo === project.repo);
    if (!assets) throw new Error(`Missing assets for project: ${project.repo}`);
    return { ...assets, ...project };
  });
}

export { en, fr };
export type { Locale, PortfolioContent };
