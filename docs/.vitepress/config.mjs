import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Notes",
  description: "OBU SE Level 5",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'SdwCaCPP', link: '/SdwCaCPP-Notes' },
      { text: 'DB', link: '/DB-Notes' },
      { text: 'HCI', link: '/HCI-Notes' },
      { text: 'IPD', link: '/IPD-Notes' }
    ],

    sidebar: [
      {
        text: 'Level 5',
        items: [
          { text: 'SdwCaCPP', link: '/SdwCaCPP-Notes' },
          { text: 'DB', link: '/DB-Notes' },
          { text: 'HCI', link: '/HCI-Notes' },
          { text: 'IPD', link: '/IPD-Notes' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/thedignityofcoffee' },
    ]
  }
})
