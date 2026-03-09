<h1 align="center">ScanMe</h1>
<p align="center">A retro-styled QR code scanner, creator, and content viewer — runs entirely in the browser.</p>

<p align="center">
  <code>git clone --recurse-submodules https://github.com/michaelkargl/ScanMe.git</code>
</p>

## What is ScanMe?

ScanMe is a client-side web application built with Gatsby and React that lets you scan QR codes with your device camera, generate new QR codes linked to markdown content, and view that content in a retro Windows 98-styled interface. Everything runs locally in the browser — no server, no tracking.

## Features

- **Scanner** — Real-time QR code scanning using the device camera; fully client-side
- **Creator** — Generates QR codes that reference hosted markdown content files
- **Viewer** — Displays markdown content associated with a scanned QR code
- **Privacy-first** — No data leaves the device during scanning or viewing

## Tech Stack

| Technology | Role |
|---|---|
| Gatsby + React + TypeScript | Application framework and UI |
| RxJS | Reactive camera/scanner stream handling |
| 98.css | Windows 98 retro UI theme |
| Decap CMS | Markdown content management (admin UI) |
| decap-contrib-encrypted-widget | Custom CMS widget submodule for encrypted fields |

## Getting Started

Clone the repository (including submodules) and install dependencies:

```shell
git clone --recurse-submodules https://github.com/michaelkargl/ScanMe.git
cd ScanMe
yarn install
yarn run start
```

> Mind the console output for the URLs.

Unless something has changed:

|                  |                                    |
|------------------|------------------------------------|
| CMS Admin page   | <http://localhost:8000/admin/>     |
| Application      | <http://localhost:8000/>           |
| GraphQL Browser  | <http://localhost:8000/___graphql> |
| Production Build | <http://localhost:9000/ScanMe/>    |

## Production Build

Build and test the production build by using:

```shell
yarn run serve
# and/or
yarn run serve:only
```

## CMS / Content

Content is managed through [Decap CMS](https://decapcms.org/) at `/admin/`. Markdown files live in `src/cms/curriculum/` and are served as static assets.

The `decap-contrib-encrypted-widget` submodule provides an encrypted field widget for the CMS. If you cloned without `--recurse-submodules`, initialize it with:

```shell
git submodule update --init --recursive
```
