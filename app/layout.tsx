import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';
import { ThemeProvider } from './components/ThemeProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Agent Wheel - Democratize Your Team\'s Ideas',
  description: 'Spin the wheel, build the future. A Base MiniApp for teams to submit, vote on, and transparently select ideas for automated generation and deployment.',
  keywords: ['Base', 'MiniApp', 'Ideas', 'Voting', 'Collaboration', 'Web3'],
  authors: [{ name: 'Agent Wheel Team' }],
  openGraph: {
    title: 'Agent Wheel - Democratize Your Team\'s Ideas',
    description: 'Spin the wheel, build the future.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider>
          <Providers>
            {children}
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
