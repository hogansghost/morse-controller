import { createGlobalStyle } from 'styled-components';
import { getGameTheme } from './utils/getGameTheme';

const { color, backgroundColor, backgroundImage } = getGameTheme();

export const GlobalStyles = createGlobalStyle`
  :root {
    --interface-colour: ${color};
    --interface-background-colour: ${backgroundColor};
    --interface-background-image: ${backgroundImage};
  }

  :root {
  font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
  line-height: 1.5;
  font-weight: 400;

  color-scheme: light dark;
  color: rgba(255, 255, 255, 0.87);
  background-color: #242424;

  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -webkit-text-size-adjust: 100%;
}

a {
  font-weight: 500;
  color: #646cff;
  text-decoration: inherit;
}

a:hover {
  color: #535bf2;
}

body {
  margin: 0;
  min-height: 100vh;
}

button {
  border: 0;
}

button:focus,
button:focus-visible {
  outline: 4px auto -webkit-focus-ring-color;
}

p,
h1,
h2,
h3,
h4,
h5,
h6 {
  margin: 0;
}

@media (prefers-color-scheme: light) {
  :root {
    color: #213547;
    background-color: #ffffff;
  }
  a:hover {
    color: #747bff;
  }
  button {
    background-color: #f9f9f9;
  }
}

/*
  1. Use a more-intuitive box-sizing model.
*/
*,
*::before,
*::after {
  box-sizing: border-box;
}
/*
  2. Remove default margin
*/
* {
  margin: 0;
}
/*
  3. Allow percentage-based heights in the application
*/
html,
body {
  height: 100%;
}
/*
  Typographic tweaks!
  4. Add accessible line-height
  5. Improve text rendering
*/
body {
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
  word-break: break-word;
  overflow-wrap: break-word;
}
/*
  6. Improve media defaults
*/
img,
picture,
video,
canvas,
svg {
  display: block;
  max-width: 100%;
}
/*
  7. Remove built-in form typography styles
*/
input,
button,
textarea,
select {
  font: inherit;
}
/*
  8. Avoid text overflows
*/
p,
h1,
h2,
h3,
h4,
h5,
h6 {
  overflow-wrap: break-word;
}
/*
  9. Create a root stacking context
*/
#root,
#__next {
  isolation: isolate;
}

input,
textarea {
  font-size: 2em;
  border: 0;
  border-radius: 6px;
  padding: 8px 16px;
  min-height: 3em;
  resize: none;
}

`;
