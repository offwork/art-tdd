// Bölüm 1 - Parça 2 (Sayfa 19)
// Listing 1.4: sum()'a karşı çok naif bir test

import { sum } from "./listing-1.1-sum";

const parserTest = () => {
  try {
    const result = sum('1,2');
    if (result === 3) {
      console.log('parserTest example 1 PASSED');
    } else {
      throw new Error(`parserTest: expected 3 but was ${result}`);
    }
  } catch (e) {
    console.error((e as Error).stack || (e as Error).message);
  }
};

parserTest();