---
title: Partials
collection: templates
author: Charl Gottschalk
date: 05/04/2017
version: 0.1.0
draft: false
sort: 2
---

# Partials

You might like to split your `[sourcePath]/templates/[theme]/layouts/master.html` into easier to maintain parts. For this, we use partials.

When you run the `copper theme` command, CopperSmith will create a partials folder at `[sourcePath]/templates/[theme]/partials` with a few ready made partials.

You may replace these partials with your own.

Partials aren't required, but it helps to keep your code a little easier to maintain.

To include and render partials inside other partials or the `master.html` layout, you may use the [handlebars](http://handlebarsjs.com/) partial [helper](http://handlebarsjs.com/partials.html).

##### Example

The following code snippet will look for and include the `[sourcePath]/templates/[theme]/partials/nav.html` partial.

```
{{> nav}}
```