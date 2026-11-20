---
title: "Key Safe Overkill: Better Safe than Sorry"
date: 2025-07-24T11:36:49.468Z
slug: "key-safe-overkill-better-safe-than-sorry"
tags: ["smart home", "cyber security"]
aliases: ["/p/key-safe-overkill-better-safe-than-sorry/"]
---

![photo of key against black background](/img/key-safe-overkill-better-safe-than-sorry/photo-1503792243040-7ce7f5f06085.jpg)

*Photo by Matt Artz on [Unsplash](https://unsplash.com)*

I bet you have a spare key for your home hidden somewhere on your property!

- Is it in the garden? Maybe disguised as a rock?
- Is it right under the doormat?
- Do your neighbors have it?

No matter where it is, it is important to have one! It sucks to come home after a long day, only to realize that you've forgotten your keys. I know that from experience because until recently we didn’t have a spare key.

Why? Because we didn’t know where to hide it. What if the hiding place isn't good enough? What if our neighbors were on vacation right when we need the key?

Thanks to Home Assistant I was able to implement an **overkill-bullet-proof**™ solution for that problem.

> ***I introduce to you: The Fort Knox Key Safe.***

## Security Level 1: The Safe

My solution is based on a **[key safe](https://amzn.to/4gR6NYG)**. It’s pretty convenient for us since it works with a numerical code. Still this safe should scare of casual thiefs that just happened to find the key by accident.

![](/img/key-safe-overkill-better-safe-than-sorry/83d92119-db93-4ae0-97c4-cd48bda64cf8_1400x1867.jpeg)

## Security Level 2: The Location

Of course I did not mount the safe right next to the main door. That would be an invitation. It’s somewhere in the backyard, not directly visible since it is hidden by some flowerpots.

## Security Level 3: The Camera

One of my **[cameras](https://amzn.to/3Nb7FcS)** monitors the location of the safe. That is deterrence. But also I will have visual proof of anyone trying to mess with the safe.

![](/img/key-safe-overkill-better-safe-than-sorry/d14429c1-53cf-41d4-9ab3-8047e876e338_1400x1050.jpeg)

## Security Level 4: The Vibration Sensor

Inside the key safe I attached a **[vibration sensor](https://amzn.to/47MCDl3)**. That way I will be alerted if someone opens the safe or even tries to remove it from the wall. Spinning one of the number wheels is already enough for the sensor to detect a vibration.

![](/img/key-safe-overkill-better-safe-than-sorry/f4ee226e-6edc-4a09-bc52-983b90ec0a3a_786x1048.jpeg)

## The Bulls\*\*t Heist

Someone sneaks in my backyard. It takes him 30 minutes to find the key safe. He tries to guess the combination. No success after 15 minutes. He takes out the jimmy and tries to rip the safe from the wall. The police arrive.

What happend? I received a notification on my phone because the camera detected a person in the backyard. I also received a notification that someone tried to open the safe due to the vibration sensor. Plenty of time to check the camera stream and call the cops.

## Honest Summary

This solution is total overkill. I guess hiding a key somewhere in flowerpot is safe enough. But this solution is so much fun. And it gives me a false sense of safety. If you are a burgular: Please don’t take that as a challenge.

To be honest: A thief would probably just break a window with a rock instead of looking for a hidden key. But that’s no reason for skipping the fun of Home Automation. Your home just needs to be more secure than your neighbor’s.
