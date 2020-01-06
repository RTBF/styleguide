# RTBF CSS styleguide

**Hey there, welcome to the RTBF CSS Styleguide :)**

When you are writing (S)CSS code for RTBF, you must respect the following guidelines.

## Table of content

01. **Prerequisites**
02. **Basic principles**
    01. KISS
    02. Cascading
    03. Start abstract
    04. Patterns
    05. Decorating strategy
    06. DRY
    07. Using ID is forbidden
    08. Location agnostic
    09. The art of balance
03. **CSSComb**
    01. About CSSComb
    02. Be careful
    03. csscomb.json
    04. CSSComb conclusion
04. **Coding style**
    01. Spacing and indentation
    02. Formatting
    03. Nesting
    04. Examples
    05. File organization
    06. Including CSS files
    07. rtbf/www
    08. RTBF mixins
    09. RTBF shared
    10. Pixels vs. ems
    11. Specificity (classes vs. ids)
    12. Depth of applicability guidelines
    13. CSS Specificity guidelines
    14. About margin and padding
05. **Naming conventions**
    01. RTBF Classname generator
    02. Naming your $sass-variables
    03. About pseudo states
    04. About Bootstrap states
    05. About other states
06. **Tools and resources**

---

## 1. Prerequisites

Use English in our code.

Why? 

- We should use only one language in our source code.
- English is the most common language in our codebase and in the 3rd party library we use.
- HTML, CSS, JavaScript are all based on English language (e.g. \<a\> is for anchor).
- You may work with other colleagues which may not know french.
- French has richer vocabulary than English, which is not an advantage for our code.
- For the sake of consistency.


Before continuing, you should have a general understanding for the following concepts/technologies:

- [CSS specificity](http://www.smashingmagazine.com/2007/07/27/css-specificity-things-you-should-know/)[1]
- [Depth of applicability](http://smacss.com/book/applicability)
- [SMACSS](http://smacss.com/) (Scalable and Modular Architecture for CSS)[2]
- [Compass](http://compass-style.org/)
- [SCSS syntax](http://sass-lang.com/documentation/file.SASS_REFERENCE.html)
- CRYO addCSS zones[3]

1. You can also learn in a more practical way with [CSS Explain](http://josh.github.io/css-explain/) and you should check this presentation about [CSS and performances](https://speakerdeck.com/jonrohan/githubs-css-performance) by Jon Rohan.
2. Too long; Didn't read ? Then watch the [2 minutes presentation of SMACSS by Jonathan Snooks](https://tv.adobe.com/embed/1047/14710/).
3. You must define wisely in which zone your CSS file is loaded: `zone_common` is loaded first on all pages of the site, second is `zone_header` which contains widget CSS which are loaded conditionally (e.g. if activated in CMS) and finally `zone_content` which is loaded last   and contains CSS needed for specific pages.

---

## 2. Basic principles

### 2.1 KISS

> KISS is an acronym for "Keep it simple, stupid" as a design principle noted by the U.S. Navy in 1960.
> The KISS principle states that most systems work best if they are kept simple rather than made complicated;
> therefore simplicity should be a key goal in design and unnecessary complexity should be avoided.

How often does your expensive high tech devices fail or freeze? Quite often, I guess. 

Now did you ever encounter a failing situation with a basic objects like a bottle opener? Probably never... Why? 

Because the more complicated = the more fragile and the more subject to problems.

**Please aim for simplicity**, your colleagues and yourself will be worthy if you did it. Simple is easy to use, not easy to build. If you build modules which are simple, it'll be easier to re-use them.

### 2.2 Cascading

Cascading is the mechanism that drives CSS, it is all based on inheritance. 
Some properties are inherited from the parent(s) element(s).

Use it to your advantage, if you did a good job, you should not have to "undo" properties changes.

Just like with mobile first principle, you don't want to revert engineer the page to shrink it down.

Instead you want to keep extending... From basic to specific. Seems logical to you?

### 2.3 Start abstract

If you define base classes that represent a common base or the root of a specific module, you must stay abstract.

You must resist the temptation to adapt a global style for your own needs or for a particular situation.

If you don't stay abstract then, your class reusability will decrease or you'll be forced to "undo"...

Good developers are lazy. 
Simpler, abstract code enhances re-usability. 
The more re-using you do, the less code you write.

Less code, less bugs.

### 2.4 Patterns

You should always try to distinguish the common patterns in your code. If you see one, then it is probably a nice candidate for re-use.

### 2.5 Decorating strategy

When you deal with elements using patterns or global/common/shared classnames, always prefer the decorating strategy. 

What I call decorating strategy is adding an extra class in case the element using the common/shared class needs more custom styles. Styles that we don't want to propagate to all elements using the common css class. Common classes should define the bare minimum because we do not want to reset styles inherited by mistake... 

A good example is the swiper classes. By default it is using `.swiper-container`, `.swiper-wrapper` and `.swiper-slide`. We should not change the default style properties of these classes and we should use them with our own extra classes that will allow us to keep nice, simple and easy to reuse `.swiper-...` classes.

It might be tempting to use a different classname instead of 2 (library base class + custom class), but if you do so you duplicate rules instead of re-using them. Sure the markup looks simpler, but it is an illusion: you add complexity by introducing your new classes! DRY Please!

It starts simply by avoiding to reinvent the wheel, so make sure you know the main utilities classes and mixin provided by the libraries/frameworks that we use (Bootstrap, Compass, etc.)

- You can inspect exactly [what compass mixins do](https://github.com/Compass/compass/tree/stable/core/stylesheets) in the source code of its stylesheets.
  For example, you could discover that the `@mixin inline-block()`takes an optional argument which by default set the vertical align to `middle`...
- You should read (at least once) the entire [documentation of Bootstrap](http://getbootstrap.com/css/), I guarantee that you will discover time saving classes... 
  For example, instead of always removing default styles of `<ul>`, simply use `list-unstyled` utility class.

### 2.6 DRY

> In software engineering, don’t repeat yourself (DRY) is a principle of software development, aimed at reducing repetition of information of all kinds (...)

If you find yourself copying and pasting a all bunch of lines without taking the time to think about how you could improve the process then you're a good candidate for "Repeating Yourself". 

Later on, if we need to fix a bug in your code, chances are you'll have to fix it at multiple places, which is ridiculous.

Don't rush, think before you code.

### 2.7 Using ID is forbidden

ID must be avoided at all costs in (S)CSS. 
An ID is not re-usable, it causes specificity hijacking and it quickly becomes a deadly specificity trap. Start using ID, then the specificity gets +100 and troubles are coming.

Nowadays, even JavaScript files use classes instead of IDs, you have no excuse.

### 2.8 Location agnostic

Ideally, you should create CSS rules that belong to a dedicated module and it should be "location agnostic". In other words, a module should should render correctly no matter where it is appended. If you need, you can use additional classes like 
`.www-m-widget-articles--compact`. 

**Get rid of** the old and bad habit of doing it with **nesting** 
`.some-parent-context .some-module-that-will-use-too-much-specificity`.

### 2.9 The art of balance

As a web integrator, you must find the correct equilibrium between depth of applicability and specificity. In most of the cases, it will fall into 2 scenarios:

- a **global base rule** with a **high depth of applicability** and a **low specificity** (e.g. `a {...}`)
- a **module** or `module__element` rules defined with a CSS class (e.g. `.m-mymodule {...}`) which **reduces the depth of applicability*** to this class but also gets a **_slightly_ higher specificity**.

---

## 3. CSSComb

### 3.1 About CSSComb

[CSSComb](http://csscomb.com/) is a great tool that **helps web integrators keeping a consistent coding style** in their (S)CSS files. 

It applies a whole set of rules to our source code: 

- indentation
- spacing
- properties ordering
- syntax rules
- etc. 

In our case, we always use SCSS so we will focus this guide on SCSS as the CSS content is compiled from our sources files in SCSS using Compass.

This is great news since we can (and must) provide a well formatted, well documented source code. We don't have to worry about the additional file size it represents... In the end, the compiled CSS code is compressed as much as possible to reduce its file size. And it is all automatic and painless.

Back in september 2014, we defined together the settings we should use when applying the big CSS Comb. The config file [`csscomb.json` is available](csscomb.json) and should be used with CSSComb since it respect as much as possible the syntax rules we chose.

### 3.2 Be careful

**Warning:** as you may remember that with great power comes great responsibility.

CSSComb is no exception. While it can help, **it can also harm the code** you spent a lot of time to polish.

Here is my recommandation: **isolate the usage of CSSComb**. 
Do not apply CSSComb every time you change a SCSS file.

Instead **respect the following steps**:

1. Commit your changes first, you want to keep it clean and simple!
   You should do this every time you prepare for some robotic refactoring.
2. Now you can apply CSSComb using the command line `csscomb your-css-file.scss`
3. Then, You MUST inspect the changes CSSComb did using your favorite diff tool
4. Edit your file manually if you need to adapt small chunks of your code
5. Test the rendered page and inspect the compiled CSS
6. If you are happy with the result then you may commit your changes

Off course, if you are unhappy with the entire result, you can always "Discard local changes".

Please **think about your colleagues when you use CSSComb**. Applying CSSComb can bring plenty of changes in your SCSS files which **will probably create conflicts** in the git repository. 

My advices: warn your colleagues and avoid applying CSSComb when the files are under development. Apply that polish only when the shoe is clean and ready!

### 3.3 csscomb.json

You can read more about the chosen configuration of CSSComb in the [CSSComb.md read me file](csscomb.md).

### 3.4 CSSComb conclusion

Now you should have a better idea on what CSSComb does but these options do not reflect the true **main purpose of CSSComb** which is to re-arrange the **order in which the properties are declared**.

**Why does the order of properties matters?**

- some properties are critical while some are trivial 
  (`position` is critical, `color` is trivial, don't you think?)
- it groups related properties together 
  (layout, position, text related, etc.)
- the code becomes easier to read because the order is consistent
- it helps out find copycats
  (sometimes, you could declare the same properties several times by mistake, you'll see it in a snap now)
- it turns prefix nightmare into a sweet dream

---

## 4. Coding style

Some rules were described in the CSSComb config part of this file but I'll insist on them once more time then.

### 4.1 Spacing and indentation

- Use **carriage return of `type LF (Unix)`** instead of Windows or Mac OS.
- Use soft-tabs with a **4 spaces indent**. Spaces are the only way to guarantee code renders the same in any person's environment.
- When grouping selectors, **keep each individual selector to a single line**.
  I repeat: one selector per line.
- Put **1 space before `{`** in rule declarations.
- **New indented line after `{`**.
- **No space before `:`** in property declarations.
- **At least 1 space after `:`** in property declarations.
- **Each declaration should appear on its own line** for more accurate error reporting.
- Always add **`;` after the property value**.
- Place **closing braces of declaration blocks on a new line**.
- Put **line breaks between rulesets**.
- Empty lines between 2 rules should contain the number of spaces matching the indentation of the second rule.

We accept one exception regarding **writing a ruleset all in one line**. 
It is allowed if it increases readability of your code, best shown in this example...

```scss
// Single line ruleset is allowed if it increases readability
.footer-sitemap-container {
    border-top: 2px solid #999;
    // Custom colors per website
    .rtbfhome & {       border-top-color: #0065bd; }
    .irtbf & {          border-top-color: #0099bf; }
    .rtbfsport & {      border-top-color: #66cc33; }
    .rtbfculture & {    border-top-color: #803588; }
    ...
}
```

### 4.2 Formatting

- Use only `snake-case` in your SCSS, no `camelCase`, `UPPERCASE`, only `lowercase` with a `-` between words.
- Use hex color codes `#000` unless if you need set alpha value with `rgba()`.
- When using `rgba()`, you should not use distinct values for `r`, `g` and `b` channels, you must simply pass a `color` as first argument, then the `alpha`. 
  For example: `rgba(#abcdef, 0.5);` is easier to read than `rgba(171, 205, 239, 0.5);`
- Use `//` for basic comment blocks (instead of `/* */`).
- The only times you can use multiline comments block like `/* */` are when you are using [CSSDoc](http://timkadlec.com/2008/12/manageable-css-with-cssdoc/)
- Or when you want to inform about the intended tag on which your selector should apply.
  For example `/*body*/.theme-laune` indicates that the class `theme-laune` is intended to be on the `<body>` but it prevents your selector from becoming "overqualified" (specificity higher than required).
- Avoid specifying units for zero values, e.g., `margin: 0;` instead of `margin: 0px;`.
- Be gentle — Strive to limit use of shorthand declarations to instances where you must explicitly set all the available values. In other words, *only modify the exact properties that need to be changed*. Nothing more.

#### Example of CSSDoc

If you do apply the KISS principle, then your code should be simple enough to skip explaining how it works... But sometimes you can't apply the KISS principle. When complexity is inevitable, then you should take the time to explain it for your (future) self as well as for your colleagues. You'll be glad to find help when you go back in your code few years later!

Here is an example of CSSDoc comment that you could find in the first lines of your (complex) files.

```scss
/**
 * Homepage Style
 *
 * Standard Layout (all parts) for Big Little Homepage
 *
 * This style has been designed by Mina Margin. It reflects
 * the composition of colors through the years of the
 * customers project as well as the boldness it implies.
 *
 * @project   Big Little Homepage
 * @version   0.2.8
 * @package   xhtml-css
 * @author    Mina Margin
 * @copyright 2008 by the author
 * @cssdoc    version 1.0-pre
 * @license   GPL v3
 *
 * @colordef  #fff; white
 * @colordef  #808080; standard grey
*/
```

### 4.3 Nesting

**Nesting should be avoided/limited as much as possible.**

As a rule of thumb, avoid unnecessary nesting in SCSS. **At most, aim for three levels** (this is know as the "Inception rule"). If you cannot help it, step back and rethink your overall strategy (either the specificity needed, or the layout of the nesting).

**Nesting is tricky to use**, if you doubt, please share your faced issue with your colleagues.

Valid scenarios for using nesting:

- When repeating a classname on every direct child of an element would feel too heavy...
  `.www-list-grid > li` (Note the usage of `>` for limiting to direct children)
- When you need to redefine **base** styles for all child elements of a specific type.
  `.some-module a` (Reach every single anchor within some-module)

If you use nesting to redefine style properties which are too specific, then you will have to fight back to climb the waterfall and reset properties changed by unwanted inheritance and things get ugly. :(

### 4.4 Examples

Here are some good examples that apply the above guidelines:

```scss
// Example of good basic formatting practices
.styleguide-format {
    color: #000;
    background-color: rgba(#fff, 0.5);
    border: 1px solid #0f0;
}



// Example of individual selectors getting 
// their own lines (for error reporting)
.please,
.use-only,
.one-selector,
.per-line {
    display: block;
}



// Avoid unnecessary shorthand declarations
.not-so-good-too-intrusive {
    margin: 0 0 20px;
}
.better-because-less-intrusive {
    margin-bottom: 20px;
}



// Use white spaces to your advantage
.example {
    width: 20px;
    height: 20px;
    line-height: 20px;
}
.example-even-better {
    $size: 20px; // Local variable that ease modifications
    width:       $size;
    height:      $size;
    line-height: $size;
}
```

### 4.5 File organization

There are no strict file organization in place but I encourage you to use this structure as example and adapt it:

```
scss
├── _site-settings.scss
├── base
│   ├── _link-colors.scss
│   └── _site-custom-reset.scss
├── layout
│   ├── _retina-images.scss
│   └── _layout-utilities.scss
├── state
│   └── _global-states.scss
├── module
│   ├── _homepage.scss
│   ├── homepage
│   │   ├── _headline.scss
│   │   └── _carousel.scss
│   └── _contact.scss
├── theme
│   └── _christmas.scss
└── style.scss
```

What is important in this structure?

- We use the 5 folders to match the 5 SMACSS categories.
- `_site_settings.scss` gives an entry point for all site-wide SCSS `$variables` configuration
- We use partial files starting with `_`. They do not generate css files but can be used by other SCSS files. Smaller files are easier to keep nice and tidy.
- We use subfolders to keep files short, clean and focused on their dedicated purpose. The subfolders contains files that normally would be section in a larger SCSS file. For example, instead of writing a table of content by hand inside of `_homepage.scss`, the file only contain comments and `@import`, which represent the TOC and loads its sections from partials within the homepage folder. 
- We use "master" stylesheets (without leading `_`), these master stylesheets generates CSS files and their source code only contains comments and `@import`...

#### 2015 Revamp

The revamp started in early 2015 is a bit different in the structure it uses. 

The new version of the `www` repository is replaced by `news/common` (temporary name).
While the `www` repo did contain multiple old files that were used at the time when rtbf home hosted in this repo.
Now we keep it separated: all the files that are inside `news/common` are common.

The third party libraries are located inside a `vendor` folder.

Another folder called `scaffolding` is hosting CSS files that will be used directly inside a style tag in the HTML markup.
Each revamped site will use a file from the new www within this folder. In other word, every single site will be depending on the new common.

Using the scaffolding technique is challenging! We'll do some researches and share the chosen solution.

### 4.6 Including CSS files

As you can see from the file organization, we use a lot of partials... 
This way, for most of our websites, we generate less CSS files while keeping it clean and short.

At this date, some of our stylesheets have more than 2500 lines! Let's avoid this.

Using `@import` combined with a nice file organization also offer a nice "Table of content/section" without any maintenance!

We could instead use multiple `addCSS` calls in the php files but it does not offer enough control over the order of import and it is difficult to get a clear view of what will be imported where...

We can have some influence over the order of the `addCSS` using the zone parameter (common, header, content)...

### 4.7 rtbf/www

The `www` repository acts as a shared library for common modules, CSS, JavaScript and images. For this reason (amongst other reasons), its structure is different and it does not use as much partials as regular websites.

There is also a strong dependency between all RTBF websites and the `www` site.

### 4.8 RTBF mixins

Reminder about mixins... 

> Mixins allow you to define styles that can be re-used throughout the stylesheet without needing to resort to non-semantic classes like .float-left. Mixins can also contain full CSS rules, and anything else allowed elsewhere in a Sass document. They can even take arguments which allows you to produce a wide variety of styles with very few mixins.

In short *mixins are generators of CSS*, also, they won't generate any code if you just `@import` them... You need to invoke them with `@include`.

In order to centralize and DRY our own @mixin library, we created a folder at `rtbf/www/public/static/scss/mixins`. 

At the moment of writing this document, we wrote 5 mixins and 1 importer.

- `rtbf-breakpoint`
- `rtbf-ellipsis`
- `rtbf-font-size-rem`
- `rtbf-retina-screens`
- `rtbf-warning`

Each mixin is hosted in its own file with its own documentation.

Please note these important remarks:

- We use a prefix of `rtbf-` for all our global mixins hosted here.
- One mixin is defined and documented per file.
- Every single rtbf mixin file is imported in the `_rtbf-mixins.scss` importer for ease of use.

As explained in their comments, you must `@import` rtbf-mixins in order to use them. You must use a relative path in the `@import`.

For example, if want to use them in `tv/tv`, I'll have this @import in the master stylesheet of tv...

`@import "../../../../../www/public/static/scss/mixins/rtbf-mixins";`

You must adapt the number "parent folder" (`../`) as the import path is relative to your current file... 
Then, calling `@include rtbf-ellipsis(100px);` would cause the one line of text for the current node to be limited to 100px, if larger it would get shortened by `...`.

#### Side note about Compass's mixins

Why would you write more code when Compass can do it for you. You won't end up with less generated code at the end but it is easier to read, easier to manage and you prevent ordering mistakes.


About compass mixins, here is a list of the most popular:

- All mixins within [`compass/css3`](https://github.com/Compass/compass/blob/stable/core/stylesheets/compass/_css3.scss) take care of prefixing vendors for you
- The [`stretch`](https://github.com/Compass/compass/blob/stable/core/stylesheets/compass/layout/_stretching.scss) mixin and its variants helps with absolute positioning
- We don't use it but Compass offer great and powerful font management, they call it the vertical-rythm
- Compass also provide CSS reset functionality but we currently use the reset injected by Bootstrap
- The sprite engine an help us when we cannot use a webfont for icons...

### 4.9 RTBF shared

The `shared` folder is a sibling to the `mixins` folder but it is used in a different way. While we use the rtbf-mixin to generate CSS code, we use the rtbf-shared folder to reuse tiny generated stylesheets amongst our websites. The code generated by our rtbf-mixins can vary depending on the parameters we used while rtbf-shared always contains the same utility classes, no matters the place where it is used.

Different but complimentary.

We use the `shared` folder so that we can respect the *DRY* principle... Why would we duplicate common classes and rulesets?
You should be responsible and think about reusing global patterns amongst all of our websites. It is a smart investment and it'll save you a lot of time if you have to refactor!

Also, do not be afraid about multiple (extra) http calls... Don't forget that CRYO concatenate CSS for you.

### 4.10 Pixels vs. ems

By default, we just follow the recommandation made by the [GitHub CSS styleguide](https://github.com/styleguide/css)...

> Use px for font-size, because it offers absolute control over text. Additionally, unit-less line-height is preferred because it does not inherit a percentage value of its parent element, but instead is based on a multiplier of the font-size.

And in specific cases, we can use rem for font-size...

### 4.11 Specificity (classes vs. ids)

ID are forbidden in our source code. The only exception is for third party library, such as advertising already using ID without any alternative. If an alternative is possible, then we should plan to refactor the current code.

When styling a component, always prefer classname, if you must use nesting prefer direct descendant selectors, and use as little specificity as possible. Here is a good example:

```html
<ul class="category-list">
    <li class="item">Category 1</li>
    <li class="item">Category 2</li>
    <li class="item">Category 3</li>
</ul>
```
```scss
.category-list { // class namespace which will also be used as namespace

    // Direct descendant selector > for list items
    > li {
        list-style-type: disc;
    }

    // Minimal specificity for all links
    // In this case we target all anchors and
    // not only direct child of .category-list
    a {
        color: #f00;
    }
}
```

### 4.12 Depth of applicability guidelines

This depth of applicability guidelines have 2 purposes:

- Reduce the workload for the browser
- Avoid overqualified inheritance 

#### Give some time off to the browser

Browsers read each CSS selector and parse the HTML markup in the quest for matching nodes. It can quickly become a long and exhausting process.

When you use selectors such as: `.my-module a` (selectors ending with an element name).
Then, every single anchor (`a`) present in your html will get scanned by the browser.
It could be 500+ anchors! Whenever it is possible, the last part of your selectors should be a class name. This way, only the potential candidates will get parsed and not every single anchor.

Don't get me wrong, it is not forbidden to end your selectors with a tag name. You just need to know what are the consequences of it.

Now imagine the huge parsing task on your browser's shoulders when you use `*`!
Every single node of your page will get examined! Every single node! Think about it.

What should I do?

1. Avoid universal selector `*`, be responsible!
2. Try to end your selectors with a class instead of an element
3. Use direct child `>` whenever it is possible

#### Avoid unwanted inheritance

If the selectors you are using are too vague, e.g. `.my-module a`...
Then you get style properties that you do not want that were simply inherited.

Think about our example, does every single `a` inside `.my-module` need the style properties defined in our rule? If not you could use a class name or `>` or even both!

### 4.13 CSS Specificity guidelines

- Always try to use the lower specificity possible
  Most of the time, it will be 1 or 10, respectively `element` or `.class-name` but using elements will be too generic (Depth of applicability) and/or too weak (Specificity), so classes should be the best choice.
- When modifying an existing element for a specific use, try to use specific class names.
  Instead of `.listings-layout.bigger` use rules like `.listings-layout.listings-bigger`.
  Think about ack/greping your code in the future.
- The class names `disabled`, `mousedown`, `danger`, `hover`, `selected`, and `active` should always be namespaced by a class (`button.selected` is a good example).

### 4.14 About margin and padding

In order to stay consistant, we should always try to use the `margin-bottom` instead of mixing between margin-top and bottom... The left and right margin are often set via the grid container utility classes (example: `col-sm-6`).

In short, use `margin-bottom` for vertical margin...

## 5. Naming conventions

### 5.1 RTBF Classname generator

You should read, know and use the class naming convention defined in the [RTBF Classname generator](classname-generator.md). 
Also, print your copy of the [Classname generator flowchart](RTBF-CSS-class-generator-flowchart.pdf?raw=true).

We encourage using B.E.M. because it offers many advantages, the main advantage is reducing the risk of classname collision. Sure a classname like `menu` or `breadcrumb` is short and sexy but wait until somebody else did use the same sexy classname! I know short classnames are tempting but you are not the only person writing CSS. This also apply to third party libraries... 
Better be safe than sorry.

### 5.2 Naming your $sass-variables

Here are some useful tips that you can use when naming sass variables...

- SASS don't make the difference between `_` and `-` but we use `-` (dash)
- You don't have to choose between a name describing the value or the usage... 
  You can use both! `$color-blue: #4183c4;` then `$color-primary: $color-blue;`
- Start variable name by the type of value instead of the module...
  It will help the autocompletion because in the current file, you are probably styling a single module!
  `$color-link-newsletter: #f00;` instead of `$newsletter-link-color`
- Use soft assignment with the `!default` suffix

SASS variables are very basic, they do not offer scoping (like you get in JavaScript) so be aware that you could create side effects... Also, as they are replaced in the compiled CSS they just help providing more meaning in your source code and easier management, nothing more!

### 5.3 About pseudo states

Quick reminder about the pseudo states, they must follow a predefined order for best support...

```scss
// Order of
// Pseudo-classes LoVeHAte (Link, Visited, Hover, Active)
a:link,
a:visited,
a:hover,
a:active,
a:focus {
    //...
}
```

Don't forget `:focus` which is required for keyboard navigation.

### 5.4 About Bootstrap states

Bootstrap uses the following states:
```scss
// States
.active,
.focus,
.success,
.info,
.warning,
.danger,
.disabled,
.open,
.open

// Has
.has-active,
.has-success,
.has-info,
.has-warning,
.has-danger,
.has-disabled,
.has-error,

// Transitions
.in,
.out,

// Positions
.top,
.right,
.bottom,
.left,
```

Make sure that you use them only if you intend to and not by mistake...

### 5.5 About other states

If the state you want to describe is not available via Bootstrap or if you want to use your own, make sure you use the `is-` prefix.

Also as explained earlier, it could be one of the rare use case when it is advised to use the tag name in your selector in  order to voluntary restrict the depth of applicability of a specific UI element.

## 6. Tools and resources

### 6.1 Code review

> You can't manage what you don't measure.

It is also true for CSS code. Here is a short list of tools that we could use in order to monitor our generated CSS files...

As they are written in Node.js and distributed via NPM, they could be used with build system like Gulp or Grunt!

#### [CSS Lint](http://csslint.net/)
  CSS Lint is a tool that will analyze your CSS code quality against multiple rules and best practices. 

#### [CSS Stats](http://cssstats.com/)
  Another tool that will expose many statistics about your CSS.

#### [CSS Specificity Graph](https://github.com/pocketjoso/specificity-graph)
  Another tool that will expose many statistics about your CSS.

### 6.2 Hit me again

If you want to know more about inspiration sources for the guidelines, visit the following links.

- [SMACSS](http://smacss.com/)
- [CSS Guidelines](http://cssguidelin.es/)
- [OOCSS and SMACSS](http://fr.slideshare.net/maxdesign/css-oocss-and-smacss)
- [GitHub's CSS Performance](https://speakerdeck.com/jonrohan/githubs-css-performance)
- [Hugo Giraudel's SASS Styleguide](http://www.sitepoint.com/css-sass-styleguide/)
