---
title: Assets
collection: templates
author: Charl Gottschalk
date: 05/04/2017
version: 0.1.0
draft: false
sort: 4
---

# Assets

All your site's assets will be kept in the required `[sourcePath]/templates/[theme]/assets` folder. 

You may structure this folder however you wish. By default CopperSmith will create two folders `/css` and `/js` to keep your style sheets (.css) and JavaScript (.js). 

CopperSmith creates default `/assets/css/app.css` and `/assets/js/app.js` files when running the `copper theme` command.

You may delete these files and replace them with your own.

When your site is generated (`copper build`), the entire `assets` directory and all files within will be copied to the build directory of your site.

### Linking to assets

Linking to your assets is simple using the CopperSmith [asset](/coppersmith/docs/templates/helpers/#asset) helper. This helper will correctly format the url to include the asset into your view.

##### Example

Including a css file:

```html
<link type="text/css" rel="stylesheet" href="\{{asset 'css/app.css'}}">
```

Including a js file:

```html
<script src="\{{asset 'js/app.js'}}"></script>
```

Including an image:

```html
<img src="\{{asset 'img/some-image.jpg'}}" />
```