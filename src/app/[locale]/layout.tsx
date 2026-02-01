import type { Metadata } from "next";
import { Playfair_Display, Noto_Sans_JP } from "next/font/google";
import "../globals.css";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { CartProvider } from '@/context/CartContext';
import { OrderProvider } from '@/context/OrderContext';

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const notoSansJP = Noto_Sans_JP({
  variable: "--font-noto-sans-jp",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Uganda Coffee Shop",
  description: "Ugandan Heritage, Japanese Precision - Experience the Art of Terimba Quality",
};

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Ensure that the incoming `locale` is valid
  if (!['en', 'ja'].includes(locale)) {
    notFound();
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body
        className={`${playfair.variable} ${notoSansJP.variable} font-sans antialiased bg-stark-white text-charcoal`}
      >
        <NextIntlClientProvider messages={messages}>
          <CartProvider>
            <OrderProvider>
              <Header />
              {children}
              <Footer />
            </OrderProvider>
          </CartProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
