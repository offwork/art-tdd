// Bölüm 1 - Parça 1 (Sayfa 13)
// Listing 1.3: Fonksiyona bir loglayıcı çağrısı ekleme

let total = 0;

export const totalSoFar = () => {
  return total;
};

// makeLogger fonksiyonu - gerçek implementasyon projenize göre değişir
export const makeLogger = () => ({
  info: (message: string, data: unknown) => {
    console.log(message, data);
  }
});

export const logger = makeLogger();

export const sum = (numbers: string) => {
  const [a, b] = numbers.split(',');
  logger.info(
    'this is a very important log output',
    { firstNumWas: a, secondNumWas: b }
  );
  const result = parseInt(a || "") + parseInt(b || "");
  total += result;
  return result;
};
