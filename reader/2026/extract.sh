#!/usr/bin/env bash
#
# Extract text from the 2026 kutsunta PDFs.
#
# Most of the 2026 PDFs are scanned images (no text layer), so we OCR them
# with tesseract (Finnish + Swedish). The few that already have a real text
# layer are extracted directly with pdftotext, which is faster and cleaner.
#
# Per-file detection: run pdftotext first; if it yields almost no text the
# file is a scan and we fall back to OCR.
#
# Deps (macOS):
#   brew install poppler ocrmypdf tesseract-lang
#
# Output: one .txt per PDF in ./texts/, slugified lowercase name.

set -euo pipefail

cd "$(dirname "$0")"

PDF_DIR="pdf"
OUT_DIR="texts"
OCR_LANG="fin+swe"
# Below this many non-whitespace chars, treat the direct extraction as empty
# (i.e. the PDF is a scan) and OCR instead.
MIN_TEXT_CHARS=200

missing=0
for tool in pdftotext ocrmypdf tesseract; do
  if ! command -v "$tool" >/dev/null 2>&1; then
    echo "missing dependency: $tool" >&2
    missing=1
  fi
done
if [ "$missing" -ne 0 ]; then
  echo "install with: brew install poppler ocrmypdf tesseract-lang" >&2
  exit 1
fi

if ! tesseract --list-langs 2>/dev/null | grep -qx fin; then
  echo "tesseract is missing the 'fin' language pack (brew install tesseract-lang)" >&2
  exit 1
fi

mkdir -p "$OUT_DIR"

slugify() {
  # lowercase, strip ".pdf", spaces->-, drop anything not a-z0-9-._
  basename "$1" .pdf \
    | tr '[:upper:]' '[:lower:]' \
    | tr ' ' '-' \
    | tr -cd 'a-z0-9-._åäöÅÄÖ'
}

shopt -s nullglob
for pdf in "$PDF_DIR"/*.pdf; do
  name="$(basename "$pdf")"

  # Skip the Swedish-language duplicates of bilingual regions; the Finnish
  # files cover the same schedules.
  # Patterns avoid the å/ä/ö bytes, which shell glob matching mishandles.
  case "$name" in
    Nylands*|*sterbottens*|Syd*)
      echo "skip (Swedish duplicate): $name"
      continue
      ;;
  esac

  out="$OUT_DIR/$(slugify "$pdf").txt"

  # Try the direct text layer first.
  direct="$(pdftotext -layout "$pdf" - 2>/dev/null || true)"
  chars="$(printf '%s' "$direct" | tr -d '[:space:]' | wc -c | tr -d ' ')"

  if [ "$chars" -ge "$MIN_TEXT_CHARS" ]; then
    printf '%s\n' "$direct" > "$out"
    echo "text-layer  ($chars chars) -> $out"
  else
    echo "scanned, OCR -> $out"
    tmp="$(mktemp -t kutsunta).pdf"
    # --force-ocr: pages have stray vector text but no usable layer, so
    # rasterize and OCR everything. deskew/rotate help the scans.
    ocrmypdf --force-ocr -l "$OCR_LANG" --deskew --rotate-pages \
      "$pdf" "$tmp" >/dev/null 2>&1
    pdftotext -layout "$tmp" "$out"
    rm -f "$tmp"
  fi
done

echo "done. extracted texts in $OUT_DIR/"
