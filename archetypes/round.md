---
title: "{{ replace .Name "-" " " | title }}"
date: {{ .Date }}
cinematic: "videos/{{.Name}}"
recordings:
-   text: Anonymous's perspective
    url: https://www.youtube.com
synopsis: "/rounds/synopses/{{.Name}}"
gallery: "/rounds/gallery/{{.Name}}"
---