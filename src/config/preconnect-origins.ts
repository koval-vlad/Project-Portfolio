import type { AppConfig } from './config.types';
import { config as prodConfig } from './config.prod';
import { config as devConfig } from './config.dev';

function getOrigin(url: string): string | null {
  try {
    const origin = new URL(url).origin;
    // Skip localhost so we don't preconnect to it in production builds
    if (origin.startsWith('http://localhost') || origin.startsWith('https://localhost')) {
      return null;
    }
    return origin;
  } catch {
    return null;
  }
}

/** Origins used by iframes (Email Redactor, Pet Analysis, Excel viewer). Derived from config. */
function originsFromConfig(c: AppConfig): string[] {
  return [
    getOrigin(c.emailRedactor.appUrl),
    getOrigin(c.petAnalysis.appUrl),
    getOrigin(c.officeEmbedBase),
  ].filter((o): o is string => o != null);
}

/** Unique list of all iframe origins from prod and dev config, for preconnect/dns-prefetch in index.html. */
export const preconnectOrigins: string[] = [
  ...new Set([...originsFromConfig(prodConfig), ...originsFromConfig(devConfig)]),
];
