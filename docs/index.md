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
    avatar: 'https://github.com/thedignityofcoffee.png',
    name: 'thedignityofcoffee',
    title: 'Author',
    links: [
      { icon: 'github', link: 'https://github.com/thedignityofcoffee' },
    ]
  },
  {
    avatar: 'https://github.com/A-n-k-a.png',
    name: 'Anka',
    title: 'Contributor & Tech Support',
    links: [
      { icon: 'github', link: 'https://github.com/A-n-k-a' }
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
