# Pixina

[![Build](https://github.com/Sharknoon/pixina/actions/workflows/build.yml/badge.svg)](https://github.com/Sharknoon/pixina/actions/workflows/build.yml)

[Pixina](https://pixina.app) is a website that accompanies the creation and construction of a work of art from many small physical pixels. The artwork will be a 2.5m x 2.5m (8.2ft x 8.2ft) plug-in image.

[The image](https://www.reddit.com/r/place/) of the artwork was created from April 1 - 3, 2017 on the forum Reddit in the form of a social experiment. For three days, Reddit users could put pixels on a 1000 x 1000 pixel white field. This field was called _Place_. However, there were limitations. For example, users could only place a pixel every ~5 minutes. Likewise, they only had 16 colors to choose from. In addition, the space was limited to one million pixels. This meant that users had to coordinate with each other if they wanted to paint a larger picture. In addition, the pixels could be overwritten again by other users, creating a battle for valuable space.

[Reddit](https://reddit.com) is a forum in which users can exchange information. The forum does not focus on specific topics. Instead, anyone can create their own subforum (subreddit) for a specific topic and exchange ideas with other Reddit members there.

The goal of this artwork is to recreate Reddit Place, which is considered a piece of Internet culture, in the real world. This is done by putting the pixels set by Reddit users on plug-in boards and thus having a representation in the real world.

---

## Setup

Make sure to install the dependencies:

```bash
# npm
npm install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build
```

Locally preview production build:

```bash
# npm
npm run preview
```

## Create the onedrive link for the excel spreadsheet

```bash
npx onedrive-link <your-shared-onedrive-link>
```
