// Bölüm 1 - Parça 2 (Sayfa 20-21)
// Listing 1.6: Check metodunun daha genel bir uygulamasını kullanma

import { sum } from "./listing-1.1-sum"

const assertEquals = (expected: unknown, actual: unknown) => {
  if (actual !== expected) {
    throw new Error(`Expected ${expected} but was ${actual}`);
  }
};

const check = (name: string, implementation: Function) => {
  try {
    implementation();
    console.log(`${name} passed`);
  } catch (e) {
    console.error(`${name} FAILED`, (e as Error).stack);
  }
};

check('sum with 2 numbers should sum them up', () => {
  const result = sum('1,2');
  assertEquals(3, result);
});

check('sum with multiple digit numbers should sum them up', () => {
  const result = sum('10,20');
  assertEquals(30, result);
});