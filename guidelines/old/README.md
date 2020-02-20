---
title: RTBF [S]CSS Codebase
sidebarDepth: 2
---

# RTBF [S]CSS Codebase

## Work In Progress

We are currently preparing a huge refactoring of our **old** css codebase.

Sure we use SCSS today but most of the SCSS files were simply `sass-convert` 'ed, keeping the old demons alive (high specificity, deep nesting, etc.)

## CSS Styleguide

We wrote a [complete styleguide for (S)CSS](styleguide.md), please read it all and do your best to respect the guidelines.

## CSS Class name generator

I started writing a document explaining [how we should build up the name of our css classes](classname-generator.md).
If we always use this defined mechanism then, we can ensure a more consistent codebase that becomes way easier to refactor.

## Ensure code quality

For this point, we will need the help from developers to set up a process that will monitor the generated css in all of our repositories and measure critical aspect of CSS:
* Specificity
    * highest
    * average
* Number of selectors
* Filesize
* ...
