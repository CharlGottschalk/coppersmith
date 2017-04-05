---
title: Commands
collection: getting-started
author: Charl Gottschalk
date: 05/04/2017
version: 0.1.0
draft: false
sort: 0
---

# Commands

CopperSmith exposes various console commands to help you easily scaffold and build you site.

Each command is called in the following way:

```
copper [cmd]
```

where [cmd] is a command / function to execute.

Each command might present a list of questions to simplify the process.

[init](#init)
[page](#page)
[snip](#snip)
[theme](#theme)
[build](#build)
[publish](#publish)

---

<a name="init"></a>

`init`

Initializes your CopperSmith project. This is the first command that should be called.

###### Example:

```
copper init
```

---

<a name="page"></a>

`page`

Used to create new pages.

###### Example:

```
copper page
```

---

<a name="snip"></a>

`snip`

Used to create HTML snippet files.

###### Example:

```
copper snip
```

---

<a name="theme"></a>

`theme`

Quickly scaffold a custom theme directory.

```
copper theme
```

---

<a name="build"></a>

`build`

Generates your static website in your chosen build folder.

```
copper build
```

---

<a name="publish"></a>

`publish`

Publishes / uploads your generated website to your chosen platform.

*Currently, only plain FTP is supported*

###### Example:

```
copper publish
```
