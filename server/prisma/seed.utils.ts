export function getRandomNumber(lowerLimit = 0, upperLimit?: number) {
  if (upperLimit === undefined) {
    upperLimit = lowerLimit;
    lowerLimit = 0;
  }
  return Math.floor(Math.random() * (upperLimit - lowerLimit)) + lowerLimit;
}

export function getRandomBoolean() {
  return Math.random() < 0.5;
}

export function repeatArray(arr: any[], length: number) {
  return arr.flatMap((value) => Array.from({ length }, () => value));
}
