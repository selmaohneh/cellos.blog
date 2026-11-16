---
title: "Hack The Box: Nibbles"
date: 2025-07-24T11:44:47.507Z
slug: "hack-the-box-nibbles"
---

![man siting facing laptop](/img/hack-the-box-nibbles/photo-1562813733-b31f71025d54.jpg)

*Photo by Clint Patterson on [Unsplash](https://unsplash.com)*

This is my walkthrough for the machine `Nibbles` on **[Hack The Box](https://referral.hackthebox.com/mzBNP9n)**.

### Enumeration

As usual we are only given the IP of our target machine. For convenience let's add that IP into our `/etc/hosts` file. That way we can simply use `target` instead of re-typing the whole IP whenever we need it for a command.

![](/img/hack-the-box-nibbles/c8aa4a4c-78bc-4e44-bf6d-e289c4c933fa_1023x280.jpeg)

Next is a full scan with **[Nmap](https://nmap.org/)**. I like to add the flag `--open` to only get open ports and not pollute the result with so much noise. The flag `-p-` tells Nmap to scan **all** ports, not just the most common ones.

![](/img/hack-the-box-nibbles/5ad652b3-b358-4001-aaa7-184865565c85_960x403.jpeg)

We see that there is an open `http port 80`. Let's use cURL to see if we get a response from there.

![](/img/hack-the-box-nibbles/f42c036a-e387-4c0e-8e7b-ef24d15eeb18_597x383.jpeg)

We get a boring **Hello world!**. But further down, we see a hint. It seems like there is a sub-directory called `nibbleblog`. Let's cURL `http://target/nibbleblog` and we get quite a huge response. So we better open that in the browser:

![](/img/hack-the-box-nibbles/b0b720a6-170f-46a4-ad2f-7181a7c70195_1281x838.jpeg)

Alright! Looks like some dude named `Nibbles` runs a blog about `Yum yum`, or a dude named `Yum yum` runs a blog about `Nibbles`!? Either way around, that sounds wrong. But unfortunately there is nothing more interesting to find here, I guess. There are no posts yet. There is no `about` page, no `login` page, no `guestbook`. So let's enumerate further and start **[gobuster](https://github.com/OJ/gobuster)** to see if we can find more hidden sub-directories of that blog. We use a list from **[SecLists](https://github.com/danielmiessler/SecLists)** for that.

![](/img/hack-the-box-nibbles/b3fca29d-fb2f-4c24-8e2d-0c4d58e3cff9_1144x668.jpeg)

Nice, we have quite some findings! Let's start with the `/README` since that really sounds promising.

![](/img/hack-the-box-nibbles/b10a2b14-7747-437a-937f-cbee267b0715_554x590.jpeg)

This provides us with some URLs that give insights to `nibbleblog` which appears to be a `CMS` for blogs. This also gives us a first inside into the tech stack of the blog: It runs on `PHP`. Let's verify that with **[WhatWeb](https://whatweb.net/)**.

![](/img/hack-the-box-nibbles/27c5ccfa-9a96-43af-8bd8-45f85d26badb_1857x119.jpeg)

We see `PHP` again, so that seems to be correct. Also we that the blog might be running on `Ubuntu`.

Let's check the next URL we found. `/content` is very interesting since it contains further sub-directories called `/private` and `/tmp`. Digging deeper we can find file called `config.xml`.

![](/img/hack-the-box-nibbles/db0fe4ba-7dae-43dd-928b-938acec85e41_540x347.png)

![](/img/hack-the-box-nibbles/57aaede4-78d9-43c5-8405-51debdeea20c_757x722.jpeg)

There is a lot more `nibbles` and `yum yum` garbage. But there are also some email addresses, especially `admin@nibbles.com`. This could indicate that `admin` is a possible user name for the blog. We are able to verify that in the next file called `users.xml`.

![](/img/hack-the-box-nibbles/85c06fb4-3524-487c-84ed-8d65a50c902b_755x301.jpeg)

Moving on to `/admin` gives us login page. Knowing that `admin` is a valid user, let's try some obvious passwords like `admin`, `administrator`, `password`. Sadly that does not work.

![](/img/hack-the-box-nibbles/7ab1afb2-4d2c-4f2d-b717-dcc091e452ce_962x500.jpeg)

Let's run **[CeWL](https://github.com/digininja/CeWL)** to generate a custom wordlist that we might use later to brute-force the password. CeWL crawls the whole page and collects long words and/or words that are mentioned very often.

![](/img/hack-the-box-nibbles/efafb84f-8d14-4052-ba42-f5c4072800b3_1002x761.jpeg)

Wow. `Nibbles` is really mentioned `9` times. And, thank god, the password `nibbles` grants us access to the admin area of the page. From here we are able to publish new blog posts, change the theme, or tweak some settings. Also there are some plugins installed. One let's you upload an image. When we try that, the image appears in the already found directory `content/private/plugins/my_image/`.

![](/img/hack-the-box-nibbles/9d7cbf87-8a7a-41f8-b602-2cda8710125a_651x506.png)

![](/img/hack-the-box-nibbles/1d868946-7bb3-42cb-8190-234eee13bfc7_793x338.jpeg)

### Initial Access

Since we are now able to upload a file and also access it afterwards, let's try to upload a `web shell` for PHP. We use a simple test string for that.

![](/img/hack-the-box-nibbles/c75bc352-ae9c-4a3f-847a-f9e6102f486f_766x247.png)

![](/img/hack-the-box-nibbles/4d615f62-c572-4e02-8a74-ecbb7a52a80a_788x86.jpeg)

Since that worked, let's go a step further and upload a `reverse shell` to gain our first foothold on the target. We can find all kinds of `reverse shells` on pages like **[GTFOBins](https://gtfobins.github.io/)**.

![](/img/hack-the-box-nibbles/e7e3b646-f86d-4b88-9b71-05430927d973_1108x100.png)

![](/img/hack-the-box-nibbles/6cfab219-3b99-41c0-ab50-da3c8649b8b5_541x251.png)

![](/img/hack-the-box-nibbles/cd7e0cd5-9c51-4c8c-8aaa-a40dc9ca86e9_556x119.jpeg)

### Privilege Escalation

Now that we are in, we have to gain ourselves `root` rights. This includes re-starting the enumeration phase of our attack. We just found a file called `personal.zip` right next to the user flag. We should check that out.

![](/img/hack-the-box-nibbles/ebefa7b1-bdf5-4384-8b64-f208df1272a7_506x145.jpeg)

That script is quite big. We will defer digging deeper into it and proceed our enumeration first. Let's upload one of the big privilege escalation scripts like **[LinEnum](https://github.com/rebootuser/LinEnum)** or **[LinPEAS](https://github.com/peass-ng/PEASS-ng/tree/master/linPEAS)** onto our target and execute it. We do that by serving a `http server` via `python` on our machine and get the file on our target machine via `wget`.

![](/img/hack-the-box-nibbles/a2b9bbba-c521-4096-86de-7155c4c49ac4_1115x84.png)

![](/img/hack-the-box-nibbles/9bae50e3-e128-4ecb-b61b-c1c049707364_779x364.jpeg)

After executing the script on our target machine we get a finding. It seems like our user `nibbler` is allowed to run the previously found script `monitor.sh` as `root` without password!

![](/img/hack-the-box-nibbles/5e674bcc-55b2-42c2-b05a-eca600dd29c7_1120x272.jpeg)

In that case let's visit **[GTFOBins](https://gtfobins.github.io/)** again, grab a `reverse shell`, append it to the file `monitor.sh`, and execute the script.

![](/img/hack-the-box-nibbles/3b35d894-01a1-48d8-9b48-089da73ca22f_1116x201.png)

![](/img/hack-the-box-nibbles/3eb468bf-6835-4b3c-b66a-8855d3245cda_547x199.jpeg)

We are `root`! Now we own the machine. All there is left to do, is getting the `root` flag.

![](/img/hack-the-box-nibbles/e49eba1d-743f-4ca1-a52b-aec78caa55f8_552x272.jpeg)
