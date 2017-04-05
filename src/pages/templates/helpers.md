---
title: Helpers
collection: templates
author: Charl Gottschalk
date: 05/04/2017
version: 0.1.0
draft: false
sort: 5
---

# Helpers

CopperSmith includes various [handlebars](http://handlebarsjs.com/) helpers that can be used throughout your template.

[is](#is)
[titleCase](#titleCase)
[asset](#asset)
[snippet](#snippet)
[config](#config)
[option](#option)
[skin](#skin)

---

<a name="is"></a>

`is`

Provides an extended conditional (if) helper.

**Usage:**

```
\{{is 'left' 'operator' 'right'}}
_Do Something_
\{{/is}}
```

**Available Operators:**

- `'==', '==='`
- `'!=', '!=='`
- `'<'`
- `'<='`
- `'>'`
- `'>='`
- `'&&'`
- `'||'`

###### Example:

```html
\{{is 'this' '===' 'this'}}
<p>Yes it is</p>
\{{/is}}
```

---

<a name="titleCase"></a>

`titleCase`

Returns a "Title Cased" version of the provided string.

**Usage:**

```
\{{titleCase 'some text'}}
```

###### Example:

```html
<p>\{{titleCase 'some text'}}</p>
```

will result in 

```html
<p>Some Text</p>
```

---

<a name="asset"></a>

`asset`

Used to return the correct url to an asset, relative to the assets folder, such as a style sheet (`.css`).

**Usage:**

```
\{{asset 'css/asset.css'}}
```

###### Example:

```html
<link type="text/css" rel="stylesheet" href="\{{asset 'css/app.css'}}">
```

---

<a name="snippet"></a>

`snippet`

Used to insert the contents of a snippet file inside a page's markdown.

**Usage:**

```
\{{{snippet 'example'}}}
```

###### Example:

```
## Example Markdown Title

Example markdown text

\{{{snippet 'example'}}}

## Another Markdown Title
```

The above code will look for a snippet in the page's collection `_snippets` folder called `example.html`. If it doesn't find it, it will look for the snippet in the global `[sourcePath]/pages/_snippets` folder.

---

<a name="config"></a>

`config`

Returns the value of a property in the `coppersmith.json` file.

**Usage:**

```
\{{config 'property.to.return'}}
```

###### Example:

```html
<a class="navbar-brand" href="\{{config 'base'}}">\{{config 'name'}}</a>
```

---

<a name="option"></a>

`option`

Similar to `config`, but returns the value of a property in the `coppersmith.json` file `options` property.

**Usage:**

```
\{{option 'property.to.return'}}
```

###### Example:

```html
Copyright © \{{option 'copyright_year'}} <a href="\{{option 'copyright_url'}}">\{{option 'copyright_display'}}</a>.
```

---

<a name="skin"></a>

`skin`

Returns the value of the `coppersmith.json` file `template.skin` property.

**Usage:**

```
\{{skin}}
```

###### Example:

```html
<body class="\{{skin}}">
...
</body>
```