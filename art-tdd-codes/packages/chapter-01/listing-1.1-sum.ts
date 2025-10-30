// Bölüm 1 - Parça 1 (Sayfa 8)
// Listing 1.1: Test etmek istediğimiz basit bir fonksiyon

export const sum = (numbers: string) => {
  const [a, b] = numbers.split(',', 2);
  const result = parseInt(a || "") + parseInt(b || "");
  return result;
};
