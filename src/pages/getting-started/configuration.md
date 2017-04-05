---
title: Configuration
collection: getting-started
author: Charl Gottschalk
date: 05/04/2017
version: 0.1.0
draft: false
sort: 1
---

# Configuration

When CopperSmith initializes, it ceates a `coppersmith.json` file in your project's root directory.

This is where you will set various options for CopperSmith to use.

It looks like the following:

```json
{
  "name": "Website Name",
  "author": "Author Name (http://domain.com)",
  "sourcePath": "docs",
  "buildPath": "build",
  "base": "http://domain.com",
  "template": {
    "path": "",
    "theme": "default",
    "skin": "black-light"
  },
  "options": {
    "copyright_year": "2016",
    "copyright_url": "http://domain.com",
    "copyright_display": "Website Name"
  },
  "publish": {
    "to": "ftp",
    "destination": "public_html/destination/folder",
    "config": {
      "host": "ftp.domain.com",
      "port": 21,
      "username": "username",
      "password": "password"
    }
  }
}
```

### Properties

- `name`: The name of your website.
- `author`: The default author of the site.
- `sourcePath`: The path relative to your project root where your site will be created.
- `buildPath`: The path relative to your project root where your site will be generated to. *Cannot be empty or the same as the project root. CopperSmith will automatically set to `build` if not specified.*
- `base`: The base url of your site. CopperSmith uses this to correctly format navigation urls.
- `template`: Template specific configuration.
    - `path`: The path relative to your project root where your template is stored.
    - `theme`: The theme to use. The theme is just a directory of the same name stored inside the template `path`.
    - `skin`: The theme skin to use. 
    - *Both `theme` and `skin` are default properties for the CopperSmith `Default` template.*
- `options`: Contains any custom options, or settings that can be used by templates and the CopperSmith `option` handlebars helper.
- `publish`: the various settings used by the `copper publish` command.
    - `to`: The publisher to use. Currently only *ftp* is supported.
    - `destination`: The destination folder / remote folder where your generated site should be uploaded.
    - `config`: The specific configuration for the selected publisher.


