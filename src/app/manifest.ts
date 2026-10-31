import type { MetadataRoute } from 'next';
import { pl } from '@/messages/pl';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: pl.appName,
    short_name: pl.appName,
    description: pl.description,
    start_url: '/',
    display: 'standalone',
    orientation: 'portrait',
    background_color: '#09090b',
    theme_color: '#09090b',
    lang: 'pl',
    icons: [
      { src: '/pwa-icons/192', sizes: '192x192', type: 'image/png' },
      {
        src: '/pwa-icons/512',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/pwa-icons/512',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  };
}
