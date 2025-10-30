// Bölüm 1 - Parça 1 (Sayfa 10)
// Listing 1.2: Giriş noktaları ve çıkış noktaları olan bir iş birimi

let total = 0;

export const totalSoFar = () => {
  return total;
};

export const sum = (numbers: string) => {
  const [a, b] = numbers.split(',');
  const result = parseInt(a || "") + parseInt(b || "");
  total += result; // Yeni işlevsellik: çalışan toplam hesaplama
  return result;
};
