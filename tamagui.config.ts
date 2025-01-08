import { config as configBase } from '@tamagui/config/v3';
import { createTamagui } from 'tamagui';

export const config = createTamagui({
  ...configBase,
  themes: {
    ...configBase.themes,
    light: {
      ...configBase.themes?.light, // Keep existing properties
      text: '#1f2937',
      background: '#C3E9ED',
      container: '#E1F4F6',
      container_alt: '#ecf8f9',
      primary: '#0891B2',
      primary_focus: '#0E7490',
      secondary: '#0D8F83',
      accent: '#F8AE56',
      accent_focus: '#DF9D4D',
      accent_content: '#634622',
      danger: '#EF4444',
      danger_focus: '#DC2626',
      danger_content: '#7F1D1D',
    },
    // Optional: Add a dark theme or other themes as needed
  },
});

export default config;

export type Conf = typeof config;

declare module 'tamagui' {
  interface TamaguiCustomConfig extends Conf {}
}
