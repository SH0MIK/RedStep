#!/bin/bash
# Re-downloads the NASA source clips into public/footage (they are gitignored).
# All sources are NASA media; see ../CREDITS.md.
set -euo pipefail
cd "$(dirname "$0")/../public/footage"

fetch() {
  [ -s "$1" ] && { echo "have $1"; return; }
  echo "fetching $1"
  curl -L --fail -o "$1" "$2"
}

fetch artemis.mp4 "https://images-assets.nasa.gov/video/NHQ_2023_0404_Artemis%20II%20Mission%20Animation%20Broll/NHQ_2023_0404_Artemis%20II%20Mission%20Animation%20Broll~large.mp4"
fetch msr_trailer.mp4 "https://images-assets.nasa.gov/video/JPL-20221117-MSRf-0001-MSR%20Animation%20Trailer/JPL-20221117-MSRf-0001-MSR%20Animation%20Trailer~large.mp4"
fetch gale.mp4 "https://images-assets.nasa.gov/video/JPL-20210816-MSLf-0001-2160/JPL-20210816-MSLf-0001-2160~large.mp4"
fetch mola_flyover.mp4 "https://svs.gsfc.nasa.gov/vis/a000000/a001300/a001335/molaZuberHD.mp4"
fetch mars_roll.mp4 "https://svs.gsfc.nasa.gov/vis/a000000/a003800/a003896/mars_lite_1080p.mp4"
fetch dust_globe.mp4 "https://svs.gsfc.nasa.gov/vis/a030000/a030900/a030983/mars_dust_storm_PIA22737_1080p.mp4"
