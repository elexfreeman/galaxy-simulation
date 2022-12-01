export const getRandomInt = (min, max) => {
  return Math.random() * (max - min) + min;
}

export const notNULL = (a) => {
  if (a == 0) return 0.0000001;
  return a;
}
