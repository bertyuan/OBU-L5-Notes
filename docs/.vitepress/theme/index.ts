import DefaultTheme from "vitepress/theme";
import type { EnhanceAppContext } from "vitepress";
import "./style.css";
import 'virtual:group-icons.css'
import TwoslashFloatingVue from '@shikijs/vitepress-twoslash/client'
import '@shikijs/vitepress-twoslash/style.css'

export default {
  ...DefaultTheme,

  enhanceApp({ app }: EnhanceAppContext) {
    app.use(TwoslashFloatingVue)
  },
};
