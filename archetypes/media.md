---
date: {{ .Date }}
media: "images/{{.Name}}"
media_type: image
title: "{{ replace .Name "-" " " | title }}"
author: [Anonymous]
desc: No description!
---