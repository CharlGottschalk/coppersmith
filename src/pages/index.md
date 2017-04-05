---
title: Home
collection: home
author: Charl Gottschalk
date: 05/04/2017
version: 0.1.0
draft: false
---

# CopperSmith

#### A simple static site builder using markdown

![release](https://img.shields.io/github/release/charlgottschalk/coppersmith.svg) ![npm](https://img.shields.io/npm/v/coppersmith.svg) ![downloads](https://img.shields.io/npm/dt/coppersmith.svg)

---

## Overview

CopperSmith is a very simple static site builder that uses markdown files, primarily built for myself to quickly roll out documentation (default theme).

Using simple commands, you can quickly scaffold your site leaving you to simply edit the content of your pages.

Once built, the site can be hosted anywhere static HTML content is supported, like [GitHub Pages](https://pages.github.com/) and [Netlify](https://www.netlify.com/). It's perfect for shared hosting and systems where you don't have account privileges.

**This very site was built using CopperSmith**

---

The structure of a site is laid out to be easy to maintain and looks like the following:

```
- [sourcePath]/pages/
    - _snippets
    - getting-started/
        - _snippets/
        - intro.md
    - root/
        - _snippets/
        - welcome.md
    - index.md
```

Apart from the home page (`[sourcePath]/pages/index.md`), all other pages are contained in folders / collections. The `root` collection will contain the root pages i.e. **domain.com/page**. Any other collections will contain the pages for sub-pages i.e. **domain.com/collection/page**.

CopperSmith applies a custom permalink pattern to files, and renames them so that they're nested properly for static sites (converting `getting-started/intro.md` into `getting-started/intro/index.html`)

So when the site is rendered, the structure will look like the following:

```
- [buildPath]/
    - getting-started/
        - intro/
            - index.html
    - welcome/
        - index.html
    - index.html
```

{{{snippet 'get-started'}}}