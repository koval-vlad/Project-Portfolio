import { config as devConfig } from './config.dev';
import { config as prodConfig } from './config.prod';

/**
 * Use dev config when VITE_USE_DEV_CONFIG=true (e.g. npm run dev:local).
 * Production config is used by default.
 */
const useDevConfig = import.meta.env.VITE_USE_DEV_CONFIG === 'true';

export const config = useDevConfig ? devConfig : prodConfig;
export type { AppConfig } from './config.types';
