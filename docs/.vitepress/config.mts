import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Notes",
  description: "OBU SE Level 5",

  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }]
  ],

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
      { icon: 'github', link: 'https://github.com/thedignityofcoffee/OBU-L5-Notes' },
    ],

    editLink: {
      pattern: 'https://github.com/thedignityofcoffee/OBU-L5-Notes/edit/main/docs/:path',
      text: 'Edit this page on GitHub'
    },

     search: {
      provider: 'local'
    }

  },

  lastUpdated: true

})
