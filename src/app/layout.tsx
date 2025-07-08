import './globals.css';
import Providers from "./providers";

export const metadata = {
  title: 'HypeTrade.live',
  description: 'Trade the Hype. Track Viral Momentum.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Providers> {children} </Providers>
      </body>
    </html>
  )
}
