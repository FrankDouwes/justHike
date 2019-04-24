// UTILS for colors

// get X (steps) colors inbetween 2 colors
export function interpolateColors(color1, color2, steps) {

  const stepFactor = 1 / (steps - 1),
    interpolatedColorArray = [];

  color1 = color1.match(/\d+/g).map(Number);
  color2 = color2.match(/\d+/g).map(Number);

  for (let i = 0; i < steps; i++) {
    interpolatedColorArray.push(_interpolateColor(color1, color2, stepFactor * i));
  }

  return interpolatedColorArray;
}

// based on https://codepen.io/njmcode/pen/axoyD?editors=0010
function _interpolateColor(color1, color2, factor) {
  if (arguments.length < 3) {
    factor = 0.5;
  }
  const result = color1.slice();
  for (let i = 0; i < 3; i++) {
    result[i] = Math.round(result[i] + factor * (color2[i] - color1[i]));
  }
  return result;
}

// get a darker shade of a color
export function shadeColor(color: string, percent: number): string {

  if (!color.startsWith('#')) {
    console.log('color is not HEX', color);
    color = '#F00';
  }

  // hex values
  let R: number = parseInt(color.substring(1, 3), 16);
  let G: number = parseInt(color.substring(3, 5), 16);
  let B: number = parseInt(color.substring(5, 7), 16);

  // decimal values
  R = parseInt(String(R * (100 + percent) / 100), 10);
  G = parseInt(String(G * (100 + percent) / 100), 10);
  B = parseInt(String(B * (100 + percent) / 100), 10);

  // take care of max values
  R = (R < 255) ? R : 255;
  G = (G < 255) ? G : 255;
  B = (B < 255) ? B : 255;

  // create a hex value, both values of the different channels are always the same value 77 CC FF etc,
  // as the shade does not affect the color
  const RR = ((R.toString(16).length === 1) ? '0' + R.toString(16) : R.toString(16));
  const GG = ((G.toString(16).length === 1) ? '0' + G.toString(16) : G.toString(16));
  const BB = ((B.toString(16).length === 1) ? '0' + B.toString(16) : B.toString(16));

  return '#' + RR + GG + BB;
}
