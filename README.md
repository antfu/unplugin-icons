# unplugin-icons

[![NPM version](https://img.shields.io/npm/v/unplugin-icons?color=a1b858&label=)](https://www.npmjs.com/package/unplugin-icons)

Universal **on-demand** icons solution. 

Works for

- **Any** icon sets - 90+ popular iconsets, powered by [Iconify](https://github.com/iconify/iconify)
- **Any** build tools - Vite, Webpack, Rollup, Nuxt, etc. powered by [unplugin](https://github.com/unjs/unplugin)
- **Any** frameworks - React, Vue 3, Vue 2, and [contribute more](./src/core/compiles)
- **Any** combinations of them!
- [Browser the icons](https://icones.js.org/)

*For **Any** I mean (almost) any* 😅

> `vite-plugin-icons` has been renamed to `unplugin-icons`, see the [migration guide](#migrate-from-vite-plugin-icons).

## Usage

Import icons names with the prefix `~icons/` and use them directly as components. [Auto importing is also possible](#auto-importing).

###### React

```jsx
import IconAccessibility from '~icons/carbon/accessibility'
import IconAccountBox from '~icons/mdi/account-box'

function App() {
  return (
    <div>
      <IconAccessibility />
      <IconAccountBox style={{ fontSize: '2em', color: 'red' }}/>
    </div>
  )
}
```

###### Vue

```html
<script setup>
import IconAccessibility from '~icons/carbon/accessibility'
import IconAccountBox from '~icons/mdi/account-box'
</script>

<template>
  <icon-accessibility/>
  <icon-account-box style="font-size: 2em; color: red"/>
</template>
```

## Install

Install the plugin and peer dependency `@iconify/json`

```bash
npm i -D unplugin-icons @iconify/json
```

### Build Tools

<details>
<summary>Vite</summary><br>

```ts
// vite.config.ts
import Icons from 'unplugin-icons/vite'

export default defineConfig({
  plugins: [
    Icons({ /* options */ }),
  ],
})
```

<br></details>

<details>
<summary>Rollup</summary><br>

```ts
// rollup.config.js
import Icons from 'unplugin-icons/rollup'

export default {
  plugins: [
    Icons({ /* options */ }),
  ],
}
```

<br></details>


<details>
<summary>Webpack</summary><br>

```ts
// webpack.config.js
module.exports = {
  /* ... */
  plugins: [
    require('unplugin-icons/webpack')({ /* options */ })
  ]
}
```

<br></details>

<details>
<summary>Nuxt</summary><br>

```ts
// nuxt.config.js
export default {
  buildModules: [
    ['unplugin-icons/nuxt', { /* options */ }],
  ],
}
```

> This module works for both Nuxt 2 and [Nuxt Vite](https://github.com/nuxt/vite)

<br></details>

<details>
<summary>Vue CLI</summary><br>

```ts
// vue.config.js
module.exports = {
  configureWebpack: {
    plugins: [
      require('unplugin-icons/webpack')({ /* options */ }),
    ],
  },
}
```

<br></details>

### Frameworks


<details>
<summary>Vue 3</summary><br>

Vue 3 support requires peer dependency `@vue/compiler-sfc`:

```bash
npm i -D @vue/compiler-sfc
```

```ts
Icons({ compiler: 'vue3' })
```

Type Declarations

```jsonc
// tsconfig.json
{ 
  "compilerOptions": {
    "types": [
      "unplugin-icons/types/vue",
    ]
  }
}
```

<br></details>


<details>
<summary>Vue 2</summary><br>

Vue 2 support requires peer dependency `vue-template-compiler`:

```bash
npm i -D vue-template-compiler
```

```ts
Icons({ compiler: 'vue2' })
```

Type Declarations

```jsonc
// tsconfig.json
{ 
  "compilerOptions": {
    "types": [
      "unplugin-icons/types/vue",
    ]
  }
}
```

<br></details>

<details>
<summary>React</summary><br>

JSX support requires peer dependency `@svgr/core`:

```bash
npm i -D @svgr/core
```

```ts
Icons({ compiler: 'jsx', jsx: 'react' })
```

Type Declarations

```jsonc
// tsconfig.json
{ 
  "compilerOptions": {
    "types": [
      "unplugin-icons/types/react",
    ]
  }
}
```

<br></details>


<details>
<summary>Preact</summary><br>

JSX support requires peer dependency `@svgr/core`:

```bash
npm i -D @svgr/core
```

```ts
Icons({ compiler: 'jsx', jsx: 'preact' })
```

Type Declarations

```jsonc
// tsconfig.json
{ 
  "compilerOptions": {
    "types": [
      "unplugin-icons/types/preact",
    ]
  }
}
```

<br></details>

## Migrate from `vite-plugin-icons`

`package.json`

```diff
{
  "devDependencies": {
-   "vite-plugin-icons": "*",
+   "unplugin-icons": "^0.6.0",
  }
}
```

`vite.config.json`

```diff
import Components from 'vite-plugin-components'
- import Icons, { ViteIconsResolver } from 'vite-plugin-icons'
+ import Icons from 'unplugin-icons/vite'
+ import IconsResolver from 'unplugin-icons/resolver'

export default {
  plugins: [
    Vue(),
    Components({
      customComponentResolvers: IconsResolver(),
    }),
    Icons(),
  ],
}
```

`*` - imports usage

```diff
- import IconComponent from 'virtual:vite-icons/collection/name'
+ import IconComponent from '~icons/collection/name'
```

## Options

You can set default styling for all icons. 
The following config shows the default values of each option:

```ts
Icons({
  scale: 1.2, // Scale of icons against 1em
  defaultStyle: '', // Style apply to icons
  defaultClass: '', // Class names apply to icons
  compiler: null, // 'vue2', 'vue3', 'jsx'
  jsx: 'react' // 'react' or 'preact'
})
```

## Auto Importing

Use with [`vite-plugin-components`](https://github.com/antfu/vite-plugin-components) (`>= v0.5.5`)

```js
// vite.config.js
import Vue from '@vitejs/plugin-vue'
import Components from 'vite-plugin-components'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'

export default {
  plugins: [
    Vue(),
    Components({
      customComponentResolvers: IconsResolver(),
    }),
    Icons(),
  ],
}
```

Then you can use any icons as you want without explicit importing (only the used icons will be bundled)

```html
<template>
  <i-carbon-accessibility/>
  <i-mdi-account-box style="font-size: 2em; color: red"/>
</template>
```

### Name Conversion

When using component resolver, you have to follow the name conversion for icons to be properly inferred.

```
{prefix}-{collection}-{icon}
```

The `collection` field follows [Iconify's collection IDs](https://iconify.design/icon-sets/).

By default, the prefix is set to `i` while you can customize via config

```ts
export default {
  plugins: [
    Vue(),
    Components({
      customComponentResolvers: IconsResolver({
        componentPrefix: 'icon' // <--
      }),
    }),
    Icons(),
  ],
}
```

```vue
<template>
  <icon-mdi-account />
</template>
```

Non-prefix mode is also supported

```ts
IconsResolver({
  componentPrefix: '', // <--
  // this is optional, default enabling all the collections supported by Iconify
  enabledCollections: ['mdi']
})
```

```vue
<template>
  <mdi-account />
</template>
```

## Sponsors

This project is part of my <a href='https://github.com/antfu-sponsors'>Sponsor Program</a>

<p align="center">
  <a href="https://cdn.jsdelivr.net/gh/antfu/static/sponsors.svg">
    <img src='https://cdn.jsdelivr.net/gh/antfu/static/sponsors.svg'/>
  </a>
</p>

## License

MIT License © 2020-PRESENT [Anthony Fu](https://github.com/antfu)
