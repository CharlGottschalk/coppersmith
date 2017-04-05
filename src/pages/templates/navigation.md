---
title: Navigation
collection: templates
author: Charl Gottschalk
date: 05/04/2017
version: 0.1.0
draft: false
sort: 3
---

# Navigation

CopperSmith applies a custom permalink pattern to files, and renames them so that they're nested properly for static sites (converting `getting-started/intro.md` into `getting-started/intro/index.html`).

To render navigation for your site, the following code snippet must be used.

```html
\{{#each collections.root}}
    <-- Add links here -->
    <a href="\{{config 'base'}}/\{{path}}">
        \{{title}}
    </a>
\{{/each}}
\{{#each collections}}
\{{#notroot @key}}
    <-- Add links here -->
    <a href="\{{config 'base'}}/\{{path}}">
        \{{title}}
    </a>
\{{/notroot}}
\{{/each}}
```

The structure of the HTML is entirely up to you.

###### NOTE:

The above code does not include the "home" page url. This is so you can include it yourself where ever you want in your navigation. Simply use the `\{{config 'base' }}` helper to insert the correct url. See the [example](#example) below.

#### Explanation

The following code snippet will loop through the `root` collection's pages.

```html
\{{#each collections.root}}
    <-- Add links here -->
    <a href="\{{config 'base'}}/\{{path}}">
        \{{title}}
    </a>
\{{/each}}
```

The following code snippet will loop through all the collections. We use the helper `\{{#notroot @key}}` to make sure we do not include the `root` collection's pages.

```html
\{{#each collections}}
\{{#notroot @key}}
    <-- Add links here -->
    <a href="\{{config 'base'}}/\{{path}}">
        \{{title}}
    </a>
\{{/notroot}}
\{{/each}}
```

Each item will contain a `title` and `path` property. `title` contains the name / title (from the [front-matter](/coppersmith/docs/page-settings/) `title` property) of the page, and `path` contains the relative url to the page.

###### NOTE:

Remember to prefix your page urls in links with `\{{config 'base'}}/` to render the urls correctly.

<a name="example"></a>

#### Example

Rendering a Twitter Bootstrap [Navbar](http://getbootstrap.com/components/#navbar).

```html
<nav class="navbar navbar-inverse navbar-fixed-top">
    <div class="container">
        <div class="navbar-header">
            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
            <a class="navbar-brand" href="\{{config 'base'}}">
                \{{config 'name'}}
            </a>
        </div>
        <div id="navbar" class="collapse navbar-collapse">
            <ul class="nav navbar-nav">
                <li><a href="\{{config 'base'}}">Home</a></li>
                \{{#each collections.root}}
                    <li>
                        <a href="\{{config 'base'}}/\{{path}}">
                            \{{title}}
                        </a>
                    </li>
                \{{/each}}
                \{{#each collections}}
                \{{#notroot @key}}
                <li class="dropdown">
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                        \{{titleCase @key}} 
                        <span class="caret"></span>
                    </a>
                    <ul class="dropdown-menu">
                        \{{#each this}}
                        <li>
                            <a href="\{{config 'base'}}/\{{path}}">
                                \{{title}}
                            </a>
                        </li>
                        \{{/each}}
                    </ul>
                </li>
                \{{/notroot}}
                \{{/each}}
            </ul>
        </div>
    </div>
</nav>
```