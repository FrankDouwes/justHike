// is a number a prime number?
export function isPrime (num:number): boolean {
  for(var i = 2; i < num; i++) {
    if (num % i === 0) return false;
  }
  return num !== 1 && num !== 0;
}


// normalizes elevation within a range (converts a range in feet to a y position in pixels)
export function normalizeElevation(containerHeight:any, elevation: number, min: number, range: number, padding: number): number {

  if (range < 700) {
    const _difference = 700 - range;
    range = 700;
    elevation += _difference / 3;
  }

  elevation = (elevation - (min - padding)) / (range + (padding * 2));

  // invert as svg draws from top left
  elevation = Math.abs(elevation - 1);

  return Math.round(elevation * containerHeight);
}
