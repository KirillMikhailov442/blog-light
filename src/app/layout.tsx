import '@styles/globals.scss';
import '@styles/font.scss';
import '@styles/reset.css';

import type { Metadata } from 'next';

import Header from '@components/Header/Header';
import Footer from '@components/Footer/Footer';
import Searchbar from '@components/Searchbar/Searchbar';
import StoreProvider from '@components/Layouts/StoreProvider';

export const metadata: Metadata = {
  title: {
    default: 'Blog light',
    template: 'Blog light | %s',
  },
  description: 'Сайт для прочтения статей',
  keywords: ['пост', 'посты', 'статьи'],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <StoreProvider>
      <html className="h-full" lang="en">
        <body>
          <Searchbar />
          <Header />
          <div className="wrapper">
            <div className="flex items-center justify-center flex-grow">
              {children}
            </div>
            <Footer />
          </div>
        </body>
      </html>
    </StoreProvider>
  );
}
