---
title: "Everything Becomes Context"
subtitle: "Why lazy tickets are about to come back and bite us"
date: 2026-11-17T09:00:00Z
slug: "everything-becomes-context"
draft: true
---

![person holding light bulb](/img/everything-becomes-context/photo-1493612276216-ee3925520721.jpg)

*Photo by [Diego PH](https://unsplash.com/@jdiegoph) on [Unsplash](https://unsplash.com/photos/fIq0tET6llw)*

The feature ticket has no description. The cloud VM snapshot is called `backup13`. The email subject line is empty, or just says "here you go". We've all seen it. Most of us have done it. Until recently, the cost was a bit of confusion for a colleague, or for ourselves six months later.

That cost is about to go up.

## What I saw at WeAreDevelopers

This year I attended the WeAreDevelopers World Congress in Berlin, and the exhibition hall was packed with AI startups. It felt like every booth was either selling an AI tool or announcing that it had just built AI into an existing product. No surprise there.

What I found more interesting was how these tools tried to stand out from the competition. Almost every pitch came down to the same thing: **context**. Better context usually means better results, so each vendor had its own strategy for feeding the model the right information:

- **Requirements as context.** Some tools look like requirements engineering software. They pass every requirement along with the prompt, so the AI doesn't introduce regression bugs.
- **Indexed code and business rules.** Others index your codebase upfront, extract documentation and business rules from it, and attach the relevant pieces to each prompt.
- **Git history.** Others pull extra information from your commit history, or even write additional notes into commits so they can serve as context later.

## Everything we write becomes context

Walking through the hall, it struck me: everything we write can eventually become context.

The ticket without a description, the snapshot named `backup13`, the commit message that just says "fix". These are exactly the sources the next AI tool will tap into to improve the results of our prompts. If we're lazy here, we're only hurting ourselves.

The difference is easy to see:

| Lazy | Useful |
| --- | --- |
| `backup13` | `pre-migration-postgres16-2026-11-12` |
| `fix` | `Fix invoice totals: tax was applied before discount` |
| Ticket: "Export button" | "Accounting needs a CSV export of filtered orders for monthly reporting. The export should respect the active filters." |

The right column helps an AI tool. But it also helps your teammates, and you, half a year from now. Writing good context for machines turns out to be the same as writing good context for humans.

## My resolution

So here's my resolution: treat our tools with respect, and only fill them with meaningful content. In practice, that means:

1. Every ticket gets at least one sentence on *why*.
2. Resources get descriptive names, not numbers.
3. Commit messages explain the reason, not just the change.

Future Cello will thank me.
