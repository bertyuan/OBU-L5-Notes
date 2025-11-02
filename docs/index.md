---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "Notes"
  text: "OBU SE Level 5"
  tagline: '2025 Fall Semester'
  actions:
    - theme: brand
      text: View Notes
      link: /notes/start.md
      type: primary


features:
  - #icon: 
    #  src: ./ape_avatar.jpg
    title: SdwCaCPP
    details: Software Development with C and C++

  - title: DB
    details: Databases

  - title: HCI
    details: The Human Computer Interface

  - title: IPD
    details: Innovative Product Development

---


<script setup>
import { VPTeamMembers } from 'vitepress/theme'

const members = [
  {
    avatar: 'https://github.com/bertyuan.png',
    name: 'bertyuan',
    title: 'Author',
    links: [
      { icon: 'github', link: 'https://github.com/bertyuan' },
    ]
  },
  {
    avatar: 'https://github.com/A-n-k-a.png',
    name: 'Anka',
    title: 'Contributor & Tech Support',
    links: [
      { icon: 'github', link: 'https://github.com/A-n-k-a' },
      { icon: {svg: '<svg t="1762076312931" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4759" width="200" height="200"><path d="M128 256a170.688 170.688 0 0 1 170.688-170.688H896v853.376H298.688A170.688 170.688 0 0 1 128 768V256z m85.312 364.16a169.856 169.856 0 0 1 85.376-22.848h512V170.688h-512c-47.168 0-85.376 38.208-85.376 85.312v364.16z m597.376 62.528h-512a85.312 85.312 0 0 0 0 170.624h512v-170.624zM426.688 256h298.624v85.312H426.688V256z" p-id="4760"></path></svg>',},
      link: 'https://mizuki.anka2.top/' },
    ]
  }
]
</script>

<div style="margin-top: 3rem;"></div>

<div class="team-section">

<h1>Contributors</h1>

Feel free to reach out!

<VPTeamMembers size="small" :members="members" />

</div>
