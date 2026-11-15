#!/bin/bash
# Synthesizes the team film's score and effects with ffmpeg: a slow pipe-organ
# pad, a ticking clock, and transition effects. Re-run after editing a recipe.
set -euo pipefail
OUT="$(cd "$(dirname "$0")/.." && pwd)/public/team/sfx"
mkdir -p "$OUT"
ff() { ffmpeg -v error -y "$@"; }

# One organ chord: stacked harmonics per note, slow swell, chapel echo.
# usage: chord <file> <seconds> <freq...>
chord() {
  local file=$1 dur=$2; shift 2
  local expr="0"
  for f in "$@"; do
    expr="$expr+0.10*sin(2*PI*$f*t)+0.05*sin(2*PI*$f*2*t)+0.03*sin(2*PI*$f*3*t)+0.015*sin(2*PI*$f*4.01*t)+0.04*sin(2*PI*$f*0.5*t)"
  done
  ff -f lavfi -i "aevalsrc='($expr)*(0.85+0.15*sin(2*PI*0.18*t))':d=$dur:s=48000" \
    -af "afade=t=in:d=2.2,afade=t=out:st=$(python3 -c "print($dur-2.6)"):d=2.6,lowpass=f=2600,aecho=0.8:0.6:90|170|260:0.35|0.25|0.15" "$file"
}

# Four-chord progression in A minor, 8 s each, overlapped into one 30 s loop.
chord "$OUT/c1.wav" 9 110.00 164.81 220.00 261.63      # A minor
chord "$OUT/c2.wav" 9 87.31 174.61 220.00 261.63       # F major
chord "$OUT/c3.wav" 9 130.81 164.81 196.00 261.63      # C major
chord "$OUT/c4.wav" 9 98.00 146.83 196.00 246.94       # G major
ff -i "$OUT/c1.wav" -i "$OUT/c2.wav" -i "$OUT/c3.wav" -i "$OUT/c4.wav" \
  -filter_complex "[1]adelay=7500:all=1[b];[2]adelay=15000:all=1[c];[3]adelay=22500:all=1[d];[0][b][c][d]amix=inputs=4:normalize=0,atrim=0:30" "$OUT/organ_loop.wav"
# Long bed: the loop repeated, with a high arpeggio shimmer that enters late.
ff -stream_loop 5 -i "$OUT/organ_loop.wav" -t 170 "$OUT/organ_bed.wav"

# Big final swell on A minor with an added high octave.
chord "$OUT/swell_raw.wav" 9 55.00 110.00 164.81 220.00 329.63 440.00
ff -i "$OUT/swell_raw.wav" -af "volume='0.4+1.1*min(1,t/5)':eval=frame" "$OUT/swell.wav"

# Ticking clock: one soft tick every 1.25 s, alternating pitch.
ff -f lavfi -i "aevalsrc='(0.5*sin(2*PI*2100*t)*exp(-90*mod(t,1.25))*lt(mod(t,2.5),1.25)+0.4*sin(2*PI*1500*t)*exp(-90*mod(t,1.25))*gte(mod(t,2.5),1.25))':d=60:s=48000" \
  -af "aecho=0.6:0.4:35:0.25" "$OUT/tick.wav"

# Nameplate blip: a quick two-note digital chirp.
ff -f lavfi -i "aevalsrc='0.35*sin(2*PI*(880+2600*t)*t)*exp(-14*t)+0.25*sin(2*PI*1760*t)*exp(-30*max(0,t-0.12))*gte(t,0.12)':d=0.5:s=48000" \
  -af "aecho=0.6:0.3:45:0.2" "$OUT/blip.wav"

# Whoosh: filtered noise rising then cutting, for scene changes.
ff -f lavfi -i "anoisesrc=d=1.4:c=pink:a=1" \
  -af "highpass=f=300,lowpass=f=5000,volume='1.6*pow(t/1.2,2.5)*lt(t,1.2)+1.6*exp(-22*(t-1.2))*gte(t,1.2)':eval=frame" -ar 48000 "$OUT/whoosh.wav"

# Deep hit with a metallic ring, heavier than the film impact.
ff -f lavfi -i "aevalsrc='1.0*sin(2*PI*36*t)*exp(-1.3*t)+0.7*sin(2*PI*54*t)*exp(-1.8*t)+0.12*sin(2*PI*311*t)*exp(-2.4*t)+0.08*sin(2*PI*466*t)*exp(-3*t)':d=4:s=48000" \
  -f lavfi -i "anoisesrc=d=4:c=brown:a=1" \
  -filter_complex "[1]lowpass=f=160,volume='1.8*exp(-6*t)':eval=frame[n];[0][n]amix=inputs=2:normalize=0,afade=t=in:d=0.003,aecho=0.8:0.5:120:0.3" "$OUT/hit.wav"

rm -f "$OUT"/c[1-4].wav "$OUT/swell_raw.wav"
ls -la "$OUT"
