Create a common CSS style for basic pages.

- Use SCSS to compile the CSS;
- I prefer to use these colors, but others are fine too:
```scss
// Primary Colors
$color-white: #ffffff;
$color-green: #2ECC40;
$color-red: #FF4136;
$color-black: #111111;
$color-orange: #FF851B;
$color-yellow: #FFDC00;
$color-blue: #0074D9;
$color-purple: #B10DC9;

// Background Colors
$bgc-navy: #001F3F;
$bgc-blue: #0074D9;
$bgc-aqua: #7FDBFF;
$bgc-teal: #39CCCC;
$bgc-olive: #3D9970;
$bgc-green: #2ECC40;
$bgc-lime: #01FF70;
$bgc-yellow: #FFDC00;
$bgc-orange: #FF851B;
$bgc-red: #FF4136;
$bgc-fuchsia: #F012BE;
$bgc-purple: #B10DC9;
$bgc-maroon: #85144B;
$bgc-white: #FFFFFF;
$bgc-gray: #AAAAAA;
$bgc-silver: #DDDDDD;
$bgc-black: #111111;
```
- Use customizable widths that determine how your responsive layout behaves across device or viewport sizes:
```scss
// Breakpoints
$grid-breakpoints: (
  xs: 0,
  sm: 576px,
  md: 768px,
  lg: 992px,
  xl: 1200px,
  xxl: 1400px
);
```
- Two main elements: <h1> <p>, title and content;
- Make sure the old browser the basic view;
- Background Color is the friendly color instead of the pure white;
- Keep CSS only without JavaScript;
- Control colours via "prefer: dark" for dark mode;
- Think of using multiple widths;
- Pages as: 404, 40x, 50x, offline, maintenance, etc.;
