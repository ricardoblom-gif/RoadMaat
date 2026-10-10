import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'RoadMaat | Onderweg sta je er nooit alleen voor',
  description: 'RoadMaat is een sociaal platform voor chauffeurs met community, kennisdeling, hulp en route-informatie.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nl">
      <body>{children}</body>
    </html>
  );
}
