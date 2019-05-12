// UTILS for colors

// get X (steps) colors between 2 colors
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

  let rgbString = '';

  // decimal to hex values
  for (let i = 0; i < 3; i++) {
    let _val: number = parseInt(color.substring(1 + (i * 2), 3 + (i * 2)), 16);
    _val = parseInt(String(_val * (100 + percent) / 100), 10);
    _val = (_val < 255) ? _val : 255;
    rgbString += ((_val.toString(16).length === 1) ? '0' + _val.toString(16) : _val.toString(16));
  }

  return '#' + rgbString;
}
