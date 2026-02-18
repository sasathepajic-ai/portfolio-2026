import fs from "fs";
import path from "path";
import {
  PortfolioConfigSchema,
  type PortfolioConfig,
} from "@/core/config/schema";

let cachedConfig: PortfolioConfig | null = null;

export function getPortfolioConfig(): PortfolioConfig {
  if (cachedConfig) return cachedConfig;

  const configPath = path.join(process.cwd(), "content", "portfolio.json");
  // Remove BOM if present before parsing
  const fileContents = fs
    .readFileSync(configPath, "utf-8")
    .replace(/^\uFEFF/, "");
  const rawConfig = JSON.parse(fileContents);

  const result = PortfolioConfigSchema.safeParse(rawConfig);

  if (!result.success) {
    console.error("Portfolio config validation failed:");
    console.error(JSON.stringify(result.error.format(), null, 2));
    throw new Error("Invalid portfolio.json — check terminal output.");
  }

  cachedConfig = result.data;
  return cachedConfig;
}
