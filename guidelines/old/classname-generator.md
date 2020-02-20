---
title: RTBF CSS class generator
sidebarDepth: 2
---

# RTBF CSS class generator

In one sentence:
> We must always start from global (mainstream) to specific (drop) in order to keep it simple and elegant.

## Table of content

01. **Introduction:** Why this document, its purpose, and its format.
02. **RTBF Styleguides:** Introducing our own Bible.
03. **About BEM** We use the block__element--modifier syntax.
04. **Common abbreviations** BEM is useful but it can bring loooong class names so we defined a list of abbreviations that we must use.
05. **Questions:** Answer these and we will build your classname.
    01. **Target language**
    Is the class indicating a JavaScript dependency?
    02. **Scope of use**
    Is the class meant to be used across multiple sites?
    03. **Style flexibility**
    Is the styling of your class exactly the same across all sites?
    04. **SMACSS category**
    Base, Layout, Module, State or Theme?
    05. **Pick a name**
    Prefixes are ready, let's pick a name
    06. **Quality assurance**
    Before we are done, let's review it one last time!
    07. **Now what?**
    I chose a name but then?
06. **Examples:** No doubt, few examples can help us here...
07. **Conclusion:** The world keeps on turning.

---

## Introduction

**This document's purpose is to define the logic path that you must use to create any new class attribute value** (used inside the `class` attribute inside your HTML markup as well as inside `.your-selectors` in [S]CSS files).

By defining and **respecting the following guidelines, we will increase the consistency and the quality** of our code.
**CSS is hard** and one of the common pitfall is using selector which are too tightly coupled with our markup...

`.some-site #content h1.level1` does the job, but what an ugly job !
Once you are surrounded with selectors with a high specificity you will be constantly fighting against it if you want to overwrite some properties.

> We do not need a shotgun to make a hole in the wall.
> Sure it'll make a hole but the end result will damage the wall itself.

By **answering a couple of questions** and following instructions indicated for each answer, the scenario **will help you out by building the classname**.

The generated classname is nice but you will still have to stop and think about where you should insert your selector in the [S]CSS...
In which repository, in which folder, in which file, in which line.

**Please be wise[1]!**

1. having or showing experience, knowledge, and good judgement.

### An image worth a thousand words
Think about the C of CSS. [C is for Cascading](http://i.imgur.com/rkQoozr.jpg). You should **always start from the top of the waterfall with base styles** defined using only single tag name. These will be the default, inherited on all the targeted tag nodes but with a weak specificity so you can overwrite them with ease.

**Don't be selfish**... Think about the other (your colleagues!). When you are using `!important`, you are climbing up the waterfall and your mindset is probably like this.

> I know what I am doing, I am a professional integrator so let me hijack my own property no matter what my colleagues are trying to achieve.
> Look how I am amazing at climbing the waterfall back up! [1]

This is what you may feel like when using `!important` for your own little and current needs.

Now, when you or another integrator get **confronted to an `!important` causing styling issues** on some other context (different website, different location or different behavior).

Then, there are only 3 words in your head:

> What
> The
> Fuck ?

And here you do perceive the (mis)usage of `!important` as ridiculous and amateur[2].

**Instead of using `!important`, consider adding an additional and conditional class** that will only be use in you special case scenario.

Same principle applies to most scenario's you will meet.

Thank you.


1. [I'm using !important for my own needs](http://imgur.com/sj5YiGd)
2. [Who dared to used !important ?](http://imgur.com/cDrRKp9)

---

## RTBF Styleguides

Please read the [RTBF CSS Styleguide](styleguide.md).

The file will contain more general rules than this document which is focused on building up the class names.

---

## About BEM

BEM is useful when you want to **reduce the specificity** of your CSS selectors.
It is a way to write longer classnames[1] instead of using nesting[2].

> It is a **smart way of naming your CSS classes** to give them more transparency and meaning to other developers. They are far more strict and informative, which makes the BEM naming convention ideal for teams of developers on larger projects that might last a while.

You must **use BEM whenever it is possible** and the classname generator will help you out on this by creating the block part...

1. **Longer classnames** are not simply longer (-), they tend to **reduce the naming collision** (+), decrease the specificity (+) and **describe explicitly the ownership** of related classnames/elements (+).
That is 3 pros and only 1 cons, so it is worthy!
2. I love nesting! [What should I do ?](http://i.imgur.com/4KtmA4I.jpg)
If you survived, read [why you should avoid nesting](http://thesassway.com/intermediate/avoid-nested-selectors-for-more-modular-css).


### Syntax for BEM

We chose the **most common syntax for BEM**.
It looks like this:
**`.block-name__element-name--modifier-name`**

The order is always the same (**from global to specific**) and only the `block` part is mandatory.
You can omit the `element`, the `modifier`or both...

Quick summary:
The `block`  is the root of your module, it is **mandatory**.
The `element` part is prefixed with **2 underscores**: `__`, it is optional but you will use it often!
The `modifier` part is prefixed with **2 dash**: `--`, also optional, you will need it from time to time.

### Three distinct parts

#### Block
Quick reminder: the `block` is the root of your module...
It can have styles on its own (off course!).
FYI, you could also combine it with a `modifier` directly without an `element`.

**Important:**
The classname generator will only generate the block name.
With this block name you can define elements that belong to this block as well as modifiers.

#### Element
An `element` is simply a part of a `block` (any descendent of the current block).
It is does not need to be a direct child, remember we want to remain flexible.

Let's see an example...

```html
<div class="widget-articles">
    <h1>Last articles</h1>
    <ul class="widget-articles__list">
        <li class="widget-articles__entry"><a href="#">...</a></li>
    </ul>
</div>
```

We created 3 classnames in this example: the root class `.widget-articles` and 2 classes for 2 children: `widget-articles__list` and `widget-articles__entry`. Please note that we did not filled in all the parents in the last (deeper) classname. If we did have used `widget-articles__list__entry` (overkill!), it would get too concise and then we would lose flexibility. Maybe there is no dependency between `widget-articles__list` and `widget-articles__entry`, we don't know and it is good that way. The important thing to see here is that only by looking at those 3 classnames, we know they belong to the same module called `widget-articles`.

The main purposes of BEM are:
- to reduce the dependencies with the markup (example: `.widget-articles ul li` is bad[1])
- to reduce specificity
- to avoid names collision

The price to pay is longer classnames but we gain in simplicity and we reduce specificity.

>You must learn to use multiple values in the class attribute as using multiple layers of styles... From widely used common styles to specific classnames.

1. Specificity is 12, which is still low BUT the depth of applicability is to wide (all `li` inside any `ul` under `.widget-articles`) and it asks to the browser to parse every single `li` until it gets (eventually) rejected. Help out the browser, it has a lot of tasks on its shoulders!

#### Modifier
The modifier acts as a kind of state or version. It represents a variation of the current block/child of the block. While we could use it implicitly (example: `.widget-articles__entry--first`)... I read about using it with an additional convention which is including the modifier property and its value like so: `widget-articles__entry--position_first`. In that case the modifier has two parts divided by an underscore `_`.
So `position_first` (key_value).

They may be boolean (for example, visible: true or false) or key-value pairs (size: large, medium, small). When you are using a non boolean value, then you should use `key` + `_` + `value` instead of `boolean-value`.

You can read more about BEM at:
- [smashingmagazine.com](http://www.smashingmagazine.com/2014/07/17/bem-methodology-for-small-projects/)
- [csswizardry.com](http://csswizardry.com/2013/01/mindbemding-getting-your-head-round-bem-syntax/)

---

## Common abbreviations

Let read and review what are the common terms that we use at RTBF...

| Name          | Abbr.         |
| -----------:  |:--------------|
| admin         | **cryo** |
| agenda        | agenda        |
| article       | article       |
| chronicle     | chronicle     |
| comment       | comment       |
| contact       | contact       |
| container     | **cont**      |
| contest       | contest       |
| description   | **descr**     |
| expand        | expand        |
| facebook      | **fb**        |
| footer        | footer        |
| gallery       | gallery       |
| header        | header        |
| hitparade     | **hit-prd**   |
| IMU           | **ad-imu**    |
| instagram     | instagram     |
| introduction  | **intro**     |
| keyword       | **kwrd**      |
| leaderboard   | **ad-leader** |
| livecenter    | **lc**        |
| login         | login         |
| media         | media         |
| mediaset      | mediaset      |
| menu          | menu          |
| mobile        | mobile        |
| newsletter    | newsletter    |
| old-browser   | **old-bwsr**  |
| pagination    | **pagin**     |
| partner       | partner       |
| promo-video   | **promo-vid** |
| promobox      | prombobox     |
| search        | search        |
| services      | **serv**      |
| sharebar      | sharebar      |
| sidebar       | sidebar       |
| skyscraper    | **ad-sky**    |
| tag           | tag           |
| takeover      | takeover      |
| ticker        | ticker        |
| topbar        | topbar        |
| twitter       | twitter       |
| weather       | weather       |
| web-tv        | web-tv        |
| widget        | widget        |
| wrapper       | wrapper       |


---

## Questions

### Q1. Target language
#### Is your class only intended to be used by JavaScript?
A state classname can be injected/controlled by JavaScript, it does not necessary mean that the class deserves **the prefix `js-`**...
On the other side, if your class is used **to indicate that the current node will be parsed by JavaScript** and that it may get additional functionality or behavior then it deserves the `js-` prefix.

**If you need to style an element which only has a `js-` prefixed class, you should never use this class in your [S]CSS!**
The `js-` classes are meant to be only used by JavaScript and are subject to change without notice.
Instead, be wise and add an additional class value inside the attribute. Separation of concerns is great.

<dl>
    <dt>Yes!</dt>
    <dd>starts your class name with the prefix <code>js-</code>.</dd>
    <dt>No...</dt>
    <dd>go to the next question.</dd>
</dl>

### Q2. Scope of use
#### Is the class meant to be used across multiple sites?
**A common module** (shared across multiple sites) should be hosted inside the `www` repository. Even if the module concerns all the radio sites
it **should be hosted inside `www`** and not inside the default radio site (`radio`). The only purpose of `www` is to share modules and ressources.
If you are not certain about the fact that your module will be shared then, I would recommend to not share it in order to avoid confusion, **limit dependencies and reduce the number of shared modules**.

We prefer have a few clean/well made shared modules to plenty of shared modules made with misconception.

**Less is more & the simplest, the best!**

If later on the module needs to be converted in a common module, you will copy the module's files in `www` then refactor its classnames in both tpl (hosting the HTML markup) and [S]CSS files.

<dl>
    <dt>Yes!</dt>
    <dd>This is a common module/block, go to the next question.</dd>
    <dt>No...</dt>
    <dd>Skip the next question little grasshopper.</dd>
</dl>

### Q3. Style flexibility
####Is the styling of your class exactly the same across all sites?

You should skip this question if you answered "No..." to question 2.

Particular **parts of our UI are meant to look exactly the same no matter what the site context is**. These elements stick to their own styles.
It is often the case for smaller elements...
Best example is the play button that is added over the bottom left corner of the video thumbnails. On every single of our sites we want exactly the same look, the same position, the same behavior.

In one word: consistance.

This can be true for small parts of our UI but also for globally reusable utility classes that we created. We won't re-write code
from frameworks that we used as it would be a waste of time and it would turn the update process into a nightmare.
Another good example would be classnames used to define selectors of type `layout` like `rtbf-ad-imu` or `rtbf-l-grid`...

<dl>
    <dt>Sir! Yes, Sir!</dt>
    <dd>My common module will be the same everywhere, then I add the <code>rtbf-</code> prefix.</dd>
    <dt>No...</dt>
    <dd>My common module is flexible and could be adapted depending on the context then it uses the <code>www-</code>.</dd>
</dl>

### Q4. SMACSS category
#### In which category should your classname belong?

**What is SMACSS?**
Take 2 minutes to [watch a quick presentation of SMACSS by its author](https://tv.adobe.com/embed/1047/14710/).

Let's see a quick recap from the SMACSS categories[1]...
Base, Layout, Module, State or Theme?

The SMACSS categories were made to facilitate some basic and logic usage of the cascade:
- From more generic to more specific.
- From globally applied to locally applied.
- From weaker to stronger. (Try to keep it as weak as possible)

**SMACSS really try to give some love to classnames** and it is all about the [fine art of balance](http://i.imgur.com/7wQ3uJB.jpg).
**Classes are awesome, re-usable, polymorph and offer the best flexibility.**

1. [http://smacss.com/book/categorizing](http://smacss.com/book/categorizing)

##### Base
By definition the base selectors only use a single element name (and nothing more) so that they have a huge depth of applicability[1] and the weakest specificity[2] possible. So **it is irrelevant to generate a class name for base selectors**, but you knew that!

<dl>
    <dt>I knew it</dt>
    <dd><a href="http://i.imgur.com/HHedSfA.gif" target="cssdoc">Good point</a></dd>
    <dt>Hum...</dt>
    <dd><a href="http://i.imgur.com/tR5yd6b.gif" target="cssdoc">I forgot about that!</a></dd>
    <dt>Finally</dt>
    <dd>Continue to layout as this was just a reminder...</dd>
</dl>

1. The depth of HTML to which the selectors apply. [Read more...](http://smacss.com/book/applicability)
2. The "strength" of your selector. [See how specificity is calculated...](http://specificity.keegan.st/)

##### Layout
Layout rules[1] are helpers that we should rely on every time we are facing a recurring situation about the placement of elements.
About the way they are positioned, the box model properties they should adopt, etc. Common properties to expect in layout styles are `position`, `[min-/max-]width`, `[min-/max-]height`, `margin`, `padding`, `top`, `right`, `bottom`, `left`, `float`, `clear`, `border`, `display`, `box-sizing`, `flex`, `columns`...

When you create a layout rule, you must only include properties that are related to the layout, **do not intertwine[2]** different aspects together **as you want to promote reusability** over specific implementation. For the same reason, avoid using magic numbers[3] which will require changes and will break easily (due to their fragile nature).

<dl>
    <dt>Yes, my class is of type layout</dt>
    <dd>Then add a <code>l-</code> to your classname and jump out of the "SMACSS category" to the next question.</dd>
    <dt>Not a layout class</dt>
    <dd>Continue to next section about module...</dd>
</dl>

1. [http://smacss.com/book/type-layout](http://smacss.com/book/type-layout)
2. connect or link (two or more things) closely.
3. [http://css-tricks.com/magic-numbers-in-css/](http://css-tricks.com/magic-numbers-in-css/)

##### Module
The module rules are the styles **related to the distinct components of our site**, just like we have in cryo...
Reusable pieces of a puzzle that you can duplicate. **This category will probably be the most used**, but think it through and **avoid considering that everything belongs to the module category**.

Let's refresh our mindset about the module category **as defined by SMACSS**.

> A Module is a more discrete component of the page. It is your navigation bars and your carousels and your dialogs and your widgets and so on. **This is the meat of the page. Modules sit inside Layout components.** Modules can sometimes sit within other Modules, too. **Each Module should be designed to exist as a standalone component. In doing so, the page will be more flexible.** If done right, Modules can easily be moved to different parts of the layout without breaking.
> [Read more about the module category...](http://smacss.com/book/type-module)

###### Subclassing Modules

You may **need a variation of an existing module**.

But how often do you subclass a module?

**Common situations:** (WHEN)
- White label/basic module **needs more concise styles**
- Styled module needs to have a **different layout** based on the location
(e.g. inside content vs. inside sidebar)

**Common pitfalls:** (DO NOT DO THIS)
- **Duplicate declaration** and renaming (Failing to share the basic/white label/default styles)
- Use **nested selectors** like `.sidebar .module-name` (Increasing specificity!)

 Think of it as an investment... Seriously! How much time do you save by doing `.nested .selector` instead of `.selector--compact`? Multiply the time you saved by 10 and far from the amount of time you will have to invest to refactor

A nice example from Twitter Bootstrap would be `.btn-primary` which is a submodule of the previously declared/basic `.btn` module. In your markup we will use `class="btn btn-primary"` and not just `class="btn-primary"`.
This way, it is perfectly clear that there are 2 modules: a basic (main) module named `.btn` and one of its submodule (variation) called `.btn-primary`.

This way, it is **explicit in the HTML markup!**
In the generated **CSS code**, it will also be **simpler!**
Why? Because **we will not use the `@extend` feature** provided by SASS which gets quickly ugly and nasty.

> Simplicity is robust and ingenious.
> Keep in mind that a SCSS code that looks clean and well structured can produce a bad code.
> You are responsible for the generated CSS, not the precompiler! So check the generated code often.



###### Submodule or Modifier?

Modifier.

In short, I would say **both submodules and modifiers represent the same thing!**

At RTBF, for our CSS classes, **we should use the modifier prefix `--`** because it brings even **more meaning**.

Wait! Twitter Bootstrap uses `btn btn-primary` and not `btn btn--primary`... Yes, but it is their own code. Sure it is not the way SMACSS or Bootstrap does it, but they do not use our prefix system either. Keep in mind that the rules defined in this document are meant to be used in the code we write. We will not rewrite the code from Bootstrap, it stays what it is: an external and useful third party library that we use (a lot).

**By using the BEM modifier, we make a clear distinction between the name of the main module and the name of its alternative versions.**

###### Do not work blindfolded inside a submodule/modifier!

Never forget that **when you work on a submodule, you only affect the submodule** and that means that your changes are not share with the parent module. Stop and think, would some the style properties be **useful to the main module and/or other submodules ?** If so, you may improve reusability by moving these properties in the module inside of inside submodule(s).

**Another scenario** is essential, **you should not have to undo something** in a submodule. If you need to cancel a property in a submodule maybe you need to move it out of the main module itself. **Try to always start abstract then add properties with modifiers** instead of canceling properties.

Well that was a big piece, right?
We're done with the theory for (sub)modules, here are the questions...

<dl>
    <dt>Yes, my class is of type module</dt>
    <dd>
        If you are working on...
        <dl>
            <dt>the module's root classname...</dt>
            <dd>
                Prefix it by <code>m-</code>[1]
            </dd>
            <dt>a submodule...</dt>
            <dd>
                Prefix it by the full existing "main" module's name
            </dd>
        </dl>
    </dd>
    <dt>No, not really a module class</dt>
    <dd>Continue to next section about state...</dd>
</dl>

1. Normally I would say that you don't need a prefix for the module category and I know it may look "overloaded"...  But ear me out please!
Without using a prefix we won't know for sure if the classname was thought out as a module or if the classname was simply not built using the classname generator.

##### State

[The state category](http://smacss.com/book/type-state) is special. It can be very ambiguous in terms of ownership.

###### Some kind of ambiguous state, indeed.

Does the state rules you are writing belong to an existing module?
Then maybe it is just a as a submodule and maybe we should just use a `--modifier`?

Or does it exists on its own (globally, then)?
Like `.disabled`?

We don't have this kind of question for the other categories but the volatile nature of state styles bring this question in the equation.

###### What we can affirm about states

SMACSS website describes state as:

> A state is something that augments and overrides all other styles. For example, an accordion section may be in a collapsed or expanded state.
> A message may be in a success or error state.

On the technical side, there are 3 natures of state rules:
- pseudo-class (<code>:link, :visited, :hover, :active, :focus ...</code>)
- class (Added/removed by JavaScript)
- media queries (Depending on the device capabilities)

###### In practice

What is certain is that [state category is stronger](http://i.imgur.com/rkQoozr.jpg) (via specificity or `!important`) than (sub)modules using it.
But when defined globally, it should only affect the specific properties shared by all components using it (and related by the state change's context).
In other words, as usual we want to avoid having to cancel style properties, keep decorating with new style properties instead.

What is this debate about? I'm not sure I understand... Let's review a quick example.

###### Example

In this example, we are working on the carousel of games hosted on Ouftivi's homepage.

For some reason, some entries of the carousel can have a disabled state...
For example, the content could be announced as "available soon". Or the game could require the Adobe Flash and you may be viewing the page on a device running on iOS (which does not support Adobe Flash).

In this case how would we build the classname?
Should we use the (existing) long prefixed classname by appending our `--own-modifier` to it?
Or a simple and global `.disabled` class?

There no black or white answer here, it is all grey.
It is the usual situation when the answer is "it depends" and we come back to the [fine art of balance](http://i.imgur.com/7wQ3uJB.jpg) you need when claiming to be a professional integrator.
Generating a long classname would protect us but we will probably not reuse it elsewhere and also, JavaScript can become coupled with the module's internal and specific class names!
`.www-m-carousel-games-is-not-available` is long, but the main issue is that this style could only be used when we work on carousel of games, using it on a carousel of "heroes" would feels wrong... Right?
We could instead use a global shared classname `.is-unavailable`[1] and in case of further customization/needs, adding a second selector like so:
`.www-m-carousel-games .is-unavailable`
or
`.www-m-carousel-games__item.is-unavailable`.

I see nesting? Shouldn't we avoid using nesting?
"It depends" ;-) You can use it if you use it wisely but if possible, prefer the second approach[2].
Anyway, these kinds of practices should be only used when truly needed and not "by default".
Think ahead before you write code instead of writing CSS in rush mode. Invest some time in your CSS and it will pay off.
Elegant and simple solutions are what smart developers focus on.

With either of the last 2 selectors, we get a [higher specificity](http://specificity.keegan.st/) (20 instead of 10). But it is respecting the cascade and promoting reusability!
We want to globally apply basic styles with a light/delicate strength while adding specific styles and special cases for concise scenarios.
In our example `.www-m-carousel-games .is-unavailable` would only add/overwrite style properties that should not be defined in the global/shared classname (properties proper to this specific scenario).

<dl>
    <dt>Yes, I am working a style which belongs to the state category (and using class, not pseudo-class or media query)</dt>
    <dd>
        What is the scope of this state? Is it specific to a single module or is it shared?<br/>
        What about the usage of the class by JavaScript? Maybe I need o stay generic due to JS...<br />
        Can we use an existing state to start from? (Could be a state class defined by 3rd party library or made by RTBF)<br />
        Can it be re-used?<br />
        <br />
        Depending on your answer you could:
        <ol>
            <li>Add an existing state class in your HTML</li>
            <li>
                Only if you do need an additional class...
                <ol>
                    <li>Prefix it by <code>is-</code></li>
                    <li>Add the additional class in the HTML markup when done</li>
                </ol>
            </li>
            <li>
                If you do not need an additional class but want to add properties...
                <ol>
                    <li>Use nesting <code>.one .state</code> (yes, I said it!) but prefer using brother classes like <code>.one__item .state</code></li>
                </ol>
            </li>
        </ol>
    </dd>
    <dt>No, my style is not a state</dt>
    <dd>Then head over to theme section</dd>
</dl>

1. or even better, use the existing `.disabled` class of Bootstrap...
2. Both classes have the same specificity (20) but the second (`.one.two` instead of `.one .two`) gets a more limited depth of applicability which also means less work for the browser, thus better rendering performances.

##### Theme

What are themes and why/when do we need them?

> ...a theme defines colours and images that give your application or site its look and feel. Separating the theme out into its own set of styles allows for those styles to be easily redefined for alternate themes. (...) It could affect layout with different arrangements. It could also alter how states look.

It is also the last category of rules as defined by SMACSS.
In other words, it is the strongest category in specificity and the most restrictive in terms of depth of applicability.

For the theme there are 2 possible strategies, you can:
- Add a single class on a container and use nesting
- Use multiple additional classes on specific elements

We use themes on most of our websites to allow to overwrite styles in very specific scenarios like when there is a commercial takeover on the page.

It is also used on the TV website to customize the colors of the links when you are surfing in the context of a particular channel.

When the theme should be applied globally to the entire page or site, then I recommend using nesting (for ounce).
That way we can simply add a our theme class to the `<body>` and redefine inside our theme's CSS all the customization we need...

You could also add extra theme class to plenty of elements but it can quickly becomes a nightmare to manage.

Because it is very specific by nature (and then almost never shared/reused), you can be less regarding in terms of nesting and specificity.

<dl>
    <dt>Yes, I am working on a theme</dt>
    <dd>Prefix it by <code>theme-</code>[1]</dd>
    <dt>No, not working on theme</dt>
    <dd>Then I should restart the logic and if I still end up here, I should discuss it with other integrators!</dd>
</dl>

1. Why prefix it by `theme-` instead of `t-`? Few reasons: the main reason is to be very explicit inside the HTML markup. Because themes get the last word (in theory) it should be as clear as possible that a theme is applied on a page, we want them to stand out of the page, to be visible in the source inspector. Also, a theme is standalone concept, a last resort, there is no sub theme, then the name could be longer, it does not hurt and it stays relatively short.

### Q5. Pick a name
#### Prefixes are ready, let's pick a name

<dl>
    <dt>Layout</dt>
    <dd>Add a meaningful name describing the layout pattern after your <code>l-</code> prefix.</dd>
    <dt>Module</dt>
    <dd>
        If you are working on...
        <dl>
            <dt>the root of the module</dt>
            <dd>
                <ol>
                    <li>Add a noun(s) from general to specific after your <code>m-</code><br/>
                        (e.g. <code>widget-articles</code> instead of <code>articles-widget</code>)</li>
                    <li>Don't add adjective before the noun even if it is not respecting the English language.<br/>
                        (e.g. <code>article-main</code> instead of <code>main-article</code>)<br />
                        This way we respect to generic to specific principle and we may avoid copycats.</li>
                    <li>All parts of the name should be singular (also avoiding copycats)</li>
                </ol>
            </dd>
            <dt>a submodule</dt>
            <dd>
                <ol>
                    <li>Add the modifier's name prefixed by the 2 dashes<br/>
                        (e.g. <code>widget-articles--compact</code>)</li>
                    <li>Add or inject the additional classname in the HTML[1]</li>
                </ol>
            </dd>
        </dl>
    </dd>
    <dt>State</dt>
    <dd>If you need to create an additional state class then add a meaningful adjective after your <code>is-</code> prefix.</dd>
    <dt>Theme</dt>
    <dd>Add a meaningful theme name after your <code>theme-</code> prefix. <br />
    If meant to be injected of the body (or other specific container) you can use inline comment to suggest a context without increasing specificity like this: <br />
    <code>/*body*/.theme-ad-takeover</code>.</dd>
</dl>

1. You inject the additional classname inside the class attribute of your tpl using the `$config` param of `getModule` method of CRYO...
    `$this->getModule('/some/module/folder', 'filename', $config, '/rtbf/www');`
    Inject is the term I would use when the class is needed upon certain conditions (e.g. custom (non default) version for a widget).


### Q6. Quality assurance
#### Before we are done, let's review it one last time!

>Quality Assurance (QA) is a way of preventing mistakes or defects in manufactured products and avoiding problems when delivering solutions or services

Examine your class name you should a something like this:

**`. [js-] [rtbf-/www-] (l-/m-/is-/theme-) (module-name-as-block) [__element] [--submodule-as-modifier] [__element]`**

It looks scary but don't be afraid, stay focus on respecting the rules we agreed on.
`[]` is an optional group.
`()` is a required group.

Do we respect the flow? From most generic to most specific?

Are the nouns and names in singular?

Do we give priority to flow instead of English grammar?

Does it make a sense to you? And to others?

Does it avoid confusion?

Is that classname already used? If so, in which circumstances?


### Q7. Now what?
#### I chose a name but then?
Creating a robust name for your CSS classes is hard but you need the save the CSS code...
* Inside the correct line
  * Inside the correct section
    * In the correct file
      * Hosted in the correct site

You choose the location based on the fact that is the class is common or not.

You choose the file based mainly on the SMACSS category of the class.

You choose the section and line based mainly on the relation between your class and the existing classes in the current file.




---

## Examples

The first 2 [optional] prefixes (`js-` and `rtbf-/www-`)  are quite easy to understand so we will skip them in the examples.

Let's see few examples along with a short description, explaining how to read them. The examples are using the categories defined by SMACSS.

### base
**No classname!** Only element name. We can never repeat it enough.
It should only apply globally shared properties, nothing too specific!

### layout
`.rtbf-l-grid` Strict common layout grid class

`.rtbf-l-ad-leaderboard` Strict common layout class for ads

`.www-l-custom-gutter` Flexible common layout with adapted gutter

`.l-sitemap-list` Local layout style for a sitemap list

### module
`.js-rtbf-m-mediaset` JavaScript classname for strictly common module

`.www-m-widget--articles` Flexible common module of type widget about articles

`.www-m-article` Flexible common module for article

`.www-m-article__intro` Intro element that belongs to the flexible common module for article

`.www-m-article--first__intro` Intro element that belongs to the flexible common submodule (the first article)

### state
`.is-disabled` Global class selector (should only defined globally shared state properties)

`.rtbf-m-mediaset__item.is-disabled` Item of the common module mediaset which (the item) is in the state "disabled"

### theme
`/*body*/.theme-ad-takeover` Root selector (for nesting theme styles) when a commercial takeover is active.



---

## Conclusion

The web never stops evolving and so does the technics used to make it.
This guide could be updated in the future in order to adapt to newer
perspectives of web development.

**Caution:** while it is tempting to update this document and its scenarios
we should not do it without thinking about the consequences of the changes
we bring in. If necessary, we will have to refactor the existing code base
in order to keep it consistant and reliable!
