variate/index.scss

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

base.scss

```scss
@use "sass:map";
@use "../variate/index" as variate;

// --------------------
// Semantic defaults
// --------------------
$font-stack: 'PingFang SC', 'Microsoft YaHei', 'Droid Sans Fallback', SimHei, Arial, Helvetica, tahoma, sans-serif;
$bg-default: #f6f8fb; // friendly non-pure-white fallback
$text-default: #1f2937;
$text-muted: #4b5563;
$card-default: #ffffff;
$accent-default: variate.$color-blue;

// Width control for responsive behavior
$content-max-widths: (
  sm: 92%,    // tiny screens
  md: 86%,    // small tablets
  lg: 760px,  // desktops
  xl: 840px,
  xxl: 920px
);

// --------------------
// Helpers
// --------------------
@function bp($name) {
  @return map.get(variate.$grid-breakpoints, $name);
}

@function content-width($name) {
  @return map.get($content-max-widths, $name);
}

@mixin up($name) {
  @media (min-width: bp($name)) {
    @content;
  }
}

// --------------------
// Base reset-ish styles
// Old-browser-friendly defaults first
// --------------------
html,
body {
  margin: 0;
  padding: 0;
  width: 100%;
  min-height: 100%;
}

body {
  font-family: $font-stack;
  line-height: 1.5;
  color: $text-default;
  background: $bg-default; // fallback first
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
}

// --------------------
// Main layout
// Expected minimal markup:
// <main class="status-page status-page--404">
//   <h1>404</h1>
//   <p>Page not found.</p>
// </main>
// --------------------
.status-page {
  // Fallback for old browsers (no flex)
  width: content-width(sm);
  max-width: 100%;
  margin: 3rem auto;
  padding: 1.5rem 1.25rem;
  box-sizing: border-box;

  background: $card-default;
  border: 1px solid rgba(variate.$color-black, 0.08);
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(variate.$color-black, 0.06);

  // Preferred layout
  min-height: calc(100vh - 6rem);
  display: flex;
  flex-direction: column;
  justify-content: center;

  @include up(md) {
    width: content-width(md);
    padding: 2rem 2rem;
  }

  @include up(lg) {
    width: content-width(lg);
    min-height: calc(100vh - 8rem);
    margin: 4rem auto;
    padding: 2.5rem 2.5rem;
  }

  @include up(xl) {
    width: content-width(xl);
  }

  @include up(xxl) {
    width: content-width(xxl);
  }

  h1,
  p {
    margin: 0;
  }

  h1 {
    font-size: clamp(1.75rem, 4vw, 3rem);
    line-height: 1.2;
    letter-spacing: 0.01em;
    color: inherit;
  }

  p {
    margin-top: 0.75rem;
    font-size: clamp(1rem, 1.8vw, 1.125rem);
    color: $text-muted;
    max-width: 60ch;
  }
}

// --------------------
// Status variants
// Use one class to switch tone per page type
// --------------------
.status-page--404,
.status-page--40x {
  border-top: 6px solid variate.$color-orange;
}

.status-page--50x {
  border-top: 6px solid variate.$color-red;
}

.status-page--offline {
  border-top: 6px solid variate.$color-blue;
}

.status-page--maintenance {
  border-top: 6px solid variate.$color-purple;
}

// Optional accent utility for h1 (if needed)
.status-page--accent {
  h1 {
    color: $accent-default;
  }
}

// --------------------
// Dark mode (modern browsers)
// Old browsers keep light mode above
// --------------------
@media (prefers-color-scheme: dark) {
  body {
    color: #e5e7eb;
    background: #0f172a; // friendly dark navy-like
  }

  .status-page {
    background: #111827;
    border-color: rgba(variate.$color-white, 0.12);
    box-shadow: 0 8px 30px rgba(variate.$color-black, 0.45);

    p {
      color: #cbd5e1;
    }
  }

  .status-page--404,
  .status-page--40x {
    border-top-color: #ffb357;
  }

  .status-page--50x {
    border-top-color: #ff6b63;
  }

  .status-page--offline {
    border-top-color: #66b3ff;
  }

  .status-page--maintenance {
    border-top-color: #d58bf3;
  }
}
```
