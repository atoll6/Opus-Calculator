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
- Separate macro and micro adjustment controls.
- Relative burr movement calculation in microns.
- Quick switching between brew methods without losing the current dialed-in setting.
- Dark mode that follows the operating system preference.
- Responsive layout for desktop and mobile screens.
- No external JavaScript dependencies or build tools.

## Files

- `main.html` — page structure and content.
- `styles.css` — layout, dial styling, responsive behavior, and light/dark themes.
- `script.js` — brew presets, slider controls, burr movement calculation, and brew-method switching.

## Running locally

Open `main.html` in a browser. Because the app uses only local files, no development server is required.

For GitHub Pages, configure Pages to serve the repository root. GitHub Pages normally looks for `index.html`; if needed, rename `main.html` to `index.html` before publishing.

## Grind-setting notes

The displayed values are starting points, not guarantees. The ideal setting depends on the coffee, roast, recipe, dose, water, and grinder condition. Adjust based on brew time and taste.

The burr movement display is **relative**, not an absolute burr-to-burr gap:

- One full outer-number movement represents approximately **50 µm** of burr-height movement.
- One inner-ring click represents approximately **16.7 µm**.
- Six inner-ring clicks equal one full outer-number movement.

Fellow does not publish a calibrated absolute burr gap for the Opus, so the calculator deliberately avoids presenting relative movement as a measured physical gap.

Turkish coffee is included as a helpful reference, but the Opus is not designed to produce the powder-fine grind normally required for authentic Turkish coffee.

## Sources

- [Fellow Opus gear guide](https://fellowproducts.com/pages/gear-guide-opus)
- [Fellow Opus inner adjustment ring guide](https://help.fellowproducts.com/hc/en-us/articles/12697812844315-What-does-the-Opus-1-inner-adjustment-ring-do-and-how-do-I-use-it)
- [Fellow Opus user manual](https://www.seattlecoffeegear.com/assets/user-manuals/opus-user-manual.pdf)
- [Honest Coffee Guide — Fellow Opus grind settings](https://honestcoffeeguide.com/fellow-opus-grind-settings/)
- [Bizarre Coffee — How to grind coffee with a Fellow Opus](https://www.bizarrecoffee.com/blogs/brew-guides/how-to-grind-coffee-with-a-fellow-opus-coffee-grinder)

