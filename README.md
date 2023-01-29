# Pixina

[![Build](https://github.com/Sharknoon/pixina/actions/workflows/build.yml/badge.svg)](https://github.com/Sharknoon/pixina/actions/workflows/build.yml)

[Pixina](https://pixina.app) is a website that accompanies the creation and construction of a work of art from many small physical pixels. The artwork will be a 2.5m x 2.5m (8.2ft x 8.2ft) plug-in image.

[The image](https://www.reddit.com/r/place/) of the artwork was created from April 1 - 3, 2017 on the forum Reddit in the form of a social experiment. For three days, Reddit users could put pixels on a 1000 x 1000 pixel white field. This field was called _Place_. However, there were limitations. For example, users could only place a pixel every ~5 minutes. Likewise, they only had 16 colors to choose from. In addition, the space was limited to one million pixels. This meant that users had to coordinate with each other if they wanted to paint a larger picture. In addition, the pixels could be overwritten again by other users, creating a battle for valuable space.

[Reddit](https://reddit.com) is a forum in which users can exchange information. The forum does not focus on specific topics. Instead, anyone can create their own subforum (subreddit) for a specific topic and exchange ideas with other Reddit members there.

The goal of this artwork is to recreate Reddit Place, which is considered a piece of Internet culture, in the real world. This is done by putting the pixels set by Reddit users on plug-in boards and thus having a representation in the real world.

---

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin) to make the TypeScript language service aware of `.vue` types.

If the standalone TypeScript plugin doesn't feel fast enough to you, Volar has also implemented a [Take Over Mode](https://github.com/johnsoncodehk/volar/discussions/471#discussioncomment-1361669) that is more performant. You can enable it by the following steps:

1. Disable the built-in TypeScript Extension
    1) Run `Extensions: Show Built-in Extensions` from VSCode's command palette
    2) Find `TypeScript and JavaScript Language Features`, right click and select `Disable (Workspace)`
2. Reload the VSCode window by running `Developer: Reload Window` from the command palette.

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
