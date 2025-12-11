import { defineConfig } from "vitepress";
import { groupIconMdPlugin, groupIconVitePlugin, localIconLoader } from 'vitepress-plugin-group-icons'
import { transformerTwoslash } from '@shikijs/vitepress-twoslash'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  
  title: "Notes",
  description: "OBU SE Level 5",

  head: [["link", { rel: "icon", href: "/favicon.ico" }]],

  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "Home", link: "/" },
      { text: "SdwCaCPP", link: "/notes/SdwCaCPP/Module-Brief" },
      { text: "DB", link: "/notes/DB/Module-Brief" },
      { text: "HCI", link: "/notes/HCI/Module-Brief" },
      { text: "IPD", link: "/notes/IPD/Module-Brief" },
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
          { text: "Coursework 1", link: "/notes/SdwCaCPP/Coursework1.md" },
          { text: "Coursework 2", link: "/notes/SdwCaCPP/Coursework2.md" },
          { text: "Week 1 Lecture", link: "/notes/SdwCaCPP/Week1.md" },
          { text: "Week 1 Seminar", link: "/notes/SdwCaCPP/Week1-seminar.md" },
          { text: "Week 2 Lecture", link: "/notes/SdwCaCPP/Week2.md" },
          { text: "Week 2 Seminar", link: "/notes/SdwCaCPP/Week2-seminar.md" },
          { text: "Week 3 Lecture", link: "/notes/SdwCaCPP/Week3.md" },
          { text: "Week 3 Seminar", link: "/notes/SdwCaCPP/Week3-seminar.md" },
          { text: "Week 4 Lecture", link: "/notes/SdwCaCPP/Week4.md" },
          { text: "Week 4 Seminar", link: "/notes/SdwCaCPP/Week4-seminar.md" },
          { text: "Week 5 Lecture", link: "/notes/SdwCaCPP/Week5.md" },
          { text: "Week 5 Seminar", link: "/notes/SdwCaCPP/Week5-seminar.md" },
          { text: "Week 6 Lecture", link: "/notes/SdwCaCPP/Week6.md" },
          { text: "Week 7 Lecture", link: "/notes/SdwCaCPP/Week7.md" },
          { text: "Week 7 Seminar", link: "/notes/SdwCaCPP/Week7-seminar.md" },
          { text: "Week 8 Lecture", link: "/notes/SdwCaCPP/Week8.md" },
          { text: "Week 8 Seminar", link: "/notes/SdwCaCPP/Week8-seminar.md" },
          { text: "Week 9 Lecture", link: "/notes/SdwCaCPP/Week9.md" },
          { text: "Week 9 Seminar", link: "/notes/SdwCaCPP/Week9-seminar.md" },
        ],
      },

      {
        text: "DB",
        collapsed: false,
        items: [
          { text: "Module Brief", link: "/notes/DB/Module-Brief.md" },
          { text: "Coursework 1", link: "/notes/DB/Coursework1.md" },
          { text: "Coursework 2", link: "/notes/DB/Coursework2.md" },
          { text: "Week 1 Lecture", link: "/notes/DB/Week1.md" },
          { text: "Week 1 Seminar", link: "/notes/DB/Week1-seminar.md" },
          { text: "Week 2 Lecture", link: "/notes/DB/Week2.md" },
          { text: "Week 2 Seminar", link: "/notes/DB/Week2-seminar.md" },
          { text: "Week 3 Lecture", link: "/notes/DB/Week3.md" },
          { text: "Week 3 Seminar", link: "/notes/DB/Week3-seminar.md" },
          // { text: "Week 4 Lecture", link: "/notes/DB/Week4.md" },
          { text: "Week 4 Seminar", link: "/notes/DB/Week4-seminar.md" },
          // { text: "Week 5 Lecture", link: "/notes/DB/Week5.md" },
          { text: "Week 5 Seminar", link: "/notes/DB/Week5-seminar.md" },
          // { text: "Week 6 Lecture", link: "/notes/DB/Week6.md" },
          { text: "Week 6 Seminar", link: "/notes/DB/Week6-seminar.md" },
          // { text: "Week 7 Lecture", link: "/notes/DB/Week7.md" },
          { text: "Week 7 Seminar", link: "/notes/DB/Week7-seminar.md" },
          // { text: "Week 8 Lecture", link: "/notes/DB/Week8.md" },
          { text: "Week 8 Seminar", link: "/notes/DB/Week8-seminar.md" },
          { text: "Week 9 Seminar", link: "/notes/DB/Week9-seminar.md" },

        ],
      },

      {
        text: "HCI",
        collapsed: true,
        items: [
          { text: "Module Brief", link: "/notes/HCI/Module-Brief.md" },
          { text: "Week 1", link: "/notes/HCI/Week1.md" },
          { text: "Week 2", link: "/notes/HCI/Week2.md" },
        ],
      },

      {
        text: "IPD",
        collapsed: true,
        items: [
          { text: "Module Brief", link: "/notes/IPD/Module-Brief.md" },
          { text: "Sprint 2", link: "/notes/IPD/Sprint2.md" },
          { text: "Week 1", link: "/notes/IPD/Week1.md" },
          { text: "Week 2", link: "/notes/IPD/Week2.md" },
          { text: "Week 3", link: "/notes/IPD/Week3.md" },
        ],
      },
    ],

    socialLinks: [
      {
        icon: "github",
        link: "https://github.com/bertyuan/OBU-L5-Notes",
      },
    ],

    editLink: {
      pattern:
        "https://github.com/bertyuan/OBU-L5-Notes/edit/main/docs/:path",
      text: "Suggest changes to this page on GitHub",
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

    codeTransformers: [
      transformerTwoslash() 
    ],
    // Explicitly load these languages for types highlighting
    languages: ['js', 'jsx', 'ts', 'tsx']
    
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
