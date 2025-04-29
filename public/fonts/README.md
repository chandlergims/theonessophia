# IBM Plex Mono Font

This directory contains the IBM Plex Mono Regular font files used throughout the application.

## Current Font Setup

The application is configured to use IBM Plex Mono Regular as the global font for all elements. The font is applied through the `globals.css` file.

## Font Files

Please place the following IBM Plex Mono font files in this directory:

- `IBMPlexMono-Regular.woff2` (preferred for best performance)
- `IBMPlexMono-Regular.woff` (fallback)
- `IBMPlexMono-Regular.ttf` (fallback)

## Adding Additional Font Weights

If you want to add additional weights or styles of IBM Plex Mono (like Bold, Italic, etc.), follow these steps:

1. Add the font files to this directory:
   - `IBMPlexMono-Bold.woff2`
   - `IBMPlexMono-Bold.woff`
   - `IBMPlexMono-Bold.ttf`

2. Update the `@font-face` declarations in `src/app/globals.css`:

```css
/* Bold weight */
@font-face {
  font-family: 'IBM Plex Mono';
  src: url('/fonts/IBMPlexMono-Bold.woff2') format('woff2'),
       url('/fonts/IBMPlexMono-Bold.woff') format('woff'),
       url('/fonts/IBMPlexMono-Bold.ttf') format('truetype');
  font-weight: bold;
  font-style: normal;
  font-display: swap;
}
```

The font is automatically applied to the entire application as it's set as the primary font for all elements.
