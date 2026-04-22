# Visual Diff — Chrome Extension

A Chrome extension for manually comparing two screenshots side by side. Useful for visual regression testing during development.

## How it works

1. Open the popup and click **Capture Base (1)** to snapshot the current tab.
2. Make your changes (navigate, resize, tweak CSS, etc.).
3. Click **Capture New (2)** to take a second snapshot.
4. Click **Compare** — a comparison page opens with two modes:
   - **Opacity** — overlay the new image on top of the base with adjustable transparency.
   - **Slider** — drag a vertical divider to reveal base vs. new side by side.

Screenshots are stored in `chrome.storage.local` so they persist across popup opens. Use **Clear** to reset both captures.

## Repository structure

```
extension/     Chrome extension source (load unpacked from here)
pack.sh        Packages extension/  into a zip ready for Chrome Web Store upload
```

## Development

Load the extension unpacked in Chrome:

1. Go to `chrome://extensions`
2. Enable **Developer mode**
3. Click **Load unpacked** and select the `extension/` folder

## Publishing

Run `./pack.sh` from the repo root. It reads the version from `extension/manifest.json` and produces `visual-diff-v<version>.zip`, ready to upload to the Chrome Web Store.
