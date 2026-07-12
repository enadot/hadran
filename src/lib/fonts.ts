import localFont from 'next/font/local'
import { JetBrains_Mono } from 'next/font/google'

// גופני המותג של הדרן — Almoni Tzar לכותרות, Almoni Neue לטקסט
export const almoniTzar = localFont({
  src: [
    { path: '../fonts/almoni-tzar-regular.woff', weight: '400 600', style: 'normal' },
    { path: '../fonts/almoni-tzar-bold.woff', weight: '700 900', style: 'normal' },
  ],
  variable: '--font-almoni-tzar',
  display: 'swap',
})

export const almoniNeue = localFont({
  src: [
    { path: '../fonts/almoni-neue-regular.woff', weight: '400', style: 'normal' },
    { path: '../fonts/almoni-neue-medium.woff', weight: '500 600', style: 'normal' },
    { path: '../fonts/almoni-neue-bold.woff', weight: '700', style: 'normal' },
  ],
  variable: '--font-almoni-neue',
  display: 'swap',
})

export const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-jetbrains',
  display: 'swap',
})
