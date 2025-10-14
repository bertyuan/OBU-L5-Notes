import { defineConfig } from "vitepress";
import { groupIconMdPlugin, groupIconVitePlugin, localIconLoader } from 'vitepress-plugin-group-icons'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  
  title: "Notes",
  description: "OBU SE Level 5",

  head: [["link", { rel: "icon", href: "/favicon.ico" }]],

  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "Home", link: "/" },
      { text: "SdwCaCPP", link: "/SdwCaCPP-Notes" },
      { text: "DB", link: "/DB-Notes" },
      { text: "HCI", link: "/HCI-Notes" },
      { text: "IPD", link: "/IPD-Notes" },
    ],

    sidebar: [
      {
        //text: "Content",
        items: [{ text: "Start", link: "/notes/start.md" }],
      },

      {
        text: "SdwCaCPP",
        collapsed: false,
        items: [
          { text: "Module Brief", link: "/notes/SdwCaCPP/Module-Brief.md" },
          { text: "Week 1 Lecture", link: "/notes/SdwCaCPP/Week1.md" },
          { text: "Week 1 Seminar", link: "/notes/SdwCaCPP/Week1-seminar.md" },
          { text: "Week 2 Lecture", link: "/notes/SdwCaCPP/Week2.md" },
          { text: "Week 2 Seminar", link: "/notes/SdwCaCPP/Week2-seminar.md" },
        ],
      },

      {
        text: "DB",
        collapsed: false,
        items: [
          { text: "Module Brief", link: "/notes/DB/Module-Brief.md" },
          { text: "Week 1", link: "/notes/DB/Week1.md" },
          { text: "Week 2", link: "/notes/DB/Week2.md" },
        ],
      },

      {
        text: "HCI",
        collapsed: false,
        items: [
          { text: "Module Brief", link: "/notes/HCI/Module-Brief.md" },
          { text: "Week 1", link: "/notes/HCI/Week1.md" },
          { text: "Week 2", link: "/notes/HCI/Week2.md" },
        ],
      },

      {
        text: "IPD",
        collapsed: false,
        items: [
          { text: "Module Brief", link: "/notes/IPD/Module-Brief.md" },
          { text: "Week 1", link: "/notes/IPD/Week1.md" },
          { text: "Week 2", link: "/notes/IPD/Week2.md" },
        ],
      },
    ],

    socialLinks: [
      {
        icon: "github",
        link: "https://github.com/thedignityofcoffee/OBU-L5-Notes",
      },
    ],

    editLink: {
      pattern:
        "https://github.com/thedignityofcoffee/OBU-L5-Notes/edit/main/docs/:path",
      text: "Edit this page on GitHub",
    },

    search: {
      provider: "local",
    },
  },

  lastUpdated: true,

  markdown: {
    config(md) {
      md.use(groupIconMdPlugin)
    },
  },
  vite: {
    plugins: [
      groupIconVitePlugin({
        customIcon: {
          // '.mdx': 'vscode-icons:file-type-light-mdx',
          // 'babel': 'vscode-icons:file-type-babel',
          'c': localIconLoader(import.meta.url, './theme/icons/c.svg'),
          'cpp': localIconLoader(import.meta.url, './theme/icons/c++.svg'),
          // 'unplugin': 'https://unplugin.unjs.io/logo_light.svg',
        },
      }),
    ],
  },
  
});
