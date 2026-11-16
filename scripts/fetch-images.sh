#!/usr/bin/env bash
# Downloads every image listed in scripts/images.tsv (path <TAB> url) that is not in the repo yet.
set -euo pipefail
while IFS=$'\t' read -r path url; do
  [ -s "$path" ] && continue
  mkdir -p "$(dirname "$path")"
  curl -fsSL --retry 3 --max-time 120 -o "$path" "$url"
  file --mime-type -b "$path" | grep -q '^image/' || { echo "not an image: $path ($url)"; exit 1; }
done < scripts/images.tsv
echo "images present: $(find static/img -type f | wc -l) of $(wc -l < scripts/images.tsv)"
