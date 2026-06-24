import { RootProvider } from 'fumadocs-ui/provider/next';
import './global.css';
import { Inter } from 'next/font/google';
import type { Metadata } from 'next';

const inter = Inter({
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://docs.gorbagana.wtf'),
  title: {
    default: 'Gorbagana Docs',
    template: '%s | Gorbagana Docs',
  },
  description:
    'Network references, setup guides, and developer notes for the Gorbagana SVM network.',
};

export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en" className={`${inter.className} dark`} suppressHydrationWarning>
      <body className="flex flex-col min-h-screen">
        <RootProvider theme={{ enabled: false }}>{children}</RootProvider>
      </body>
    </html>
  );
}
