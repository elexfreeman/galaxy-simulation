import * as C from './consts';
import {Vector} from './vector';

export const getF = (a, b) => {
  const F = new Vector(0, 0);

  const getFamilyF = () => {
    if (a.family == b.family) return C.FAMILY_FORCE;
    return 1;
  }

  const vec = Vector.minus(b.coord, a.coord);
  const length = Vector.length(vec);

  F.x = C.G * getFamilyF() * vec.x / (length * length)
  F.y = C.G * getFamilyF() * vec.y / (length * length);

  return F;
}
