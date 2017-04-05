# CopperSmith

#### A simple static site builder using markdown

![release](https://img.shields.io/github/release/charlgottschalk/coppersmith.svg) ![npm](https://img.shields.io/npm/v/coppersmith.svg) ![downloads](https://img.shields.io/npm/dt/coppersmith.svg)

---

## Overview

CopperSmith is a very simple static site builder that uses markdown files, primarily built for myself to quickly roll out documentation (default theme).

Using simple commands, you can quickly scaffold your site leaving you to simply edit the content of your pages.

Once built, the site can be hosted anywhere static HTML content is supported, like [GitHub Pages](https://pages.github.com/) and [Netlify](https://www.netlify.com/). It's perfect for shared hosting and systems where you don't have account privileges.

Read [documentation here](https://charlgottschalk.github.io/coppersmith/docs/)

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

## Snippets

Including HTML in your markdown is easy using the CopperSmith handlebars helper, `snippet`. Just include the snippet helper in your markdown file where you want the HTML snippet inserted. 

This is so we can keep our markdown clean.

```
## Example Markdown Title

Example markdown text

{{{snippet 'example'}}}

## Another Markdown Title
```

Each collection will have their own `_snippets` folder in which all HTML snippets will be kept.

The above code will look for a snippet in the page's collection `_snippets` folder called `example.html`. If it doesn't find it, it will look for the snippet in the global `[sourcePath]/pages/_snippets` folder.

## Templates

Templating is supported and allows you to easily change the layout and styling with your own custom layouts and partials using the [handlebars](http://handlebarsjs.com/) templating engine.

Simply run `copper theme` in your terminal and CopperSmith will setup a templates folder for you to create your own themes.

Read the [templating docs](https://charlgottschalk.github.io/coppersmith/docs/templates/setup/) for more info.

## Getting Started

#### Install:

In your terminal, run:
```
npm install -g coppersmith
```

or if you're using [Yarn](https://yarnpkg.com/)

```
$ yarn global add coppersmith
```

#### Initialize

Once installed, in your terminal, run:

```
copper init
```

_Answer the simple questions to initialize CopperSmith_

---

Now that CopperSmith is installed and initialized, you may extend your site using the `copper [cmd]` commands.

_Each command will present certain questions_

## Commands

**In your terminal, run:**

```
copper page
```

Add a new page to your site.

```
copper snip
```

Add a snippet to an existing collection.

```
copper build
```

Generate your static site into your chosen build folder.

```
copper publish
```

Publish your site to a public server.

_Currently, only plain FTP is supported_

```
copper theme
```

Setup a theme folder for a custom template.

---

Read [documentation here](https://charlgottschalk.github.io/coppersmith/docs/).

If you would like to contribute to the project, please read [contributing](https://charlgottschalk.github.io/coppersmith/docs/contributing/).

---

## Dependencies

[chalk](https://www.npmjs.com/package/chalk) v1.1.3

[ftp](https://www.npmjs.com/package/ftp) v0.3.10

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

[pretty-error](https://www.npmjs.com/package/pretty-error) v2.0.0

[slugify](https://www.npmjs.com/package/slugify) v1.0.2

[url-join](https://www.npmjs.com/package/url-join) v1.1.0

## Credits

**Default** theme based on the awesome [AdminLTE](https://almsaeedstudio.com/preview) by [Abdullah Almsaeed](https://almsaeedstudio.com/)