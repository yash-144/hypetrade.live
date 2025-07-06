import './globals.css';

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
          {children}
      </body>
    </html>
  )
}
