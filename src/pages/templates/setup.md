---
title: Setup
collection: templates
author: Charl Gottschalk
date: 05/04/2017
version: 0.1.0
draft: false
sort: 0
---

# Setup

Before you can use a custom theme, you need to setup a directory in which your template will be kept.

To help you, CopperSmith includes a handy command to quickly scaffold the required directory structure for you.

In your terminal, run:
 
 ```
 copper theme
 ```

This will create a `templates/[theme]` folder inside your `sourcePath`.

The command will create the following directory structure:

```
- [sourcePath]/templates
    - [theme]
        - assets
            - css
                - app.css
            - js
                - app.js
        - layouts
            - master.html
        - partials
            - footer.html
            - head.html
            - nav.html
            - scripts.html
```

Use the `assets` folder to keep all your site assets such as images, fonts, styles etc. During `copper build` the entire assets folder will be copied to your build directory. More over at [assets](/coppersmith/docs/templates/assets/)

Your theme **MUST** have a `[sourcePath]/templates/[theme]/layouts/master.html` file. CopperSmith uses this file to render each page of your site. More over at [layouts](/coppersmith/docs/templates/layouts/)

The `partials` directory is where you will keep your page "pieces" that will be included in the `master.html` layout. More over at [partials](/coppersmith/docs/templates/partials/)

_By default, the generated theme is setup to use [jQuery](https://jquery.com/), [Twitter Bootstrap](http://getbootstrap.com/) and [FontAwesome](http://fontawesome.io/) inside the `[sourcePath]/templates/[theme]/partials/head.html` and `[sourcePath]/templates/[theme]/partials/scripts.html` files._