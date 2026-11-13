#!/bin/bash
# Synthesizes the sound design for the "WhatHappened" film with ffmpeg only.
# Every layer is its own file so it can be swapped for a recorded or generated
# sound later without touching the others. Re-run after changing a recipe.
set -euo pipefail
OUT="$(cd "$(dirname "$0")/.." && pwd)/public/film/audio"
mkdir -p "$OUT"
ff() { ffmpeg -v error -y "$@"; }

# Sub-bass impact: two low sines and a noise thump with a long decaying tail.
ff -f lavfi -i "sine=f=38:d=4" -f lavfi -i "sine=f=57:d=4" -f lavfi -i "anoisesrc=d=4:c=brown:a=0.9" \
  -filter_complex "[0][1][2]amix=inputs=3:normalize=0,lowpass=f=140,volume='1.6*exp(-1.5*t)':eval=frame,afade=t=in:d=0.004" \
  -ar 48000 "$OUT/impact.wav"

# Rising metallic tone: two inharmonic sweeps with a short comb echo.
ff -f lavfi -i "aevalsrc='0.30*sin(2*PI*(240*t+70*t*t))+0.22*sin(2*PI*(373*t+118*t*t))+0.12*sin(2*PI*(611*t+190*t*t))':d=3:s=48000" \
  -af "aecho=0.8:0.7:23|41:0.5|0.35,volume='0.9*pow(t/3,2)':eval=frame,highpass=f=180" "$OUT/riser.wav"

# Atmospheric drone: detuned low partials beating against each other.
ff -f lavfi -i "aevalsrc='0.30*sin(2*PI*55*t)+0.24*sin(2*PI*55.7*t)+0.16*sin(2*PI*82.4*t)+0.10*sin(2*PI*110.9*t)*(0.6+0.4*sin(2*PI*0.21*t))':d=14:s=48000" \
  -f lavfi -i "anoisesrc=d=14:c=brown:a=0.5" \
  -filter_complex "[1]lowpass=f=260[n];[0][n]amix=inputs=2:normalize=0,afade=t=in:d=1.2,afade=t=out:st=12.5:d=1.5" "$OUT/drone.wav"

# Landing rumble dying away.
ff -f lavfi -i "anoisesrc=d=5:c=brown:a=1" \
  -af "lowpass=f=95,volume='2.2*exp(-0.75*t)':eval=frame,tremolo=f=11:d=0.35" -ar 48000 "$OUT/rumble.wav"

# Distant mechanical vibration.
ff -f lavfi -i "aevalsrc='0.25*sin(2*PI*31*t)*(0.5+0.5*sin(2*PI*7.3*t))+0.08*sin(2*PI*124*t)*(0.5+0.5*sin(2*PI*3.1*t))':d=10:s=48000" \
  -af "afade=t=in:d=1,afade=t=out:st=8.5:d=1.5" "$OUT/mechanical.wav"

# Helmet breathing, calm: band-limited noise shaped into slow breaths.
ff -f lavfi -i "anoisesrc=d=6:c=pink:a=0.9" \
  -af "highpass=f=350,lowpass=f=1500,volume='0.9*pow(abs(sin(PI*t/1.7)),1.6)':eval=frame,aecho=0.6:0.4:18:0.3" -ar 48000 "$OUT/breath_calm.wav"

# Helmet breathing, heavy: faster and uneven, getting louder.
ff -f lavfi -i "anoisesrc=d=7.5:c=pink:a=1" \
  -af "highpass=f=300,lowpass=f=1900,volume='(0.7+0.12*t)*pow(abs(sin(PI*(0.55*t+0.07*t*t)+0.5*sin(1.9*t))),1.3)':eval=frame,aecho=0.6:0.4:18:0.3" -ar 48000 "$OUT/breath_heavy.wav"

# Boot on dust.
ff -f lavfi -i "anoisesrc=d=0.6:c=brown:a=1" \
  -af "lowpass=f=520,volume='2.4*exp(-9*t)':eval=frame" -ar 48000 "$OUT/step.wav"

# Quiet electronic warning tone, unexplained.
ff -f lavfi -i "aevalsrc='0.35*sin(2*PI*1320*t)*lt(mod(t,1.25),0.09)+0.2*sin(2*PI*1760*t)*lt(mod(t,1.25),0.09)':d=13:s=48000" \
  -af "lowpass=f=2600,aecho=0.5:0.3:60:0.25" "$OUT/warning.wav"

# Distorted wind, building.
ff -f lavfi -i "anoisesrc=d=7.5:c=pink:a=1" \
  -af "highpass=f=120,lowpass=f=900,tremolo=f=0.7:d=0.6,volume='(0.25+0.33*t)':eval=frame,asoftclip=type=tanh,lowpass=f=1400" -ar 48000 "$OUT/wind.wav"

# Low-frequency pulses, a heartbeat that speeds up.
ff -f lavfi -i "aevalsrc='0.9*sin(2*PI*46*t)*pow(abs(sin(PI*(0.9*t+0.06*t*t))),10)':d=7.5:s=48000" \
  -af "lowpass=f=120" "$OUT/pulse.wav"

# Rising tension layer: a string-like cluster that climbs and never resolves.
ff -f lavfi -i "aevalsrc='(0.16*sin(2*PI*(110*t+3.2*t*t))+0.14*sin(2*PI*(116.5*t+3.6*t*t))+0.12*sin(2*PI*(164.8*t+5.1*t*t))+0.10*sin(2*PI*(233*t+7.4*t*t))+0.07*sin(2*PI*(466*t+15*t*t)))*(0.75+0.25*sin(2*PI*5.6*t))':d=7.5:s=48000" \
  -af "volume='0.25+1.5*pow(t/7,2)':eval=frame,aecho=0.7:0.5:70|110:0.35|0.25" "$OUT/tension.wav"

# Aftermath: an almost inaudible rumble.
ff -f lavfi -i "anoisesrc=d=4:c=brown:a=0.6" \
  -af "lowpass=f=70,afade=t=in:d=0.6,afade=t=out:st=2.6:d=0.4" -ar 48000 "$OUT/aftermath.wav"

ls -la "$OUT"
