---
title: "Lessons Learned: Building a Cross-Platform App with AI"
date: 2025-07-24T11:46:54.755Z
slug: "lessons-learned-building-a-cross-platform-app-with-ai"
---

![](/img/lessons-learned-building-a-cross-platform-app-with-ai/4a94de0f-6ef0-403e-aef3-dcc6e25133a0_1024x500.jpeg)

I developed an app for **[Android](https://play.google.com/store/apps/details?id=com.lily624org.bbqbuddy)** and **[iOS](https://apps.apple.com/de/app/bbq-buddy/id6747058992)** without writing a single line of code. I even had no prior experience with the programming language used. All of this was thanks to an AI agent, which I also had never used before. That sounds pretty impressive at first, but it actually wasn’t quite that easy. Here’s a brief report of my experience and what I learned, including tips and pitfalls, so you can do the same!

## Starting Point

I’m a professional software engineer, mainly working in the .NET environment. For work, I wanted to get more familiar with React to be able to implement small features full-stack. And what better way to learn a language than to develop a small project with it?

## The Project

Some of my friends are real BBQ nerds (myself included). We grill all the time, running through the entire range of Weber recipes, even in winter. One of my friends even hit 300 grill sessions in 2024. He knows this so precisely because on each grill day, he marks a small cross on his calendar with a pen. That’s where the idea came up to digitize this. A small app to track your grill sessions with a photo and some metadata, so you can view statistics and unlock achievements.

- How often have I grilled this week/this month/this year?
- What are my most frequently used ingredients?
- How often have I managed the perfect weekend?
- How many people have I grilled for?
- ...

## The Tech Stack

Since I use Android and my buddy uses iOS, it was clear right away that the app had to be cross-platform. It also had to use React or React Native, since I wanted to learn this language. I quickly found **[Expo](https://docs.expo.dev/)**, a seemingly very popular framework in the community that appeared to meet all my requirements. As my IDE, I chose **[Cursor AI](https://docs.cursor.com/welcome)**, since colleagues had recommended it. By default, my setup used the Claude 3.5 model.

## Getting Started

To avoid starting totally blind, I first watched some **[Expo getting-started videos](https://www.youtube.com/watch?v=m1-bc53EGh8)**. The videos were surprisingly up to date, and I was able to recreate the easy, trivial quick-start examples almost 1:1. I also browsed a bit through the **[React Native docs](https://reactnative.dev/docs/getting-started)** to get a first feel for the syntax and general paradigms of the language.

## Vibe-Coding

Now it finally started. In Cursor, you can simply enter prompts, and the AI makes the changes in the files, showing a git diff you can view and accept directly in the editor. For example, if I prompted for a list view as the content of my first page, the AI recognized it was an Expo project and inserted the appropriate code. What can I say? The start was quite impressive.  
Within seconds, I had a list of grill sessions on my phone. I prompted for more and more details over time. First, I wanted more sample data for the list, then I wanted an image for each list item, then I wanted to change the sorting, change colors, etc. No matter what I asked for, the AI executed it.  
Thanks to the really strong start, I actually slipped into a sort of “vibe-coding” mode: I just wrote prompts and barely looked at the generated code anymore, simply accepting it.

![Early version of the list view after only a few iterations](/img/lessons-learned-building-a-cross-platform-app-with-ai/a84c322a-8473-4824-a999-f2ed54d6c37c_945x2048.png)

## The First Setback

I then had the AI implement another view for adding grill sessions. Additionally, navigation between the two pages had to be implemented, and persistence via the phone's file system needed to be added. By this point, the AI’s changes were becoming noticeably slower. The compiler complained more and more, the AI repeatedly apologized and iterated to fix issues like incorrect syntax. Again and again, I had to specify the context explicitly in the prompt or restrict it so that usable results would be produced.

![Early version of the second page of the app](/img/lessons-learned-building-a-cross-platform-app-with-ai/57ccb272-e6b8-4364-ad15-e2e4f6a7a106_945x2048.png)

## Pair-Coding

By now, I had scrolled through the code myself a bit and can objectively say that quite a lot of technical debt had accumulated. Files exceeded 1,000 lines, with a lot of duplication, no architecture, and no tests. Therefore, blind vibe-coding is apparently not viable, even for a relatively small project. So I decided to change my approach. Instead of having the AI do everything on its own, I paired up with it, just like you would with a junior developer, explaining and avoiding code smells.

I took each feature again and, together with the AI, refactored it. Bit by bit, I had the AI extract small components and clean up according to best practices/clean code. I always had to explicitly state that the AI should only edit that particular component; otherwise, there were often random changes elsewhere in the repository.  
When it came to what should be in a component from a domain perspective and what should not, the AI often guessed wrong. Here, I had to be very exact with my prompts to get the desired result.

This approach actually paid off. The code became a lot cleaner, and even I, as a React newbie, could follow the small diffs and intervene if needed. Most importantly, very atomic commits in git are essential so you can revert to a previous commit if the AI goes into Skynet mode and destroys everything.

![](/img/lessons-learned-building-a-cross-platform-app-with-ai/cefa4cb5-a5df-4360-80fb-5989860242b4_240x136.gif)

But I also benefited from the pairing. When I didn’t understand diffs, the AI explained them really well. Especially React paradigms I hadn’t known before were made clear to me by the AI. I think this is clearly the strength of this approach. You just have to be curious and ask the right questions.

## The Result

The app is finished, works as intended, and is available in both the **[Play Store](https://play.google.com/store/apps/details?id=com.lily624org.bbqbuddy)** and the **[App Store](https://apps.apple.com/de/app/bbq-buddy/id6747058992)**! Here are a few pictures:

![](/img/lessons-learned-building-a-cross-platform-app-with-ai/565c7e25-46db-4fbc-b9ff-be01e2a546d4_1456x2588.jpeg)

![](/img/lessons-learned-building-a-cross-platform-app-with-ai/14680896-ea07-475f-94c7-9bbe32222a99_1456x2588.jpeg)

![](/img/lessons-learned-building-a-cross-platform-app-with-ai/24e2dd25-86d4-49ce-8c56-5e840c450b1c_1456x2588.jpeg)

![](/img/lessons-learned-building-a-cross-platform-app-with-ai/bf846f56-98ee-4c03-8537-cf53fabcecda_1456x2588.jpeg)

![](/img/lessons-learned-building-a-cross-platform-app-with-ai/d79b8052-2de0-4326-bcec-a2f0616cc6a8_1456x2588.jpeg)

The app is already being used by several people, which is, of course, very rewarding to see.

## Was This Approach Worth It?

I think so, because without additional practice with a programming language previously unknown to me, I would never have managed to build the app this way. Constantly googling syntax would have taken far longer, and as a dad, that's important to me. Projects that seem too big are immediately considered unrealistic and abandoned. But this way, I actually completed a project in just a few days (spread over several weeks).

## Would I Have Been Faster In My Familiar .NET Environment?

That’s tough to judge. Even now, I would rely heavily on AI support there. In .NET, I can, of course, understand code changes better and faster, but I think the tech stack for cross-platform development (dotnet MAUI) is significantly more bloated and would have caused quite a headache. The code would probably have been even cleaner, though. In the long run, that’s certainly a benefit.

## Outlook

Pair-coding with AI works and is efficient. It’s important not to fly blind, but to consciously review things. AI doesn’t replace software engineers; instead, it’s a new tool for them. As a result, the outcome will depend on your own software development experience, as you really have to guide the AI in the desired direction. And only a trained software engineer knows exactly what that direction should be.

What are your experiences with AI agents?
