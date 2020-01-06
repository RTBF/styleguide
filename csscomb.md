# csscomb.json

The csscomb.json file is available at: 
[www/public/static/scss/csscomb.json](https://github.com/RTBF/cryo-rtbf-www/blob/master/public/static/scss/csscomb.json)

So what will be done by CSSComb?
Here is a quick recap of the settings we validated during our web integrators meetings...

### `"remove-empty-rulesets": true`

This CSS code

```css
.a {
    color: tomato;
}
.b{}
```

becomes

```css
.a {
    color: tomato;
}
```

We don't want empty rules in our source code! Useless rules should be gone.

### `"always-semicolon": true`

This CSS code

```css
.a {
    color: tomato
}
```

becomes

```css
.a {
    color: tomato;
}
```

If not required, the last `;` will be removed by the compiler in production mode anyway.

### `"color-case": "lower"`

This CSS code

```css
$color-rtbf-blue: #0057A2;
.a {
    color: $color-rtbf-blue;
    background-color: #FFF;
}
```

becomes

```css
$color-rtbf-blue: #0057a2;
.a {
    color: $color-rtbf-blue;
    background-color: #fff;
}
```

Not really important, but always nice to be consistent.

### `"block-indent": "...."`

This CSS code

```css
.a {
  color: tomato;
  .b {
    color: salmon;
  }
}
```

becomes

```css
.a {
    color: tomato;
    .b {
        color: salmon;
    }
}
```

This is the kind of syntax decision that can cause long and exhausting debates between developers.

We chose 4 spaces indentation because it is easier to differentiate 2 levels of indentation than when the code is using only 2 spaces. It looks like tabs but you should never use tabs, always spaces, make sure this is set correctly inside your text editor.

### `"color-shorthand": true`

Use shorthands for hexadecimal colors...

This CSS code
```css
.a {
    color: #ffcc00;
    background-color: #cccccc;
}
```

becomes

```css
.a {
    color: #fc0;
    background-color: #ccc;
}
```

### `"element-case": "lower"`

This (nasty) CSS code

```css
LI > A {
    color: tomato;
}
```

becomes

```css
li > a {
    color: tomato;
}
```

Yes HTML is case insensitive but we opted for lowercase... 
Less irritating for our poor eyes. 

Go back to 1995 UPPERCASE FREAKS!

### `"eof-newline": false`

This CSS code

```css
a {
    color: tomato;
}


```

becomes

```css
a {
    color: tomato;
}
```

CSSComb removed the End Of File newline...

### `"leading-zero": true`

This CSS code

```css
a {
    padding: .5%;
    font-size: .75em;
}
```

becomes

```css
a {
    padding: 0.5%;
    font-size: 0.75em;
}
```

Sure we do not need the leading zero in the compiled source but it looks more explicit to have it inside the "readable" source code.

### `"quotes": "double"`

This CSS code

```css
p[href^='https://']:before {
    content: 'secure'
}
```

becomes

```css
p[href^="https://"]:before {
    content: "secure"
}
```

Using double quotes make more sense because we use also double quotes around attribute values in our HTML markup. 


#### Side notes 

About quotes in JavaScript and PHP, I would suggest to use singles quotes. 

In JS, it helps creating nodes: 
`var $link = $('<a href="#" title="Nicer markup!">demo</a>')`

And in PHP you explicitly avoid "magic quotes" and gain in performances: 
`$string = 'simple quotes are faster';`

### `"space-before-colon": ""`

This CSS code

```css
a {
    color :tomato;
    background-color : black;
}
```

becomes

```css
a {
    color:tomato;
    background-color: black;
}
```

We want to `:` to be attached to the property name.

### `"space-after-colon": " "`

This CSS code

```css
a {
    color:tomato;
    background-color: black;
}
```

becomes

```css
a {
    color: tomato;
    background-color: black;
}
```

We want 1 space after the `:`... 

I did create an [issue on GitHub to suggest a new setting](https://github.com/csscomb/csscomb.js/issues/307) that would insure there is at least `x` spaces after the colon, allowing us to align related values using several spaces but my request was rejected...

### `"space-before-combinator": " "`

This CSS code

```css
.a> a {
    color: tomato;
}
.b >a {
    color: green;
}
```

becomes

```css
.a > a {
    color: tomato;
}
.b >a {
    color: green;
}
```

### `"space-after-combinator": " "`

This CSS code

```css
.a> a {
    color: tomato;
}
.b >a {
    color: green;
}
```

becomes

```css
.a> a {
    color: tomato;
}
.b > a {
    color: green;
}
```

### `"space-between-declarations": "\n"`

This CSS code

```css
.a {
    color: tomato; top: 0;
    height: 0;
}
```

becomes

```css
.a {
    color: tomato;
    top: 0;
    height: 0;
}
```

Add a line break between declarations

### `"space-before-opening-brace": " "`

This CSS code

```css
a{
    color: tomato;
}
```

becomes

```css
a {
    color: tomato;
}
```

Add a space before opening brace (`{`).

### `"space-after-opening-brace": "\n"`

This CSS code

```css
a {color: tomato;
}
```

becomes

```css
a {
    color: tomato;
}
```

Add a space after opening brace (`{`).

### `"space-after-selector-delimiter": "\n"`

This CSS code

```css
.a, .b {
    color: tomato;
}
```

becomes

```css
.a,
 .b {
    color: tomato;
}
```

Add a line break after selector delimiter

### `"space-before-closing-brace": "\n"`

This CSS code

```css
.a {
    color: tomato;}
```

becomes

```css
.a {
    color: tomato;
}
```

Add a space before closing brace (`}`).

### `"strip-spaces": true`

Trim trailing spaces, the spaces after the closing brace (`}`).

### `"tab-size": true`

Replace hard tabs with 4 spaces.

### `"unitless-zero": true`

This CSS code

```css
.a {
    border: 0px;
}
```

becomes

```css
.a {
    border: 0;
}
```

Remove units in zero-valued dimensions.

### `"vendor-prefix-align": true`

This CSS code

```css
.a {
    -webkit-border-radius: 3px;
    -moz-border-radius: 3px;
    border-radius: 3px;
}
```

becomes

```css
.a {
    -webkit-border-radius: 3px;
       -moz-border-radius: 3px;
            border-radius: 3px;
}
```

Align prefixed properties together. 

Most of the time, we will not create all the vendor prefixes but rather using one of the predefined Compass @mixin via `@include compass-mixin-name(param);`

But if we use prefixed properties directly in our code, sure we do want CSSComb to make it beautiful.
