import type { Preview } from '@storybook/nextjs-vite'
import { Open_Sans } from 'next/font/google'
import '../src/app/globals.css'

const openSans = Open_Sans({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-open-sans'
})

const preview: Preview = {
  decorators: [
    Story => (
      <main className={openSans.className}>
        <Story />
      </main>
    )
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo'
    }
  }
}

export default preview
