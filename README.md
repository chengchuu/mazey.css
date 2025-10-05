# mazey.css

[![npm version][npm-image]][npm-url]
[![l][l-image]][l-url]

[npm-image]: https://img.shields.io/npm/v/mazey.css
[npm-url]: https://npmjs.org/package/mazey.css
[l-image]: https://img.shields.io/npm/l/mazey.css
[l-url]: https://github.com/mazeyqian/mazey.css

## Install

Use mazey.css via [npm](https://www.npmjs.com/package/mazey.css).

```bash
npm install mazey.css --save
```

Of course, you can also download this file and serve it yourself. The file locates at the `lib/index.css`.

## Basic Usage

```javascript
import 'mazey.css';
```

## Webpack Configuration

`webpack.config.js`:

```javascript
module.exports = {
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
          {
            loader: 'sass-resources-loader',
            options: {
              resources: 'mazey.css/src/extend/index.scss',
            },
          },
        ],
      },
    ],
  },
};
```

`webpack-example.scss`:

```scss
.foo {
  @extend %m-flex-center;
}
```

## Vue CLI Configuration

`vue.config.js`:

```javascript
module.exports = defineConfig({
  css: {
    loaderOptions: {
      sass: {
        additionalData: `@import 'mazey.css/src/extend/index.scss';`,
      },
    },
  },
});
```

`vue-cli-example.scss`:

```scss
.foo {
  @extend %m-flex-center;
}
```

## Deploy

```bash
git clone https://github.com/mazeyqian/mazey.css.git style
```

### Confluence

Confluence is a popular document tool for companies. But the support for Markdown is inferior. For example, it can't display the style of the table and code. Therefore, the project will supply the effect of it.

```html
<link type="text/css" href="//example.com/style/lib/confluence.css" rel="stylesheet" />
```

## Contributing

### Development Environment

| Dependency | Version  |
|------------|----------|
| Node.js    | v14.21.3 |

### Steps

1. Create a new JavaScript file in the `z-temporary` folder, such as `z-temporary/<name>.js`.
2. Create a new SCSS file in the `src/z-style` folder, such as `src/z-style/_<name>.scss`.
3. Create a new command in the `package.json` file, such as `"build:<name>": "cross-env ENTRY=<name> webpack --config webpack.config.js"`.
4. Run the command, such as `npm run build:<name>`, the output file will be in the `lib` folder.
5. Use the output file in the `lib` folder, such as `import 'mazey.css/lib/<name>.css';`.

## License

This software is released under the terms of the [GPL-2.0 license](https://github.com/mazeyqian/mazey.css/blob/main/LICENSE).
