---
title: Page Settings
collection: getting-started
author: Charl Gottschalk
date: 05/04/2017
version: 0.1.0
draft: false
sort: 2
---

# Page Settings

Each page (`\*.md`) contains [front-matter](http://assemble.io/docs/YAML-front-matter.html), a block of YAML at the beginning of the file that is used to configure settings for your pages.

It looks like the following:

```yaml
---
title: Page Name
collection: root
author: Author Name (http://domain.com)
date: dd/mm/yyyy
version: 0.1.0
draft: false
sort: 0
---
```

- `title`: The name of the page as it will appear in navigation and headings.
- `collection`: The collection the page belongs to. Used by the permalink generator.
- `author`: The original creator of the page, taken from `coppersmith.json [author]`.
- `date`: The date on which the page was created.
- `version`: The current version of the page.
- `draft`: Whether this page is a draft. If `true` then the page will be ignored during generation.
- `sort`: The zero-based index of the page for sorting in the navigation.