export function findArrayOutlier(array: Array<number>): number {
  if (array.length < 3) {
    throw new Error("Tablica musi mieć długość co najmniej 3 elementy.");
  }

  const isFirstElementOdd = array[0] % 2 !== 0;
  const isSecondElementOdd = array[1] % 2 !== 0;

  if (isFirstElementOdd === isSecondElementOdd) {
    if (isFirstElementOdd === true) {
      // array is odd, find even outlier
      for (let i = 2; i < array.length; i++) {
        if (array[i] % 2 === 0) {
          return array[i];
        }
      }
      throw new Error("Brak wartości odstającej (parzystej) w tablicy");
    } else {
      // array is even, find odd outlier
      for (let i = 2; i < array.length; i++) {
        if (array[i] % 2 !== 0) {
          return array[i];
        }
      }
      throw new Error("Brak wartości odstającej (nieparzystej) w tablicy");
    }
  } else {
    // we dont know if the first or second element is the outlier, check the third element
    if (array[2] % 2 === 0) {
      return isFirstElementOdd ? array[0] : array[1];
    } else {
      return isFirstElementOdd ? array[1] : array[0];
    }
  }
}
