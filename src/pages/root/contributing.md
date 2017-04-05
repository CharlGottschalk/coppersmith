---
title: Contributing
collection: root
author: Charl Gottschalk
date: 05/04/2017
version: 0.1.0
draft: false
sort: 3
---

# Contributing

If you would like to contribute to CopperSmith, thank you. Here's how you do it.

1. [Fork](https://help.github.com/articles/fork-a-repo/) your own copy of the repo.
2. [Clone](https://help.github.com/articles/cloning-a-repository/) your newly forked copy to your local machine.
3. Open a terminal / command line and `cd` to the root directory.
4. Install dependencies. In your terminal, run `npm install`.

Once NPM has finished installing all dependecies, you can make any changes you want.

#### Before you commit

##### 1. Bump the version

CopperSmith uses semantic versioning ([semver](http://semver.org/)) and each change requires the version to be incremented depending on the type of change.

The version looks like the following:

**1.0.2** or **[major].[minor].[patch]**

###### Bug / Issue

If you fixed a bug or an issue with the code you need to increment the **[patch]** by one (+1).

###### New Feature / Test

If you added a new feature or a new test, you need to increment the **[minor]** by one (+1).

###### Potential Incompatibillity

If you made a change that could possibly break previous versions of the library or is not backwards compatible, you need to increment the **[major]** by one (+1).

The version number needs to be bumped in the following files:

- `package.json` version property

##### 2. Commit

Commit the changes to your forked copy.

##### 3. Create a pull request

[Create a pull request](https://help.github.com/articles/creating-a-pull-request/) and describe in as much detail as possible the changes you made.

#### Note

###### Commenting

Please comment your code thoroughly explaining what each method, function or object etc. does and how it is used.
