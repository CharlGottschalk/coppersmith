# CopperSmith
#### Simple static documentation / site builder using markdown
![semver 0.1.1](https://img.shields.io/badge/semver-0.1.1-green.svg)

---

Please note, that this project is in active development and though it is in a wroking state, I would not recommend you use it for a production site just yet. Feel free however to test it out.

---

## Overview

CopperSmith is a very simple static site builder that uses markdown files, primarily built for myself to quickly roll out documentation (default theme).

The structure of a site looks like the following:

```
- docs/
    - index.md
    - root/
        - page/
            - _snippets/
            - page.md
    - collection/
        - page/
            - _snippets/
            - page.md
```

Apart from the home page (`docs/index.md`), all other pages are contained in folders / collections. The `root` collection will contain the root pages i.e. **domain.com/page**. Any other collections will contain the pages for sub-pages i.e. **domain.com/collection/page**.

All markdown files are stored in a folder of the page name i.e. `docs/collection/page/page.md`.

CopperSmith applies a custom permalink pattern to files, and renames them so that they're nested properly for static sites (converting `about/about.md` into `about/index.html`)

So when the site is rendered, the structure will look like the following:

```
- build/
    - index.html
    - page/
        - index.html
    - collection/
        - page/
            - index.html
```

## Theming

Theming is supported (primitively at the moment) and allows you to easily change the layout and styling using your own custom layouts and partials. Currently only [handlebars](http://handlebarsjs.com/) templating is supported. _More to come._

## Snippets

Including HTML snippets in your pages are easy using a handlebars helper. Just include the snippet helper in your markdown file.

```
{{{snippet 'example'}}}
```

The above code will look for a snippet in the `docs/collection/page/_snippets` folder called `example.html`. If it doesn't find it, it will look for the snippet in the `docs/_snippets` folder.

## Getting Started

#### Install:

In your terminal, run:
```
npm install --save coppersmith
```

#### Initialize

Once installed, in your terminal, run:

```
copper init
```

_Answer the simple questions_

---

Now that CopperSmith is installed and initialized, you may extend your site using the `copper [cmd]` commands.

## Commands

**In your terminal, run:**

```
copper page
```

Add a new page to your site by answering the simple questions.

```
copper snip
```

Add a snippet to a page by answering the simple questions.

```
copper build
```

Generate your static site into your chosen build folder.

## Dependencies

[handlebars](https://www.npmjs.com/package/handlebars) v4.0.5

[inquirer](https://www.npmjs.com/package/inquirer) v1.1.3

[metalsmith](https://www.npmjs.com/package/metalsmith) v2.2.0

[metalsmith-assets](https://www.npmjs.com/package/metalsmith-assets) v0.1.0

[metalsmith-collections](https://www.npmjs.com/package/metalsmith-collections) v0.7.0

[metalsmith-drafts](https://www.npmjs.com/package/metalsmith-drafts) v0.0.1

[metalsmith-headings](https://www.npmjs.com/package/metalsmith-headings) v0.1.0

[metalsmith-ignore](https://www.npmjs.com/package/metalsmith-ignore) v0.1.2

[metalsmith-in-place](https://www.npmjs.com/package/metalsmith-in-place) v1.4.4

[metalsmith-layouts](https://www.npmjs.com/package/metalsmith-layouts) git://github.com/superwolff/metalsmith-layouts.git#master - Waiting for update

[metalsmith-markdown](https://www.npmjs.com/package/metalsmith-markdown) v0.2.1

[metalsmith-permalinks](https://www.npmjs.com/package/metalsmith-permalinks) v0.5.0

[slugify](https://www.npmjs.com/package/slugify) v1.0.2
    
## To Do:

* Add tests
* Finish default theme
* Finish theming
