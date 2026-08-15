---
name: Giron Detailing
description: Dark premium mobile detailing site for Detailing Giron 1 LLC
colors:
  giron-red: "#E2181F"
  giron-red-deep: "#B9141A"
  ink: "#0C0C0D"
  ink-2: "#141416"
  ink-3: "#1C1C1F"
  line: "rgba(255,255,255,0.12)"
  paper: "#F4F1EC"
  mute: "#B8B4AE"
  danger: "#F0A0A3"
  placeholder: "#8A8680"
  map-idle: "#2A2A2E"
  map-also: "#5A2426"
  map-also-stroke: "#3A1618"
  map-home-stroke: "#7A1014"
  map-idle-hover: "#3A3A40"
  map-home-hover: "#C41A20"
  map-also-hover: "#7A3235"
  sheen: "rgba(255,255,255,0.16)"
  sheen-soft: "rgba(255,255,255,0.03)"
typography:
  display:
    fontFamily: "Tektur, sans-serif"
    fontSize: "clamp(2.25rem, 6vw, 4.25rem)"
    fontWeight: 800
    lineHeight: 0.92
    letterSpacing: "-0.02em"
  heading:
    fontFamily: "Tektur, sans-serif"
    fontSize: "clamp(2rem, 5vw, 3rem)"
    fontWeight: 800
    lineHeight: 0.92
    letterSpacing: "-0.02em"
  subhead:
    fontFamily: "Tektur, sans-serif"
    fontSize: "1.75rem"
    fontWeight: 800
    lineHeight: 0.92
  kicker:
    fontFamily: "Tektur, sans-serif"
    fontSize: "1.375rem"
    fontWeight: 700
    lineHeight: 1.1
  body:
    fontFamily: "Tektur, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: "0"
  lede:
    fontFamily: "Tektur, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.5
  sm:
    fontFamily: "Tektur, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 600
    lineHeight: 1.45
  caption:
    fontFamily: "Tektur, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 400
    lineHeight: 1.4
  micro:
    fontFamily: "Tektur, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 600
    lineHeight: 1.35
  map-label:
    fontFamily: "Tektur, sans-serif"
    fontSize: "0.6875rem"
    fontWeight: 700
rounded:
  sm: "4px"
  md: "6px"
spacing:
  sm: "8px"
  md: "16px"
  lg: "24px"
  section: "96px"
components:
  button-primary:
    backgroundColor: "{colors.giron-red}"
    textColor: "{colors.paper}"
    rounded: "{rounded.sm}"
    padding: "14px 26px"
    height: "44px"
  button-primary-hover:
    backgroundColor: "{colors.giron-red-deep}"
    textColor: "{colors.paper}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.paper}"
    rounded: "{rounded.sm}"
    padding: "14px 26px"
    height: "44px"
---

# Design

## Overview

Dark-mode throughout. Near-black garage light, not navy tech and not cream luxury. The red is the client's logo red only. Photography of finished paint does the talking. The one signature move is a soft diagonal gloss sweep across work images on hover, like light catching freshly waxed clearcoat. It is not a looping shimmer.

Brief-pinned world. No concept tournament.

## Colors

- `#E2181F` is the only accent. Buttons, map home county, focus rings, active links.
- Page ground `#0C0C0D`. Raised sections `#141416`. Hairlines `rgba(255,255,255,0.12)`.
- Body text `#F4F1EC`. Secondary text `#B8B4AE` (must stay AA on ink).
- Do not use pure `#000` fields or copper leftover from the electrician template.
- Do not invert a section to light paper mid-page.

## Typography

- Display: Tektur 800, uppercase, tight leading.
- Body: Tektur 400/500/600.
- Scale (use these steps, not one-off px): display, heading, subhead 1.75rem, kicker 1.375rem, lede 1.125rem, body 1rem, sm 0.875rem, caption 0.8125rem, micro 0.75rem, map-label 0.6875rem.
- No serif. No Inter. No script.
- Display tracking floor `-0.02em`. Body near `0`.

## Layout

- Max content width 1120px. Nav 64-72px tall, one line on desktop.
- Hero is full-bleed photography, copy left, `min-h-[100dvh]`, top padding capped at `pt-24`.
- Section families rotate: media hero, split about, service rows (not three equal cards), masonry gallery, quote strip, map split, stacked form, FAQ list.
- Maximum one uppercase tracked eyebrow per three sections.

## Elevation & Depth

- Depth comes from photography and a 1px hairline, not drop shadows on cards.
- Gloss sweep is a diagonal highlight overlay translating across the image. Opacity stays low. Gated to `hover: hover` and `pointer: fine`. Disabled under `prefers-reduced-motion`.

## Shapes

- 4px on buttons and inputs. 6px on image frames. No pills. No circular logo crop (the mark is landscape).

## Components

- Primary button: red fill, paper text, 44px min height, `scale(0.97)` on active.
- Ghost button: 2px paper/40 stroke over photography.
- Inputs: dark fill, hairline border, red focus ring. Labels above fields.
- Map: Mercer filled `#E2181F`. Adjacent NJ counties a muted red-stone for unverified surrounding coverage.

## Do's and Don'ts

- Do use the uploaded logo file as-is on black.
- Do source gallery/hero from the client's own photos.
- Don't publish Jessica M. / Tom R. / Linda S. reviews.
- Don't list ceramic coating as a service.
- Don't put a giant map beside the quote form.
- Don't use em dashes in copy.
