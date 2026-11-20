---
title: "The Zero-Day Dilemma"
subtitle: "What would you do if you found the next big zero-day exploit?"
teaser: >-
  What would you do if you found the next big zero-day exploit?
date: 2026-11-20T07:00:00Z
slug: "the-zero-day-dilemma"
---

![red clock on a black background](/img/the-zero-day-dilemma/photo-1697994311219-025b715b412e.jpg)

*Photo by [Soham Rathod](https://unsplash.com/@thesohamrathod) on [Unsplash](https://unsplash.com/photos/14y-pXminzE)*

I recently had an interesting discussion with my father-in-law. We were talking about vulnerabilities like PHP2Shell, the kind so big they even make it into the mainstream news and onto the radio. By way of greeting, he asked whether I'd switched off the router at home out of fear. Of course not. None of my projects have PHP in the stack, and hosting anything public on my private server is a no-go for me anyway.

My father-in-law understood that. But then he had an interesting follow-up question: *why don't they patch the systems first, before shouting the vulnerability from the rooftops?*

And that's a bit of a dilemma.

So imagine you're the one who found it, because you accidentally rolled your head across the keyboard. And it has the potential to "destroy the internet," as people love to put it. What do you do if your goal is to prevent as much damage as possible?

If you make the exploit public, a race between system owners and attackers starts right away. Can the attacker turn the vulnerability report into a working exploit faster? Or will building the bugfix and rolling out the patch win this time? Unfortunately, attackers often win that race, so by publishing we end up causing damage.

What's the alternative? We could try to inform as many people as possible in advance and quietly get a patch into as many systems as possible before the vulnerability is publicly disclosed.

At first glance that sounds reasonable! If we tell Google, Microsoft, IBM, you name them, and give them a chance to protect their systems before we go public, we've surely protected most of the internet from attackers! That would minimize the damage!

Right. But what are the consequences?

The big tech companies get VIP security patches before the vulnerability is even announced?

![Shut up and take my money!](/img/the-zero-day-dilemma/shut-up-and-take-my-money.gif)

Once that shows up in the big tech companies' service descriptions, Hans Peter's little hosting company out in the sticks is left out in the cold. That security feature will drive every customer into the arms of the big players and strengthen their market position even further. Follow the example through, and in this case we'd be distorting the free market. And the free market is sacred to us, of course. 😉

So do we just go back to publishing and hoping for the best? Not quite.

In practice, the industry has settled on a compromise: **coordinated disclosure**. Vendors and distributions get a short embargo window, then everything goes public at once. It isn't perfect, and the big players still benefit most. But it's the least bad option we've got.

Maybe that's the real answer to my father-in-law's question: there's no clean solution, only one that hurts the fewest people.
