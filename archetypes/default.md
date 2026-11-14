---
title: "{{ replace .File.ContentBaseName "-" " " | title }}"
subtitle: ""
date: {{ .Date }}
slug: "{{ .File.ContentBaseName }}"
draft: true
---
