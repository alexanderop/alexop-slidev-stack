import { defineConfig, presetUno, presetWebFonts } from 'unocss'

export default () => defineConfig({
  presets: [
    presetUno(),
    presetWebFonts({
      fonts: {
        sans: 'Geist',
        mono: 'Geist Mono',
      },
    }),
  ],
})
