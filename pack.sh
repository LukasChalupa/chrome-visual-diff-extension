#!/usr/bin/env bash
set -euo pipefail

VERSION=$(node -e "console.log(JSON.parse(require('fs').readFileSync('extension/manifest.json','utf8')).version)")
OUT="visual-diff-v${VERSION}.zip"

rm -f "$OUT"
cd extension
zip -r "../$OUT" . --exclude "*.svg"
cd ..

echo "Created: $OUT"
