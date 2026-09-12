# Fellow Opus Grind Calculator

A lightweight, dependency-free calculator for finding starting grind settings on the Fellow Opus grinder.

This app was created and refactored with assistance from an AI assistant using Copilot SDK in VS Code. It is intentionally built with plain HTML, CSS, and JavaScript so it can be hosted directly on GitHub Pages without a build step.

## Features

- Brew-method starting points for:
  - Espresso
  - Moka pot
  - AeroPress
  - Pour over
  - Electric drip
  - French press
  - Cold brew
  - Turkish coffee
- Separate outer-ring and inner-ring adjustment controls.
- Combined adjusted Opus setting from the outer and inner rings.
- Brew-method reference table for starting points.
- Dark mode that follows the operating system preference.
- Responsive layout for desktop and mobile screens.
- No external JavaScript dependencies or build tools.

## Files

- `index.html` — page structure, content, and the GitHub Pages entry point.
- `styles.css` — layout, dial styling, responsive behavior, and light/dark themes.
- `script.js` — brew-method data, reference-table rendering, slider controls, and adjusted-setting calculation.

## Running locally

Open `index.html` in a browser. Because the app uses only local files, no development server is required.

For GitHub Pages, configure Pages to serve the repository root.

## Grind-setting notes

The displayed values are starting points, not guarantees. The ideal setting depends on the coffee, roast, recipe, dose, water, and grinder condition. Adjust based on brew time and taste. The outer ring is the normal day-to-day grind control; the inner ring is a calibration offset that shifts the outer ring's range.

The adjusted setting combines the two Opus rings:

- The outer ring is the normal setting from 1 to 11, with quarter-step increments.
- Each inner-ring notch shifts the effective setting by **1/6** of an outer number.
- The displayed adjusted setting is calculated as `outer setting + inner offset / 6`.

Turkish coffee is included as a helpful reference, but the Opus is not designed to produce the powder-fine grind normally required for authentic Turkish coffee.

## Sources

- [Fellow Opus gear guide](https://fellowproducts.com/pages/gear-guide-opus)
- [Fellow Opus inner adjustment ring guide](https://help.fellowproducts.com/hc/en-us/articles/12697812844315-What-does-the-Opus-1-inner-adjustment-ring-do-and-how-do-I-use-it)
- [Fellow Opus user manual](https://www.seattlecoffeegear.com/assets/user-manuals/opus-user-manual.pdf)
- [Honest Coffee Guide — Fellow Opus grind settings](https://honestcoffeeguide.com/fellow-opus-grind-settings/)
- [Bizarre Coffee — How to grind coffee with a Fellow Opus](https://www.bizarrecoffee.com/blogs/brew-guides/how-to-grind-coffee-with-a-fellow-opus-coffee-grinder)
