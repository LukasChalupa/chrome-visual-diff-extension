# Visual Diff Tooling

This directory contains two main tools for visual regression:

1.  **Chrome Extension**: A manual tool for developers to overlay and compare screenshots in the browser via a slider or opacity.
2.  **CLI Utility (`vcheck.sh`)**: An automated script for agents (or developers) to capture snapshots and compare them programmatically.

## Using the CLI Utility

The CLI utility has been moved to the monorepo for easier access during development.

### Location
`../monorepo/scripts/vcheck.sh`

### 1. Capture "Before"
Run this from the monorepo root:
```bash
./scripts/vcheck.sh http://localhost:3000 before
```

### 2. Make your changes
Edit your code in the monorepo.

### 3. Capture "After" & Compare
Run this from the monorepo root:
```bash
./scripts/vcheck.sh http://localhost:3000 after
```

### Results
- Snapshots are saved in the `snapshots/` directory.
- `diff.png`: A pixel-by-pixel highlighted difference image.
- `after.json` / `before.json`: Summaries of page text and DOM structure to detect data changes.
- The console will output a **Difference Percentage**.

## Speeding up the process

- **Headless Mode**: The script runs in headless mode by default for speed.
- **Selective Comparison**: If you only care about a specific component, you can modify `visual-diff.mjs` to target a specific CSS selector for the screenshot.
- **Parallel Runs**: You can run multiple instances for different routes simultaneously.
