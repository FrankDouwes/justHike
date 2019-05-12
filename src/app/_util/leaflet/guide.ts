import * as L from 'leaflet';

// create a guide line, with optional arrowheads on either side.
export function createGuide(point1: any, point2: any, arrowHeadStart?: boolean, arrowHeadEnd?: boolean, color?: string, width?: number, dashed: boolean = false): Array<any> {

  const _elements: Array<any> = [];

  const _weight = width || 2;

  // TODO: rgba seems to cause issues on arrowheads (transparency sometimes fails)

  const _options = {
    color: color || 'rgba(119, 119, 119, 0.5)',
    weight: _weight,
    opacity: 1,
    smoothFactor: 3,
    steps: 10
  };

  if (dashed) {
    _options['dashArray'] = _weight * 2.5 + ' ' + _weight * 3.5;
  }

  const _guide = new L.geodesic([], _options);

  _guide.setLatLngs([[point1, point2]]);

  _elements.push(_guide);

  const _createArrowHead = function (guide: any, positionPerc: number): any {

    const _angle = (positionPerc === 0 ) ? 270 : 90;

    return L.polylineDecorator(guide, {
      patterns: [{
        offset: positionPerc + '%',
        repeat: 0,
        symbol: L.Symbol.arrowHead({
          pixelSize: 5,
          headAngle: _angle,
          polygon: false,
          pathOptions: {
            color: color,
            weight: _weight}
        })
      }]
    });
  };

  if (arrowHeadStart) {
    _elements.push(_createArrowHead(_guide, 0));
  }

  if (arrowHeadEnd) {
    _elements.push(_createArrowHead(_guide, 100));
  }

  return _elements;
}
