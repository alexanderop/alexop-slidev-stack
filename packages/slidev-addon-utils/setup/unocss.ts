import { defineConfig, presetIcons } from 'unocss'
import { getAllIconClasses } from '../utils/parseFileTree'

export default () => defineConfig({
  safelist: getAllIconClasses(),
  presets: [
    presetIcons(),
  ],
})
